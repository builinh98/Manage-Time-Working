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
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from '../users/user.entity';
import { Request } from './request.entity';
import { Response } from './response.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateResponseDto } from './dto/create-response.dto';
import { LeavesService } from './leaves.service';
import { LeavesResponse } from './interfaces/leaves.interfaces';

@Controller('leaves')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Post('requests')
  createRequest(
    @UserDecorator() user: User,
    @Body() createRequestDto: CreateRequestDto,
  ): Promise<Request> {
    return this.leavesService.createRequest(user, createRequestDto);
  }

  @Get('requests')
  findRequestForUser(
    @UserDecorator() user: User,
    @Query('page') page: number,
  ): Promise<Request[]> {
    return this.leavesService.findRequestForUser(user, page);
  }

  @Get('requests/:id')
  findOneRequest(@Param('id') id: string): Promise<Request> {
    return this.leavesService.findOneRequest(id);
  }

  @Roles('admin')
  @Delete('requests/:id')
  removeRequest(@Param('id') id: string): Promise<void> {
    return this.leavesService.removeRequest(id);
  }

  // Response
  @Roles('admin')
  @Post('responses')
  createResponse(
    @UserDecorator() user: User,
    @Body() createResponseDto: CreateResponseDto,
  ): Promise<Response> {
    return this.leavesService.createResponse(user, createResponseDto);
  }

  @Roles('admin')
  @Get('responses')
  findResponseForUser(): Promise<Response[]> {
    return this.leavesService.findResponseForUser();
  }

  @Roles('admin')
  @Get('responses/:id')
  findOneResponse(@Param('id') id: string): Promise<Response> {
    return this.leavesService.findOneResponse(id);
  }

  // get list absence day
  @Get('absences')
  getAbsenceDayForUser(
    @UserDecorator() user: User,
    @Query('month') month: string,
    @Query('year') year: string,
  ): Promise<LeavesResponse> {
    return this.leavesService.getAbsenceDayForUser(user, month, year);
  }

  // get absence day in month
  // @Get('absences/:month')
  // getAbsenceDayInMonthForUser(@UserDecorator() user: User, @Param() params) {
  //   return this.leavesService.getAbsenceDayInMonthForUser(user, params.month);
  // }
}
