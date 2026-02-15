import fs from "fs";
import path from "path";
import { pool } from "../index";

async function initDatabase() {
  try {
    const schemaPath = path.resolve(__dirname, "../../../db/schema.sql");

    const schema = fs.readFileSync(schemaPath, "utf-8");

    await pool.query(schema);

    console.log("database schema initialized successfully");

    process.exit(0);
  } catch (err) {
    console.error("failed to initialize database: ", err);
    process.exit(1);
  }
}

initDatabase();