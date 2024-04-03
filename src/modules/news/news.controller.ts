import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UseAdminsToken } from "src/decorators/admins-token.decorator";
import { UseStudentsToken } from "src/decorators/students-token.decorator";
import { GetNewsRequestQueryDto } from "./dtos/requests/get-news-request.dto";
import { SchoolIdRequestParamDto } from "./dtos/requests/school-id-request-param.dto";
import { SchoolsService } from "../schools/schools.service";
import { StudentsTokenInterface } from "../auth/interfaces/students-token.interface";
import { NewsService } from "./news.service";
import { CreateNewsRequestBodyDto } from "./dtos/requests/create-news-request-body.dto";
import { AdminsTokenInterface } from "../auth/interfaces/admins-token.interface";
import { NewsResponseDto } from "./dtos/responses/news-response.dto";
import { CreateSuccessNewsResponseDto } from "./dtos/responses/create-success-news-response.dto";
import { UpdateNewsRequestBodyDto } from "./dtos/requests/update-news-request-body.dto";
import { SchoolNewsIdRequestParamDto } from "./dtos/requests/school-news-id-request-param.dto";

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly newsService: NewsService,
  ) {}

  @UseStudentsToken()
  @ApiOkResponse({
    type: NewsResponseDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'get news - student', description: 'get news from subscribed schools' })
  @Get()
  async getSchoolNews(
    @Req() req: { user: StudentsTokenInterface },
    @Query() query: GetNewsRequestQueryDto,
  ): Promise<NewsResponseDto[]> {
    const user = req.user;

    return this.newsService.getNewsList(user.id, query.page, query.limit);
  }

  @UseAdminsToken()
  @ApiOkResponse({
    type: CreateSuccessNewsResponseDto,
  })
  @ApiOperation({ summary: 'create news - admin', description: 'create school news' })
  @Post(':schoolId')
  async createSchoolNews(
    @Req() req: { user: AdminsTokenInterface },
    @Param() params: SchoolIdRequestParamDto,
    @Body() body: CreateNewsRequestBodyDto,
  ): Promise<CreateSuccessNewsResponseDto> {
    const admin = { ...req.user };

    const schoolInfo = await this.schoolsService.getSchoolWithId(params.schoolId);
    if(!schoolInfo) {
      throw new HttpException('invalid school id', HttpStatus.BAD_REQUEST);
    }
    if(admin.id !== schoolInfo.adminId) {
      throw new HttpException('can not access this school', HttpStatus.FORBIDDEN);
    }

    const result = await this.newsService.createNews({
      schoolId: params.schoolId,
      writerId: admin.id,
      ...body
    });
    if(!result) {
      throw new HttpException('failed to save news', HttpStatus.CONFLICT);
    }

    return { result };
  }
  
  @UseAdminsToken()
  @ApiOperation({ summary: 'update news - admin', description: 'update school news' })
  @Put(':schoolId/:newsId')
  async editSchoolNews(
    @Req() req: { user: AdminsTokenInterface },
    @Param() params: SchoolNewsIdRequestParamDto,
    @Body() body: UpdateNewsRequestBodyDto,
  ) {
    const admin = { ...req.user };

    const schoolInfo = await this.schoolsService.getSchoolWithId(params.schoolId);
    if(!schoolInfo) {
      throw new HttpException('invalid school id', HttpStatus.BAD_REQUEST);
    }
    if(admin.id !== schoolInfo.adminId) {
      throw new HttpException('can not access this school', HttpStatus.FORBIDDEN);
    }

    if(
      !(await this.newsService.getNewsWithId(params.newsId))
    ) {
      throw new HttpException('invalid news id', HttpStatus.BAD_REQUEST);
    }

    const result = await this.newsService.updateNews(params.newsId, body);
    if(!result) {
      throw new HttpException('failed to update news', HttpStatus.CONFLICT);
    }

    return { result };
  }

  @UseAdminsToken()
  @ApiOperation({ summary: 'delete news - admin', description: 'delete school news' })
  @Delete(':schoolId/:newsId')
  async deleteSchoolNews(
    @Req() req: { user: AdminsTokenInterface },
    @Param() params: SchoolNewsIdRequestParamDto,
  ) {
    const admin = { ...req.user };

    const schoolInfo = await this.schoolsService.getSchoolWithId(params.schoolId);
    if(!schoolInfo) {
      throw new HttpException('invalid school id', HttpStatus.BAD_REQUEST);
    }
    if(admin.id !== schoolInfo.adminId) {
      throw new HttpException('can not access this school', HttpStatus.FORBIDDEN);
    }

    if(
      !(await this.newsService.getNewsWithId(params.newsId))
    ) {
      throw new HttpException('invalid news id', HttpStatus.BAD_REQUEST);
    }

    const result = await this.newsService.deleteNews(params.newsId);
    if(!result) {
      throw new HttpException('failed to delete news', HttpStatus.CONFLICT);
    }

    return { result };
  }

  async getNewsFeed() {}
  async saveNewsFeed() {} // TODO: working in serverless
}