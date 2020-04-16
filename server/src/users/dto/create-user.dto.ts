import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  // @IsString()
  // readonly firstname: string;

  // @IsString()
  // readonly lastname: string;

  // @IsString()
  // readonly dob: string;

  // @IsInt()
  // readonly gender: number;

  // @IsString()
  // readonly avatar: string;

}




