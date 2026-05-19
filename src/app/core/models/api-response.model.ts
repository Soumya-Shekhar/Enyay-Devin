export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
