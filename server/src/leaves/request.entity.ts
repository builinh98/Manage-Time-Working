import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: true })
  reason: string;
  
  @Column({ default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  start: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  end: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created_at: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => User, author => author.requests)
  @JoinColumn({name: "user_id"})
  author: User;
}