# Leaderboard Backend

A production-style leaderboard backend built with Node.js, Express, PostgreSQL, and TypeScript.

This service allows users to register, submit scores, and view ranked leaderboard results.

## Features

- Create users
- Submit scores
- Retrieve leaderboard rankings
- Retrieve a user's top score
- Input validation using Zod
- PostgreSQL relational schema with foreign keys
- Indexed queries for performance
- Environment-based configuration
- Automatic schema initialization

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Zod validation
- dotenv
- WSL (Linux development environment)

## Project Structure

```
src/
  db/
    index.ts
    scripts/init.ts
  routes/
    users.ts
    scores.ts
    leaderboard.ts
  validation/
    users.ts
    scores.ts
  index.ts

db/
  schema.sql
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env` file:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=leaderboard
DB_PASSWORD=yourpassword
DB_PORT=5432
```

### 3. Initialize database schema

```bash
npm run db:init
```

### 4. Run server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3001
```

## API Endpoints

### Create user

```
POST /users
```

Body:

```json
{
  "username": "marty"
}
```

---

### Submit score

```
POST /scores
```

Body:

```json
{
  "userId": 1,
  "score": 250
}
```

---

### Get leaderboard

```
GET /leaderboard
```

---

### Get user's top score

```
GET /users/:id/top-score
```

---

## Database Schema

Two tables:

**Users**
- id (primary key)
- username (unique)
- created_at

**Scores**
- id (primary key)
- user_id (foreign key)
- score
- created_at

Indexes optimize leaderboard queries.

---

## Development Environment

Built and tested using:

- Ubuntu (WSL)
- PostgreSQL
- Node.js (nvm)

---

## Future Improvements

- Authentication
- Rate limiting
- Pagination
- Docker containerization
- Deployment to cloud provider
