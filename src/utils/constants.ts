import { API_CONFIG } from '../config/api.config';

export const API_URLS = {
  AUTH_BASE: API_CONFIG.AUTH_BASE_URL,
  ACTIONS_BASE: API_CONFIG.ACTIONS_BASE_URL,
} as const;

export const ENDPOINTS = {
  LOGIN: '/api/Authentication/Login',
  ACTIONS_LIST: '/api/v1/actions/admin-list',
  ACTIONS_CREATE: '/api/v1/actions/admin-add',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_NUMBER: 0,
  DEFAULT_PAGE_SIZE: 10,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
} as const;
