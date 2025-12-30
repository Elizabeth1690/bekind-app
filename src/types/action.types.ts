export interface Action {
  id: string;
  name: string;
  description: string;
  status: number; 
  icon?: string;
  color?: string;
  createdAt: string;
}

export interface ActionsListResponse {
  data: Action[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface CreateActionPayload {
  name: string;
  description: string;
  icon?: string;
  color?: string;
}
