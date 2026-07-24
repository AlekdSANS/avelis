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

const DEFAULT_API_BASE_URL = "http://localhost:4000/api";
const VITE_DEV_PORT = "5173";

function isViteDevOrigin(url: string) {
  if (typeof window === "undefined" || window.location.port !== VITE_DEV_PORT) {
    return false;
  }

  try {
    const parsedUrl = new URL(url, window.location.origin);

    return parsedUrl.origin === window.location.origin;
  } catch {
    return false;
  }
}

function getApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (
    configuredUrl === undefined ||
    configuredUrl.length === 0 ||
    isViteDevOrigin(configuredUrl)
  ) {
    return DEFAULT_API_BASE_URL;
  }

  const withoutTrailingSlashes = configuredUrl.replace(/\/+$/, "");

  return withoutTrailingSlashes.endsWith("/api")
    ? withoutTrailingSlashes
    : `${withoutTrailingSlashes}/api`;
}

function getApiErrorMessage(error: AxiosError<ApiError>) {
  const responseData = error.response?.data;

  if (
    typeof responseData === "object" &&
    responseData !== null &&
    "message" in responseData &&
    typeof responseData.message === "string" &&
    responseData.message.length > 0
  ) {
    return responseData.message;
  }

  return "The API request failed.";
}

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const axiosError = error as AxiosError<ApiError>;
    const message = getApiErrorMessage(axiosError);

    return Promise.reject(
      new ApiClientError({
        message,
        statusCode: axiosError.response?.status,
        issues: axiosError.response?.data?.issues,
      }),
    );
  },
);
