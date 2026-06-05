"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: number;
  featuredImage: string;
  category: string;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  date,
  readTime,
  featuredImage,
  category,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${slug}`}>
        <article className="glass-card rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
          {/* Featured Image */}
          <div className="relative h-48 overflow-hidden bg-background">
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block bg-accent-gold/20 text-accent-gold text-xs font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-heading font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-accent-gold transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-border-default">
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{readTime} min read</span>
              </div>
              <span className="text-accent-gold font-semibold text-sm">
                Read →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
