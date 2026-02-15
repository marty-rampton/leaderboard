import express from "express";

const app = express();

const PORT = 3001;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`leaderboard server running on port ${PORT}`);
});