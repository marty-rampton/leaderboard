import { Router } from "express";
import { getLeaderboard } from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch leaderboard" });
  }
});

export default router;