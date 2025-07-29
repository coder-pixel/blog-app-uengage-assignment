import BlogPostCard from "../components/BlogPosts/BlogPostCard";
import ServerBlogApiService from "../lib/server-api";
import BlogPostsError from "../components/BlogPosts/BlogPostsError";

// Server-side data fetching
async function getPostsData() {
  try {
    const postsWithUsers = await ServerBlogApiService.getPostsWithUsers();
    return { posts: postsWithUsers, error: null };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      error: error instanceof Error ? error.message : "Failed to fetch posts",
    };
  }
}

export default async function PostsPage() {
  const { posts, error } = await getPostsData(); // server-side data fetching

  if (error) {
    return <BlogPostsError error={error} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Blog Posts
            </h1>
            <p className="text-gray-600">
              Explore our collection of {posts.length} blog posts from various
              authors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {posts?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No posts found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no blog posts available at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
