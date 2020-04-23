import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from './../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './response.entity';
import { User } from '../users/user.entity';
import { ResponsesService } from './responses.service';

@Controller('responses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResponsesController{
  constructor(private readonly responsesService: ResponsesService){}

  @Roles('admin')
  @Post()
  create(@UserDecorator() user: User, @Body() createResponseDto: CreateResponseDto): Promise<Response> {
    return this.responsesService.create(user, createResponseDto);
  }

  @Roles('admin')
  @Get()
  findAll(): Promise<Response[]> {
    return this.responsesService.findAll();
  }
  
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Response> {
    return this.responsesService.findOne(id);
  }

}

