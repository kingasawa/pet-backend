import {
  Entity,
  Column,
} from 'typeorm';
import BaseEntity from './base.entity';

export enum UserGender {
  UNKNOWN = "Không rõ",
  MALE = "Nam",
  FEMALE = "Nữ",
}

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserGender, default: UserGender.MALE })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  pushToken: string;

  @Column({ default: true })
  notification: boolean;

  @Column({ default: false })
  memberShip: boolean;

  @Column({ default: true })
  isActive: boolean;
}

export default UserEntity;
