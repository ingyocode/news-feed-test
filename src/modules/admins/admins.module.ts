import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsEntity } from 'src/models/admins.entity';
import { AdminsService } from './admins.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsEntity])],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsMoudle {}
