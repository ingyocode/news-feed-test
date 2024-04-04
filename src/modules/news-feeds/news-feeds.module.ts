import { Module } from "@nestjs/common";
import { NewsFeedsService } from "./news-feed.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsFeedsEntity } from "src/models/news-feeds.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsFeedsEntity,
    ]),
  ],
  providers: [NewsFeedsService],
  exports: [NewsFeedsService]
})
export class NewsFeedsModule {}