"use client";

import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/app/types";

interface ListingCardProps {
  listing: Listing;
  variant?: "standard" | "premium" | "platinum" | "new";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ListingCard({
  listing,
  variant = "standard",
}: ListingCardProps) {
  const isPremium = variant === "premium" || listing.tier === "premium";
  const isPlatinum = variant === "platinum" || listing.tier === "platinum";
  const isNew = variant === "new" || listing.isNew;

  const tierLabel = isPlatinum ? "Platinum" : isPremium ? "Premium" : isNew ? "New" : "Standard";
  const tierClasses = isPlatinum
    ? "bg-gradient-metal text-background"
    : isPremium
      ? "bg-accent-gold text-background"
      : isNew
        ? "bg-emerald-500 text-white"
        : "bg-white/10 text-text-secondary";

  return (
    <Link href={`/profile/${listing.slug}`} className="group block h-full">
      <article
        className={`relative flex h-full flex-col overflow-hidden border bg-background-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated ${
          isPlatinum
            ? "border-accent-metal shadow-metal"
            : isPremium
              ? "border-accent-gold/45"
              : "border-white/10 hover:border-accent-gold/45"
        }`}
      >
        <div className="relative aspect-[4/4.45] overflow-hidden bg-background-elevated">
          {listing.primaryImage ? (
            <Image
              src={listing.primaryImage}
              alt={listing.displayName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(197,81,208,0.22),transparent_34%),linear-gradient(145deg,#1d1d1d,#090909_64%,rgba(22,13,30,0.76))]">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-accent-gold/35 bg-black/25 font-heading text-4xl font-semibold text-gold-gradient">
                {getInitials(listing.displayName)}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className={`tier-badge ${tierClasses}`}>{tierLabel}</span>
            {listing.isVerified && (
              <span className="tier-badge border border-sky-400/35 bg-sky-500/15 text-sky-200">
                Verified
              </span>
            )}
          </div>

          {(isPremium || isPlatinum) && listing.phoneNumber && (
            <div className="absolute bottom-4 left-4 rounded-full border border-accent-gold/35 bg-background/80 px-4 py-2 font-mono text-sm font-semibold text-accent-gold backdrop-blur">
              {listing.phoneNumber}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-text-primary transition-colors group-hover:text-accent-gold">
                {listing.displayName}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {listing.city}, {listing.state}
              </p>
            </div>
            <span className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
              {listing.status}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4 text-sm">
            {[
              ["Age", listing.ageRange],
              ["Height", listing.height],
              ["Build", listing.build],
              ["Style", listing.incallOutcall || "By request"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  {label}
                </p>
                <p className="mt-1 font-semibold text-text-primary">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {listing.services.slice(0, 2).map((service) => (
              <span
                key={service}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-secondary"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="text-sm text-text-muted">Visit profile for rates</span>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-accent-gold">
              View
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
