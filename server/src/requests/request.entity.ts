import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: true })
  reason: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  start: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  end: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne(type => User)
  @JoinColumn({name: "user_id"})
  user: User;
}