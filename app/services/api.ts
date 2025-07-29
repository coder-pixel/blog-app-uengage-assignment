import axiosInstance from "../lib/axios";

// Types for blog data
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  featuredImage?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
  status?: number;
  code?: string;
}

// Error handling utility
export class ApiError extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

// API service class
export class BlogApiService {
  private static handleError(error: unknown): never {
    if (error && typeof error === "object" && "response" in error) {
      // Server responded with error status
      const axiosError = error as {
        response: {
          data?: { message?: string; code?: string };
          status: number;
        };
      };
      throw new ApiError(
        axiosError.response.data?.message || "Server error occurred",
        axiosError.response.status,
        axiosError.response.data?.code
      );
    } else if (error && typeof error === "object" && "request" in error) {
      // Network error
      throw new ApiError("Network error - please check your connection");
    } else {
      // Other error
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      throw new ApiError(errorMessage);
    }
  }

  // Get all blog posts
  static async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await axiosInstance.get<ApiResponse<BlogPost[]>>(
        "/api/posts"
      );
      return response.data.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get single blog post by slug
  static async getBlogPost(slug: string): Promise<BlogPost> {
    try {
      const response = await axiosInstance.get<ApiResponse<BlogPost>>(
        `/api/posts/${slug}`
      );
      return response.data.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get featured blog posts
  static async getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
    try {
      const response = await axiosInstance.get<ApiResponse<BlogPost[]>>(
        `/api/posts/featured?limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Search blog posts
  static async searchPosts(query: string): Promise<BlogPost[]> {
    try {
      const response = await axiosInstance.get<ApiResponse<BlogPost[]>>(
        `/api/posts/search?q=${encodeURIComponent(query)}`
      );
      return response.data.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

// Export default instance
export default BlogApiService;
