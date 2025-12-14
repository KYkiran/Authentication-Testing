import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/authValidators.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", registerValidator, handleValidation, register);
router.post("/login", loginValidator, handleValidation, login);
router.post("/logout", logout); 

export default router;
