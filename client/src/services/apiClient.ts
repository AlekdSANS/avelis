import axios from "axios";
import type { AxiosError } from "axios";
import type { ApiError } from "../types";

export class ApiClientError extends Error {
  statusCode?: number;
  issues?: ApiError["issues"];

  constructor(error: ApiError) {
    super(error.message);
    this.statusCode = error.statusCode;
    this.issues = error.issues;
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const axiosError = error as AxiosError<ApiError>;
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      "The API request failed.";

    return Promise.reject(
      new ApiClientError({
        message,
        statusCode: axiosError.response?.status,
        issues: axiosError.response?.data?.issues,
      }),
    );
  },
);
