import Link from "next/link";
import { BlogPost, User } from "../../lib/server-api";

interface BlogPostCardProps {
  post: BlogPost & { user: User };
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Truncate body text to 150 characters
  const truncatedBody =
    post?.body?.length > 150
      ? `${post?.body.substring(0, 150)}...`
      : post?.body;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 flex-shrink-0">
          {post?.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {truncatedBody}
        </p>

        <div className="flex items-center justify-between mt-auto flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">
                {post?.user?.name?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post?.user?.name}
              </p>
              <p className="text-xs text-gray-500">@{post?.user?.username}</p>
            </div>
          </div>

          <Link
            href={`/posts/${post?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read more
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
        </div>
      </div>
    </div>
  );
}
