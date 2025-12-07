import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { getTasks, createTask, putTask, deleteTask } from "../controllers/tasks.js";

const router = Router();

router.get("/tasks", auth, getTasks);
router.post("/tasks", auth, createTask);
router.put("/tasks/:id", auth, putTask);
router.delete("/tasks/:id", auth, deleteTask);

export default router;
