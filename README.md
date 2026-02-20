# Leaderboard API

Express + TypeScript + PostgreSQL backend for a simple game leaderboard.

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
DB_USER=postgres
DB_HOST=localhost
DB_URL=postgres://postgres:postgres@localhost:5432/leaderboard
DB_NAME=leaderboard
DB_PASSWORD=postgres
DB_PORT=5432
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
