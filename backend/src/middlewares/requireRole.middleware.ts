import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/express";

/**
 * Middleware de autorización basado en roles
 *
 * @param role Rol requerido para acceder al recurso.
 *
 * Decisión:
 * - Separar autenticación de autorización (requireRole)
 *   mantiene responsabilidades claras.
 */

export const requireRole = (role: "admin" | "user") => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "No autenticado",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        message: "No autorizado",
      });
    }

    next();
  };
};