import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Request } from './request.entity';

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

  @OneToOne(type => Request)
  @JoinColumn({name: "request_id"})
  request: Request;

  @ManyToOne(type => User, author => author.responses)
  @JoinColumn({name: "user_id"})
  author: User;
}