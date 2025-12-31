import { authApi } from './axiosConfig';
import { ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await authApi.post<any>(
        ENDPOINTS.LOGIN,
        credentials
      );
      
      let token: string | null = null;
      
      if (typeof response.data === 'string') {
        token = response.data;
      } else if (typeof response.data === 'object') {
        token = 
          response.data.token || 
          response.data.accessToken || 
          response.data.access_token ||
          response.data.jwt ||
          response.data.authToken;
      }
      
      if (token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        return { token } as LoginResponse;
      } else {
        throw new Error('No se recibió token del servidor');
      }
    } catch (error: any) {
      console.error('❌ Error en login:', error.response?.data || error.message);
      
      if (error.response) {
        const status = error.response.status;
        
        if (status === 400 || status === 401) {
          throw new Error('Usuario o contraseña incorrectos');
        }
        
        if (status === 500) {
          throw new Error('Error del servidor. Intenta de nuevo más tarde');
        }
        
        if (status === 403) {
          throw new Error('Acceso denegado. Verifica tus permisos');
        }
        
        throw new Error('Error de autenticación. Intenta de nuevo');
      }
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('Tiempo de espera agotado. Verifica tu conexión');
      }
      
      if (error.message === 'Network Error') {
        throw new Error('No se pudo conectar con el servidor');
      }
      
      throw new Error('Error al iniciar sesión. Intenta de nuevo');
    }
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};
