export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}