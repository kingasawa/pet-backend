import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UserService } from '@modules/user/user.service';
import { LocationService } from '@modules/location/location.service';
import { UserModule } from '@modules/user/user.module';
import { LocationModule } from '@modules/location/location.module';
import { CategoryModule } from '@modules/category/category.module';
import { DatabaseModule } from '@modules/database/db.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '@modules/mailer/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    LocationModule,
    CategoryModule,
    DatabaseModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
