import axiosInstance from "./axiosInstance";
import { ApiResponse } from "./common";

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const signup = async (request: SignupRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
    "/api/v1/auth/signup",
    request,
  );
  return response.data.data;
};

export const login = async (request: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
    "/api/v1/auth/login",
    request,
  );
  return response.data.data;
};
