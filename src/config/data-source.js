import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/entities/**/*.js'],
  migrations: ['src/migrations/**/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
})

export async function initDb() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()

      console.log('Database connection established')
    }

    return AppDataSource
  } catch (error) {
    console.error('Error during database connection:', error)
    throw error
  }
}

export default AppDataSource

