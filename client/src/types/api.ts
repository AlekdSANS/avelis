export interface ApiError {
  message: string;
  statusCode?: number;
  issues?: { message: string; path: string }[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ProductQueryParams extends PaginationParams {
  search?: string;
  collection?: string;
  family?: string;
  season?: string;
  concentration?: string;
  format?: "BOTTLE" | "REFILL" | string;
  volume?: number | string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "newest" | "featured" | "price-asc" | "price-desc" | "rating";
}
