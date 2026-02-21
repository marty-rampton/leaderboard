import express from "express";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

import healthRouter from "./routes/health";
import usersRouter from "./routes/users";
import scoresRouter from "./routes/scores";
import leaderboardRouter from "./routes/leaderboard";
import { pool } from "./db/pool";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/health", healthRouter);
app.use("/users", usersRouter);
app.use("/scores", scoresRouter);
app.use("/leaderboard", leaderboardRouter);

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`leaderboard server running on port ${port}`);
});

server.on("close", () => {
  console.log("Server fully closed");
});

let isShuttingDown = false;

async function shutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`${signal} received, shutting down gracefully...`);

  server.close();

  try {
    await pool.end();
    console.log("Database pool closed");

    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));