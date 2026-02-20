import { Router } from "express";
import { getLeaderboard } from "../db/queries/leaderboard";
import { createLeaderboardSchema } from "../validation/leaderboard";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const parsed = createLeaderboardSchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0]?.message,
      })
    }

    const { limit } = parsed.data;

    const leaderboard = await getLeaderboard(limit);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch leaderboard" });
  }
});

export default router;