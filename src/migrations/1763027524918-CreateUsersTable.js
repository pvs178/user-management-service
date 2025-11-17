import { Table, TableIndex } from 'typeorm'

export class CreateUsersTable {
  name = '1763027524918-CreateUsersTable'

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'fullName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'dateOfBirth',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '20',
            default: "'user'",
            isNullable: false,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    )

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_user_email',
        columnNames: ['email'],
      }),
    )
  }

  async down(queryRunner) {
    await queryRunner.dropIndex('users', 'IDX_user_email')
    await queryRunner.dropTable('users')
  }
}

