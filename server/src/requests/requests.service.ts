import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './request.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(user: User, createRequestDto: CreateRequestDto): Promise<Request> {
    const request = new Request();
    request.author = user;
    request.start = createRequestDto.start;
    request.end = createRequestDto.end;
    request.reason = createRequestDto.reason;
    return this.requestsRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return this.requestsRepository.find();
  }

  async findOne(id: string): Promise<Request> {
    return this.requestsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.requestsRepository.delete(id);
  }
}
