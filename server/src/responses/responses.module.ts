import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Response } from './response.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Response]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}