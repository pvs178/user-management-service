export class UserResponseDto {
  id
  fullName
  dateOfBirth
  email
  role
  isActive
  createdAt
  updatedAt

  constructor(user) {
    this.id = user.id
    this.fullName = user.fullName
    this.dateOfBirth = user.dateOfBirth
    this.email = user.email
    this.role = user.role
    this.isActive = user.isActive
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}

