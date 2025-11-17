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

Start all services (migrations run automatically):
```bash
docker compose up --build
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

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "dateOfBirth": "1990-01-01",
    "email": "user@example.com",
    "password": "SecurePass123",
    "role": "user"
  }
  ```
- **Response:** `{ "user": {...}, "token": "..." }`

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:** `{ "user": {...}, "token": "..." }`

### User Management

#### Get User by ID
- **GET** `/api/users/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Access:** Owner or Admin
- **Response:** `{ "id": "...", "fullName": "...", ... }`

#### Get All Users
- **GET** `/api/users`
- **Headers:** `Authorization: Bearer <token>`
- **Access:** Admin only
- **Query params:** `?page=1&limit=10`
- **Response:** `{ "users": [...], "total": 10, "page": 1, "limit": 10 }`

#### Block User
- **PATCH** `/api/users/:id/block`
- **Headers:** `Authorization: Bearer <token>`
- **Access:** Owner or Admin
- **Response:** `{ "id": "...", "isActive": false, ... }`

### Health Check

#### Health Status
- **GET** `/health`
- **Response:** `{ "status": "ok", "message": "User Management Service is running" }`
