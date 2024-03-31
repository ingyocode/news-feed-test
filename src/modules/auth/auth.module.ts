import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GlobalJwtModule } from "./jwt-config.module";

@Module({
  imports: [GlobalJwtModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}