import { Router } from "express";
import {
  getMe,
  loginAdmin,
  registerAdmin,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";

const router = Router();

router.post("/register", validate(registerSchema), registerAdmin);
router.post("/login", validate(loginSchema), loginAdmin);
router.get("/me", protect, getMe);

export default router;
