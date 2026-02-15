import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "leaderboard",
  password: "passw0rd",
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log("Connected to PostgreSQL");
    client.release();
  })
  .catch(err => {
    console.error("PostgreSQL connection error: ", err.message);
  });

export async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

export async function createUser(username: string) {
  const result = await pool.query(
    "INSERT INTO users (username) VALUES ($1) RETURNING *",
    [username]
  );
  return result.rows[0];
}

export async function createScore(userId: number, score: number) {
  const result = await pool.query(
    "INSERT INTO scores (user_id, score) VALUES ($1, $2) RETURNING *",
    [userId, score]
  );
  return result.rows[0];
}

export async function getLeaderboard() {
  const result = await pool.query(`
    SELECT users.username, MAX(scores.score) AS score
    FROM scores
    JOIN users ON scores.user_id = users.id
    GROUP BY users.id, users.username
    ORDER BY score DESC
    LIMIT 10
  `);

  return result.rows;
}