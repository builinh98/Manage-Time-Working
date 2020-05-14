import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/leaves/request.entity';
import { Response } from 'src/leaves/response.entity';
import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request, Response]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}