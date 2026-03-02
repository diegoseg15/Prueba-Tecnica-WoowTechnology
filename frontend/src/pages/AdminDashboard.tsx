import { useEffect, useState } from "react";
import { getUsers } from "../services/admin.service";
import type { User } from "../types/auth.types";

/**
 * Dashboard administrativo.
 *
 * Responsabilidades:
 * - Listado paginado de usuarios
 * - Manejo de estado local (loading, error)
 */

export const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 5;

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers(page, limit);

      setUsers(data.users);
      setTotalPages(data.pagination.totalPages);
    } catch {
      setError("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  if (loading) return <div style={{ padding: 20 }}>Cargando usuarios...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "30px auto" }}>
      <h2>Dashboard Administrador</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", marginTop: 20 }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
