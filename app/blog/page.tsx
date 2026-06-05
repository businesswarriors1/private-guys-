import type { Metadata } from "next";
import { getAllBlogPosts } from "@/app/data/blogPosts";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BlogPageContent from "@/app/components/BlogPageContent";

export const metadata: Metadata = {
  title: "Blog | Private Guys Australia",
  description: "Read articles about choosing companions, safety tips, etiquette, and guides for the best experience.",
  keywords: ["blog", "guides", "safety", "tips", "companions", "etiquette"],
  openGraph: {
    title: "Blog | Private Guys Australia",
    description: "Read articles about choosing companions, safety tips, and guides.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Header />
      <BlogPageContent posts={posts} />
      <Footer />
    </>
  );
}
