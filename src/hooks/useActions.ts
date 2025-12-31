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
    if (isLoadingRef.current) {
      return;
    }
    
    pageNumber = Math.max(0, Math.floor(pageNumber));
    pageSize = Math.max(1, Math.min(100, Math.floor(pageSize)));
    
    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`📄 Cargando página ${pageNumber} con ${pageSize} items`);
      
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
  }, []);

  const goToPage = (pageNumber: number) => {
    
    if (pageNumber < 0 || pageNumber >= pagination.totalPages) {
      return;
    }
    
    loadActions(pageNumber, pagination.pageSize);
  };

  const changePageSize = (newPageSize: number) => {
    
    if (newPageSize < 1 || newPageSize > 100) {
      return;
    }
    
    loadActions(0, newPageSize);
  };

  const createAction = async (payload: CreateActionPayload, file?: File): Promise<void> => {
    try {
      await actionsService.createAction(payload, file);
      await loadActions(0, pagination.pageSize);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const deleteAction = async (id: string): Promise<void> => {
    try {
      console.log(`🗑️ Eliminando acción ID: ${id}`);
   
      setActions(prevActions => prevActions.filter(action => action.id !== id));
      
      setPagination(prev => ({
        ...prev,
        totalRecords: prev.totalRecords - 1,
      }));
      
      console.log('✅ Acción eliminada (solo frontend)');
    } catch (err: any) {
      console.log('❌ Error al eliminar acción:', err.message);
      throw new Error(err.message || 'Error al eliminar la acción');
    }
  };

  return {
    actions,
    pagination,
    isLoading,
    error,
    goToPage,
    changePageSize,
    createAction,
    deleteAction,
  };
};
