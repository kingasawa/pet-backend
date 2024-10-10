import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        // extra: process.env.CLOUD_SQL_INSTANT_NAME || 'ceremonial-team-424503-u1:asia-northeast1:nestjs-10-sql',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        subscribers: [],
      }),
    }),
  ],
})
export class DatabaseModule {}