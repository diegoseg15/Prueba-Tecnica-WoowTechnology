import { Response } from "express";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../types/express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
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
