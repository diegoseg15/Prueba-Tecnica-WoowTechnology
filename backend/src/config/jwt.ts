import jwt from "jsonwebtoken";

/**
 * Genera un JWT firmado para autenticación
 *
 * @param payload Información mínima necesaria para autorización (no datos sencibles).
 * @returns Token JWT firmado con expiración de 1 hora.
 * @throws Error si el secreto no está configurado.
 *
 * Decisiones:
 * - Solo se incluye información esencial (userId, email, role).
 * - Expiración corta (1h) como medida de seguridad.
 * - El secreto se obtiene desde variables de entorno.
 */

export const signToken = (payload: {
  userId: string;
  email: string;
  role: "user" | "admin";
}) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Secreto no está configurado");
  }

  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
