import {
  Entity,
  Column,
} from 'typeorm';
import BaseEntity from './base.entity';

@Entity({ name: 'pets' })
class PetEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ default: false })
  vaccine: boolean;

  @Column({ default: true })
  isActive: boolean;
}

export default PetEntity;
