import { applyDecorators, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { StudentGuardStrategy } from "src/commons/student-strategy-const";

export const UseStudentsToken = () =>
  applyDecorators(
    UseGuards(AuthGuard(StudentGuardStrategy)),
    ApiBearerAuth(),
  );
