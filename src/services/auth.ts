import { apiService } from "./api";

import { API_ENDPOINTS } from "../constants";
import { AuthResponse, LoginFormData, SignupFormData } from "../types";

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },

  signup: async (data: SignupFormData): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      {
        email: data.email,
        password: data.password,
      }
    );
    return response.data;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    return response.data;
  },
};
