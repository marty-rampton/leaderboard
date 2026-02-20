import { pool } from "../index";


export async function createScore(userId: number, score: number) {
  const result = await pool.query(
    "INSERT INTO scores (user_id, score) VALUES ($1, $2) RETURNING *",
    [userId, score]
  );
  return result.rows[0];
};