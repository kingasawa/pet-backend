import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import process from 'node:process';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        // extra: process.env.CLOUD_SQL_INSTANT_NAME || 'ceremonial-team-424503-u1:asia-northeast1:nestjs-10-sql',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        subscribers: [],
      }),
    }),
  ],
})
export class DatabaseModule {}