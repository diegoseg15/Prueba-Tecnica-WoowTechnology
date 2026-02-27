import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { body } from "express-validator";

const router = Router();
const controller = new AuthController();

export default router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("El nombre es un campo requerido"),
    body("email")
      .isEmail()
      .withMessage(
        "El correo es un campo requerido y debe ser un correo válido",
      ),
    body("password")
      .isLength({ min: 8 })
      .withMessage(
        "La contraseña es un campo requerido y debe tener 8 caracteres como mínimo",
      ),
  ],
  controller.register.bind(controller),
);
