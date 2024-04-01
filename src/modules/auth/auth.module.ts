import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GlobalJwtModule } from "./jwt-config.module";
import { AuthController } from "./auth.controller";
import { AdminsMoudle } from "../admins/admins.module";
import { StudentsModule } from "../students/students.module";
import { AdminStrategy } from "src/guards/admins.strategy";
import { StudentsStrategy } from "src/guards/students.strategy";

@Module({
  imports: [GlobalJwtModule, AdminsMoudle, StudentsModule],
  controllers: [AuthController],
  providers: [AuthService, AdminStrategy, StudentsStrategy],
  exports: [AuthService]
})
export class AuthModule {}