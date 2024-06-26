import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuardStrategy } from 'src/commons/admin-strategy-const';

export const UseAdminsToken = () =>
  applyDecorators(UseGuards(AuthGuard(AdminGuardStrategy)), ApiBearerAuth());
