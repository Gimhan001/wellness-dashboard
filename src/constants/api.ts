export const API_BASE_URL = 'https://18d1036c-d4d5-47eb-918c-255c4c300661.mock.pstmn.io'; // Make sure to add this to your .env file

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh',
  },
  WELLNESS: {
    LOGS: '/wellness-logs',
    CREATE: '/wellness-logs',
    UPDATE: '/wellness-logs',
    DELETE: '/wellness-logs',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
