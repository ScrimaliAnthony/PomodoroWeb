import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { login, getMe } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
router.get("/me", auth, getMe);

export default router;
