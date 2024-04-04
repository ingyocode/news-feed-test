import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentsService } from "./students.service";
import { StudentsEntity } from "src/models/students.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentsEntity]),
  ],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}