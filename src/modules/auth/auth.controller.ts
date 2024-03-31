import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  @Post('students/sign-in')
  async studentsSignIn() {}

  @Post('students/sign-up')
  async studentsSignUp() {}

  @Post('admins/sign-in')
  async adminsSignIn() {}

  @Post('admins/sign-up')
  async adminsSignUp() {}
}