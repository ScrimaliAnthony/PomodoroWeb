import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing. Please set it in api.env");
}

export function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid Authorization format" });
    }

    const payload = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: payload.userId,
      email: payload.email,
      username: payload.username,
      issuedAt: payload.iat,
      expiresAt: payload.exp,
    };

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
