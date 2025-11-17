import { UserRole } from '../entities/User.js'

export class CreateUserDto {
  constructor(data = {}) {
    this.fullName = data.fullName
    this.dateOfBirth = data.dateOfBirth
    this.email = data.email
    this.password = data.password
    this.role = data.role
  }

  static validate(data) {
    const errors = []

    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.push({ property: 'fullName', constraints: { minLength: 'fullName must be longer than or equal to 2 characters' } })
    }

    if (!data.dateOfBirth) {
      errors.push({ property: 'dateOfBirth', constraints: { isNotEmpty: 'dateOfBirth should not be empty' } })
    } else {
      const birthDate = new Date(data.dateOfBirth)
      if (isNaN(birthDate.getTime())) {
        errors.push({ property: 'dateOfBirth', constraints: { isDateString: 'dateOfBirth must be a valid date' } })
      } else if (birthDate > new Date()) {
        errors.push({ property: 'dateOfBirth', constraints: { maxDate: 'dateOfBirth must not be later than now' } })
      }
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push({ property: 'email', constraints: { isEmail: 'email must be an email' } })
    }

    if (!data.password || data.password.length < 6) {
      errors.push({ property: 'password', constraints: { minLength: 'password must be longer than or equal to 6 characters' } })
    }

    if (data.role && data.role !== UserRole.ADMIN && data.role !== UserRole.USER) {
      errors.push({ property: 'role', constraints: { isEnum: 'role must be one of the following values: admin, user' } })
    }

    if (errors.length > 0) {
      return { valid: false, errors }
    }

    const dto = new CreateUserDto({
      ...data,
      role: data.role || UserRole.USER,
    })

    return { valid: true, dto }
  }
}

