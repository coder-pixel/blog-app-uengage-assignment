import React from "react";

const PostCommentSection = ({
  comments,
}: {
  comments: {
    id: number;
    name: string;
    email: string;
    body: string;
  }[];
}) => {
  return (
    <section className="border-t border-gray-200 pt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Comments ({comments?.length || 0})
        </h2>
        <p className="text-gray-600">Join the discussion about this post</p>
      </div>

      {comments?.length > 0 ? (
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment?.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">
                    {comment?.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {comment?.name}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {comment?.email}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comment?.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No comments yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Be the first to share your thoughts on this post.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostCommentSection;
