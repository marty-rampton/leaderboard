import express from "express";

import dotenv from "dotenv";
dotenv.config();

import healthRouter from "./routes/health";
import usersRouter from "./routes/users";
import scoresRouter from "./routes/scores";
import leaderboardRouter from "./routes/leaderboard";
import { pool } from "./db/pool";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/users", usersRouter);
app.use("/scores", scoresRouter);
app.use("/leaderboard", leaderboardRouter);

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`leaderboard server running on port ${port}`);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");

  server.close(async () => {
    await pool.end();
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");

  server.close(async () => {
    await pool.end();
    console.log("HTTP server closed");
    process.exit(0);
  });
});