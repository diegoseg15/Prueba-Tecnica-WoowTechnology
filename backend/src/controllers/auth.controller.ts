import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

/**
 * Controlador de autenticación
 *
 * Responsabilidad:
 * - Orquestar request/response
 * - Validar entrada
 * - Delegar lógica de negocio al Service
 *
 * No contiene lógica de negocio
 */

export class AuthController {

  // Registro de un usuario nuevo
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
        message: "Usuario registrado exitosamente",
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

  // Inicio de sesión
  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Error en la vlidación",
          errors: errors.array(),
        });
      }

      const result = await authService.login(req.body);

      // retorna el token y datos del usuario
      return res.status(200).json({
        message: "Login exitoso",
        token: result.token,
        user: result.user,
      });
    } catch (error: any) {
      const status = error.statuscode || 500;

      if (status === 401) {
        return res.status(401).json({
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
