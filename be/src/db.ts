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