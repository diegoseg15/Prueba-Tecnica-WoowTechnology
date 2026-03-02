import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

/**
 * Ruta protegida para administradores.
 *
 * Decisión:
 * - Valida si existe el rol y si es admin
 */

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { token, user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  if (!token) return <Navigate to="/login" replace />;
  if (!user) return <p>Cargando usuario...</p>;
  if (user.role !== "admin") return <Navigate to="/profile" replace />;

  return <>{children}</>;
};
