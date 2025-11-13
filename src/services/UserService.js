import AppDataSource from '../config/data-source.js'
import { User } from '../entities/User.js'
import { UserResponseDto } from '../dto/UserResponseDto.js'

export class UserService {
  /**
   * @param {string} id
   * @returns {Promise<UserResponseDto|null>}
   */
  async findById(id) {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: { id },
    })

    if (!user) {
      return null
    }

    return new UserResponseDto(user)
  }

  /**
   * @param {Object} options
   * @param {number} options.page
   * @param {number} options.limit
   * @returns {Promise<{users: UserResponseDto[], total: number, page: number, limit: number, totalPages: number}>}
   */
  async findAll(options = {}) {
    const userRepository = AppDataSource.getRepository(User)

    const page = options.page || 1
    const limit = options.limit || 10
    const skip = (page - 1) * limit

    const [users, total] = await userRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    })

    const usersResponse = users.map((user) => new UserResponseDto(user))

    return {
      users: usersResponse,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  /**
   * @param {string} id
   * @returns {Promise<UserResponseDto>}
   * @throws {Error}
   */
  async blockUser(id) {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: { id },
    })

    if (!user) {
      throw new Error('User not found')
    }

    user.isActive = false
    await userRepository.save(user)

    return new UserResponseDto(user)
  }

  /**
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    const userRepository = AppDataSource.getRepository(User)

    return userRepository.findOne({
      where: { email },
    })
  }
}

