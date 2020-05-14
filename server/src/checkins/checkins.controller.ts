import { Body, Controller, Get, Param, Post, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from './../decorators/user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkin } from 'src/times/checkin.entity';
import { User } from '../users/user.entity';
import { CheckinsService } from './checkins.service';
import { NotFoundInterceptor } from 'src/common/interceptors/notfound.interceptor';

@Controller('checkins')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(new NotFoundInterceptor('Checkin Not Found'))
export class CheckinsController{
  constructor(private readonly checkinsService: CheckinsService){}

  @Post()
  create(@UserDecorator() user: User, @Body() createCheckinDto: CreateCheckinDto): Promise<Checkin> {
    return this.checkinsService.create(user, createCheckinDto);
  }

  @Get()
  findAllForUser(@UserDecorator() user: User, @Query('page') page: number): Promise<Checkin[]> {
    return this.checkinsService.findAllForUser(user, page, true);
  }

  @Get(':id')
  findOne(@Param() params): Promise<Checkin> {
    return this.checkinsService.findOne(params.id);
  }

  // @Get('admin')
  // @Roles('admin')
  // findAllForAdmin(@Query('page') page: number): Promise<Checkin[]> {
  //   return this.checkinsService.findAllForAdmin(page, true);
  // }

  // @Roles('admin')
  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.checkinsService.remove(id);
  // }


}

