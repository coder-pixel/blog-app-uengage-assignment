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

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
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

  // Get single blog post by ID
  static async getBlogPost(id: number): Promise<BlogPost> {
    try {
      return await this.fetchData<BlogPost>(`/posts/${id}`);
    } catch (error) {
      console.error("Error fetching post:", error);
      throw new Error("Failed to fetch blog post");
    }
  }

  // Get user by ID
  static async getUser(userId: number): Promise<User> {
    try {
      return await this.fetchData<User>(`/users/${userId}`);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
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

  // Get comments for a specific post
  static async getComments(postId: number): Promise<Comment[]> {
    try {
      return await this.fetchData<Comment[]>(`/comments?postId=${postId}`);
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error("Failed to fetch comments");
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

  // Get single post with user and comments
  static async getPostWithUserAndComments(postId: number): Promise<{
    post: BlogPost;
    user: User;
    comments: Comment[];
  }> {
    try {
      const post = await this.getBlogPost(postId);
      const [user, comments] = await Promise.all([
        this.getUser(post.userId),
        this.getComments(postId),
      ]);

      return { post, user, comments };
    } catch (error) {
      console.error("Error fetching post with user and comments:", error);
      throw new Error("Failed to fetch post with user and comments");
    }
  }
}

export default ServerBlogApiService;
