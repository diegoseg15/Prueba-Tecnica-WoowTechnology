import { Response } from "express";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../types/express";
import { UserService } from "../services/user.service";

const userService = new UserService();

/**
 * Controlador de usuarios
 *
 * Requiere middleware previo de autenticación
 * para el envío de `req.user` desde el JWT
 */

export class UserController {
  // Se obtiene el perfíl del usuario autenticado
  async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.userId;

      const user = await userService.getProfile(userId);

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Error interno del servidor",
      });
    }
  }

  // Actualizar el nombre del usuario
  async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Errores de validación",
          errors: errors.array(),
        });
      }

      const userId = req.user!.userId;
      const { name } = req.body;

      const updatedUser = await userService.updateProfile(userId, name);

      // retorna los datos actualizados
      return res.status(200).json({
        message: "Perfil actualizado",
        user: updatedUser,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Error interno del servidor",
      });
    }
  }

/**
   * Listado paginado de usuarios.
   *
   * Decisión:
   * - Paginación para evitar consultas masivas.
   * - Valores por defecto (page=1, limit=10).
   */  
  async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await userService.getAllUsers(page, limit);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        message: "Error interno del servidor",
      });
    }
  }
}
