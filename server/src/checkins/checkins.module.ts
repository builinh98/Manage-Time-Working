import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Checkin } from 'src/times/checkin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinsController } from './checkins.controller';
import { CheckinsService } from './checkins.service';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [CheckinsController],
  providers: [CheckinsService],
})
export class CheckinsModule {}