import { STORAGE_KEYS } from '../constants';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const setStoredToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const getStoredUser = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.USER);
};

export const setStoredUser = (user: string): void => {
  localStorage.setItem(STORAGE_KEYS.USER, user);
};

export const removeStoredUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const clearStorage = (): void => {
  removeStoredToken();
  removeStoredUser();
};