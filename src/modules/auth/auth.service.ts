import { randomBytes, pbkdf2Sync } from "crypto";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { StudentsTokenInterface } from "./interfaces/students-token.interface";
import { AdminsTokenInterface } from "./interfaces/admins-token.interface";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  issueStudentsToken(params: StudentsTokenInterface): string {
    return this.jwtService.sign({ ...params })
  }
  issueAdminsToken(params: AdminsTokenInterface): string {
    return this.jwtService.sign({ ...params, isAdmin: true })
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