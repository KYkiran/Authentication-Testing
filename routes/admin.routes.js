import express from "express";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import {
  getAllUsers,
  deleteUser,
  getAllTasksAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// All routes here are admin-only
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

// Optional: separate admin view of tasks
router.get(
  "/tasks",
  authMiddleware,
  roleMiddleware("admin"),
  getAllTasksAdmin
);

export default router;
