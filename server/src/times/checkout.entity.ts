import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Checkin } from 'src/times/checkin.entity';

@Entity('checkouts')
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(
    type => User,
    author => author.checkouts,
  )
  @JoinColumn({ name: 'user_id' })
  author: User;

  @OneToOne(type => Checkin)
  @JoinColumn({ name: 'checkin_id' })
  checkin: Checkin;
}
