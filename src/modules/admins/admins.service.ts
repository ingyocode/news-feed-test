import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/models/admins.entity';
import { AdminsSignUpRequestDto } from '../auth/dtos/requests/auth-admins-sign-up-request.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminsEntity)
    private readonly adminsRepository: Repository<AdminsEntity>,
  ) {}

  async getAdmin(email: string): Promise<AdminsEntity> {
    return this.adminsRepository.findOne({
      where: {
        email,
        isDeleted: false,
      }
    });
  }

  async createAdmin(params: AdminsSignUpRequestDto): Promise<boolean> {
    try {
      const passwordInfo = this.hashPassword(params.password);

      await this.adminsRepository.save({
        id: uuidv4(),
        email: params.email,
        name: params.name,
        password: passwordInfo.password,
        salt: passwordInfo.salt
      });
      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  hashPassword(
    password: string,
    passwordSalt?: string,
  ): { password: string; salt: string } {
    const salt = passwordSalt || randomBytes(64).toString('base64'),
      encryptPassword =
        password && pbkdf2Sync(password, salt, 131072, 64, 'sha512').toString('base64');
    return {
      password: encryptPassword,
      salt,
    };
  }
}