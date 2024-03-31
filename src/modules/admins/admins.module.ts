import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminsEntity } from "src/models/admins.entity";
import { AdminsService } from "./admins.service";
import { AdminsController } from "./admins.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminsEntity]),
    AuthModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService]
})
export class AdminsMoudle {}