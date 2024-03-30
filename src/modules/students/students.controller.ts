import { Controller, Get } from "@nestjs/common";

@Controller('students')
export class StudentsController {
  constructor() {}

  async getSchoolList() {}
  async getSchoolNews() {}
  async subscribe() {}
  async cancelSubscribe() {}

  async getNewsFeed() {}
  async saveNewsFeed() {} // TODO: working in serverless. Cron?
}