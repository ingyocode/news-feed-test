import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { SchoolsEntity } from 'src/models/schools.entity';
import { StudentSubscribesEntity } from 'src/models/student-subscribes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolsEntity, StudentSubscribesEntity])],
  controllers: [SchoolsController],
  providers: [SchoolsService],
  exports: [SchoolsService],
})
export class SchoolsModule {}
