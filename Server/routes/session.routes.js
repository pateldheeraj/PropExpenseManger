import express from "express";
import {
  createSessionWithAccounts,
  getSessions,
  getSessionById
} from "../controllers/session.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSessionWithAccounts);
router.get("/", getSessions);
router.get("/:id", getSessionById);

export default router;
