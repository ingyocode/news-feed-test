import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminsService } from '../admins/admins.service';
import { AdminsSignInRequestDto } from './dtos/requests/auth-admins-sign-in-request.dto';

import { AdminsSignInResponseDto } from './dtos/responses/auth-admins-sign-in-response.dto';
import { AuthService } from './auth.service';
import { StudentsService } from '../students/students.service';
import { StudentsSignInRequestDto } from './dtos/requests/auth-students-sign-in-request.dto';
import { StudentsSignUpRequestDto } from './dtos/requests/auth-students-sign-up-request.dto';
import { StudentsSignInResponseDto } from './dtos/responses/auth-students-sign-in-response.dto';
import { AdminsSignUpRequestDto } from './dtos/requests/auth-admins-sign-up-request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
    private readonly studentsService: StudentsService,
  ) {}

  @ApiOperation({ summary: 'admin sign in', description: 'admin sign in' })
  @ApiOkResponse({
    status: 201,
    type: AdminsSignInResponseDto,
  })
  @Post('admin/sign-in')
  async adminsSignIn(
    @Body() body: AdminsSignInRequestDto,
  ): Promise<AdminsSignInResponseDto> {
    const admin = await this.adminsService.getAdmin(body.email);
    if (!admin) {
      throw new HttpException('can not find admin', HttpStatus.BAD_REQUEST);
    }

    const requestPassword = this.adminsService.hashPassword(
      body.password,
      admin.salt,
    );
    if (requestPassword.password !== admin.password) {
      throw new HttpException('can not find admin', HttpStatus.BAD_REQUEST);
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      token: this.authService.issueAdminsToken({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        isAdmin: true,
      }),
    };
  }

  @ApiOperation({ summary: 'admin sign up', description: 'create admin' })
  @ApiOkResponse({
    status: 201,
    type: AdminsSignInResponseDto,
  })
  @Post('admin/sign-up')
  async adminsSignUp(
    @Body() body: AdminsSignUpRequestDto,
  ): Promise<AdminsSignInResponseDto> {
    const existedAdmin = await this.adminsService.getAdmin(body.email);
    if (existedAdmin) {
      throw new HttpException('already use this email', HttpStatus.BAD_REQUEST);
    }

    const result = await this.adminsService.createAdmin({
      email: body.email,
      name: body.name,
      password: body.password,
    });
    if (!result) {
      throw new HttpException('failed to save admin info', HttpStatus.CONFLICT);
    }

    const admin = await this.adminsService.getAdmin(body.email);

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      token: this.authService.issueAdminsToken({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        isAdmin: true,
      }),
    };
  }

  @ApiOperation({
    summary: 'student user sign in',
    description: 'student sign in',
  })
  @ApiOkResponse({
    status: 201,
    type: StudentsSignInResponseDto,
  })
  @Post('students/sign-in')
  async studentsSignIn(
    @Body() body: StudentsSignInRequestDto,
  ): Promise<StudentsSignInResponseDto> {
    const student = await this.studentsService.getStudent(body.email);
    if (!student) {
      throw new HttpException('can not find user', HttpStatus.BAD_REQUEST);
    }

    const requestPassword = this.studentsService.hashPassword(
      body.password,
      student.salt,
    );
    if (requestPassword.password !== student.password) {
      throw new HttpException('can not find user', HttpStatus.BAD_REQUEST);
    }

    if (!(await this.studentsService.updateLastLoginedAt(student.id))) {
      throw new HttpException(
        'failed to update user info',
        HttpStatus.CONFLICT,
      );
    }

    return {
      id: student.id,
      email: student.email,
      name: student.name,
      token: this.authService.issueStudentsToken({
        id: student.id,
        email: student.email,
        name: student.name,
      }),
    };
  }

  @ApiOperation({
    summary: 'student user sign up',
    description: 'create student',
  })
  @ApiOkResponse({
    status: 201,
    type: StudentsSignInResponseDto,
  })
  @Post('students/sign-up')
  async studentsSignUp(
    @Body() body: StudentsSignUpRequestDto,
  ): Promise<StudentsSignInResponseDto> {
    const existedStudent = await this.studentsService.getStudent(body.email);
    if (existedStudent) {
      throw new HttpException('already use this email', HttpStatus.BAD_REQUEST);
    }

    const result = await this.studentsService.createStudent({
      email: body.email,
      name: body.name,
      password: body.password,
    });
    if (!result) {
      throw new HttpException(
        'failed to save student info',
        HttpStatus.CONFLICT,
      );
    }

    const student = await this.studentsService.getStudent(body.email);

    return {
      id: student.id,
      email: student.email,
      name: student.name,
      token: this.authService.issueStudentsToken({
        id: student.id,
        email: student.email,
        name: student.name,
      }),
    };
  }
}
