import { Controller, Get, Post, Body, Res, Param, HttpStatus, NotFoundException, Delete, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: "User has been created successfully!",
      user
  });
  }
       

  @Get('users')
  async findAll(@Res() res): Promise<User[]> {
    const users = await this.usersService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('user/:userID')
  async getCustomer(@Res() res, @Param('userID') userID) {
    const user = await this.usersService.getUserByID(userID);
    console.log("fhsfgsdfsd")
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete('user/delete')
  async deleteCustomer(@Res() res, @Query('userID') userID) {
    const user = await this.usersService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
        message: 'User has been deleted',
        user
    })
  }

}
