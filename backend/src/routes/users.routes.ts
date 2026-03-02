import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { requireRole } from "../middlewares/requireRole.middleware";

const router = Router();
const controller = new UserController();

/**
 * Perfil del usuario autenticado
 *
 * Con autenticación 
 */

router.get("/me", authMiddleware, controller.getProfile.bind(controller));


/**
 * Actualización parcial del perfil
 *
 * Se valida input antes de llegar al controller
 */
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

/**
 * Listado global de usuarios
 *
 * - Requiere autenticación.
 * - Requiere rol admin
 */

router.get(
  "/",
  authMiddleware,
  requireRole("admin"),
  controller.getAll.bind(controller),
);

export default router;
