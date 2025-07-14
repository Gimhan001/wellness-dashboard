export type MoodType = 'Happy' | 'Stressed' | 'Tired' | 'Focused';

export interface WellnessLog {
  id: string;
  userId: string;
  mood: MoodType;
  sleepDuration: number;
  activityNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WellnessLogFormData {
  mood: MoodType;
  sleepDuration: number;
  activityNotes: string;
}

export interface WellnessLogResponse {
  logs: WellnessLog[];
  total: number;
  page: number;
  limit: number;
}