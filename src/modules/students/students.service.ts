import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StudentsEntity } from 'src/models/students.entity';
import { StudentsSignUpRequestDto } from '../auth/dtos/requests/auth-students-sign-up-request.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {}

  async getStudent(email: string): Promise<StudentsEntity> {
    return this.studentsRepository.findOne({
      where: {
        email,
        isDeleted: false,
      },
    });
  }

  async createStudent(params: StudentsSignUpRequestDto): Promise<boolean> {
    try {
      const passwordInfo = this.hashPassword(params.password);

      await this.studentsRepository.save({
        id: uuidv4(),
        email: params.email,
        name: params.name,
        password: passwordInfo.password,
        salt: passwordInfo.salt,
      });
      return true;
    } catch {
      return false;
    }
  }

  async updateLastLoginedAt(studentId: string): Promise<boolean> {
    try {
      await this.studentsRepository.update(
        { id: studentId },
        {
          lastLoginedAt: new Date(),
        },
      );
      return true;
    } catch {
      return false;
    }
  }

  hashPassword(
    password: string,
    passwordSalt?: string,
  ): { password: string; salt: string } {
    const salt = passwordSalt || randomBytes(64).toString('base64'),
      encryptPassword =
        password &&
        pbkdf2Sync(password, salt, 131072, 64, 'sha512').toString('base64');
    return {
      password: encryptPassword,
      salt,
    };
  }
}
