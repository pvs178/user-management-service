import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

/**
 * @param {Function} DtoClass
 * @returns {Function}
 */
export function validateDto(DtoClass) {
  return async (req, res, next) => {
    const dto = plainToInstance(DtoClass, req.body)

    const errors = await validate(dto)

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        constraints: Object.values(error.constraints || {}),
      }))

      return res.status(400).json({
        error: 'Validation failed',
        errors: formattedErrors,
      })
    }

    req.body = dto
    next()
  }
}

