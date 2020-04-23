import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Request } from './request.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}