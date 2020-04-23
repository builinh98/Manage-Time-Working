import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from './../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
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
  findAll(): Promise<Checkout[]> {
    return this.checkoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Checkout> {
    return this.checkoutsService.findOne(id);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.checkoutsService.remove(id);
  }

}

