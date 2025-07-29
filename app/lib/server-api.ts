// Server-side API service for SSR
const BASE_URL = "https://jsonplaceholder.typicode.com";

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

// Server-side API service class
export class ServerBlogApiService {
  private static async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get all blog posts from JSONPlaceholder
  static async getBlogPosts(): Promise<BlogPost[]> {
    try {
      return await this.fetchData<BlogPost[]>("/posts");
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch blog posts");
    }
  }

  // Get all users
  static async getUsers(): Promise<User[]> {
    try {
      return await this.fetchData<User[]>("/users");
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
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
      console.error("Error fetching posts with users:", error);
      throw new Error("Failed to fetch posts with user data");
    }
  }
}

export default ServerBlogApiService;
