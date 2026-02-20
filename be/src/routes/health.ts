import { Router } from "express";
import { pool } from "../db/pool";

const router = Router();

router.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({
      status: "ok",
      database: "connected"
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      database: "disconnected"
    });
  }
});

export default router;