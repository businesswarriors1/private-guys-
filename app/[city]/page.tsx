import AgeGate from "@/app/components/AgeGate";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ListingCard from "@/app/components/cards/ListingCard";
import { mockListings } from "@/app/data/mockListings";
import { australianLocations } from "@/app/types";
import { notFound } from "next/navigation";

const validCities = australianLocations.flatMap((location) => location.cities);

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function getCityBySlug(slug: string) {
  return validCities.find((city) => toSlug(city) === slug);
}

interface Props {
  params: {
    city: string;
  };
}

export function generateStaticParams() {
  return validCities.map((city) => ({ city: toSlug(city) }));
}

export function generateMetadata({ params }: Props) {
  const cityName = getCityBySlug(params.city.toLowerCase()) || "Australia";

  return {
    title: `Male Companions in ${cityName} | Private Guys Australia`,
    description: `Browse verified male companions in ${cityName}. Premium, Platinum and Standard listings available.`,
  };
}

export default function CityPage({ params }: Props) {
  const citySlug = params.city.toLowerCase();
  const cityName = getCityBySlug(citySlug);

  if (!cityName) {
    notFound();
  }

  // Get listings for this city
  const cityListings = mockListings.filter(
    (listing) => listing.city.toLowerCase() === cityName.toLowerCase()
  );

  const platinumListings = cityListings.filter((l) => l.tier === "platinum");
  const premiumListings = cityListings.filter((l) => l.tier === "premium");
  const standardListings = cityListings.filter((l) => l.tier === "standard");

  return (
    <>
      <AgeGate />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-b from-background-elevated to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              Male Companions in{" "}
              <span className="text-gold-gradient">{cityName}</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Browse verified, professional male companions in {cityName}. 
              Filter by tier, attributes, and availability.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Platinum */}
            {platinumListings.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-heading font-semibold text-metal-gradient">
                    Platinum Elite
                  </h2>
                  <span className="bg-gradient-metal text-background text-xs font-bold px-2 py-1 rounded">
                    PLATINUM
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platinumListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      variant="platinum"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Premium */}
            {premiumListings.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-heading font-semibold text-text-primary">
                    Premium Companions
                  </h2>
                  <span className="bg-accent-gold text-background text-xs font-bold px-2 py-1 rounded">
                    PREMIUM
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {premiumListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      variant="premium"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Standard */}
            {standardListings.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-heading font-semibold text-text-primary">
                    Standard Listings
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {standardListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      variant="standard"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {cityListings.length === 0 && (
              <div className="text-center py-16">
                <p className="text-text-secondary text-lg mb-2">
                  No listings found in {cityName}
                </p>
                <p className="text-text-muted text-sm">
                  Be the first to list here!{" "}
                  <a
                    href="/register"
                    className="text-accent-gold hover:underline"
                  >
                    Register now
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
