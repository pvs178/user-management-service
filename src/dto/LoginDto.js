export class LoginDto {
  constructor(data = {}) {
    this.email = data.email
    this.password = data.password
  }

  static validate(data) {
    const errors = []

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push({ property: 'email', constraints: { isEmail: 'email must be an email' } })
    }

    if (!data.password || data.password.length < 6) {
      errors.push({ property: 'password', constraints: { minLength: 'password must be longer than or equal to 6 characters' } })
    }

    if (errors.length > 0) {
      return { valid: false, errors }
    }

    const dto = new LoginDto(data)

    return { valid: true, dto }
  }
}

