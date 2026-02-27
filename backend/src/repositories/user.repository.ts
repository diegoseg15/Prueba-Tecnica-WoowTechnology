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
      "Insert into users (name, email, password, role) values ($1, $2, $3, $4) Returning id, name, email, role";
    const values = [user.name, user.email, user.password, user.role];

    const { rows } = await pool.query(sql, values);
    return rows[0];
  }
}
