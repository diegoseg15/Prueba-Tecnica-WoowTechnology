import { api } from "./api";
import type { User } from "../types/auth.types";

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (name: string): Promise<{ message: string; user: User }> => {
  const { data } = await api.put<{ message: string; user: User }>("/users/me", { name });
  return data;
};