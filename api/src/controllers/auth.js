import pool from "../config/database_pomodoro.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing. Please set it in api.env");
}

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email and password are required " });
    }

    const userResult = await pool.query(
      `
        SELECT id, username, email, password_hash
        FROM users
        WHERE email = $1
      `,
      [email]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in POST /api/login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export function getMe(req, res) {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      username: req.user.username,
    },
    tokenInfo: {
      issuedAt: req.user.issuedAt,
      expiresAt: req.user.expiresAt,
    },
  });
}
