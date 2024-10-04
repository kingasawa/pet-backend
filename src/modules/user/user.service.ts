import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '@modules/database/entities/user.entity';
import { encrypt } from '@shared/common/helper';
import { ERROR_MESSAGES } from '@shared/common/constants';
import { MailService } from '@modules/mailer/mail.service';
import userEntity from '@modules/database/entities/user.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private mailService: MailService,
    private configService: ConfigService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async fetchUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      }
    });
  }

  public async register(payload: UserEntity): Promise<any> {
    const checkExisting = await this.fetchUser(payload.email);
    if (checkExisting) {
      return {
        error: true,
        user: {},
        message: 'Email này đã được đăng ký',
      };
    }
    payload.password = encrypt(payload.password);
    const UserEntity: UserEntity = this.userRepository.create(payload);
    await this.userRepository.save(UserEntity)
    delete UserEntity.password;
    return {
      error: false,
      user: UserEntity,
      message: 'Success',
    };
  }

  public async deleteUser(id: number): Promise<UserEntity> {
    const userEntity: UserEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    await this.userRepository.softDelete(id);
    return userEntity;
  }

  public async updateUserDetail(payload: any): Promise<UserEntity> {
    const checkExisting: UserEntity = await this.userRepository.findOne({ where: { id: payload.id } });
    if (!checkExisting) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    const userEntity = <UserEntity>(<unknown>{
      ...payload,
    });
    await this.userRepository.save(userEntity);
    return userEntity;
  }

  public async selfUpdate(payload: any): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({ where: { email: payload.email } });
    Object.assign(user, payload);
    return await this.userRepository.save(user);
  }

  public async notificationUpdate(payload: any): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({ where: { email: payload.email } });
    Object.assign(user, payload);
    return await this.userRepository.save(user);
  }

  public async resetPassword(payload: any): Promise<any> {
    const { email } = payload;
    const userEntity: UserEntity = await this.userRepository.findOne({ where: { email } });
    if (!userEntity) {
      return {
        error: true,
        user: UserEntity,
        message: ERROR_MESSAGES.EMAIL_NOT_FOUND,
      };
    }
    const randomPassword = (Math.random() + 1).toString(36).substring(2);
    const updateData: userEntity = {
      ...userEntity,
      password: encrypt(randomPassword)
    }
    await this.userRepository.save(updateData);
    this.mailService.sendNewPassword(userEntity.fullName, email, randomPassword)
    return {
      error: false,
      message: 'Success',
    };
  }

  public async talkToBot(payload: any): Promise<any> {
    console.log('payload', payload);
    const { conversation } = payload;
    const API_KEY = this.configService.get('OPENAI_API_KEY');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini-2024-07-18',
        messages: conversation,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('response.data.choices[0]', response.data.choices[0]);
    return response.data.choices[0].message.content;
  }
}
