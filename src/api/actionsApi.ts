import { actionsApi } from './axiosConfig';
import { ENDPOINTS, PAGINATION } from '../utils/constants';
import type { ActionsListResponse, CreateActionPayload, Action } from '../types/action.types';

export const actionsService = {
  getActions: async (
    pageNumber: number = PAGINATION.DEFAULT_PAGE_NUMBER,
    pageSize: number = PAGINATION.DEFAULT_PAGE_SIZE
  ): Promise<ActionsListResponse> => {
    try {
      // ✅ TRANSFORMACIÓN: Frontend usa 0-based, Backend usa 1-based
      const backendPageNumber = pageNumber + 1;  // Sumar 1 para el backend
      
      pageSize = Math.max(1, Math.min(100, Math.floor(pageSize)));
      
      console.log(`🌐 API Request: pageNumber=${backendPageNumber} (frontend usa ${pageNumber}), pageSize=${pageSize}`);
      
      const response = await actionsApi.get<any>(
        ENDPOINTS.ACTIONS_LIST,
        {
          params: { 
            pageNumber: backendPageNumber,  // ✅ Enviar como 1-based
            pageSize
          },
        }
      );
      
      console.log('📥 Response status:', response.status);
      
      let data = response.data;
      
      // Si es string, parsearlo
      if (typeof response.data === 'string') {
        try {
          data = JSON.parse(response.data);
        } catch (e) {
          throw new Error('Respuesta inválida del servidor');
        }
      }
      
      // ✅ Extraer datos según estructura
      let extractedData: any = null;
      
      if (data?.data && typeof data.data === 'object' && Array.isArray(data.data.data)) {
        extractedData = data.data;
      } else if (data && Array.isArray(data.data)) {
        extractedData = data;
      } else if (Array.isArray(data)) {
        return {
          data: data,
          pageNumber: pageNumber,  // ✅ Devolver como 0-based
          pageSize: pageSize,
          totalPages: 1,
          totalRecords: data.length,
        };
      }
      
      if (extractedData && Array.isArray(extractedData.data)) {
        return {
          data: extractedData.data,
          pageNumber: pageNumber,  // ✅ Devolver como 0-based (no usar el del backend)
          pageSize: extractedData.pageSize ?? pageSize,
          totalPages: extractedData.totalPages ?? 1,
          totalRecords: extractedData.totalElements ?? extractedData.totalRecords ?? extractedData.data.length,
        };
      }
      
      return {
        data: [],
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalPages: 0,
        totalRecords: 0,
      };
      
    } catch (error: any) {
      console.log('❌ Error en actionsService.getActions:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message ||
        'Error al cargar las acciones'
      );
    }
  },

  createAction: async (payload: CreateActionPayload): Promise<Action> => {
    try {
      const response = await actionsApi.post<Action>(
        ENDPOINTS.ACTIONS_CREATE,
        payload
      );
      
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Error al crear la acción'
      );
    }
  },
};
