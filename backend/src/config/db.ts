import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/**
 * Pool de conexiones a PostgreSQL.
 *
 * Decisión:
 * - Se utiliza connection pooling para evitar crear una nueva conexión
 *   por cada request, optimizando rendimiento y consumo de recursos.
 * - La configuración se obtiene desde variables de entorno para
 *   separar infraestructura de código.
 */

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});
