# User Management Service

RESTful API service for user management with authentication and authorization.

## Tech Stack

1) **Express.js** - Web framework
2) **PostgreSQL** - Database
3) **TypeORM** - ORM
4) **JWT** - Authentication
5) **bcrypt** - Password hashing

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```
