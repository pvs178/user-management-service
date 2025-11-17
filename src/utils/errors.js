export function unauthorizedError(message = 'Unauthorized') {
  const error = new Error(message)
  error.name = 'UnauthorizedError'
  error.statusCode = 401
  return error
}

export function forbiddenError(message = 'Forbidden') {
  const error = new Error(message)
  error.name = 'ForbiddenError'
  error.statusCode = 403
  return error
}

export function notFoundError(message = 'Not found') {
  const error = new Error(message)
  error.name = 'NotFoundError'
  error.statusCode = 404
  return error
}

export function validationError(message = 'Validation error', errors = []) {
  const error = new Error(message)
  error.name = 'ValidationError'
  error.statusCode = 400
  error.errors = errors
  return error
}

