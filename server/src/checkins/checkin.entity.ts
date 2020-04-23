import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('checkins')
export class Checkin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  timestamp: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => User, author => author.checkins)
  @JoinColumn({name: "user_id"})
  author: User;
}