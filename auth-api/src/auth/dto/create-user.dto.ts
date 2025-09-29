import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../guards/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'pass123', description: 'The password for the user' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: Role.USER, description: 'The role of the user', enum: Role })
  @IsEnum(Role)
  role: Role;
}