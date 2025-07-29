import type { Metadata } from "next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Mini Blog - A modern blog application built with Next.js 14, featuring SEO optimization and best practices.",
  keywords: ["blog", "nextjs", "react", "typescript", "seo", "modern web app"],
  openGraph: {
    title: "Mini Blog - Welcome",
    description:
      "A modern blog application built with Next.js 14, featuring SEO optimization and best practices.",
    url: "https://your-domain.com",
    siteName: "Mini Blog",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mini Blog - Modern Blog Application",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Blog - Welcome",
    description:
      "A modern blog application built with Next.js 14, featuring SEO optimization and best practices.",
    images: ["https://your-domain.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
