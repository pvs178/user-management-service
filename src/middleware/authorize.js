import { UserRole } from '../entities/User.js'

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function checkAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' })
  }

  next()
}

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function requireOwnerOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const userId = req.params.id
  const isAdmin = req.user.role === UserRole.ADMIN
  const isOwner = req.user.id === userId

  if (!isAdmin && !isOwner) {
    return res.status(403).json({ error: 'Forbidden: Access denied' })
  }

  next()
}

