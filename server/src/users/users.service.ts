import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(creatUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(creatUserDto);
    return createdUser.save();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByID(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }

  async getUserByUsername(username): Promise<User> {
    const user = await this.userModel.findOne({username: username}).exec();
    return user;
  }

  async updateUser(userID, createUserDto: CreateUserDto): Promise<User> {
    const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDto, { new: true });
        return updatedUser;
  }

  async deleteUser(userID): Promise<any> {
      const deletedUser = await this.userModel.findByIdAndRemove(userID);
      return deletedUser;
  }

}

