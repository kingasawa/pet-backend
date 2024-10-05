import {
  Entity,
  Column, ManyToOne, JoinColumn,
} from 'typeorm';
import BaseEntity from './base.entity';
import CategoryEntity from '@modules/database/entities/category.entity';

@Entity({ name: 'locations' })
class LocationEntity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  latitude: string;

  @Column({ nullable: false })
  longitude: string;

  @ManyToOne(() => CategoryEntity, (category) => category.locations)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}

export default LocationEntity;
