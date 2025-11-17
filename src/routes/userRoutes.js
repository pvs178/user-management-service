import express from 'express'
import { UserController } from '../controllers/UserController.js'
import { authenticate } from '../middleware/auth.js'
import { checkAdmin, requireOwnerOrAdmin } from '../middleware/authorize.js'

const router = express.Router()
const userController = new UserController()

router.get('/:id', authenticate, requireOwnerOrAdmin, (req, res) => userController.getById(req, res))

router.get('/', authenticate, checkAdmin, (req, res) => userController.getAll(req, res))

router.patch('/:id/block', authenticate, requireOwnerOrAdmin, (req, res) => userController.blockUser(req, res))

export default router

