import { actionsApi } from "./axiosConfig";
import { ENDPOINTS, PAGINATION } from "../utils/constants";
import type {
  ActionsListResponse,
  CreateActionPayload,
  Action,
} from "../types/action.types";

export const actionsService = {
  getActions: async (
    pageNumber: number = PAGINATION.DEFAULT_PAGE_NUMBER,
    pageSize: number = PAGINATION.DEFAULT_PAGE_SIZE
  ): Promise<ActionsListResponse> => {
    try {
      const backendPageNumber = pageNumber + 1;
      pageSize = Math.max(1, Math.min(100, Math.floor(pageSize)));

      const response = await actionsApi.get<any>(ENDPOINTS.ACTIONS_LIST, {
        params: {
          pageNumber: backendPageNumber,
          pageSize,
        },
      });

      let data = response.data;

      if (typeof response.data === "string") {
        try {
          data = JSON.parse(response.data);
        } catch (e) {
          throw new Error("Respuesta inválida del servidor");
        }
      }

      let extractedData: any = null;

      if (
        data?.data &&
        typeof data.data === "object" &&
        Array.isArray(data.data.data)
      ) {
        extractedData = data.data;
      } else if (data && Array.isArray(data.data)) {
        extractedData = data;
      } else if (Array.isArray(data)) {
        return {
          data: data,
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalPages: 1,
          totalRecords: data.length,
        };
      }

      if (extractedData && Array.isArray(extractedData.data)) {
        return {
          data: extractedData.data,
          pageNumber: pageNumber,
          pageSize: extractedData.pageSize ?? pageSize,
          totalPages: extractedData.totalPages ?? 1,
          totalRecords:
            extractedData.totalElements ??
            extractedData.totalRecords ??
            extractedData.data.length,
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
      console.error("❌ Error al cargar acciones:", error);

      if (error.response?.status === 401) {
        throw new Error("Sesión expirada");
      }

      if (error.response?.status === 403) {
        throw new Error("No tienes permisos para ver esta información");
      }

      if (error.response?.status === 500) {
        throw new Error("Error del servidor. Intenta más tarde");
      }

      throw new Error("Error al cargar las acciones");
    }
  },

  createAction: async (
    payload: CreateActionPayload,
    file?: File
  ): Promise<Action> => {
    try {
      const formData = new FormData();

      formData.append("name", payload.name.trim());
      formData.append("description", payload.description.trim());
      formData.append("status", String(payload.status ?? 1));

      if (payload.color) {
        formData.append("color", payload.color.trim());
      }

      if (file) {
        formData.append("icon", file);
      }

      const response = await actionsApi.post<Action>(
        ENDPOINTS.ACTIONS_CREATE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(
        "❌ Error al crear acción:",
        error.response?.data || error.message
      );

      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error;

        if (errorMessage) {
          throw new Error(errorMessage);
        }

        if (error.response?.data?.errors) {
          const errors = Object.values(error.response.data.errors).join(", ");
          throw new Error(`Errores de validación: ${errors}`);
        }

        throw new Error("Datos inválidos. Verifica todos los campos");
      }

      if (error.response?.status === 401) {
        throw new Error("Sesión expirada");
      }

      if (error.response?.status === 403) {
        throw new Error("No tienes permisos para crear categorías");
      }

      if (error.response?.status === 415) {
        throw new Error("Formato de datos no soportado");
      }

      if (error.response?.status === 500) {
        throw new Error("Error del servidor. Intenta más tarde");
      }

      throw new Error("Error al crear la categoría");
    }
  },
};
