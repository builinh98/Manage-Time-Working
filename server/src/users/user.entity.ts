import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain } from 'class-transformer';

import { UserResponse } from './interfaces/user.interface';
import { Role } from '../roles/role.entity';
import { Position } from '../positions/position.entity';
import { Log } from '../logs/log.entity';
import { Checkin } from 'src/times/checkin.entity';
import { Checkout } from 'src/times/checkout.entity';
import { Check } from 'src/checks/check.entity';
import { Request } from './../requests/request.entity';
import { Response } from './../responses/response.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ default: 1, nullable: true })
  gender: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 1 })
  active: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dob: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at: Date;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Log,
    log => log.author,
  )
  logs: Log[];

  @OneToMany(
    type => Check,
    check => check.author,
  )
  checks: Check[];

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Checkin,
    checkin => checkin.author,
  )
  checkins: Checkin[];

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Checkout,
    checkout => checkout.author,
  )
  checkouts: Checkout[];

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Request,
    request => request.author,
  )
  requests: Request[];

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Response,
    response => response.author,
  )
  responses: Response[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => Role, { cascade: true, eager: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => Position, { cascade: true, eager: true })
  @JoinTable({
    name: 'users_positions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'position_id',
      referencedColumnName: 'id',
    },
  })
  positions: Position[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    // $2y$10$rEKq/Q8MPbn7Z47M72W8VeKU1pXyBJoWXf0Wt1m39umKrQXFwWLse
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON(): UserResponse {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return <UserResponse>classToPlain(this);
  }
}
