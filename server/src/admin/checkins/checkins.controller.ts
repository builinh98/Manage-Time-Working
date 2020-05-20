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
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { Checkin } from 'src/times/checkin.entity';
import { CheckinsService } from './checkins.service';

@Controller('api/admins/checkins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() createCheckinDto: CreateCheckinDto,
  ): Promise<Checkin> {
    return this.checkinsService.update(id, createCheckinDto);
  }

  @Get()
  findAll(@Query('page') page: number): Promise<Checkin[]> {
    return this.checkinsService.findAll(page, true);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Checkin> {
    return this.checkinsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.checkinsService.remove(id);
  }
}
