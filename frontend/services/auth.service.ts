import api from "@/lib/axios";
import type { ApiResult } from "@/types/api";
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types/auth";

export const authService = {
  register: async (payload: RegisterPayload) => {
    const { data } = await api.post<ApiResult<AuthResponse>>(
      "/auth/register",
      payload
    );
    return data;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await api.post<ApiResult<AuthResponse>>(
      "/auth/login",
      payload
    );
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get<ApiResult<User>>("/auth/profile");
    return data;
  },
};
