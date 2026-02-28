import { api } from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
