import express from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { validateDto } from '../middleware/validate.js'
import { CreateUserDto } from '../dto/CreateUserDto.js'
import { LoginDto } from '../dto/LoginDto.js'

const router = express.Router()
const authController = new AuthController()

router.post('/register', validateDto(CreateUserDto), (req, res) => authController.register(req, res))

router.post('/login', validateDto(LoginDto), (req, res) => authController.login(req, res))

export default router

