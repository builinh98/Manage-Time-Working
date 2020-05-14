import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Checkout } from 'src/times/checkout.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutsController } from './checkouts.controller';
import { CheckoutsService } from './checkouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Checkout]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
})
export class CheckoutsModule {}