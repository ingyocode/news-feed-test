import { Module } from "@nestjs/common";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentsEntity } from "src/models/students.entity";
import { AuthModule } from "../auth/auth.module";
import { StudentsStrategy } from "src/guards/students.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsEntity]),

    AuthModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsStrategy],
  exports: [StudentsService]
})
export class StudentsModule {}