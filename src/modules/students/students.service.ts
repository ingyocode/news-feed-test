import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity } from 'src/models/students.entity';
import { StudentsSignUpRequestDto } from './dtos/requests/students-sign-up-request.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
    private readonly authService: AuthService,
  ) {}

  async getStudent(email: string): Promise<StudentsEntity> {
    return this.studentsRepository.findOne({
      where: {
        email,
      }
    });
  }

  async createStudent(params: StudentsSignUpRequestDto): Promise<boolean> {
    try {
      const passwordInfo = this.authService.hashPassword(params.password);

      await this.studentsRepository.save({
        id: uuidv4(),
        email: params.email,
        name: params.name,
        password: passwordInfo.password,
        salt: passwordInfo.salt
      });
      return true;
    } catch {
      return false;
    }
  }

  async updateLastLoginedAt(studentId: string): Promise<boolean> {
    try {
      await this.studentsRepository.update({ id: studentId }, {
        lastLoginedAt: new Date(),
      });
      return true;
    } catch {
      return false;
    }
  }
}