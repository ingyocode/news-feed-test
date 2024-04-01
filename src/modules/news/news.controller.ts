import { Controller } from "@nestjs/common";

@Controller('news')
export class NewsController {
  constructor() {}

  async getSchoolNews() {}
  async getNewsFeed() {}
  async saveNewsFeed() {} // TODO: working in serverless. Cron?
}