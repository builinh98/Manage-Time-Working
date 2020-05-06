import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from './../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './request.entity';
import { User } from '../users/user.entity';
import { RequestsService } from './requests.service';

@Controller('requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RequestsController{
  constructor(private readonly requestsService: RequestsService){}

  @Post()
  create(@UserDecorator() user: User, @Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestsService.create(user, createRequestDto);
  }

  @Get()
  findAll(@UserDecorator() user: User, @Query('page') page: number): Promise<Request[]> {
    return this.requestsService.findAll(user, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Request> {
    return this.requestsService.findOne(id);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requestsService.remove(id);
  }


}

