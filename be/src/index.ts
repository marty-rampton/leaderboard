import express from "express";

import usersRouter from "./routes/users";
import scoresRouter from "./routes/scores";
import leaderboardRouter from "./routes/leaderboard";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/scores", scoresRouter);
app.use("/leaderboard", leaderboardRouter);

const PORT = 3001;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`leaderboard server running on port ${PORT}`);
});

