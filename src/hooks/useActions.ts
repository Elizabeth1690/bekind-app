import { useState, useEffect, useRef } from 'react';
import { actionsService } from '../api/actionsApi';
import type { Action, ActionsListResponse, CreateActionPayload } from '../types/action.types';
import { PAGINATION } from '../utils/constants';

interface PaginationState {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export const useActions = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageNumber: 0,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalRecords: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const hasLoadedInitialData = useRef(false);
  const isLoadingRef = useRef(false);

  const loadActions = async (pageNumber: number, pageSize: number) => {
    // Evitar llamadas duplicadas
    if (isLoadingRef.current) {
      console.log('⚠️ Ya hay una carga en progreso, ignorando');
      return;
    }
    
    // Validar y forzar valores seguros
    pageNumber = Math.max(0, Math.floor(pageNumber));
    pageSize = Math.max(1, Math.min(100, Math.floor(pageSize)));
    
    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`📄 Cargando página ${pageNumber}`);
      
      const response: ActionsListResponse = await actionsService.getActions(
        pageNumber,
        pageSize
      );
      
      console.log('✅ Datos cargados:', {
        items: response.data.length,
        pageNumber: response.pageNumber,
        totalPages: response.totalPages,
      });
      
      setActions(response.data);
      setPagination({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
      });
    } catch (err: any) {
      console.log('❌ Error al cargar acciones:', err.message);
      setError(err.message || 'Error al cargar las acciones');
      setActions([]);
      setPagination(prev => ({ ...prev, pageNumber: 0 }));
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    if (!hasLoadedInitialData.current) {
      console.log('🚀 Cargando datos iniciales (página 0)');
      loadActions(0, PAGINATION.DEFAULT_PAGE_SIZE);
      hasLoadedInitialData.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPage = (pageNumber: number) => {
    console.log(`🔄 Cambiando a página ${pageNumber}`);
    
    // Validar rango
    if (pageNumber < 0 || pageNumber >= pagination.totalPages) {
      console.log('⚠️ Página fuera de rango');
      return;
    }
    
    loadActions(pageNumber, pagination.pageSize);
  };

  const createAction = async (payload: CreateActionPayload): Promise<void> => {
    try {
      await actionsService.createAction(payload);
      await loadActions(0, pagination.pageSize);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return {
    actions,
    pagination,
    isLoading,
    error,
    goToPage,
    createAction,
  };
};
