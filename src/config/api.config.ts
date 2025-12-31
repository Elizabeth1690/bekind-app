export const API_CONFIG = {
  AUTH_BASE_URL: import.meta.env.VITE_AUTH_BASE_URL,
  ACTIONS_BASE_URL: import.meta.env.VITE_ACTIONS_BASE_URL,
  TIMEOUT: 10000,
} as const;

if (import.meta.env.DEV) {
  if (!API_CONFIG.AUTH_BASE_URL) {
    console.error('⚠️ ERROR: VITE_AUTH_BASE_URL no está definida en .env');
  }
  if (!API_CONFIG.ACTIONS_BASE_URL) {
    console.error('⚠️ ERROR: VITE_ACTIONS_BASE_URL no está definida en .env');
  }
}
