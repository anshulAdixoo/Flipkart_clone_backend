/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
  })
  
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    description: 'The password for the user account.',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  readonly password: string;
}