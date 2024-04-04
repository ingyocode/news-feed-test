/* eslint-disable max-classes-per-file */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminGuardStrategy } from 'src/commons/admin-strategy-const';
import { AdminsTokenInterface } from 'src/modules/auth/interfaces/admins-token.interface';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, AdminGuardStrategy) {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secretKey')
    });
  }

  async validate(token: AdminsTokenInterface) {
    try {
      if(!token.isAdmin) {
        throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
      }

      const user = {
        id: token.id,
        email: token.email,
        name: token.name,
        isAdmin: token.isAdmin,
      };
      return user;
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
