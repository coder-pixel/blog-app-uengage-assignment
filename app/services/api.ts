import axiosInstance from "../lib/axios";

// Types for blog data from JSONPlaceholder
export interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
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

  // Get all blog posts from JSONPlaceholder
  static async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await axiosInstance.get<BlogPost[]>("/posts");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get single blog post by ID
  static async getBlogPost(id: number): Promise<BlogPost> {
    try {
      const response = await axiosInstance.get<BlogPost>(`/posts/${id}`);
      return response?.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  //   // Get user by ID
  //   static async getUser(userId: number): Promise<User> {
  //     try {
  //       const response = await axiosInstance.get<User>(`/users/${userId}`);
  //       return response.data;
  //     } catch (error) {
  //       this.handleError(error);
  //     }
  //   }

  // Get all users
  static async getUsers(): Promise<User[]> {
    try {
      const response = await axiosInstance.get<User[]>("/users");
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get posts with user data
  static async getPostsWithUsers(): Promise<(BlogPost & { user: User })[]> {
    try {
      const [posts, users] = await Promise.all([
        this.getBlogPosts(),
        this.getUsers(),
      ]);

      return posts.map((post) => ({
        ...post,
        user: users.find((user) => user?.id === post?.userId)!,
      }));
    } catch (error) {
      this.handleError(error);
    }
  }
}

// Export default instance
export default BlogApiService;
