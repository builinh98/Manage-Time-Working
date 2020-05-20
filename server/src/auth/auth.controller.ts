import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserDecorator } from './../decorators/user.decorator';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(ValidationPipe) credentials: LoginDto,
  ){
    const user = await this.authService.login(credentials);
    return { user };
  }

  @Post('/logout')
  logout(){}

  @Get('user')
  findOne(){}

}