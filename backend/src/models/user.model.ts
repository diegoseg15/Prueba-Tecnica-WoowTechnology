export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdat: Date;
  updatedat: Date;
}
