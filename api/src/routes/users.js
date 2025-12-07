import { Router } from "express";
import { getUsers, registerUser } from "../controllers/users.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", registerUser);

export default router;
