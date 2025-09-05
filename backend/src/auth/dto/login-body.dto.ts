import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginBodyDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
