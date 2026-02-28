import { pool } from "../config/db";
import { User } from "../models/user.model";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const sql = "Select * from users Where email = $1";

    const { rows } = await pool.query(sql, [email]);
    return rows[0] || null;
  }

  async create(user: {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
  }): Promise<User> {
    const sql =
      "Insert into users (name, email, password, role, createdAt) values ($1, $2, $3, $4, now()) Returning id, name, email, role, createdAt";
    const values = [user.name, user.email, user.password, user.role];

    const { rows } = await pool.query(sql, values);
    return rows[0];
  }

  async findById(id: string) {
    const sql = "Select id, email, name, role from users Where id = $1";

    const { rows } = await pool.query(sql, [id]);

    return rows[0] || null;
  }

  async updateName(id: string, name: string) {
    const sql =
      "Update users Set name = $1, updatedAt = now() Where id = $2 Returning id, name, email, role, createdAt, updatedAt";
    const { rows } = await pool.query(sql, [name, id]);

    return rows[0] || null;
  }

  async findAll(limit: number, offset: number) {
    const sql =
      "Select id, name, email, role from users Order by createdAt Desc Limit $1 Offset $2";
    const { rows } = await pool.query(sql, [limit, offset]);
    return rows;
  }

  async countAll() {
    const sql = "Select Count(*) From users";
    const { rows } = await pool.query(sql);
    return Number(rows[0].count);
  }
}
