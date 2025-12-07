import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { getPhases, putPhases } from "../controllers/phases.js";

const router = Router();

router.get("/phases", auth, getPhases);
router.put("/phases", auth, putPhases);

export default router;
