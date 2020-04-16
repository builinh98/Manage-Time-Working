import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('checkins')
export class Checkin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  timestamp: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne(type => User, { cascade: true })
  @JoinColumn({name: "user_id"})
  user: User;
}