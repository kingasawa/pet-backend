import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UserService } from '@modules/user/user.service';
import { UserModule } from '@modules/user/user.module';
import { LocationModule } from '@modules/location/location.module';
import { CategoryModule } from '@modules/category/category.module';
import { DatabaseModule } from '@modules/database/db.module';
import { ConfigModule } from '@nestjs/config';
import { EventGateway } from '@modules/socket/event.gateway'
import { AssemblyService } from '@modules/services/assembly.service';
import { MailModule } from '@modules/mailer/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    LocationModule,
    CategoryModule,
    DatabaseModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AssemblyService, EventGateway],
})
export class AppModule {}
