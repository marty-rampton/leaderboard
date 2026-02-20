# Leaderboard API

RESTful leaderboard backend built with Express, TypeScript, and PostgreSQL, featuring Dockerized local development and production-style database initialization.

## Quick Start (Docker)

```bash
cd be
cp .env.docker.example .env.docker
docker compose up --build
```

Then open:

http://localhost:3001/health

## Purpose

This project was built as a portfolio backend service to demonstrate professional backend development practices, including REST API design, relational database modeling, input validation, and containerized local development.

It simulates a production-style leaderboard system for a game, supporting user creation, score submission, and leaderboard queries.

## Engineering Practices Demonstrated

- RESTful API design
- Relational database schema design
- Input validation and error handling
- Environment-based configuration
- Containerized development with Docker Compose
- Database initialization via migration-style SQL scripts
- Separation of concerns (routes, validation, database layers)

## Architecture

The service follows a typical layered backend structure:

- **Routes**: Define HTTP endpoints
- **Validation**: Zod schemas validate incoming requests
- **Database layer**: PostgreSQL queries and schema management
- **Docker Compose**: Provides reproducible local environment

PostgreSQL initialization scripts automatically create tables and indexes when the container starts.

## Features

- Create and list users
- Submit scores for users
- Fetch leaderboard (top score per user)
- Fetch a user's top score
- Validate inputs with Zod
- Auto-create DB schema via PostgreSQL init scripts (Docker)

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Zod
- Docker / Docker Compose

## Project Layout

```text
be/
  src/
    server.ts
    routes/
    db/
    validation/
  db/init/
    001_create_users.sql
    002_create_scores.sql
    003_create_scores_indexes.sql
  docker-compose.yml
  Dockerfile
```

## Environment Variables

Backend env file: `be/.env` (local) or `be/.env.docker` (Docker Compose).

Example values:

```env
PORT=3001

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=leaderboard
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

## Run Locally (without Docker)

1. Start PostgreSQL and create a database named `leaderboard`.
2. Copy env file:
   ```bash
   cd be
   cp .env.example .env
   ```
3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```
4. Apply SQL in `be/db/init` to your local database (in order):
   - `001_create_users.sql`
   - `002_create_scores.sql`
   - `003_create_scores_indexes.sql`

Server default: `http://localhost:3001`

## Run with Docker Compose

From `be/`:

```bash
cp .env.docker.example .env.docker
docker compose up --build
```

This starts:

- PostgreSQL on `localhost:5432`
- API on `http://localhost:3001`

The SQL files in `be/db/init` are executed automatically when the Postgres container initializes.

## API Endpoints

Base URL: `http://localhost:3001`

### Health

- `GET /health`
- Response:
  ```json
  { "status": "ok" }
  ```

### Users

- `GET /users` - list all users
- `POST /users` - create user
  - Body:
    ```json
    { "username": "marty_01" }
    ```
  - Rules:
    - 1-32 chars
    - letters, numbers, underscore only
- `GET /users/:id/top-score` - get user top score

### Scores

- `POST /scores` - submit score
  - Body:
    ```json
    { "userId": 1, "score": 250 }
    ```
  - Rules:
    - `userId`: positive integer
    - `score`: integer, `0..1000000000`

### Leaderboard

- `GET /leaderboard`
- Optional query:
  - `limit` (integer `1..100`, default `10`)
- Example:
  - `GET /leaderboard?limit=5`

## Example cURL

```bash
# health
curl http://localhost:3001/health

# create user
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"username":"marty_01"}'

# submit score
curl -X POST http://localhost:3001/scores \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"score":250}'

# top 5 leaderboard entries
curl "http://localhost:3001/leaderboard?limit=5"

# top score for user 1
curl http://localhost:3001/users/1/top-score
```

## Database Schema

### `users`

- `id SERIAL PRIMARY KEY`
- `username TEXT UNIQUE NOT NULL`
- `created_at TIMESTAMP DEFAULT NOW()`

### `scores`

- `id SERIAL PRIMARY KEY`
- `user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE`
- `score INTEGER NOT NULL`
- `created_at TIMESTAMP DEFAULT NOW()`

### Indexes

- `idx_scores_user_id` on `scores(user_id)`
- `idx_scores_score` on `scores(score DESC)`
