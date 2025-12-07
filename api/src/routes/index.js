import { Router } from "express";
import authRouter from "./auth.js";
import tasksRouter from "./tasks.js";
import phasesRouter from "./phases.js";
import cycleRouter from "./cycle.js";
import usersRouter from "./users.js";

const router = Router();

router.use(authRouter);
router.use(tasksRouter);
router.use(phasesRouter);
router.use(cycleRouter);
router.use(usersRouter);

export default router;
