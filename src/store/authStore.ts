import { create } from 'zustand';
import { authService } from '../api/authApi';
import type { LoginCredentials, AuthState } from '../types/auth.types';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: authService.getToken(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.login(credentials);
      
      set({
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message,
      });
      
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    
    set({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  checkAuth: () => {
    const isAuthenticated = authService.isAuthenticated();
    const token = authService.getToken();
    
    set({ isAuthenticated, token });
  },

  clearError: () => set({ error: null }),
}));