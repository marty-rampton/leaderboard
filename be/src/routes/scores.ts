import { Router } from "express";
import { createScore } from "../db";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userId, score } = req.body;

    if (userId === undefined || score === undefined) {
      return res.status(400).json({ error: "userId and score are required" });
    }

    const newScore = await createScore(userId, score);
    res.status(201).json(newScore);
  } catch (err: any) {
    console.error(err);

    if (err.code === "23503") {
      return res.status(400).json({ error: "invalid userId" });
    }

    res.status(500).json({ error: "failed to create score" });
  }
});

export default router;