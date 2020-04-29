import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout } from './checkout.entity';

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectRepository(Checkout)
    private readonly checkoutsRepository: Repository<Checkout>,
  ) {}

  async update(
    id: number,
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    let checkout = new Checkout();
    checkout = await this.findOne(id);
    if (!checkout) {
      throw new NotFoundException('Not found to update');
    }
    await this.checkoutsRepository.update({ id }, createCheckoutDto);
    checkout = await this.checkoutsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return checkout;
  }

  async findAll(page: number | 1, newest?: boolean): Promise<Checkout[]> {
    const checkouts = await this.checkoutsRepository.find({
      relations: ['author'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { timestamp: 'DESC' },
    });
    return checkouts;
  }

  async findOne(id: number): Promise<Checkout> {
    return this.checkoutsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.checkoutsRepository.delete(id);
  }
}
