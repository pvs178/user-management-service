import jwt from 'jsonwebtoken'

/**
 * @param {Object} payload
 * @returns {string}
 */
export function generateToken(payload) {
  const privateKey = process.env.JWT_PRIVATE_KEY
  if (!privateKey) {
    throw new Error('JWT_PRIVATE_KEY is not configured')
  }

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  })
}

/**
 * @param {string} token
 * @returns {Object|null}
 */
export function verifyToken(token) {
  try {
    const publicKey = process.env.JWT_PUBLIC_KEY
    if (!publicKey) {
      throw new Error('JWT_PUBLIC_KEY is not configured')
    }

    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    })
  } catch (error) {
    return null
  }
}

