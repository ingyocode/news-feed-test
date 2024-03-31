import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/models/admins.entity';
import { AdminsSignUpRequestDto } from './dtos/requests/admins-sign-up-request.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminsEntity)
    private readonly adminsRepository: Repository<AdminsEntity>,
    private readonly authService: AuthService,
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
      const passwordInfo = this.authService.hashPassword(params.password);

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
}