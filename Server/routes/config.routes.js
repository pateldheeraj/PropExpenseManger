import { Router } from "express";
import {
  createConfig,
  getAllConfigs,
  getConfigById,
  deleteConfig,
} from "../controllers/config.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// All config routes are protected
router.use(authMiddleware);

router.post("/", createConfig);
router.get("/", getAllConfigs);
router.get("/:id", getConfigById);
router.delete("/:id", deleteConfig);

export default router;
