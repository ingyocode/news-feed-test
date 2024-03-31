import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { AuthService } from "../auth/auth.service";
import { AdminsSignInRequestDto } from "./dtos/requests/admins-sign-in-request.dto";
import { AdminsSignUpRequestDto } from "./dtos/requests/admins-sign-up-request.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminsSignInResponseDto } from "./dtos/responses/admins.sign-in-response.dto";

@ApiTags('admins')
@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'admin sign in', description: 'admin sign in' })
  @ApiOkResponse({
    status: 201,
    type: AdminsSignInResponseDto
  })
  @Post('admins/sign-in')
  async adminsSignIn(
    @Body() body: AdminsSignInRequestDto,
  ): Promise<AdminsSignInResponseDto> {
    const admin = await this.adminsService.getAdmin(body.email);
    if(!admin) {
      throw new HttpException('can not find admin', HttpStatus.BAD_REQUEST);
    }

    const requestPassword = this.authService.hashPassword(body.password ,admin.salt);
    if(requestPassword.password !== admin.password) {
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
      }),
    }
  }

  @ApiOperation({ summary: 'admin sign up', description: 'create admin' })
  @ApiOkResponse({
    status: 201,
    type: AdminsSignInResponseDto
  })
  @Post('admins/sign-up')
  async adminsSignUp(
    @Body() body: AdminsSignUpRequestDto,
  ): Promise<AdminsSignInResponseDto> {
    const existedAdmin = await this.adminsService.getAdmin(body.email);
    if(existedAdmin) {
      throw new HttpException('already use this email', HttpStatus.BAD_REQUEST);
    }

    const result = await this.adminsService.createAdmin({
      email: body.email,
      name: body.name,
      password: body.password,
    });
    if(!result) {
      throw new HttpException('failed to save student info', HttpStatus.CONFLICT);
    }

    const admin = await this.adminsService.getAdmin(body.email);

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      token: this.authService.issueAdminsToken({
        id: admin.id,
        email: admin.email,
        name: admin.name
      }),
    }
  }
}