import { Injectable, BadRequestException, Get } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateResponseDto } from './dto/create-response.dto';
import { Request } from './../requests/request.entity';
import { Response } from './../responses/response.entity';
import { AbsencesResponse, LeavesResponse } from './interfaces/leaves.interfaces';
import { User } from '../users/user.entity';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepository: Repository<Request>,
    @InjectRepository(Response)
    private readonly responsesRepository: Repository<Response>,
    private readonly mailerService: MailerService,
  ) {}

  // Request
  createRequest(
    user: User,
    createRequestDto: CreateRequestDto,
  ): Promise<Request> {
    const request = new Request();
    request.author = user;
    request.start = createRequestDto.start;
    request.end = createRequestDto.end;
    request.reason = createRequestDto.reason;
    return this.requestsRepository.save(request);
  }

  async findRequestForUser(
    user: User,
    page: number | 1,
    newest?: boolean,
  ): Promise<Request[]> {
    const requests = await this.requestsRepository.find({
      where: { author: user },
      relations: ['author'],
      take: 5,
      skip: 5 * (page - 1),
      order: newest && { created_at: 'DESC' },
    });
    return requests;
  }

  async findOneRequest(id: string): Promise<Request> {
    return this.requestsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
  }

  async removeRequest(id: string): Promise<void> {
    await this.requestsRepository.delete(id);
  }

  // Response
  async createResponse(
    user: User,
    createResponseDto: CreateResponseDto,
  ): Promise<Response> {
    const request = await this.requestsRepository.findOne({
      where: { id: createResponseDto.request },
      relations: ['author'],
    });

    const responses = await this.responsesRepository.find({
      where: { request: createResponseDto.request },
    });

    if (!request) {
      throw new BadRequestException('This request is not exist');
    } else if (responses.length !== 0) {
      throw new BadRequestException('This request had been responsed');
    } else {
      const response = new Response();
      response.author = user;
      response.request = createResponseDto.request;
      response.status = createResponseDto.status;
      response.reason = createResponseDto.reason;
      let message = '';
      if (Number(response.status) === 1) {
        message = 'OK';
        this.requestsRepository.update({ id: request.id }, { status: 2 });
      } else {
        message = 'Cancel';
        this.requestsRepository.update({ id: request.id }, { status: 3 });
      }
      this.mailResponse(request.author, message);
      return this.responsesRepository.save(response);
    }
  }

  async findResponseForUser(): Promise<Response[]> {
    return this.responsesRepository.find({
      relations: ['request'],
    });
  }

  async findOneResponse(id: string): Promise<Response> {
    return this.responsesRepository.findOne(id);
  }

  public mailResponse(user: User, message: string) {
    this.mailerService
      .sendMail({
        to: user.username, // List of receivers email address
        from: process.env.EMAIL_ID, // Senders email address
        subject: 'Response leave request', // Subject line
        text: message, // plaintext body
        html: `<b>${message}</b>`, // HTML body content
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // get list absence Day
  async getAbsenceDayForUser(user: User): Promise<LeavesResponse> {
    let requests = await this.requestsRepository.find({
      where: { author: user, status: 2 },
    });
    let totalAbsence = 0;
    const absences = requests.map(request => {
      const absence = new AbsencesResponse();
      const from = moment(request.start);
      const to = moment(request.end);
      const diff = moment.duration(to.diff(from)).asHours();
      const diffFormatedDay = moment.duration(to.diff(from)).asDays();
      const condition = moment(request.end)
      if(diffFormatedDay < 1){
        totalAbsence = totalAbsence + 1;
      } else {
        totalAbsence = totalAbsence + Math.ceil(diffFormatedDay);
      }

      absence.date = `${from.format('DD/MM/YYYY')}-${to.format('DD/MM/YYYY')}`;
      absence.from = from.format('HH:mm:ss');
      absence.to = to.format('HH:mm:ss');
      // absence.hours = (diff % 24) + 8 * Math.floor(diff / 24);
      absence.hours = diff
      let a = moment({h: 20, m: 12, s:35});
      let b = moment({h: 20, m: 15, s: 23});
      console.log(b.isAfter(a, 'seconds')); // true
      return absence;
    });
    return { absences, totalAbsence};
  }

  // get absence in month
  async getAbsenceDayInMonthForUser(user: User, month: String) {
    let requests = await this.requestsRepository.find({
      where: { author: user, status: 2 },
    });

    let totalAbsence = 0;
    requests.map(request => {
      totalAbsence + 1;
      const from = moment(request.start)
      const to = moment(request.end)
      const diff = moment.duration(to.diff(from)).asDays();
    })
   
    return 9;
  }
}
