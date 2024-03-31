import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfiguration } from './index';


@Module({
  imports: [
    forwardRef(() =>
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
        load: [DataBaseConfiguration],
      }),
    ),
  ],
})
export class GlobalConfigModule {}
