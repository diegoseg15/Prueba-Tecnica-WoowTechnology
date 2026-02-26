# Prueba Técnica - Desarrollador Backend/Frontend
## WoowTechnology

---

## 📋 Información General

**Tipo:** Prueba técnica asíncrona  
**Duración:** 48 horas desde recepción  
**Modalidad:** Remota - Desarrollo individual  
**Stack requerido:** NodeJS, TypeScript, React, PostgreSQL

---

## 🎯 Objetivo

Desarrollar una API REST para gestión de usuarios con autenticación, más un frontend básico para consumirla. El sistema debe demostrar buenas prácticas de arquitectura, seguridad y código limpio.

---

## 📦 Requerimientos del Sistema

### Backend (NodeJS + TypeScript)

**Funcionalidades obligatorias:**

1. **API REST** con los siguientes endpoints:
   - `POST /api/auth/register` - Registro de usuarios
   - `POST /api/auth/login` - Login (devuelve JWT)
   - `GET /api/users/me` - Obtener perfil del usuario autenticado
   - `PUT /api/users/me` - Actualizar perfil del usuario autenticado
   - `GET /api/users` - Listar usuarios (solo admin)

2. **Base de datos PostgreSQL:**
   - Tabla `users` con campos: id, name, email, password, role, createdAt, updatedAt
   - Los passwords deben estar hasheados (bcrypt)
   - Roles: `user` y `admin`

3. **Autenticación JWT:**
   - Implementar middleware de autenticación
   - Proteger endpoints que lo requieran
   - El token debe incluir: userId, email, role

4. **Validaciones:**
   - Email válido y único
   - Password mínimo 8 caracteres
   - Campos requeridos en cada endpoint

5. **Manejo de errores:**
   - Códigos HTTP apropiados (400, 401, 403, 404, 500)
   - Mensajes de error claros en español
   - Try-catch en operaciones asíncronas

### Frontend (React + TypeScript)

**Funcionalidades obligatorias:**

1. **Página de Login:**
   - Formulario con email y password
   - Validaciones básicas
   - Manejo de errores (credenciales inválidas)
   - Guardar token en localStorage

2. **Página de Perfil:**
   - Mostrar datos del usuario autenticado
   - Modo edición para actualizar nombre
   - Botón de logout
   - Redirección si no está autenticado

**Puntos opcionales (valor agregado):**
- Página de registro
- Dashboard de administrador
- Paginación en listado de usuarios
- Filtros o búsqueda
- Tests unitarios

---

## 🏗️ Requisitos Técnicos

### Backend

**Framework y librerías requeridas:**
- Express.js
- TypeScript
- PostgreSQL (puede usar Docker)
- bcryptjs (hash de passwords)
- jsonwebtoken (JWT)
- express-validator o joi (validaciones)

**Arquitectura esperada:**
```
src/
├── controllers/      # Lógica de controladores
├── services/        # Lógica de negocio
├── repositories/    # Acceso a datos
├── middlewares/     # Auth, validaciones, errores
├── routes/          # Definición de rutas
├── models/          # Interfaces y tipos
├── config/          # Configuración (DB, JWT)
└── server.ts        # Entry point
```

**Buenas prácticas esperadas:**
- Separación de responsabilidades (controllers, services, repositories)
- Variables de entorno para configuración sensible
- Prepared statements para queries SQL (prevenir SQL injection)
- No exponer passwords en respuestas
- DTOs para requests y responses
- README con instrucciones de instalación

### Frontend

**Framework y librerías requeridas:**
- React 18+
- TypeScript
- React Router (navegación)
- Axios o Fetch (llamadas HTTP)
- CSS (puede usar Tailwind, Material-UI o CSS puro)

**Estructura esperada:**
```
src/
├── components/      # Componentes reutilizables
├── pages/          # Páginas principales
├── services/       # Llamadas a API
├── contexts/       # Context API (auth)
├── types/          # Interfaces TypeScript
└── App.tsx         # Entry point
```

**Buenas prácticas esperadas:**
- Hooks (useState, useEffect, useContext)
- Manejo de estados (loading, error, success)
- Validaciones en formularios
- Componentes reutilizables
- TypeScript estricto (sin `any`)

---

## 📤 Entregables

**Debes enviar:**

1. **Repositorio Git** (GitHub, GitLab o Bitbucket):
   - Código fuente completo (backend + frontend)
   - Commits con mensajes descriptivos
   - Archivos .env.example con variables necesarias

2. **README.md completo** que incluya:
   - Descripción del proyecto
   - Prerrequisitos (Node, PostgreSQL)
   - Instrucciones de instalación paso a paso
   - Cómo ejecutar el proyecto (backend y frontend)
   - Cómo crear la base de datos
   - Endpoints disponibles con ejemplos
   - Credenciales de prueba (usuario admin y usuario normal)

3. **Script SQL** (opcional pero recomendado):
   - `database/schema.sql` con la estructura de tablas
   - `database/seed.sql` con datos de prueba

4. **Documento de decisiones** (archivo DECISIONS.md):
   - ¿Por qué elegiste esas librerías?
   - ¿Qué desafíos enfrentaste?
   - ¿Qué mejorarías con más tiempo?
   - ¿Cómo escalarías esta solución?

---

## 🎯 Criterios de Evaluación

### Backend (40%)

| Criterio | Puntos |
|----------|--------|
| Endpoints funcionan correctamente | 10 |
| Autenticación JWT implementada | 8 |
| Seguridad (hash passwords, prevent SQL injection) | 8 |
| Validaciones y manejo de errores | 6 |
| Arquitectura limpia y organización | 5 |
| Variables de entorno y configuración | 3 |

### Frontend (30%)

| Criterio | Puntos |
|----------|--------|
| Login funcional con guards | 8 |
| Perfil con edición funcional | 7 |
| Manejo de estados y errores | 6 |
| TypeScript y estructura | 5 |
| UI/UX básica | 4 |

### Documentación (20%)

| Criterio | Puntos |
|----------|--------|
| README claro y completo | 10 |
| Instrucciones de instalación funcionan | 6 |
| Documento de decisiones | 4 |

### Código Limpio (10%)

| Criterio | Puntos |
|----------|--------|
| Código legible y bien estructurado | 4 |
| Uso correcto de TypeScript | 3 |
| Git commits descriptivos | 3 |

**Total: 100 puntos**

---

## 🚨 Aspectos Críticos (Obligatorios)

Si falta alguno de estos, la prueba se considera **incompleta**:

❌ No subir passwords hasheados  
❌ No implementar autenticación JWT  
❌ SQL injection vulnerable  
❌ Exponer passwords en respuestas API  
❌ README sin instrucciones de instalación  

---

## 💡 Consejos

✅ **Empieza por lo básico:** Primero haz que funcione, luego optimiza  
✅ **Commits frecuentes:** Muestra tu proceso de desarrollo  
✅ **Lee bien los requisitos:** No agregues complejidad innecesaria  
✅ **Prueba tu código:** Asegúrate que las instrucciones de instalación funcionen  
✅ **Pregunta si tienes dudas:** Mejor aclarar antes que asumir  

---

## 📧 Forma de Entrega

**Enviar a:** woow.technology@woowtechnologysas.com

**Asunto:** Prueba Técnica - [Tu Nombre Completo]

**Contenido del correo:**
- Link al repositorio (asegúrate que sea público o agréganos como colaboradores)
- Tiempo invertido aproximado
- Cualquier nota o aclaración adicional

**Plazo:** 48 horas desde la recepción de este documento

---

## 🔒 Consideraciones

- La prueba es individual
- Puedes consultar documentación oficial, Stack Overflow, etc.
- Puedes usar IA como apoyo, pero debes entender el código que entregas
- El código será revisado y discutido en entrevista técnica posterior

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo usar otro ORM en lugar de SQL directo?**  
R: Sí, puedes usar TypeORM, Prisma o Sequelize si prefieres.

**P: ¿Es obligatorio Docker?**  
R: No, pero es un plus si lo incluyes.

**P: ¿Puedo usar Keycloak en lugar de JWT manual?**  
R: Sí, pero debe estar documentado y ser fácil de ejecutar.

**P: ¿Necesito hacer deploy?**  
R: No es necesario, solo que funcione en local.

**P: ¿Debo hacer tests?**  
R: No es obligatorio, pero suma puntos.

---

## 🎯 Casos de Uso Esperados

Tu aplicación debe poder:

1. **Registrar usuario nuevo:**
   - POST /api/auth/register
   - Body: `{ "name": "Juan Pérez", "email": "juan@example.com", "password": "12345678" }`
   - Response: `{ "message": "Usuario registrado exitosamente" }`

2. **Hacer login:**
   - POST /api/auth/login
   - Body: `{ "email": "juan@example.com", "password": "12345678" }`
   - Response: `{ "token": "eyJhbGci...", "user": { "id": "123", "name": "Juan Pérez", "email": "juan@example.com", "role": "user" } }`

3. **Obtener perfil:**
   - GET /api/users/me
   - Headers: `Authorization: Bearer eyJhbGci...`
   - Response: `{ "id": "123", "name": "Juan Pérez", "email": "juan@example.com", "role": "user" }`

4. **Actualizar perfil:**
   - PUT /api/users/me
   - Headers: `Authorization: Bearer eyJhbGci...`
   - Body: `{ "name": "Juan Carlos Pérez" }`
   - Response: `{ "message": "Perfil actualizado", "user": {...} }`

5. **Listar usuarios (solo admin):**
   - GET /api/users
   - Headers: `Authorization: Bearer eyJhbGci...` (token de admin)
   - Response: `{ "users": [...] }`

---

**¡Éxito en tu prueba técnica! 🚀**

Cualquier duda, escríbenos al correo mencionado.
