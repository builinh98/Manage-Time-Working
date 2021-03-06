import { Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkout } from './checkout.entity';
import { Checkin } from './checkin.entity';
import { User } from '../users/user.entity';
import { WorkingResponse } from './interfaces/times.interfaces';

@Injectable()
export class TimesService {
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutsRepository: Repository<Checkout>,
    @InjectRepository(Checkin)
    private readonly checkinsRepository: Repository<Checkin>,
  ) {}

  //////////////////////////////////// Checkin
  async createCheckin(
    user: User,
    createCheckinDto: CreateCheckinDto,
  ): Promise<Checkin> {
    let checkins = await this.checkinsRepository.find({
      where: { author: user },
      relations: ['author'],
      order: { timestamp: 'DESC' },
    });

    checkins = checkins.filter(checkin => {
      const now = moment(createCheckinDto.timestamp).format('L');
      const dateFomated = moment(checkin.timestamp).format('L');
      return now === dateFomated;
    });

    if (checkins.length !== 0) {
      throw new BadRequestException('Duplicate checkin');
    } else {
      const checkin = new Checkin();
      checkin.author = user;
      checkin.timestamp = createCheckinDto.timestamp;
      return this.checkinsRepository.save(checkin);
    }
  }

  async findCheckinForUser(
    user: User,
    page: number | 1,
    newest?: boolean,
  ): Promise<Checkin[]> {
    const checkins = await this.checkinsRepository.find({
      where: { author: user },
      relations: ['author'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { timestamp: 'DESC' },
    });
    return checkins;
  }

  async findOneCheckin(id: string): Promise<Checkin> {
    const checkin = await this.checkinsRepository.findOne({
      where: { id: id },
    });
    return checkin;
  }

  //////////////////////////////////// Checkout
  async createCheckout(
    user: User,
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    let checkins = await this.checkinsRepository.find({
      where: { author: user },
    });

    checkins = checkins.filter(checkin => {
      const now = moment(createCheckoutDto.timestamp).format('L');
      const dateFomated = moment(checkin.timestamp).format('L');
      return now === dateFomated;
    });

    let checkouts = await this.checkoutsRepository.find({
      where: { author: user },
      relations: ['author'],
      order: { timestamp: 'DESC' },
    });

    checkouts = checkouts.filter(checkout => {
      const now = moment(createCheckoutDto.timestamp).format('L');
      const dateFomated = moment(checkout.timestamp).format('L');
      return now === dateFomated;
    });

    if (checkins.length === 0) {
      throw new BadRequestException('You do not checkin');
    } else if (checkouts.length !== 0) {
      throw new BadRequestException('Duplicate checkout');
    } else {
      const checkout = new Checkout();
      checkout.author = user;
      checkout.timestamp = createCheckoutDto.timestamp;
      checkout.checkin = checkins[0];
      return this.checkoutsRepository.save(checkout);
    }
  }

  async findCheckoutForUser(
    user: User,
    page: number | 1,
    newest?: boolean,
  ): Promise<Checkout[]> {
    const checkouts = await this.checkoutsRepository.find({
      where: { author: user },
      relations: ['author', 'checkin'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { timestamp: 'DESC' },
    });
    return checkouts;
  }

  async findOneCheckout(id: string): Promise<Checkout> {
    return this.checkoutsRepository.findOne(id);
  }

  async removeCheckout(id: string): Promise<void> {
    await this.checkoutsRepository.delete(id);
  }

  // get other info
  async getWorkingHoursForUser(
    user: User,
    month: string,
    year: string
  ): Promise<WorkingResponse[]> {
    const checkins = await this.checkinsRepository
      .createQueryBuilder()
      .where('user_id = :userId', { userId: user.id })
      .andWhere('MONTH(timestamp) = :month', { month: month })
      .andWhere('YEAR(timestamp) = :year', { year: year })
      .getMany();
    const checkouts = await this.checkoutsRepository
      .createQueryBuilder('checkout')
      .leftJoinAndSelect('checkout.checkin', 'checkin')
      .where('checkout.user_id = :userId', { userId: user.id })
      .andWhere('MONTH(checkin.timestamp) = :month', { month: month })
      .andWhere('YEAR(checkin.timestamp) = :year', { year: year })
      .getMany();

    const workings = checkins.map(checkin => {
      const checkout = checkouts.find(checkout => {
        return checkout.checkin && checkout.checkin.id === checkin.id;
      });

      let working = new WorkingResponse();
      working.date = checkin.timestamp;
      if (!checkout) {
        working.time = 0;
      } else {
        const timeTo = moment(checkout.timestamp);
        const timeFrom = moment(checkin.timestamp);
        working.time = Number(
          moment
            .duration(timeTo.diff(timeFrom))
            .asHours()
            .toFixed(2),
        );
      }
      return working;
    });
    return workings;
  }

  async getWorkingHoursForAdmin(
    userId: string,
    month: string,
    year: string
  ): Promise<WorkingResponse[]> {
    const checkins = await this.checkinsRepository
      .createQueryBuilder()
      .where('user_id = :userId', { userId: userId })
      .andWhere('MONTH(timestamp) = :month', { month: month })
      .andWhere('YEAR(timestamp) = :year', { year: year })
      .getMany();
    const checkouts = await this.checkoutsRepository
      .createQueryBuilder('checkout')
      .where('checkout.user_id = :userId', { userId: userId })
      .leftJoinAndSelect('checkout.checkin', 'checkin')
      .andWhere('MONTH(checkin.timestamp) = :month', { month: month })
      .andWhere('YEAR(checkin.timestamp) = :year', { year: year })
      .getMany();

    const workings = checkins.map(checkin => {
      const checkout = checkouts.find(checkout => {
        return checkout.checkin && checkout.checkin.id === checkin.id;
      });
      let working = new WorkingResponse();
      working.date = checkin.timestamp;
      if (!checkout) {
        working.time = 0;
      } else {
        const timeTo = moment(checkout.timestamp);
        const timeFrom = moment(checkin.timestamp);
        working.time = Number(
          moment
            .duration(timeTo.diff(timeFrom))
            .asHours()
            .toFixed(2),
        );
      }
      return working;
    });
    return workings;
  }
}
