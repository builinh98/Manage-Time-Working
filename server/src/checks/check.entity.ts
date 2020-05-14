import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('checks')
export class Check {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  checkin: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkout: Date;

  @ManyToOne(
    type => User,
    author => author.checks,
  )
  @JoinColumn({ name: 'user_id' })
  author: User;

}
