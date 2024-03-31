import { Module } from '@nestjs/common';

import { AdminsMoudle } from './admins/admins.module';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { DatabaseConfigModule } from './databases/databases.module';
import { GlobalConfigModule } from './configs/global-config.module';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseConfigModule,

    AdminsMoudle,
    SchoolsModule,
    StudentsModule
  ],
})
export class MainModule {}
