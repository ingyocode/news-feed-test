import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { StudentsSignInRequestDto } from "./dtos/requests/students-sign-in-request.dto";
import { StudentsService } from "./students.service";
import { AuthService } from "../auth/auth.service";
import { StudentsSignInResponseDto } from "./dtos/responses/students.sign-in-response.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { StudentsSignUpRequestDto } from "./dtos/requests/students-sign-up-request.dto";
import { StudentsTokenInterface } from "../auth/interfaces/students-token.interface";
import { UseStudentsToken } from "src/decorators/students-token.decorator";

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'student user sign in', description: 'student sign in' })
  @ApiOkResponse({
    status: 201,
    type: StudentsSignInResponseDto,
  })
  @Post('auth/sign-in')
  async studentsSignIn(
    @Body() body: StudentsSignInRequestDto,
  ): Promise<StudentsSignInResponseDto> {
    const student = await this.studentsService.getStudent(body.email);
    if(!student) {
      throw new HttpException('can not find user', HttpStatus.BAD_REQUEST);
    }

    const requestPassword = this.authService.hashPassword(body.password ,student.salt);
    if(requestPassword.password !== student.password) {
      throw new HttpException('can not find user', HttpStatus.BAD_REQUEST);
    }

    if(
      !(await this.studentsService.updateLastLoginedAt(student.id))
    ) {
      throw new HttpException('failed to update user info', HttpStatus.CONFLICT)
    }

    return {
      id: student.id,
      email: student.email,
      name: student.name,
      token: this.authService.issueStudentsToken({
        id: student.id,
        email: student.email,
        name: student.name
      }),
    }
  }

  @ApiOperation({ summary: 'student user sign up', description: 'create student' })
  @ApiOkResponse({
    status: 201,
    type: StudentsSignInResponseDto,
  })
  @Post('auth/sign-up')
  async studentsSignUp(
    @Body() body: StudentsSignUpRequestDto,
  ): Promise<StudentsSignInResponseDto> {
    const existedStudent = await this.studentsService.getStudent(body.email);
    if(existedStudent) {
      throw new HttpException('already use this email', HttpStatus.BAD_REQUEST);
    }

    const result = await this.studentsService.createStudent({
      email: body.email,
      name: body.name,
      password: body.password,
    });
    if(!result) {
      throw new HttpException('failed to save student info', HttpStatus.CONFLICT);
    }

    const student = await this.studentsService.getStudent(body.email);

    return {
      id: student.id,
      email: student.email,
      name: student.name,
      token: this.authService.issueStudentsToken({
        id: student.id,
        email: student.email,
        name: student.name
      }),
    }
  }

  // news
  async getSchoolNews() {}
  async getNewsFeed() {}
  async saveNewsFeed() {} // TODO: working in serverless. Cron?
}