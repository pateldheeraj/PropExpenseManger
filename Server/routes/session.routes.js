import express from "express";
import {
  createSessionWithAccounts,
  getSessions,
  getSessionById,
  addAccountToSession,
  updateAccount,
  deleteAccount
} from "../controllers/session.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSessionWithAccounts);
router.get("/", getSessions);
router.get("/:id", getSessionById);
router.post("/:id/accounts", addAccountToSession);
router.patch("/accounts/:id", updateAccount);
router.delete("/accounts/:id", deleteAccount);

export default router;
