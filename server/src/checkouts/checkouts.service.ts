import { Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout } from 'src/times/checkout.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CheckoutsService{
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutsRepository: Repository<Checkout>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(user: User, createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    let checkouts = await this.checkoutsRepository.find({
      where: { author: user },
      relations: ['author'],
      order: { timestamp: 'DESC' },
    });

    checkouts = checkouts.filter(checkout => {
      const now = moment(new Date()).format('L');
      const dateFomated = moment(checkout.timestamp).format('L');
      return now === dateFomated;
    });

    if (checkouts.length !== 0) {
      throw new BadRequestException('Duplicate checkout');
    } else {
      const checkout = new Checkout();
      checkout.author = user;
      return this.checkoutsRepository.save(checkout);
    }
  }

  async findAllForUser(
    user: User,
    page: number | 1,
    newest?: boolean,
  ): Promise<Checkout[]> {
    const checkouts = await this.checkoutsRepository.find({
      where: { author: user },
      relations: ['author'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { timestamp: 'DESC' },
    });
    return checkouts;
  }

  async findOne(id: string): Promise<Checkout> {
    return this.checkoutsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkoutsRepository.delete(id);
  }
}