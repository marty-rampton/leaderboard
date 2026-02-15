import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Sh@11120",
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log("Connected to PostgreSQL");
    client.release();
  })
  .catch(err => {
    console.error("PostgreSQL connection error: ", err.message);
  });