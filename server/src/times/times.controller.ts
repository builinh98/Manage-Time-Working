import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from '../users/user.entity';
import { Checkout } from './checkout.entity';
import { Checkin } from './checkin.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { TimesService } from './times.service';
import { WorkingResponse } from './interfaces/times.interfaces';

@Controller('times')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimesController {
  constructor(
    private readonly timesService: TimesService,
    ) {}

  //////////////////////////////////// Checkin
  @Post('checkins')
  createCheckin(@UserDecorator() user: User, @Body() createCheckinDto: CreateCheckinDto): Promise<Checkin> {
    return this.timesService.createCheckin(user, createCheckinDto);
  }

  @Get('checkins')
  findCheckinForUser(@UserDecorator() user: User, @Query('page') page: number): Promise<Checkin[]> {
    return this.timesService.findCheckinForUser(user, page, true);
  }

  @Get('checkins/:id')
  findOneCheckin(@Param() params): Promise<Checkin> {
    return this.timesService.findOneCheckin(params.id);
  }
  
  //////////////////////////////////// Checkout
  @Post('checkouts')
  createCheckout(@UserDecorator() user:User, @Body() createcheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    return this.timesService.createCheckout(user, createcheckoutDto);
  }

  @Get('checkouts')
  findCheckoutForUser(@UserDecorator() user: User, @Query('page') page: number): Promise<Checkout[]> {
    return this.timesService.findCheckoutForUser(user, page, true);
  }

  @Get('checkouts/:id')
  findOneCheckout(@Param('id') id: string): Promise<Checkout> {
    return this.timesService.findOneCheckout(id);
  }
  
  @Get('workings')
  getWorkingHoursForUser(@UserDecorator() user: User, @Query('month') month: string): Promise<WorkingResponse[]> {
    return this.timesService.getWorkingHoursForUser(user, month)
  }

  @Get('workings/:userId')
  getWorkingHoursForAdmin(@Param('userId') userId: string, @Query('month') month: string): Promise<WorkingResponse[]> {
    return this.timesService.getWorkingHoursForAdmin(userId, month)
  }

}
