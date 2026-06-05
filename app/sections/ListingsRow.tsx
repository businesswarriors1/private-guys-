import ListingCard from "@/app/components/cards/ListingCard";
import { Listing } from "@/app/types";

interface ListingsRowProps {
  title: string;
  subtitle?: string;
  listings: Listing[];
  tier?: "new" | "premium" | "platinum";
}

export default function ListingsRow({ title, subtitle, listings, tier }: ListingsRowProps) {
  const isPlatinum = tier === "platinum";
  const isPremium = tier === "premium";

  return (
    <section className={`py-16 ${isPlatinum ? "bg-background-elevated" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {subtitle && (
              <span className="section-subtitle">{subtitle}</span>
            )}
            <h2 className={`section-title flex items-center gap-3 ${
              isPlatinum ? "text-gold-gradient" : ""
            }`}>
              {title}
              {(isPremium || isPlatinum) && (
                <span className={`text-xs px-2 py-1 rounded ${
                  isPlatinum 
                    ? "bg-gradient-gold text-background" 
                    : "bg-accent-gold text-background"
                }`}>
                  {isPlatinum ? "PLATINUM" : "PREMIUM"}
                </span>
              )}
            </h2>
          </div>

          <a
            href={tier ? `/${tier}-listings` : "/new-listings"}
            className="text-accent-gold hover:text-accent-gold-light text-sm font-medium"
          >
            View All →
          </a>
        </div>

        {/* Listings Grid */}
        <div className={`grid gap-6 ${
          isPlatinum
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              variant={tier || "standard"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
