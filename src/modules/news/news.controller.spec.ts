import { HttpException, HttpStatus } from "@nestjs/common";
import { AdminsTokenInterface } from "../auth/interfaces/admins-token.interface";
import { SchoolsService } from "../schools/schools.service";
import { CreateNewsRequestBodyDto } from "./dtos/requests/create-news-request-body.dto";
import { SchoolIdRequestParamDto } from "./dtos/requests/school-id-request-param.dto";
import { NewsController } from "./news.controller";
import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from "./news.service";
import { SchoolsModule } from "../schools/schools.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "src/models/news.entity";
import { SchoolsEntity } from "src/models/schools.entity";
import { DatabaseConfigModule } from "../databases/databases.module";
import { GlobalConfigModule } from "../configs/global-config.module";
import { StudentSubscribesEntity } from "src/models/student-subscribes.entity";
import { CreateSuccessNewsResponseDto } from "./dtos/responses/create-success-news-response.dto";
import { SchoolNewsIdRequestParamDto } from "./dtos/requests/school-news-id-request-param.dto";
import { UpdateNewsRequestBodyDto } from "./dtos/requests/update-news-request-body.dto";

describe('NewsController Test', () => {
  let newsController: NewsController;
  let schoolsService: SchoolsService;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GlobalConfigModule,
        DatabaseConfigModule,
        TypeOrmModule.forFeature([
          NewsEntity,
          SchoolsEntity,
          StudentSubscribesEntity,
        ]),
      ],
      controllers: [NewsController],
      providers: [
        NewsService,
        SchoolsService,
      ],
    }).compile();

    newsController = module.get<NewsController>(NewsController);
    schoolsService = module.get<SchoolsService>(SchoolsService);
    newsService = module.get<NewsService>(NewsService);
  });

   describe('POST /news/:schoolId', () => {
    const decodedToken: { user:AdminsTokenInterface } = { 
      user: { 
        id: 'adminId',
        email: 'admin@gmail.com', 
        name: 'testAdmin', 
        isAdmin: true 
      }
    };
    const exampleRequestBody: CreateNewsRequestBodyDto = {
      title: 'testTitle',
      content: 'testContent',
    };
    const exampleRequestParams:SchoolIdRequestParamDto = {
      schoolId: 1,
    };

    it('request invalid school id', async () => {
      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await newsController.createSchoolNews(decodedToken, exampleRequestParams, exampleRequestBody);
      }).rejects.toThrow(
        new HttpException('invalid school id', HttpStatus.BAD_REQUEST),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
    });

    it('request from unauthorized users', async () => {
      const exampleSchoolInfo: SchoolsEntity = {
        id: 0,
        adminId: "wrongAdminId",
        region: "testRegion",
        name: "testName",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);

      await expect(async () => {
        await newsController.createSchoolNews(decodedToken, exampleRequestParams,exampleRequestBody);
      }).rejects.toThrow(
        new HttpException('can not access this school', HttpStatus.FORBIDDEN),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
    });

    it('failed to save news', async () => {
      const exampleSchoolInfo: SchoolsEntity = {
        id: 0,
        adminId: decodedToken.user.id,
        region: "testRegion",
        name: "testName",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceCreateNewsSpy = jest
        .spyOn(newsService, 'createNews')
        .mockResolvedValue(false);

      await expect(async () => {
        await newsController.createSchoolNews(decodedToken, exampleRequestParams,exampleRequestBody);
      }).rejects.toThrow(
        new HttpException('failed to save news', HttpStatus.CONFLICT),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceCreateNewsSpy).toHaveBeenCalled();
    });

    it('success to save news', async () => {
      const exampleSchoolInfo: SchoolsEntity = {
        id: 0,
        adminId: decodedToken.user.id,
        region: "testRegion",
        name: "testName",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const successResponse:CreateSuccessNewsResponseDto = { result: true };

      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceCreateNewsSpy = jest
        .spyOn(newsService, 'createNews')
        .mockResolvedValue(true);

      const result = await newsController.createSchoolNews(decodedToken, exampleRequestParams,exampleRequestBody);

      expect(result).toEqual(successResponse)
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceCreateNewsSpy).toHaveBeenCalled();
    });
  });

  describe('PUT /news/:schoolId/:newsId', () => {
    const decodedToken: { user:AdminsTokenInterface } = { 
      user: { 
        id: 'adminId',
        email: 'admin@gmail.com', 
        name: 'testAdmin', 
        isAdmin: true 
      }
    };
    const exampleRequestBody: UpdateNewsRequestBodyDto = {
      title: 'testTitle',
      content: 'testContent',
    };
    const exampleRequestParams:SchoolNewsIdRequestParamDto = {
      schoolId: 1,
      newsId: 1,
    };
    const exampleSchoolInfo: SchoolsEntity = {
      id: 0,
      adminId: decodedToken.user.id,
      region: "testRegion",
      name: "testName",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const exampleNewsInfo: NewsEntity = {
      id: 0,
      schoolId: 1,
      writerId: "testAdmin",
      title: "testNews",
      content: "testContent",
      isDeleted: false,
      createdAt: undefined,
      updatedAt: undefined
    }

    it('request invalid school id', async () => {
      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await newsController.editSchoolNews(decodedToken, exampleRequestParams, exampleRequestBody);
      }).rejects.toThrow(
        new HttpException('invalid school id', HttpStatus.BAD_REQUEST),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
    });

    it('request from unauthorized users', async () => {
      const exampleWrongSchoolInfo: SchoolsEntity = {
        id: 0,
        adminId: "wrongAdminId",
        region: "testRegion",
        name: "testName",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleWrongSchoolInfo);

      await expect(async () => {
        await newsController.editSchoolNews(decodedToken, exampleRequestParams,exampleRequestBody);
      }).rejects.toThrow(
        new HttpException('can not access this school', HttpStatus.FORBIDDEN),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
    });

    it('invalid news id', async () => {
      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceGetNewsWithIdSpy = jest
      .spyOn(newsService, 'getNewsWithId')
      .mockResolvedValue(undefined);

      await expect(async () => {
        await newsController.editSchoolNews(decodedToken, exampleRequestParams,exampleRequestBody);
      }).rejects.toThrow(
        new HttpException('invalid news id', HttpStatus.BAD_REQUEST),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceGetNewsWithIdSpy).toHaveBeenCalled();
    });

    it('failed to update news', async () => {
      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceGetNewsWithIdSpy = jest
        .spyOn(newsService, 'getNewsWithId')
        .mockResolvedValue(exampleNewsInfo);
      const newsServiceUpdateSpy = jest
        .spyOn(newsService, 'updateNews')
        .mockResolvedValue(false);

      await expect(async () => {
        await newsController.editSchoolNews(decodedToken, exampleRequestParams,exampleRequestBody);
      }).rejects.toThrow(
        new HttpException('failed to update news', HttpStatus.CONFLICT),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceUpdateSpy).toHaveBeenCalled();
      expect(newsServiceGetNewsWithIdSpy).toHaveBeenCalled();
    });

    it('success to update news', async () => {
      const successResponse:CreateSuccessNewsResponseDto = { result: true };

      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceGetNewsWithIdSpy = jest
        .spyOn(newsService, 'getNewsWithId')
        .mockResolvedValue(exampleNewsInfo);
        const newsServiceUpdateSpy = jest
        .spyOn(newsService, 'updateNews')
        .mockResolvedValue(true);


      const result = await newsController.editSchoolNews(decodedToken, exampleRequestParams,exampleRequestBody);

      expect(result).toEqual(successResponse)
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceUpdateSpy).toHaveBeenCalled();
      expect(newsServiceGetNewsWithIdSpy).toHaveBeenCalled();
    });
  });

  describe('DELETE /news/:schoolId/:newsId', () => {
    const decodedToken: { user:AdminsTokenInterface } = { 
      user: { 
        id: 'adminId',
        email: 'admin@gmail.com', 
        name: 'testAdmin', 
        isAdmin: true 
      }
    };
    const exampleRequestParams:SchoolNewsIdRequestParamDto = {
      schoolId: 1,
      newsId: 1,
    };
    const exampleSchoolInfo: SchoolsEntity = {
      id: 0,
      adminId: decodedToken.user.id,
      region: "testRegion",
      name: "testName",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const exampleNewsInfo: NewsEntity = {
      id: 0,
      schoolId: 1,
      writerId: "testAdmin",
      title: "testNews",
      content: "testContent",
      isDeleted: false,
      createdAt: undefined,
      updatedAt: undefined
    }

    it('request invalid school id', async () => {
      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(undefined);

      await expect(async () => {
        await newsController.deleteSchoolNews(decodedToken, exampleRequestParams,);
      }).rejects.toThrow(
        new HttpException('invalid school id', HttpStatus.BAD_REQUEST),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
    });

    it('request from unauthorized users', async () => {
      const exampleWrongSchoolInfo: SchoolsEntity = {
        id: 0,
        adminId: "wrongAdminId",
        region: "testRegion",
        name: "testName",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleWrongSchoolInfo);

      await expect(async () => {
        await newsController.deleteSchoolNews(decodedToken, exampleRequestParams);
      }).rejects.toThrow(
        new HttpException('can not access this school', HttpStatus.FORBIDDEN),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
    });

    it('invalid news id', async () => {
      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceGetNewsWithIdSpy = jest
      .spyOn(newsService, 'getNewsWithId')
      .mockResolvedValue(undefined);

      await expect(async () => {
        await newsController.deleteSchoolNews(decodedToken, exampleRequestParams);
      }).rejects.toThrow(
        new HttpException('invalid news id', HttpStatus.BAD_REQUEST),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceGetNewsWithIdSpy).toHaveBeenCalled();
    });

    it('failed to delete news', async () => {
      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceGetNewsWithIdSpy = jest
        .spyOn(newsService, 'getNewsWithId')
        .mockResolvedValue(exampleNewsInfo);
      const newsServiceDeleteSpy = jest
        .spyOn(newsService, 'deleteNews')
        .mockResolvedValue(false);

      await expect(async () => {
        await newsController.deleteSchoolNews(decodedToken, exampleRequestParams);
      }).rejects.toThrow(
        new HttpException('failed to delete news', HttpStatus.CONFLICT),
      );
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceDeleteSpy).toHaveBeenCalled();
      expect(newsServiceGetNewsWithIdSpy).toHaveBeenCalled();
    });

    it('success to delete news', async () => {
      const successResponse:CreateSuccessNewsResponseDto = { result: true };

      const schoolsServicegetSchoolWithIdSpy = jest
        .spyOn(schoolsService, 'getSchoolWithId')
        .mockResolvedValue(exampleSchoolInfo);
      const newsServiceGetNewsWithIdSpy = jest
        .spyOn(newsService, 'getNewsWithId')
        .mockResolvedValue(exampleNewsInfo);
        const newsServiceDeleteSpy = jest
        .spyOn(newsService, 'deleteNews')
        .mockResolvedValue(true);


      const result = await newsController.deleteSchoolNews(decodedToken, exampleRequestParams);

      expect(result).toEqual(successResponse)
      expect(schoolsServicegetSchoolWithIdSpy).toHaveBeenCalled();
      expect(newsServiceDeleteSpy).toHaveBeenCalled();
      expect(newsServiceGetNewsWithIdSpy).toHaveBeenCalled();
    });
  });
});
