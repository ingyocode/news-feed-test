import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { UseStudentsToken } from "src/decorators/students-token.decorator";
import { UseAdminsToken } from "src/decorators/admins-token.decorator";
import { SchoolsEntity } from "src/models/schools.entity";
import { StudentsTokenInterface } from "../auth/interfaces/students-token.interface";
import { AdminsTokenInterface } from "../auth/interfaces/admins-token.interface";
import { SchoolsService } from "./schools.service";
import { SubscribeSchoolRequestBodyDto } from "./dtos/requests/subscribe-school-request.dto";

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
  ) {}
  
  @UseStudentsToken()
  @ApiOperation({ summary: 'get subscribed school list - students', description: 'get my subscribed schools' })
  @Get('subscribe')
  async getSchoolList(
    @Req() req: { user: StudentsTokenInterface },
  ) {
    console.log(req.user)
  }

  @UseStudentsToken()
  @ApiOperation({ summary: 'subscribe school - student', description: 'subscribe school' })
  @Post('subscribe')
  async subscribeSchool(
    @Req() req: { user: StudentsTokenInterface },
    @Body() body: SubscribeSchoolRequestBodyDto,
  ): Promise<SchoolsEntity[]> {
    const existedSubscribe = await this.schoolsService.getSubscribedSchool(req.user.id ,body.schoolId);
    if (existedSubscribe) {
      throw new HttpException('already subscribe this school', HttpStatus.BAD_REQUEST);
    }

    if(
      await this.schoolsService.subscribeSchool(req.user.id ,body.schoolId)
    ) {
      throw new HttpException('failed to save subscribe data', HttpStatus.CONFLICT);
    }

    return await this.schoolsService.getSubscribedSchoolList(req.user.id);
  }
  
  @UseAdminsToken()
  @ApiOperation({ summary: 'create school page - admin', description: 'create school page' })
  @Post('school')
  async createSchoolPage(
    @Req() req: { user: AdminsTokenInterface }
  ) {
    console.log(req.user)
  }
  
  async createSchoolNews() {}
  async editSchoolNews() {}
  async deleteSchoolNews() {}
}