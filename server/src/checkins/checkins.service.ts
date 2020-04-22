import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkin } from './checkin.entity';

@Injectable()
export class CheckinsService {
  constructor(
    @InjectRepository(Checkin)
    private readonly checkinsRepository: Repository<Checkin>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createCheckinDto: CreateCheckinDto): Promise<Checkin> {
    const checkin = new Checkin();
    return this.checkinsRepository.save(checkin);
  }

  async findAll(): Promise<Checkin[]> {
    return this.checkinsRepository.find();
  }

  async findOne(id: string): Promise<Checkin> {
    return this.checkinsRepository.findOne(id);
  }

  // error
  async findByDay(day: string): Promise<Checkin> {
    return this.checkinsRepository.find(day);
  }

  async remove(id: string): Promise<void> {
    await this.checkinsRepository.delete(id);
  }
}