import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Checkin } from 'src/times/checkin.entity';
import { Checkout } from 'src/times/checkout.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';
// import { CheckinsService } from '../checkins/checkins.service';
// import { CheckoutsService } from '../checkouts/checkouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin, Checkout]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [TimesController],
  providers: [TimesService],
})
export class TimesModule {}