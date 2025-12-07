import pool from "../config/database_pomodoro.js";
import bcrypt from "bcrypt";
import { createDefaultDataForUser } from "../services/userSetup.js";

export async function getUsers(_req, res) {
  try {
    const getResult = await pool.query(
      `
        SELECT
          id,
          username,
          email,
          created_at,
          updated_at
        FROM users
        ORDER BY id ASC
      `
    );

    res.json(getResult.rows);
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function registerUser(req, res) {
  const client = await pool.connect();

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      client.release();
      return res
        .status(400)
        .json({ error: "username, email and password are required" });
    }

    await client.query("BEGIN");

    const passwordHash = await bcrypt.hash(password, 10);

    const insertResult = await client.query(
      `
        INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at, updated_at
      `,
      [username, email, passwordHash]
    );

    const newUser = insertResult.rows[0];

    await createDefaultDataForUser(client, newUser.id);

    await client.query("COMMIT");

    res.status(201).json(newUser);
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Error during ROLLBACK:", rollbackError);
    }

    console.error("Error in POST /api/users:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
}
