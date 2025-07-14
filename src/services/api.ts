import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { getStoredToken, clearStorage } from "../utils/storage";

import { API_BASE_URL, HTTP_STATUS } from "../constants";
import { ApiResponse, ApiError } from "../types";

class ApiService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config: import("axios").InternalAxiosRequestConfig) => {
        const token = getStoredToken();
        if (token) {
          if (!config.headers)
            config.headers = {} as import("axios").AxiosRequestHeaders;
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          clearStorage();
          window.location.href = "/login";
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): ApiError {
    const defaultError: ApiError = {
      message: "An unexpected error occurred",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };

    if (error.response) {
      return {
        message: error.response.data?.message || defaultError.message,
        status: error.response.status,
        errors: error.response.data?.errors,
      };
    }

    if (error.request) {
      return {
        message: "Network error. Please check your connection.",
        status: 0,
      };
    }

    return defaultError;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.api.get(
      url,
      config
    );
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.api.post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.api.put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.api.delete(
      url,
      config
    );
    return response.data;
  }
}

export const apiService = new ApiService();
