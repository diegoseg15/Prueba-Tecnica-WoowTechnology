import jwt from "jsonwebtoken";

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
