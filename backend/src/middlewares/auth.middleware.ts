import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express";

/**
 * Middleware de autenticación basado en JWT
 *
 * Responsabilidad:
 * - Extraer token del header Authorization
 * - Validar firma y expiración
 *
 * Decisión:
 * - El middleware no consulta base de datos
 * - Confía en la integridad del JWT firmado
 * - Diseñado para ser usado antes de cualquier ruta protegida
 */

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No autenticado. Token requerido.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Validación de token, expiración y extracción de payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      email: string;
      role: "user" | "admin";
    };

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
};
