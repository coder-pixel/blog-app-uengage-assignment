import type { Metadata } from "next";
import ServerBlogApiService from "../../lib/server-api";

interface PostLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

// Generate metadata for the post for better SEO
export async function generateMetadata({
  params,
}: PostLayoutProps): Promise<Metadata> {
  const postId = parseInt(params.id);

  // Check if the postId is a valid one
  if (isNaN(postId)) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  try {
    const { post, user } =
      await ServerBlogApiService.getPostWithUserAndComments(postId);

    return {
      title: post?.title,
      description: post?.body.substring(0, 160) + "...",
      keywords: ["blog", "post", "article", user?.name],
      authors: [{ name: user?.name }],
      openGraph: {
        title: post?.title,
        description: post?.body.substring(0, 160) + "...",
        url: `https://your-domain.com/posts/${postId}`,
        siteName: "Mini Blog",
        locale: "en_US",
        type: "article",
        authors: [user?.name],
      },
      twitter: {
        card: "summary_large_image",
        title: post?.title,
        description: post?.body.substring(0, 160) + "...",
      },
      alternates: {
        canonical: `https://your-domain.com/posts/${postId}`,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }
}

export default function PostLayout({ children }: PostLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
