import { pool } from "../index";

export async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export async function createUser(username: string) {
  const result = await pool.query(
    "INSERT INTO users (username) VALUES ($1) RETURNING *",
    [username]
  );
  return result.rows[0];
};

export async function getUserTopScore(userId: number) {
  const result = await pool.query(
    `
    SELECT users.id, users.username, MAX(scores.score) AS score
    FROM users
    LEFT JOIN scores ON scores.user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id, users.username
    `,
    [userId]
  );

  return result.rows[0];
};