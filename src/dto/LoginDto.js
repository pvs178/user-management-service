import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email

  @IsNotEmpty()
  @MinLength(6)
  password
}

