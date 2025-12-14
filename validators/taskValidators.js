import { body } from "express-validator";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "done"])
    .withMessage("Status must be one of: pending, in-progress, done"),
];

export const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "done"])
    .withMessage("Status must be one of: pending, in-progress, done"),
];
