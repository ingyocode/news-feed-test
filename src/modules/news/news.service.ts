import { In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { NewsEntity } from "src/models/news.entity";
import { CreateNewsParamInterface } from "./interfaces/create-news-param.interface";
import { NewsResponseDto } from "./dtos/responses/news-response.dto";
import { UpdateNewsRequestBodyDto } from "./dtos/requests/update-news-request-body.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async getNewsWithId(newsId: number): Promise<NewsEntity> {
    return this.newsRepository.findOne({
      where: {
        id: newsId,
      }
    });
  }

  async getNewsList(studentId: string, page: number, limit: number): Promise<NewsResponseDto[]> {
    return this.newsRepository.createQueryBuilder('news')
    .select('news.id', 'id')
    .addSelect('news.title', 'title')
    .addSelect('news.content', 'content')
    .addSelect('news.writer_id', 'writerId')
    .addSelect('admins.name', 'writerName')
    .addSelect('news.schoolId', 'schoolId')
    .addSelect('schools.name', 'schoolName')
    .leftJoin('schools', 'schools', 'schools.id = news.school_id AND schools.is_deleted = false')
    .leftJoin('admins', 'admins', 'admins.id = news.writer_id AND admins.is_deleted = false')
    .leftJoin('student_subscribes', 'subscribes', 'subscribes.school_id = schools.id AND subscribes.is_deleted = false AND subscribes.student_id = :studentId', { studentId })
    .offset((page - 1) * limit)
    .limit(limit)
    .orderBy('news.created_at', 'DESC')
    .getRawMany<NewsResponseDto>();
  }

  async createNews(params: CreateNewsParamInterface): Promise<NewsEntity | false> {
    try {
      return await this.newsRepository.save(params);
    } catch (err) {
      return false;
    }
  }

  async updateNews(newsId: number, params: UpdateNewsRequestBodyDto): Promise<boolean> {
    try {
      await this.newsRepository.update({ id: newsId }, { ...params })
      return true;
    } catch (err) {
      return false;
    }
  }

  async deleteNews(newsId: number): Promise<boolean> {
    try {
      await this.newsRepository.update({ id: newsId }, { isDeleted: false })
      return true;
    } catch (err) {
      return false;
    }
  }
}