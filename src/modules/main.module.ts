import { Module } from '@nestjs/common';

import { AdminsMoudle } from './admins/admins.module';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    AdminsMoudle,
    SchoolsModule,
    StudentsModule
  ],
})
export class MainModule {}
