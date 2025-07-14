export interface ValidationErrors {
  [key: string]: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: ValidationErrors;
}
