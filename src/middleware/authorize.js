import { UserRole } from '../entities/User.js'

/**
 * @param {string} role
 * @returns {Function} next
 */
export function checkRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.user.role !== role) {
      return res.status(403).json({ error: `Forbidden: ${role} access required` })
    }

    next()
  }
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

  const userId = req.params?.id
  const isAdmin = req.user.role === UserRole.ADMIN
  const isOwner = req.user.id === userId

  if (!isAdmin && !isOwner) {
    return res.status(403).json({ error: 'Forbidden: Access denied' })
  }

  next()
}

