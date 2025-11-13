import { IsEmail, IsNotEmpty, IsDateString, MinLength, MaxDate, IsEnum, IsOptional } from 'class-validator'
import { UserRole } from '../entities/User.js'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  fullName

  @IsNotEmpty()
  @IsDateString()
  @MaxDate(new Date())
  dateOfBirth

  @IsNotEmpty()
  @IsEmail()
  email

  @IsNotEmpty()
  @MinLength(6)
  password

  @IsOptional()
  @IsEnum(UserRole)
  role
}

