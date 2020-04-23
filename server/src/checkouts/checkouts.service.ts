import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout } from './checkout.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CheckoutsService{
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutsRepository: Repository<Checkout>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(user: User, createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    const checkout = new Checkout();
    checkout.author = user;
    return this.checkoutsRepository.save(checkout);
  }

  async findAll(): Promise<Checkout[]> {
    return this.checkoutsRepository.find();
  }

  async findOne(id: string): Promise<Checkout> {
    return this.checkoutsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkoutsRepository.delete(id);
  }
}