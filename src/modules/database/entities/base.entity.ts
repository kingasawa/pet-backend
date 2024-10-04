import { Column, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';

const currentDateTime = moment().format('YYYY-MM-DD hh:mm:ss');
class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => `'${currentDateTime}'`,
  })
  created_date: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;
}

export default BaseEntity