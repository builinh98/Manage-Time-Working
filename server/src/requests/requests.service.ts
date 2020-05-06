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

  async findAll(
    user: User,
    page: number | 1,
    newest?: boolean
  ): Promise<Request[]> {
    const requests = await this.requestsRepository.find({
      where: { author: user },
      relations: ['author'],
      take: 5,
      skip: 5 * (page - 1),
      // eslint-disable-next-line @typescript-eslint/camelcase
      order: newest && { created_at: 'DESC' },
    });
    return requests;
  }

  async findOne(id: string): Promise<Request> {
    return this.requestsRepository.findOne({
      where: { id: id },
      relations: ['author']
    });
  }

  async remove(id: string): Promise<void> {
    await this.requestsRepository.delete(id);
  }
}
