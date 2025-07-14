import { apiService } from "./api";

import { API_ENDPOINTS } from "../constants";
import {
  WellnessLog,
  WellnessLogFormData,
  WellnessLogResponse,
} from "../types";

export const wellnessService = {
  getLogs: async (
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<WellnessLogResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await apiService.get<WellnessLogResponse>(
      `${API_ENDPOINTS.WELLNESS.LOGS}?${params}`
    );
    return response.data;
  },

  createLog: async (data: WellnessLogFormData): Promise<WellnessLog> => {
    const response = await apiService.post<WellnessLog>(
      API_ENDPOINTS.WELLNESS.CREATE,
      data
    );
    return response.data;
  },

  updateLog: async (
    id: string,
    data: WellnessLogFormData
  ): Promise<WellnessLog> => {
    const response = await apiService.put<WellnessLog>(
      `${API_ENDPOINTS.WELLNESS.UPDATE}/${id}`,
      data
    );
    return response.data;
  },

  deleteLog: async (id: string): Promise<void> => {
    await apiService.delete(`${API_ENDPOINTS.WELLNESS.DELETE}/${id}`);
  },
};
