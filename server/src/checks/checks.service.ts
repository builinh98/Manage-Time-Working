import { Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckDto } from './dto/create-check.dto';
import { Check } from './check.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ChecksService {
  constructor(
    @InjectRepository(Check)
    private readonly checksRepository: Repository<Check>,
  ) {}

  async createCheckin(
    user: User,
    createCheckDto: CreateCheckDto,
  ): Promise<Check> {
    let checks = await this.checksRepository.find({
      where: { author: user },
      relations: ['author'],
      order: { checkin: 'DESC' },
    });

    checks = checks.filter(check => {
      const now = moment(createCheckDto.checkin).format('L');
      const dateFomated = moment(check.checkin).format('L');
      return now === dateFomated;
    });

    if (checks.length !== 0) {
      throw new BadRequestException('Duplicate checkin');
    } else {
      const check = new Check();
      check.author = user;
      check.checkin = createCheckDto.checkin;
      return this.checksRepository.save(check);
    }
  }

  async createCheckout(
    user: User,
    createCheckDto: CreateCheckDto,
  ) {
    let checks = await this.checksRepository.find({
      where: { author: user },
      relations: ['author'],
      order: { checkin: 'DESC' },
    });

    checks = checks.filter(check => {
      const now = moment(createCheckDto.checkout).format('L');
      const dateFomated = moment(check.checkin).format('L');
      return now === dateFomated;
    });

    if (checks.length === 0) {
      throw new BadRequestException('You have not been checkined');
    }

    if (checks[0].checkout) {
      throw new BadRequestException('Duplicate checkout');
    }

    return await this.checksRepository.update({ id: checks[0].id }, {checkout: createCheckDto.checkout});
  }

  async findCheckForUser(user: User, page: number, newest: boolean): Promise<Check[]> {
    const checks = await this.checksRepository.find({
      where: { author: user },
      relations: ['author'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { checkin: 'DESC' },
    });
    return checks;
  }

  async findWorking(user: User) {
    
  }
}
