import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "src/models/news.entity";
import { SchoolsModule } from "../schools/schools.module";
import { NewsFeedsModule } from "../\bnews-feeds/news-feeds.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    SchoolsModule,
    NewsFeedsModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService]
})
export class NewsModule {}