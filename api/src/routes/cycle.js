import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { getCycle, putCycle } from "../controllers/cycle.js";

const router = Router();

router.get("/cycle", auth, getCycle);
router.put("/cycle", auth, putCycle);

export default router;
