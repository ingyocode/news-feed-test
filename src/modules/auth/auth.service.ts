import { randomBytes, pbkdf2Sync } from 'crypto';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentsTokenInterface } from './interfaces/students-token.interface';
import { AdminsTokenInterface } from './interfaces/admins-token.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  issueStudentsToken(params: StudentsTokenInterface): string {
    return this.jwtService.sign({ ...params });
  }
  issueAdminsToken(params: AdminsTokenInterface): string {
    return this.jwtService.sign({ ...params, isAdmin: true });
  }
}
