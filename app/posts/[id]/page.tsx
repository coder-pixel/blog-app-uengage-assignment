import Link from "next/link";
import { notFound } from "next/navigation";
import ServerBlogApiService from "@/app/lib/server-api";
import BlogDetailsError from "@/app/components/BlogPosts/BlogDetailsError";
import PostCommentSection from "@/app/components/BlogPosts/PostCommentSection";

interface PostDetailsPageProps {
  params: {
    id: string;
  };
}

// Server-side post data fetching
async function getPostData(postId: number) {
  try {
    const postData = await ServerBlogApiService.getPostWithUserAndComments(
      postId
    );
    return { ...postData, error: null };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      post: null,
      user: null,
      comments: [],
      error: error instanceof Error ? error.message : "Failed to fetch post",
    };
  }
}

export default async function PostDetailsPage({
  params,
}: PostDetailsPageProps) {
  const postId = parseInt(params?.id);

  if (isNaN(postId)) {
    notFound();
  }

  const { post, user, comments, error } = await getPostData(postId);

  if (error || !post || !user) {
    return <BlogDetailsError error={error || "Post not found"} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Back to Posts
        </Link>
      </nav>

      {/* Post Content */}
      <article className="mb-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post?.title}
          </h1>

          {/* Enhanced Author Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-xl font-bold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-sm">@{user.username}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">Author</span>
                  </div>
                </div>
              </div>
              {/* <div className="flex-shrink-0">
                <Link
                  href={`/posts?author=${user.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  View all posts by {user.name.split(" ")[0]}
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div> */}
            </div>
          </div>
        </header>

        {/* Post Body */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post?.body}
          </p>
        </div>
      </article>

      {/* Comments Section */}
      <PostCommentSection comments={comments} />
    </div>
  );
}
