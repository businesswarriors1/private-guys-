import AgeGate from "@/app/components/AgeGate";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ListingCard from "@/app/components/cards/ListingCard";
import { mockListings } from "@/app/data/mockListings";
import { australianLocations } from "@/app/types";
import { notFound } from "next/navigation";
import Link from "next/link";

interface StatePageProps {
  params: {
    state: string;
  };
}

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function getStateBySlug(slug: string) {
  return australianLocations.find((location) => toSlug(location.state) === slug);
}

export function generateStaticParams() {
  return australianLocations.map((location) => ({
    state: toSlug(location.state),
  }));
}

export function generateMetadata({ params }: StatePageProps) {
  const location = getStateBySlug(params.state);

  if (!location) {
    return {
      title: "Location Not Found | Private Guys Australia",
    };
  }

  return {
    title: `Male Companions in ${location.state} | Private Guys Australia`,
    description: `Browse verified male companion listings across ${location.state}. Compare Platinum, Premium and Standard advertisers by city.`,
  };
}

export default function StatePage({ params }: StatePageProps) {
  const location = getStateBySlug(params.state);

  if (!location) {
    notFound();
  }

  const stateListings = mockListings.filter(
    (listing) => listing.state === location.state,
  );
  const sortedListings = [...stateListings].sort((a, b) => {
    const rank = { platinum: 0, premium: 1, standard: 2, free: 3 };
    return rank[a.tier] - rank[b.tier];
  });

  return (
    <>
      <AgeGate />
      <Header />
      <main className="min-h-screen bg-background pt-24">
        <section className="premium-shell relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/86 to-background" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="brand-kicker">State directory</span>
            <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <h1 className="font-heading text-5xl font-semibold leading-tight text-text-primary md:text-7xl">
                  Male companions in{" "}
                  <span className="text-gold-gradient">{location.state}</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
                  Browse the state first, then drill into each city. Listings
                  follow the PrivateGirls placement model: Platinum, Premium,
                  Standard, then Free.
                </p>
              </div>

              <div className="luxury-panel p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">
                  Cities and regions
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {location.cities.map((city) => {
                    const count = mockListings.filter(
                      (listing) => listing.city === city,
                    ).length;

                    return (
                      <Link
                        key={city}
                        href={`/${toSlug(city)}`}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-accent-gold hover:text-accent-gold"
                      >
                        <span className="block text-sm font-semibold text-text-primary">
                          {city}
                        </span>
                        <span className="mt-1 block text-xs text-text-muted">
                          {count || "New"} listings
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="section-subtitle">Featured advertisers</span>
                <h2 className="section-title mt-4">{location.state} listings</h2>
              </div>
              <Link
                href="/search"
                className="inline-flex w-fit rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-accent-gold hover:text-accent-gold"
              >
                Advanced search
              </Link>
            </div>

            {sortedListings.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {sortedListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    variant={listing.tier === "platinum" ? "platinum" : listing.tier === "premium" ? "premium" : "standard"}
                  />
                ))}
              </div>
            ) : (
              <div className="border border-white/10 bg-background-card p-8 text-center">
                <p className="text-lg text-text-secondary">
                  No live listings in {location.state} yet.
                </p>
                <Link
                  href="/register"
                  className="mt-5 inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-background transition-colors hover:bg-accent-gold-light"
                >
                  Advertise here
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
