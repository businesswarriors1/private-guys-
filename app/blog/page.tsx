import type { Metadata } from "next";
import { getAllBlogPosts } from "@/app/data/blogPosts";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BlogCard from "@/app/components/cards/BlogCard";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-accent-gold/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-4">
                Private Guys <span className="text-accent-gold">Blog</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Guides, tips, and insights for clients and companions. Learn everything you need to know for the best experience.
              </p>
            </motion.div>
          </section>

          {/* Featured Post */}
          {posts.length > 0 && (
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-card rounded-2xl overflow-hidden p-8 bg-gradient-to-r from-accent-gold/10 to-accent-gold/5 border border-accent-gold/30">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <span className="inline-block text-accent-gold font-bold text-sm uppercase tracking-wider mb-4">
                        Featured Post
                      </span>
                      <h2 className="text-4xl font-heading font-bold text-text-primary mb-4">
                        {posts[0].title}
                      </h2>
                      <p className="text-text-secondary text-lg mb-6">
                        {posts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-text-secondary mb-6">
                        <span>
                          {new Date(posts[0].date).toLocaleDateString("en-AU", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{posts[0].readTime} min read</span>
                      </div>
                      <a
                        href={`/blog/${posts[0].slug}`}
                        className="inline-block bg-accent-gold hover:bg-accent-gold-light text-background px-8 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Read Full Article →
                      </a>
                    </div>
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <img
                        src={posts[0].featuredImage}
                        alt={posts[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Category Filter */}
          <section className="mb-12">
            <div className="flex flex-wrap gap-3">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-2 rounded-full bg-accent-gold text-background font-semibold text-sm transition-all hover:shadow-lg"
              >
                All Posts ({posts.length})
              </motion.button>
              {categories.map((cat) => {
                const count = posts.filter((p) => p.category === cat).length;
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-2 rounded-full bg-background border border-border-default text-text-primary hover:border-accent-gold hover:text-accent-gold font-semibold text-sm transition-all"
                  >
                    {cat} ({count})
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Blog Grid */}
          <section className="mb-20">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.slice(1).map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  date={post.date}
                  readTime={post.readTime}
                  featuredImage={post.featuredImage}
                  category={post.category}
                />
              ))}
            </motion.div>
          </section>

          {/* Newsletter CTA */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-12 text-center bg-gradient-to-r from-accent-gold/20 to-accent-gold/10"
            >
              <h3 className="text-3xl font-heading font-bold text-text-primary mb-4">
                Stay Updated
              </h3>
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter for the latest guides, tips, and updates.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-background border border-border-default text-text-primary px-4 py-3 rounded-lg focus:outline-none focus:border-accent-gold"
                />
                <button className="bg-accent-gold hover:bg-accent-gold-light text-background px-8 py-3 rounded-lg font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
