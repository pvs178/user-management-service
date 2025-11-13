import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'
import { IsEmail, IsNotEmpty, IsEnum, IsBoolean, IsDateString, MinLength } from 'class-validator'

export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  fullName

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  @IsNotEmpty()
  @IsEmail()
  email

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @MinLength(6)
  password

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  isActive

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt
}

