"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent-gold/5 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Error Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-lg mb-8">
          We encountered an unexpected error. Please try again or contact our support team if the problem persists.
        </p>

        {/* Error Details */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-background border border-red-500/30 rounded-lg p-4 mb-8 text-left">
            <p className="text-red-400 text-sm font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reset()}
            className="flex-1 bg-accent-gold hover:bg-accent-gold-light text-background px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </motion.button>
          <Link
            href="/"
            className="flex-1 bg-background border border-border-default hover:border-accent-gold text-text-primary hover:text-accent-gold px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
