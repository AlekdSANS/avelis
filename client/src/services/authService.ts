import { apiClient } from "./apiClient";
import type { ApiResponse, AuthResponse, User } from "../types";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newsletterConsent?: boolean;
}

export const authService = {
  async login(input: LoginInput): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", input);

    return response.data;
  },

  async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      input,
    );

    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me");

    return response.data.data;
  },
};
