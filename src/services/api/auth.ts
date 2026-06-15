import { api } from "./client";

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
    data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
  ) => {
    const response =
      await api.post(
        "/auth/register",
        data
      );

    return response.data;
  };

export const verifyOTP =
  async (
    email: string,
    otp: string
  ) => {
    const response =
      await api.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

    return response.data;
  };

export const resendOTP =
  async (
    email: string
  ) => {
    const response =
      await api.post(
        "/auth/resend-otp",
        {
          email,
        }
      );

    return response.data;
  };