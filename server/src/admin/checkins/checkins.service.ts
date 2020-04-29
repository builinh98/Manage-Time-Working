import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkin } from './checkin.entity';

@Injectable()
export class CheckinsService {
  constructor(
    @InjectRepository(Checkin)
    private readonly checkinsRepository: Repository<Checkin>,
  ) {}

  async update(id: number, createCheckinDto: CreateCheckinDto): Promise<Checkin> {
    let checkin = new Checkin()
    checkin = await this.findOne(id);
    if(!checkin) {
      throw new NotFoundException('Not found to update');
    }
    await this.checkinsRepository.update({ id }, createCheckinDto);
    checkin = await this.checkinsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return checkin;
  }

  async findAll(page: number | 1, newest?: boolean): Promise<Checkin[]> {
    const checkins = await this.checkinsRepository.find({
      relations: ['author'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { timestamp: 'DESC' },
    });
    return checkins;
  }
  
  async findOne(id: number): Promise<Checkin> {
    return this.checkinsRepository.findOne({
      where: { id },
      relations: ['author']
    });
  }

  async remove(id: string): Promise<DeleteResult>  {
    return await this.checkinsRepository.delete(id);
  }
  
}