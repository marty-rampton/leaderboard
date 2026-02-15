import { Router } from "express";
import { getAllUsers, createUser, getUserTopScore } from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "username is required" });
    }

    const newUser = await createUser(username);
    res.status(201).json(newUser);
  } catch (err: any) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({ error: "username already exists" });
    }
  }
});

router.get("/:id/top-score", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "invalid userId" });
    }

    const result = await getUserTopScore(userId);

    if (!result) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch user top score" });
  }
});

export default router;