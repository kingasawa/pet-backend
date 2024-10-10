import {
  Entity,
  Column, OneToMany,
} from 'typeorm';
import BaseEntity from './base.entity';
import LocationEntity from '@modules/database/entities/location.entity';

@Entity({ name: 'categories' })
class CategoryEntity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => LocationEntity, (location) => location.category)
  locations: LocationEntity[];
}

export default CategoryEntity;
