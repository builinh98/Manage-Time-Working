import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/users/user.entity';
import { LoginDto } from 'src/users/dto/login.dto';
import { AuthResponse } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto): Promise<AuthResponse> {
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      // const questionRepository = connection.getRepository(Question);
      const users = await this.userRepo.findOne({ relations: ["roles"] });
      console.log("users", users.roles[0].name)
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      console.log("linh", user)
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { ...user.toJSON(), token };
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

}