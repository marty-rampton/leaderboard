import express from "express";
import { 
  getAllUsers, 
  createUser,
  createScore,
  getLeaderboard,
} from "./db";
import { create } from "node:domain";

const app = express();

app.use(express.json());

const PORT = 3001;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(500).json({ error: "username is required" });
    }

    const newUser = await createUser(username);
    return res.status(201).json(newUser);
  } catch (err: any) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({ error: "username already exists" });
    }

    res.status(500).json({ error: "failed to create user" });
  }
});

app.post("/scores", async (req, res) => {
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

app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch leaderboard" });
  }
});

app.listen(PORT, () => {
  console.log(`leaderboard server running on port ${PORT}`);
});

