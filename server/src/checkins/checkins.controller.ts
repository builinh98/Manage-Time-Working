import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkin } from './checkin.entity';
import { CheckinsService } from './checkins.service';

@Controller('checkins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CheckinsController{
  constructor(private readonly checkinsService: CheckinsService){}

  @Post()
  create(@Body() createCheckinDto: CreateCheckinDto): Promise<Checkin> {
    return this.checkinsService.create(createCheckinDto);
  }

  @Get()
  findAll(): Promise<Checkin[]> {
    return this.checkinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Checkin> {
    return this.checkinsService.findOne(id);
  }

  // @Get(':day')
  // findByDay(@Param('day') day: string): Promise<Checkin> {
  //   return this.checkinsService.findByDay(day);
  // }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.checkinsService.remove(id);
  }


}

