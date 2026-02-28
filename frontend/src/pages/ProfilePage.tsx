import { useAuth } from "../contexts/AuthContext";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>Bienvenido, {user.name}</h2>
      <p>
        <strong>Correo:</strong> {user.email}
      </p>
      <p>
        <strong>Rol:</strong> {user.role}
      </p>

      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};
