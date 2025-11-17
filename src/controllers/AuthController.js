import { AuthService } from '../services/AuthService.js'

export class AuthController {
  constructor() {
    this.authService = new AuthService()
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  async register(req, res) {
    try {
      const result = await this.authService.register(req.body)

      return res.status(201).json(result)
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  async login(req, res) {
    try {
      const result = await this.authService.login(req.body)

      return res.status(200).json(result)
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({ error: error.message })
      }

      if (error.message === 'User is blocked') {
        return res.status(403).json({ error: error.message })
      }

      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

