import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../validators/taskValidators.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);

router.post(
  "/",
  authMiddleware,
  createTaskValidator,
  handleValidation,
  createTask
);

router.put(
  "/:id",
  authMiddleware,
  updateTaskValidator,
  handleValidation,
  updateTask
);

router.delete("/:id", authMiddleware, deleteTask);

export default router;
