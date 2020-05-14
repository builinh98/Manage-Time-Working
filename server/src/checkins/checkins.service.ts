/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkin } from 'src/times/checkin.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CheckinsService {
  constructor(
    @InjectRepository(Checkin)
    private readonly checkinsRepository: Repository<Checkin>,
  ) {}

  async create(
    user: User,
    createCheckinDto: CreateCheckinDto,
  ): Promise<Checkin> {
    let checkins = await this.checkinsRepository.find({
      where: { author: user },
      relations: ['author'],
      order: { timestamp: 'DESC' },
    });

    checkins = checkins.filter(checkin => {
      const now = moment(new Date()).format('L');
      const dateFomated = moment(checkin.timestamp).format('L');
      return now === dateFomated;
    });

    if (checkins.length !== 0) {
      throw new BadRequestException('Duplicate checkin');
    } else {
      const checkin = new Checkin();
      checkin.author = user;
      return this.checkinsRepository.save(checkin);
    }
  }

  async findAllForUser(
    user: User,
    page: number | 1,
    newest?: boolean,
  ): Promise<Checkin[]> {
    const checkins = await this.checkinsRepository.find({
      where: { author: user },
      relations: ['author', 'checkout'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { timestamp: 'DESC' },
    });
    return checkins;
  }

  async findOne(id: string): Promise<Checkin> {
    const checkin = await this.checkinsRepository.findOne({
      where: { id: id },
    });
    return checkin;
  }

  // admin

  // async findAllForAdmin(page: number | 1, newest?: boolean): Promise<Checkin[]> {
  //   const checkins = await this.checkinsRepository.find({
  //     relations: ['author'],
  //     take: 3,
  //     skip: 3 * (page - 1),
  //     order: newest && { timestamp: 'DESC' },
  //   });
  //   return checkins;
  // }

  // async remove(id: string): Promise<void> {
  //   await this.checkinsRepository.delete(id);
  // }
}
