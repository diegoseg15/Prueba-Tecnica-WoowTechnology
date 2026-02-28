import { api } from "./api";
import type { User } from "../types/auth.types";

export interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getUsers = async (
  page: number,
  limit: number,
): Promise<UsersResponse> => {
  const { data } = await api.get<UsersResponse>(
    `/users?page=${page}&limit=${limit}`,
  );
  return data;
};
