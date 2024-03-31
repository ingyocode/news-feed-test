import { Controller, Post } from "@nestjs/common";

@Controller('admins')
export class AdminsController {
  constructor() {}

  @Post('admins/sign-up')
  async adminsSignUp() {}
}