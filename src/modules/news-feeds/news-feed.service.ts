import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsFeedsEntity } from 'src/models/news-feeds.entity';
import { NewsEntity } from 'src/models/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsFeedsService {
  constructor(
    @InjectRepository(NewsFeedsEntity)
    private readonly newsFeedsRepository: Repository<NewsFeedsEntity>,
  ) {}

  async getNewsFeeds(
    studentId: string,
    page: number,
    limit: number,
  ): Promise<NewsEntity[]> {
    return this.newsFeedsRepository
      .createQueryBuilder('news_feeds')
      .select('news.id', 'id')
      .addSelect('news.school_id', 'schoolId')
      .addSelect('news.writer_id', 'writerId')
      .addSelect('news.title', 'title')
      .addSelect('news.content', 'content')
      .addSelect('news.is_deleted', 'isDeleted')
      .addSelect('news.created_at', 'createdAt')
      .leftJoin(
        'news',
        'news',
        'news.id = news_feeds.news_id AND news.is_deleted = false',
      )
      .where('news_feeds.student_id = :studentId', { studentId })
      .offset((page - 1) * limit)
      .limit(limit)
      .orderBy('news.created_at', 'DESC')
      .getRawMany<NewsEntity>();
  }

  async saveNewsFeeds(studentIds: string[], newsId: number): Promise<boolean> {
    try {
      await this.newsFeedsRepository.save(
        studentIds.map((studentId) => {
          return {
            studentId,
            newsId,
          };
        }),
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
