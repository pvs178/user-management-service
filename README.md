# User Management Service

RESTful API service for user management with authentication and authorization.

## Tech Stack

1) Express.js
2) PostgreSQL
3) TypeORM
4) JWT
5) bcrypt
6) Docker

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

## Running

### With Docker (Recommended)

Start all services:
```bash
docker compose up --build
```

Run migrations:
```bash
docker compose exec app npm run migration:run
```

Stop services:
```bash
docker compose down
```

### Local Development

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```
