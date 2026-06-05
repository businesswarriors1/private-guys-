"use client";

import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/app/types";

interface ListingCardProps {
  listing: Listing;
  variant?: "standard" | "premium" | "platinum" | "new";
}

export default function ListingCard({ listing, variant = "standard" }: ListingCardProps) {
  const isPremium = variant === "premium" || listing.tier === "premium";
  const isPlatinum = variant === "platinum" || listing.tier === "platinum";
  const isNew = variant === "new" || listing.isNew;

  const cardClasses = `
    relative glass-card rounded-lg overflow-hidden transition-all duration-300
    ${isPlatinum ? "border-2 border-accent-gold shadow-gold" : ""}
    ${isPremium ? "border-l-4 border-l-accent-gold" : ""}
    hover:shadow-elevated hover:-translate-y-1
  `;

  const imageHeight = isPlatinum ? "h-80" : "h-64";

  return (
    <Link href={`/profile/${listing.slug}`} className="block group">
      <div className={cardClasses}>
        {/* Image Container */}
        <div className={`relative ${imageHeight} overflow-hidden bg-background-card`}>
          {listing.primaryImage ? (
            <Image
              src={listing.primaryImage}
              alt={listing.displayName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              <span>No Image</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-tier-new text-white text-xs font-semibold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {listing.isVerified && (
              <span className="bg-tier-verified text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                VERIFIED
              </span>
            )}
          </div>

          {/* Tier Badge */}
          {(isPremium || isPlatinum) && (
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-bold px-3 py-1 rounded ${
                isPlatinum 
                  ? "bg-gradient-gold text-background" 
                  : "bg-accent-gold/90 text-background"
              }`}>
                {isPlatinum ? "PLATINUM" : "PREMIUM"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name & Location */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-text-primary font-semibold text-lg group-hover:text-accent-gold transition-colors">
                {listing.displayName}
              </h3>
              <p className="text-text-secondary text-sm">{listing.city}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid text-sm mb-3">
            {listing.ageRange && (
              <div>
                <span className="text-text-muted text-xs uppercase">Age</span>
                <p className="text-text-primary font-medium">{listing.ageRange}</p>
              </div>
            )}
            {listing.height && (
              <div>
                <span className="text-text-muted text-xs uppercase">Height</span>
                <p className="text-text-primary font-medium">{listing.height}</p>
              </div>
            )}
            {listing.build && (
              <div>
                <span className="text-text-muted text-xs uppercase">Build</span>
                <p className="text-text-primary font-medium">{listing.build}</p>
              </div>
            )}
            {listing.ethnicity && (
              <div>
                <span className="text-text-muted text-xs uppercase">Ethnicity</span>
                <p className="text-text-primary font-medium">{listing.ethnicity}</p>
              </div>
            )}
          </div>

          {/* Phone (Premium/Platinum only) */}
          {(isPremium || isPlatinum) && listing.phoneNumber && (
            <div className="flex items-center gap-2 text-accent-gold mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-medium">{listing.phoneNumber}</span>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-border-default">
            <span className="text-text-muted text-sm">Visit Profile For Rates</span>
            <span className="text-accent-gold text-sm font-medium group-hover:underline">
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
