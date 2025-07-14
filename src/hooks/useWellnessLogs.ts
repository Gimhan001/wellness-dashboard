import { useState, useEffect, useCallback, useMemo } from "react";

import { wellnessService } from "../services";

import { WellnessLog, WellnessLogFormData } from "../types";

interface UseWellnessLogsReturn {
  logs: WellnessLog[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  searchTerm: string;
  filteredLogs: WellnessLog[];
  fetchLogs: (page?: number) => Promise<void>;
  createLog: (data: WellnessLogFormData) => Promise<void>;
  updateLog: (id: string, data: WellnessLogFormData) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useWellnessLogs = (): UseWellnessLogsReturn => {
  const [logs, setLogs] = useState<WellnessLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLogs = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await wellnessService.getLogs(page, 10);
      setLogs(response.logs);
      setTotalPages(Math.ceil(response.total / 10));
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || "Failed to fetch wellness logs");
    } finally {
      setLoading(false);
    }
  }, []);

  const createLog = useCallback(async (data: WellnessLogFormData) => {
    try {
      setLoading(true);
      setError(null);
      const newLog = await wellnessService.createLog(data);
      setLogs((prev) => [newLog, ...prev]);
    } catch (err: any) {
      setError(err.message || "Failed to create wellness log");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLog = useCallback(
    async (id: string, data: WellnessLogFormData) => {
      try {
        setLoading(true);
        setError(null);
        const updatedLog = await wellnessService.updateLog(id, data);
        setLogs((prev) =>
          prev.map((log) => (log.id === id ? updatedLog : log))
        );
      } catch (err: any) {
        setError(err.message || "Failed to update wellness log");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteLog = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await wellnessService.deleteLog(id);
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete wellness log");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredLogs = useMemo(() => {
    if (!searchTerm) return logs;
    return logs.filter((log) =>
      log.activityNotes.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    totalPages,
    currentPage,
    searchTerm,
    filteredLogs,
    fetchLogs,
    createLog,
    updateLog,
    deleteLog,
    setSearchTerm,
    setCurrentPage,
  };
};
