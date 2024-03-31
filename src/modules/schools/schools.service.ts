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

  async getSubscribedSchoolList(studentId: string): Promise<SchoolsEntity[]> {
    const subscribeList = await this.studentSubscribesRepository.find({
      where: {
        studentId,
      }
    });

    return this.schoolsRepository.find({
      where: {
        id: In(subscribeList.map((subscribe) => subscribe.schoolId))
      }
    });
  }

  async getSubscribedSchool(studentId: string, schoolId: number): Promise<StudentSubscribesEntity> {
    return this.studentSubscribesRepository.findOne({
      where: {
        studentId,
        schoolId,
      }
    });
  }

  async subscribeSchool(studentId: string, schoolId: number): Promise<boolean> {
    try {
      await this.studentSubscribesRepository.save({
        studentId,
        schoolId,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async createSchoolPage(region: string, schoolName: string) {
    await this.schoolsRepository.save({
      region,
      name: schoolName
    })
  }
}