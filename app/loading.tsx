"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-12 text-center">
          <motion.div
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-12 bg-gradient-to-r from-background via-accent-gold/20 to-background bg-200% rounded-lg mb-4"
            style={{
              backgroundSize: "200% 100%",
            }}
          />
          <motion.div
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-20 bg-gradient-to-r from-background via-accent-gold/20 to-background bg-200% rounded-lg"
            style={{
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              {/* Image Skeleton */}
              <motion.div
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-48 bg-gradient-to-r from-background via-accent-gold/20 to-background bg-200%"
                style={{
                  backgroundSize: "200% 100%",
              }}
              />

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                <motion.div
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-20 bg-gradient-to-r from-background via-accent-gold/20 to-background bg-200% rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
                <motion.div
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-6 bg-gradient-to-r from-background via-accent-gold/20 to-background bg-200% rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
                <motion.div
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-4 bg-gradient-to-r from-background via-accent-gold/20 to-background bg-200% rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
