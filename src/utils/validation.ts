import { VALIDATION_RULES } from '../constants';
import { ValidationErrors, LoginFormData, SignupFormData, WellnessLogFormData } from '../types';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
    return VALIDATION_RULES.EMAIL.MESSAGE;
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return VALIDATION_RULES.PASSWORD.MESSAGE;
  }
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Confirm password is required';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

export const validateActivityNotes = (notes: string): string | null => {
  if (notes.length > VALIDATION_RULES.ACTIVITY_NOTES.MAX_LENGTH) {
    return VALIDATION_RULES.ACTIVITY_NOTES.MESSAGE;
  }
  return null;
};

export const validateSleepDuration = (duration: number): string | null => {
  if (duration < VALIDATION_RULES.SLEEP_DURATION.MIN || duration > VALIDATION_RULES.SLEEP_DURATION.MAX) {
    return VALIDATION_RULES.SLEEP_DURATION.MESSAGE;
  }
  return null;
};

export const validateLoginForm = (data: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateSignupForm = (data: SignupFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  return errors;
};

export const validateWellnessLogForm = (data: WellnessLogFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.mood) errors.mood = 'Mood is required';
  
  const sleepError = validateSleepDuration(data.sleepDuration);
  if (sleepError) errors.sleepDuration = sleepError;
  
  const notesError = validateActivityNotes(data.activityNotes);
  if (notesError) errors.activityNotes = notesError;
  
  return errors;
};