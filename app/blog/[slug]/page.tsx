import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/app/data/blogPosts";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export const dynamicParams = true;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Private Guys Australia Blog`,
    description: post.excerpt,
    keywords: [...post.tags, post.category],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Simple markdown-like parsing for headings and paragraphs
  const parseContent = (content: string) => {
    const sections = content.split("\n\n");
    return sections.map((section, idx) => {
      if (section.startsWith("# ")) {
        return (
          <h1
            key={idx}
            className="text-4xl font-heading font-bold text-text-primary mt-8 mb-4"
          >
            {section.replace("# ", "")}
          </h1>
        );
      }
      if (section.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-2xl font-heading font-bold text-text-primary mt-6 mb-3"
          >
            {section.replace("## ", "")}
          </h2>
        );
      }
      if (section.startsWith("- ")) {
        const items = section.split("\n").filter((line) => line.startsWith("- "));
        return (
          <ul key={idx} className="list-disc list-inside text-text-secondary mb-4 space-y-2">
            {items.map((item, i) => (
              <li key={i}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-text-secondary text-lg leading-relaxed mb-4">
          {section}
        </p>
      );
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-accent-gold/5 pt-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-accent-gold hover:text-accent-gold-light transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Featured Image */}
          <div
            className="rounded-2xl overflow-hidden mb-12 h-96"
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header */}
          <header
            className="mb-12"
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-accent-gold/20 text-accent-gold text-xs font-semibold px-4 py-2 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-text-secondary border-b border-border-default pb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{post.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                <span className="text-sm">By {post.author}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none mb-12"
          >
            {parseContent(post.content)}
          </div>

          {/* Tags */}
          <div
            className="border-t border-b border-border-default py-8 mb-12"
          >
            <h3 className="text-text-primary font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="inline-block bg-background border border-border-default text-text-primary hover:border-accent-gold hover:text-accent-gold px-4 py-2 rounded-full text-sm transition-all"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div
            className="glass-card rounded-xl p-8 mb-12 border border-accent-gold/30"
          >
            <h3 className="text-text-primary font-heading font-bold text-lg mb-2">
              About the Author
            </h3>
            <p className="text-text-secondary">
              {post.author} is part of the Private Guys Australia team dedicated to providing helpful, respectful content for our community.
            </p>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section
              className="mt-16"
            >
              <h3 className="text-3xl font-heading font-bold text-text-primary mb-8">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="glass-card rounded-lg p-6 hover:shadow-lg transition-all"
                  >
                    <h4 className="text-text-primary font-semibold mb-2 line-clamp-2 hover:text-accent-gold transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="text-xs text-text-secondary">
                      {new Date(relatedPost.date).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section
            className="mt-16 glass-card rounded-2xl p-12 text-center bg-gradient-to-r from-accent-gold/10 to-accent-gold/5"
          >
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Ready to find your perfect companion?
            </h3>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Browse our verified directory of male companions across Australia.
            </p>
            <Link
              href="/"
              className="inline-block bg-accent-gold hover:bg-accent-gold-light text-background px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Companions →
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
