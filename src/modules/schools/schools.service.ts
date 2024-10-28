import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolsEntity } from 'src/models/schools.entity';
import { StudentSubscribesEntity } from 'src/models/student-subscribes.entity';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(SchoolsEntity)
    private readonly schoolsRepository: Repository<SchoolsEntity>,
    @InjectRepository(StudentSubscribesEntity)
    private readonly studentSubscribesRepository: Repository<StudentSubscribesEntity>,
  ) {}

  async getSchool(region: string, name: string): Promise<SchoolsEntity> {
    return this.schoolsRepository.findOne({
      where: {
        region,
        name,
        isDeleted: false,
      },
    });
  }

  async createSchool(region: string, name: string, adminId: string) {
    try {
      await this.schoolsRepository.upsert(
        { region, name, adminId, isDeleted: false },
        {
          conflictPaths: ['region', 'name'],
          upsertType: 'on-conflict-do-update',
        },
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async getSubscribeList(schoolId: number): Promise<StudentSubscribesEntity[]> {
    const subscribeList: StudentSubscribesEntity[] =
      await this.studentSubscribesRepository.find({
        where: {
          schoolId,
          isDeleted: false,
        },
      });

    return subscribeList;
  }

  async getUserSubscribedSchoolList(
    studentId: string,
  ): Promise<SchoolsEntity[]> {
    const subscribeList = await this.studentSubscribesRepository.find({
      select: {
        schoolId: true,
      },
      where: {
        studentId,
        isDeleted: false,
      },
    });

    return this.schoolsRepository.find({
      where: {
        id: In(subscribeList.map((subscribe) => subscribe.schoolId)),
        isDeleted: false,
      },
    });
  }

  async getSubscribedSchool(
    studentId: string,
    schoolId: number,
  ): Promise<StudentSubscribesEntity> {
    return this.studentSubscribesRepository.findOne({
      where: {
        studentId,
        schoolId,
        isDeleted: false,
      },
    });
  }

  async subscribeSchool(studentId: string, schoolId: number): Promise<boolean> {
    try {
      await this.studentSubscribesRepository.upsert(
        { studentId, schoolId, isDeleted: false },
        {
          conflictPaths: ['studentId', 'schoolId'],
          upsertType: 'on-conflict-do-update',
        },
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async cancelSubscribe(studentId: string, schoolId: number): Promise<boolean> {
    try {
      await this.studentSubscribesRepository.upsert(
        { studentId, schoolId, isDeleted: true },
        {
          conflictPaths: ['studentId', 'schoolId'],
          upsertType: 'on-conflict-do-update',
        },
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async getSchoolWithId(schoolId: number): Promise<SchoolsEntity> {
    return this.schoolsRepository.findOne({
      where: {
        id: schoolId,
      },
    });
  }
}
