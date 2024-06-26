import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UseStudentsToken } from 'src/decorators/students-token.decorator';
import { UseAdminsToken } from 'src/decorators/admins-token.decorator';
import { SchoolsEntity } from 'src/models/schools.entity';
import { StudentsTokenInterface } from '../auth/interfaces/students-token.interface';
import { AdminsTokenInterface } from '../auth/interfaces/admins-token.interface';
import { SchoolsService } from './schools.service';
import { SubscribeSchoolRequestParamDto } from './dtos/requests/subscribe-school-request.dto';
import { CreateSchoolRequestDto } from './dtos/requests/create-school-request.dto';
import { SchoolInfoResponseDto } from './dtos/responses/school-response.dto';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @UseStudentsToken()
  @ApiOkResponse({
    type: SchoolInfoResponseDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'get subscribed school list - students',
    description: 'get my subscribed schools',
  })
  @Get('subscribe')
  async getSchoolList(
    @Req() req: { user: StudentsTokenInterface },
  ): Promise<SchoolsEntity[]> {
    const user = { ...req.user };

    return await this.schoolsService.getUserSubscribedSchoolList(user.id);
  }

  @UseStudentsToken()
  @ApiOkResponse({
    type: SchoolInfoResponseDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'subscribe school - student',
    description: 'subscribe school',
  })
  @Post('subscribe/:schoolId')
  async subscribeSchool(
    @Req() req: { user: StudentsTokenInterface },
    @Param() param: SubscribeSchoolRequestParamDto,
  ): Promise<SchoolsEntity[]> {
    const user = { ...req.user };

    const existedSubscribe = await this.schoolsService.getSubscribedSchool(
      user.id,
      param.schoolId,
    );
    if (existedSubscribe) {
      throw new HttpException(
        'already subscribe this school',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!(await this.schoolsService.subscribeSchool(user.id, param.schoolId))) {
      throw new HttpException(
        'failed to save subscribe data',
        HttpStatus.CONFLICT,
      );
    }

    return await this.schoolsService.getUserSubscribedSchoolList(user.id);
  }

  @UseStudentsToken()
  @ApiOkResponse({
    type: SchoolInfoResponseDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'cancel subscribe school - student',
    description: 'cancel subscribe school',
  })
  @Delete('subscribe/:schoolId')
  async cancelSubscribeSchool(
    @Req() req: { user: StudentsTokenInterface },
    @Param() param: SubscribeSchoolRequestParamDto,
  ): Promise<SchoolsEntity[]> {
    const user = { ...req.user };
    if (
      !(await this.schoolsService.getSubscribedSchool(user.id, param.schoolId))
    ) {
      throw new HttpException(
        'can not find this subscribe',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.schoolsService.cancelSubscribe(user.id, param.schoolId);
    return await this.schoolsService.getUserSubscribedSchoolList(user.id);
  }

  @UseAdminsToken()
  @ApiOkResponse({
    type: SchoolInfoResponseDto,
  })
  @ApiOperation({
    summary: 'create school page - admin',
    description: 'create school page',
  })
  @Post('school')
  async createSchoolPage(
    @Req() req: { user: AdminsTokenInterface },
    @Body() body: CreateSchoolRequestDto,
  ): Promise<SchoolsEntity> {
    const admin = { ...req.user };
    const existedSchool = await this.schoolsService.getSchool(
      body.region,
      body.name,
    );
    if (existedSchool) {
      throw new HttpException(
        'already existed school page',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !(await this.schoolsService.createSchool(
        body.region,
        body.name,
        admin.id,
      ))
    ) {
      throw new HttpException(
        'failed to save school page',
        HttpStatus.CONFLICT,
      );
    }
    return await this.schoolsService.getSchool(body.region, body.name);
  }
}
