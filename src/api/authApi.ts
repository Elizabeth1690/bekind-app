import { authApi } from './axiosConfig';
import { ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      console.log('🔐 Intentando login con:', credentials.username);
      
      const response = await authApi.post<any>(
        ENDPOINTS.LOGIN,
        credentials
      );
      
      console.log('📥 Tipo de response.data:', typeof response.data);
      console.log('📦 response.data:', response.data);
      
      let token: string | null = null;
      
      // Caso 1: El servidor devuelve el token como STRING directo
      if (typeof response.data === 'string') {
        token = response.data;
        console.log('✅ Token es STRING directo');
      }
      // Caso 2: El servidor devuelve un objeto con token
      else if (typeof response.data === 'object') {
        token = 
          response.data.token || 
          response.data.accessToken || 
          response.data.access_token ||
          response.data.jwt ||
          response.data.authToken;
        console.log('✅ Token extraído del objeto');
      }
      
      console.log('🔑 Token final:', token);
      
      if (token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        console.log('💾 Token guardado en localStorage');
        
        // Verificar que se guardó
        const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        console.log('✔️ Token recuperado:', savedToken ? 'Sí' : 'No');
        
        // Devolver en formato esperado
        return { token } as LoginResponse;
      } else {
        console.log('❌ NO se pudo extraer el token');
        throw new Error('No se recibió token del servidor');
      }
    } catch (error: any) {
      console.log('❌ Error en login:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message ||
        'Error al iniciar sesión. Verifica tus credenciales.'
      );
    }
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    console.log('🚪 Sesión cerrada - Token eliminado');
  },

  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};
