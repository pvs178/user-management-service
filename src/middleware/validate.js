/**
 * @param {Function} DtoClass
 * @returns {Function}
 */
export function validateDto(DtoClass) {
  return (req, res, next) => {
    const result = DtoClass.validate(req.body)

    if (!result.valid) {
      const formattedErrors = result.errors.map((error) => ({
        field: error.property,
        constraints: Object.values(error.constraints || {}),
      }))

      return res.status(400).json({
        error: 'Validation failed',
        errors: formattedErrors,
      })
    }

    req.body = result.dto
    next()
  }
}

