import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Explore our collection of blog posts from various authors.",
  keywords: ["blog", "posts", "articles", "content"],
  openGraph: {
    title: "Blog Posts - Mini Blog",
    description: "Explore our collection of blog posts from various authors.",
    url: "https://your-domain.com/posts",
    siteName: "Mini Blog",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Posts - Mini Blog",
    description: "Explore our collection of blog posts from various authors.",
  },
  alternates: {
    canonical: "https://your-domain.com/posts",
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
