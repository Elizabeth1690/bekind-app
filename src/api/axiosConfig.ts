import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_URLS, STORAGE_KEYS } from '../utils/constants';

const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      
      // 👇 DEBUG LOGS
      console.log('🔍 Interceptor Request:');
     console.log('   URL:', `${config.baseURL || ''}${config.url || ''}`);

      console.log('   Token en localStorage:', token ? '✅ Existe' : '❌ NO existe');
      console.log('   Token:', token);
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('   ✅ Header Authorization agregado');
      } else {
        console.log('   ❌ NO se agregó Authorization header');
      }
      
      return config;
    },
    (error) => {
      console.log('❌ Error en request interceptor:', error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log('✅ Response exitoso:', response.status, response.config.url);
      return response;
    },
    (error) => {
      console.log('❌ Error en response:');
      console.log('   Status:', error.response?.status);
      console.log('   URL:', error.config?.url);
      console.log('   Message:', error.response?.data?.message || error.message);
      
      if (error.response?.status === 401) {
        console.log('🚪 Token inválido o expirado - Redirigiendo a login');
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        window.location.href = '/login';
      }
      
      if (error.response?.status === 403) {
        console.log('🚫 Acceso denegado (403) - Verifica permisos del usuario');
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export const authApi = createApiInstance(API_URLS.AUTH_BASE);
export const actionsApi = createApiInstance(API_URLS.ACTIONS_BASE);
