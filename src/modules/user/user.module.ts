import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@modules/user/user.service';
import UserEntity from '@modules/database/entities/user.entity';
import { UserController } from '@modules/user/user.controller';
import { MailModule } from '@modules/mailer/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
