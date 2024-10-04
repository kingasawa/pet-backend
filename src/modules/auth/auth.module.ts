import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { MailModule } from '@modules/mailer/mail.module';

@Module({
  imports: [
    UserModule,
    MailModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
