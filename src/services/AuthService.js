import AppDataSource from '../config/data-source.js'
import { User } from '../entities/User.js'
import { CreateUserDto } from '../dto/CreateUserDto.js'
import { LoginDto } from '../dto/LoginDto.js'
import { UserResponseDto } from '../dto/UserResponseDto.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import { generateToken } from '../utils/jwt.js'
import { UserRole } from '../entities/User.js'

export class AuthService {
  /**
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<{user: UserResponseDto, token: string}>}
   * @throws {Error}
   */
  async register(createUserDto) {
    const userRepository = AppDataSource.getRepository(User)

    const existingUser = await userRepository.findOne({
      where: { email: createUserDto.email },
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await hashPassword(createUserDto.password)

    const user = userRepository.create({
      fullName: createUserDto.fullName,
      dateOfBirth: createUserDto.dateOfBirth,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role || UserRole.USER,
      isActive: true,
    })

    await userRepository.save(user)

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: new UserResponseDto(user),
      token,
    }
  }

  /**
   * @param {LoginDto} loginDto
   * @returns {Promise<{user: UserResponseDto, token: string}>}
   * @throws {Error}
   */
  async login(loginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    if (!user.isActive) {
      throw new Error('User is blocked')
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: new UserResponseDto(user),
      token,
    }
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User|null>}
   */
  async validateUser(email, password) {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: { email },
    })

    if (!user) {
      return null
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    return user
  }
}

