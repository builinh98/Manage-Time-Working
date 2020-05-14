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
import { Check } from './check.entity';
import { CreateCheckDto } from './dto/create-check.dto';
import { ChecksService } from './checks.service';

@Controller('checks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChecksController {
  constructor(
    private readonly checksService: ChecksService,
    ) {}

  //////////////////////////////////// Checkin
  @Post('checkins')
  createCheckin(@UserDecorator() user: User, @Body() createCheckinDto: CreateCheckDto): Promise<Check> {
    return this.checksService.createCheckin(user, createCheckinDto);
  }

  @Post('checkouts')
  createCheckout(@UserDecorator() user: User, @Body() createCheckDto: CreateCheckDto) {
    return this.checksService.createCheckout(user, createCheckDto);
  }

  @Get('')
  findCheckForUser(@UserDecorator() user: User, @Query('page') page: number): Promise<Check[]> {
    return this.checksService.findCheckForUser(user, page, true);
  }

  @Get('workings')
  findWorking(@UserDecorator() user: User, @Query('page') page: number) {
    return this.checksService.findWorking(user);
  }
  
}
