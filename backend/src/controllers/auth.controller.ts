import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Error en la validación",
          errors: errors.array(),
        });
      }
      const user = await authService.register(req.body);

      return res.status(201).json({
        message: "El usuario se registró correctamente",
        user,
      });
    } catch (error: any) {
      if (error.message) {
        return res.status(400).json({
          message: error.message,
        });
      }

      console.error(error);

      return res.status(500).json({
        message: "Error del servidor",
      });
    }
  }
}
