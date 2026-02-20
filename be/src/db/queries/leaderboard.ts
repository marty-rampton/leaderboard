import { pool } from "../index"

export async function getLeaderboard(limit: number = 10) {
  const result = await pool.query(
    `
    SELECT users.username, MAX(scores.score) AS score
    FROM scores
    JOIN users ON scores.user_id = users.id
    GROUP BY users.id, users.username
    ORDER BY score DESC
    LIMIT $1
    `,
    [limit]);

  return result.rows;
}