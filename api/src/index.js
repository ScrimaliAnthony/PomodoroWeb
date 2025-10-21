import express from "express";
import pool from "./config/database_pomodoro.js"

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT;
const HOST = process.env.HOST;

app.get("/health", async (_req, res) => {
  try {
    const r = await pool.query("select 1 as ok");
    res.json({ db: "up", result: r.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ db: "down" });
  }
});

app.listen(PORT, () => {
  console.log(`API démarrée sur http://${HOST}:${PORT}`);
});

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});
