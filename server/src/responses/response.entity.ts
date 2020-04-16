import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Request } from '../requests/request.entity';

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column({ length: 500, nullable: true })
  reason: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  confirmed_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne(type => User)
  @JoinColumn()
  user: Request;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne(type => Request)
  @JoinColumn({name: "user_id"})
  request: Request;
}