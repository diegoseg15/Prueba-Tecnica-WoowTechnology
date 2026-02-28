# 📌 Prueba Técnica – WoowTechnology

**Full Stack Developer (Node.js + React + PostgreSQL)**

---

## 📖 Descripción

Este proyecto consiste en el desarrollo de una API REST para gestión de usuarios con autenticación JWT y un frontend en React que consume dicha API.

Incluye:

- Registro de usuarios
- Login con JWT
- Perfil autenticado (`/users/me`)
- Edición de perfil
- Listado de usuarios (solo admin) con paginación
- Arquitectura limpia en backend (Controller → Service → Repository)
- Frontend con Context API y guards de rutas
- Docker para base de datos, backend y frontend

---

# 🧱 Stack Tecnológico

## Backend

- Node.js v20.18.3
- TypeScript
- Express
- PostgreSQL 15
- JWT
- bcrypt
- Docker

## Frontend

- React 19
- TypeScript
- Vite
- Axios
- React Router

---

# 🚀 Cómo ejecutar el proyecto

## Opción recomendada: Docker (todo el stack)

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/diegoseg15/Prueba-Tecnica-WoowTechnology.git
cd Prueba-Tecnica-WoowTechnology
```

### 2️⃣ Configurar variables de entorno

Crear archivo `.env` en la raíz:

```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=admin-post
DB_PASSWORD=b4FeVp4rDuUHM
DB_NAME=woow_pt
JWT_SECRET=gXyBVBfMQwP8Z0MTzf6s8v9
```

### 3️⃣ Levantar contenedores

```bash
docker-compose up -d
```

### 4️⃣ Accesos

- Backend → [http://localhost:3000](http://localhost:3000)
- Frontend → [http://localhost:5173](http://localhost:5173)
- PostgreSQL → localhost:5432

---

# 🗄️ Base de Datos

La base de datos se inicializa automáticamente mediante:

```
./docker/postgres/init.sql
```

Tabla principal:

```sql
users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

Los passwords están hasheados con bcrypt.

---

# 🔐 Endpoints API

Base URL:

```
http://localhost:3000/api
```

---

## 📌 Registro

### POST `/auth/register`

```json
{
  "name": "Diego Segovia",
  "email": "diegofersv@gmail.com",
  "password": "admin123456"
}
```

Response:

```json
{
  "message": "Usuario registrado exitosamente"
}
```

---

## 📌 Login

### POST `/auth/login`

```json
{
  "email": "diegofersv@gmail.com",
  "password": "admin123456"
}
```

Response:

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "name": "Diego Segovia",
    "email": "diegofersv@gmail.com",
    "role": "admin"
  }
}
```

---

## 📌 Obtener perfil

### GET `/users/me`

Header:

```
Authorization: Bearer <TOKEN>
```

Response:

```json
{
  "id": "uuid",
  "email": "diegofersv@gmail.com",
  "name": "Diego Segovia",
  "role": "admin"
}
```

---

## 📌 Listado de usuarios (solo admin)

### GET `/users?page=1&limit=5`

Header:

```
Authorization: Bearer <TOKEN_ADMIN>
```

Response:

```json
{
  "users": [
    {
      "id": "uuid",
      "name": "Diego Segovia",
      "email": "diegofersv@gmail.com",
      "role": "admin"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

---

# 🎨 Frontend

## Funcionalidades implementadas

- Login con validaciones
- Registro
- Guardado de token en localStorage
- Context API para autenticación
- PrivateRoute
- AdminRoute (control por rol)
- Perfil con edición de nombre
- Dashboard admin con paginación
- Manejo de loading y errores

---

# 📂 Estructura del Proyecto

## Backend

```
backend/src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
└── server.ts
```

## Frontend

```
frontend/src/
├── components/
├── contexts/
├── pages/
├── services/
├── types/
└── App.tsx
```

---

# 🔒 Seguridad Implementada

- Passwords hasheados con bcrypt
- JWT con expiración
- Middleware de autenticación
- Middleware de autorización por rol
- Queries parametrizadas (prevención de SQL injection)
- No se exponen passwords en respuestas

---

# 🧠 Decisiones Técnicas

- Docker para entorno reproducible
- JWT manual para control explícito del flujo
- Axios con interceptor para manejo automático de token

---

# 👤 Autor

Diego Segovia
