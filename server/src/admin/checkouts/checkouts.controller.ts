import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout } from 'src/times/checkout.entity';
import { CheckoutsService } from './checkouts.service';

@Controller('admins/checkouts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class CheckoutsController {
  constructor(private readonly checkoutsService: CheckoutsService) {}

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() createCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    return this.checkoutsService.update(id, createCheckoutDto);
  }

  @Get()
  findAll(@Query('page') page: number): Promise<Checkout[]> {
    return this.checkoutsService.findAll(page, true);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Checkout> {
    return this.checkoutsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.checkoutsService.remove(id);
  }
}
