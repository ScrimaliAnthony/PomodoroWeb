import express from "express";
import pool from "./config/database_pomodoro.js";
import apiRouter from "./routes/index.js";
import cors from "cors";

const PORT = process.env.API_PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const FRONT_URL = process.env.FRONTEND_URL || "http://localhost";
const FRONT_PORT = Number(process.env.FRONTEND_PORT) || 5173;

const app = express();

app.use(
  cors({
    origin: `${FRONT_URL}:${FRONT_PORT}`,
  })
);

app.use(express.json());

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
