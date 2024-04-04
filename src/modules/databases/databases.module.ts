import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('typeorm.host') || 'localhost',
        port: +configService.get('typeorm.port') || 3306,
        database: configService.get('typeorm.database') || 'tempDb',
        username: configService.get('typeorm.username') || 'root',
        password: configService.get('typeorm.password') || 'tempPassword',
        logging: Boolean(configService.get('typeorm.logging')) || true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [__dirname + '/../../**/*.entity.{js,ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
