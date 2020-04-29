import { Body, Controller, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from './../decorators/user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout } from './checkout.entity';
import { User } from '../users/user.entity';
import { CheckoutsService } from './checkouts.service';

@Controller('checkouts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CheckoutsController{
  constructor(private readonly checkoutsService: CheckoutsService){}

  @Post()
  create(@UserDecorator() user:User, @Body() createcheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    return this.checkoutsService.create(user, createcheckoutDto);
  }

  @Get()
  findAllForUser(@UserDecorator() user: User, @Query('page') page: number): Promise<Checkout[]> {
    return this.checkoutsService.findAllForUser(user, page, true);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Checkout> {
    return this.checkoutsService.findOne(id);
  }

  // @Roles('admin')
  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.checkoutsService.remove(id);
  // }

}

