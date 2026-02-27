import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { requireRole } from "../middlewares/requireRole.middleware";

const router = Router();
const controller = new UserController();

router.get("/me", authMiddleware, controller.getProfile.bind(controller));

router.put(
  "/me",
  authMiddleware,
  [
    body("name")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 2 })
      .withMessage("El nombre debe tener al menos 2 caracteres"),
  ],
  controller.updateProfile.bind(controller),
);

router.get(
  "/",
  authMiddleware,
  requireRole("admin"),
  controller.getAll.bind(controller),
);

export default router;
