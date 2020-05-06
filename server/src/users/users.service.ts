import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.gender = createUserDto.gender;
    user.dob = createUserDto.dob;
    user.avatar = createUserDto.avatar;

    return this.usersRepository.save(user);
  }

  async update(id: number, createUserDto: CreateUserDto): Promise<User> {
    let user = new User()
    user = await this.usersRepository.findOne(id);
    if(!user) {
      throw new NotFoundException('Not found to update');
    }
    await this.usersRepository.update({ id }, createUserDto);
    user = await this.usersRepository.findOne({
      where: { id },
    });
    return user;
  }
  
  async uploadAvatar(id: number, avatar: string){
    await this.usersRepository.update(id, {avatar: avatar});
    const user = await this.usersRepository.findOne({ id });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id }
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if(!user) {
      throw new NotFoundException('Not found to delete');
    }
    await this.usersRepository.delete(id);
  }

}