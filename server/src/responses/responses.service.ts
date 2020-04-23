import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './response.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responsesRepository: Repository<Response>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(user: User, createResponseDto: CreateResponseDto): Promise<Response> {
    const response = new Response();
    response.author = user;
    // response.request = createResponseDto.request;
    response.status = createResponseDto.status;
    response.reason = createResponseDto.reason;
    return this.responsesRepository.save(response);
  }

  async findAll(): Promise<Response[]> {
    return this.responsesRepository.find();
  }

  async findOne(id: string): Promise<Response> {
    return this.responsesRepository.findOne(id);
  }

}
