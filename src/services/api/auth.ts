import { api } from "./client";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const login =
  async (
    email: string,
    password: string
  ) => {
    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

    return response.data;
  };

export const register =
  async (
    data: RegisterData
  ) => {
    const response =
      await api.post(
        "/auth/register",
        data
      );

    return response.data;
  };