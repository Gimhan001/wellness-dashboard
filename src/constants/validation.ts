export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: 'Please enter a valid email address',
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MESSAGE: 'Password must be at least 8 characters long',
  },
  ACTIVITY_NOTES: {
    MAX_LENGTH: 200,
    MESSAGE: 'Activity notes cannot exceed 200 characters',
  },
  SLEEP_DURATION: {
    MIN: 0,
    MAX: 12,
    MESSAGE: 'Sleep duration must be between 0 and 12 hours',
  },
} as const;

export const MOOD_OPTIONS = [
  { value: 'Happy', label: 'Happy' },
  { value: 'Stressed', label: 'Stressed' },
  { value: 'Tired', label: 'Tired' },
  { value: 'Focused', label: 'Focused' },
] as const;
