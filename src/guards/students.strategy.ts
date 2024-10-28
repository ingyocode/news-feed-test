/* eslint-disable max-classes-per-file */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StudentGuardStrategy } from 'src/commons/student-strategy-const';

import { StudentsTokenInterface } from 'src/modules/auth/interfaces/students-token.interface';

@Injectable()
export class StudentsStrategy extends PassportStrategy(
  Strategy,
  StudentGuardStrategy,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secretKey'),
    });
  }

  async validate(token: StudentsTokenInterface) {
    try {
      if (token.isAdmin) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const user = {
        id: token.id,
        email: token.email,
        name: token.name,
      };
      return user;
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
