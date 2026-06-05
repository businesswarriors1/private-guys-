import ListingCard from "@/app/components/cards/ListingCard";
import { Listing } from "@/app/types";

interface ListingsRowProps {
  title: string;
  subtitle?: string;
  listings: Listing[];
  tier?: "new" | "premium" | "platinum";
  description?: string;
}

const tierCopy = {
  new: "Recently approved advertisers entering the directory.",
  premium: "Badged placements with stronger visibility and direct phone display.",
  platinum: "Pinned spotlight listings designed for the top of city results.",
};

export default function ListingsRow({
  title,
  subtitle,
  listings,
  tier = "new",
  description,
}: ListingsRowProps) {
  const isPlatinum = tier === "platinum";
  const isPremium = tier === "premium";

  return (
    <section
      className={`relative overflow-hidden py-20 ${
        isPlatinum ? "bg-background-ink" : isPremium ? "bg-background-elevated/45" : "bg-background"
      }`}
    >
      {isPlatinum && (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(201,168,76,0.16),transparent_26rem),radial-gradient(circle_at_20%_70%,rgba(197,81,208,0.18),transparent_24rem)]"
          aria-hidden
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            {subtitle && <span className="section-subtitle">{subtitle}</span>}
            <h2 className={`section-title mt-4 ${isPlatinum ? "text-metal-gradient" : ""}`}>
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
              {description || tierCopy[tier]}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {(isPremium || isPlatinum) && (
              <span
                className={`tier-badge ${
                  isPlatinum
                    ? "bg-gradient-metal text-background"
                    : "bg-accent-gold text-background"
                }`}
              >
                {isPlatinum ? "Pinned first" : "Paid tier"}
              </span>
            )}
            <a
              href={tier === "new" ? "/new-listings" : `/${tier}-listings`}
              className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-accent-gold hover:text-accent-gold"
            >
              View all
            </a>
          </div>
        </div>

        <div
          className={`grid gap-6 ${
            isPlatinum
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} variant={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
