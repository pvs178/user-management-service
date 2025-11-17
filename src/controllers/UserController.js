import { UserService } from '../services/UserService.js'

export class UserController {
  constructor() {
    this.userService = new UserService()
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  async getById(req, res) {
    try {
      const { id } = req.params
      const user = await this.userService.findById(id)

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10

      const result = await this.userService.findAll({ page, limit })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  async blockUser(req, res) {
    try {
      const { id } = req.params
      const user = await this.userService.blockUser(id)

      return res.status(200).json(user)
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

