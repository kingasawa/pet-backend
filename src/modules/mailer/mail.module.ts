import { Module } from '@nestjs/common';
// import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as process from 'node:process';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'trancatkhanh280483@gmail.com',
          pass: 'pwmwgnxrctaqrtsc',
        },
      },
      defaults: {
        from: '"Bot Talk Application" <no-reply@simplecode.online',
      },
      template: {
        dir: join(process.cwd(), 'src/modules/mailer/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
