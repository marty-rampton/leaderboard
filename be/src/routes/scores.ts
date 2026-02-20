import { Router } from "express";
import { createScore } from "../db/queries/scores";
import { createScoreSchema } from "../validation/scores";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const parsed = createScoreSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0]?.message || "Invalid input",
      });
    }

    const { userId, score } = parsed.data;

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