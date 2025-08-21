import express from "express";
import { getAgents, addAgent } from "../controllers/agentContr.js";
const router = express.Router();

router.get("/", getAgents);
router.post("/", addAgent);

export default router;
