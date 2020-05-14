import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Check } from 'src/checks/check.entity';
import { ChecksController } from './checks.controller';
import { ChecksService } from './checks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Check]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [ChecksController],
  providers: [ChecksService],
})
export class ChecksModule {}