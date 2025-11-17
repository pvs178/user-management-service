import { EntitySchema } from 'typeorm'

export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
}

export const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    fullName: {
      type: 'varchar',
      length: 255,
      name: 'full_name',
      nullable: false,
    },
    dateOfBirth: {
      type: 'date',
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    role: {
      type: 'varchar',
      length: 20,
      default: UserRole.USER,
      nullable: false,
    },
    isActive: {
      type: 'boolean',
      default: true,
      nullable: false,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
      nullable: false,
    },
  },
  indices: [
    {
      name: 'IDX_user_email',
      columns: ['email'],
    },
  ],
})

