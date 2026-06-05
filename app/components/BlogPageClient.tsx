"use client";

import { motion } from "framer-motion";
import BlogPageContent from "@/app/components/BlogPageContent";
import type { BlogPost } from "@/app/data/blogPosts";

interface BlogPageClientProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

export default function BlogPageClient({
  post,
  allPosts,
}: BlogPageClientProps) {
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-2 bg-accent-gold/20 text-accent-gold rounded-full text-sm font-semibold mb-4"
          >
            {post.category}
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-text-secondary mb-6">{post.excerpt}</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-4 text-text-secondary"
          >
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-AU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <BlogPageContent content={post.content} />
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-accent-gold/10 text-accent-gold rounded-full text-sm font-medium hover:bg-accent-gold/20 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-transparent to-accent-gold/5">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-heading font-bold text-text-primary mb-8"
            >
              Related Articles
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-6"
            >
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-text-primary group-hover:text-accent-gold transition-colors mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-text-secondary mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <time dateTime={relatedPost.date}>
                        {new Date(relatedPost.date).toLocaleDateString("en-AU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span>•</span>
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
