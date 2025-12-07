import express from "express";
import pool from "./config/database_pomodoro.js";
import apiRouter from "./routes/index.js";

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/api/health", async (_req, res) => {
  try {
    const r = await pool.query("select 1 as ok");
    res.json({ db: "up", result: r.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ db: "down" });
  }
});

app.use("/api", apiRouter);

app.listen(PORT, HOST, () => {
  console.log(`API démarrée sur http://${HOST}:${PORT}`);
});
