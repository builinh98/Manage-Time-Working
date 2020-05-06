import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './response.entity';
import { User } from '../users/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responsesRepository: Repository<Response>,
    private readonly mailerService: MailerService,
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
    return this.responsesRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: string): Promise<Response> {
    return this.responsesRepository.findOne(id);
  }

  public example(): void {
    console.log("fsdfsdkfbsdhfsdfbsdf")
    this
      .mailerService
      .sendMail({
        to: 'linhbuiquang2321998@gmail.com', // List of receivers email address
        from: 'linhbq.intern@gmail.com', // Senders email address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }

}
