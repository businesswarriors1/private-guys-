"use client";

import { motion } from "framer-motion";
import ListingCard from "@/app/components/cards/ListingCard";
import type { Listing } from "@/app/types";

interface EscortPageClientProps {
  cityName: string;
  listings: Listing[];
  city: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function EscortPageClient({
  cityName,
  listings,
  city,
}: EscortPageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-4">
            Male Escorts in <span className="text-accent-gold">{cityName}</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Discover verified male escorts and companions available in {cityName}. All profiles are thoroughly verified and professional.
          </p>
        </motion.div>
      </section>

      {/* Listings Grid */}
      <section className="py-12">
        {listings.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <svg
              className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
              No Escorts Available
            </h3>
            <p className="text-text-secondary mb-6">
              Check back soon for new listings in {cityName}.
            </p>
            <a
              href="/register"
              className="inline-block bg-accent-gold hover:bg-accent-gold-light text-background px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Register as an Escort
            </a>
          </motion.div>
        )}
      </section>

      {/* SEO Content Section */}
      <section className="py-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-12"
        >
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">
            Male Escorts in {cityName}
          </h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              Welcome to Private Guys Australia, your premier directory for verified male escorts in {cityName}. Whether you're looking for a professional escort service for companionship, events, or special occasions, we have a selection of verified male escorts to meet your needs.
            </p>
            <p>
              All our escorts are thoroughly verified and committed to providing a professional, discreet, and enjoyable experience. Our directory features only the most professional and reliable male escorts in {cityName} who have passed our comprehensive verification process.
            </p>
            <p>
              Browse our listings to find the perfect escort for your needs. Each profile includes detailed information, verified photos, rates, availability, and services offered. Contact your chosen escort directly to arrange your appointment.
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
