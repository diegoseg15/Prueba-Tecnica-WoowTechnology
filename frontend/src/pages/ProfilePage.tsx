import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, updateMe } from "../services/users.service";
import { useAuth } from "../contexts/AuthContext";
import type { User } from "../types/auth.types";

export const ProfilePage = () => {
  const { logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const me = await getMe();
      setProfile(me);
      setUser(me);
      setName(me.name);
    } catch (e: any) {
      logout();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onSave = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const res = await updateMe(name.trim());
      setProfile(res.user);
      setUser(res.user);
      setEditing(false);
    } catch {
      setError("No se pudo actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Cargando perfil...</div>;

  if (!profile) return null;

  return (
    <div style={{ maxWidth: 520, margin: "30px auto" }}>
      <h2>Perfil</h2>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Rol:</strong> {profile.role}
      </p>

      {!editing ? (
        <>
          <p>
            <strong>Nombre:</strong> {profile.name}
          </p>
          <button onClick={() => setEditing(true)}>Editar nombre</button>
        </>
      ) : (
        <div style={{ marginTop: 10 }}>
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={onSave} disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setName(profile.name);
                setError("");
              }}
              disabled={saving}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};
