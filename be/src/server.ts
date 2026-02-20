import express from "express";

import dotenv from "dotenv";
dotenv.config();

import healthRouter from "./routes/health";
import usersRouter from "./routes/users";
import scoresRouter from "./routes/scores";
import leaderboardRouter from "./routes/leaderboard";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/users", usersRouter);
app.use("/scores", scoresRouter);
app.use("/leaderboard", leaderboardRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`leaderboard server running on port ${port}`);
});

