import { ApiError } from "../services/api";

export interface ErrorState {
  hasError: boolean;
  message: string;
  status?: number;
}

export const createErrorState = (error: unknown): ErrorState => {
  if (error instanceof ApiError) {
    return {
      hasError: true,
      message: error.message,
      status: error.status,
    };
  }

  if (error instanceof Error) {
    return {
      hasError: true,
      message: error.message,
    };
  }

  return {
    hasError: true,
    message: "An unexpected error occurred",
  };
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof ApiError && error.message.includes("Network error");
};

export const isServerError = (error: unknown): boolean => {
  return (
    error instanceof ApiError &&
    typeof error.status === "number" &&
    error.status >= 500
  );
};

export const isClientError = (error: unknown): boolean => {
  return (
    error instanceof ApiError &&
    typeof error.status === "number" &&
    error.status >= 400 &&
    error.status < 500
  );
};

// Error messages for different scenarios
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error - please check your connection",
  SERVER_ERROR: "Server error - please try again later",
  NOT_FOUND: "The requested resource was not found",
  UNAUTHORIZED: "You are not authorized to access this resource",
  FORBIDDEN: "Access to this resource is forbidden",
  VALIDATION_ERROR: "Please check your input and try again",
  UNKNOWN_ERROR: "An unexpected error occurred",
} as const;
