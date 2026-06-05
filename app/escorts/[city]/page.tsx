import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgeGate from "@/app/components/AgeGate";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { mockListings } from "@/app/data/mockListings";
import ListingCard from "@/app/components/cards/ListingCard";
import { australianLocations } from "@/app/types";

interface EscortsPageProps {
  params: {
    city: string;
  };
}

const cities = australianLocations.flatMap((location) => location.cities);

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function getCityName(slug: string) {
  const decodedCity = decodeURIComponent(slug.replace(/-/g, " "));
  return cities.find((c) => c.toLowerCase() === decodedCity.toLowerCase());
}

export async function generateMetadata({
  params,
}: EscortsPageProps): Promise<Metadata> {
  const cityName = getCityName(params.city) || decodeURIComponent(params.city.replace(/-/g, " "));

  return {
    title: `Male Escorts in ${cityName} | Private Guys Australia`,
    description: `Find verified male escorts and companions in ${cityName}. Browse professional male escort services across Australia.`,
    keywords: [
      "male escorts",
      cityName,
      "escorts",
      "male companions",
      "Australia",
    ],
    openGraph: {
      title: `Male Escorts in ${cityName}`,
      description: `Find verified male escorts and companions in ${cityName}.`,
      type: "website",
    },
  };
}

export const dynamicParams = true;

export function generateStaticParams() {
  return cities.map((city) => ({
    city: toSlug(city),
  }));
}

export default function EscortsPage({
  params,
}: EscortsPageProps) {
  const decodedCity = decodeURIComponent(params.city.replace(/-/g, " "));
  const cityName =
    cities.find((c) => c.toLowerCase() === decodedCity.toLowerCase()) ||
    decodedCity;

  // Filter listings by city
  const listings = mockListings.filter((listing) =>
    listing.city.toLowerCase() === cityName.toLowerCase()
  );

  if (listings.length === 0 && !cities.some((c) => c.toLowerCase() === decodedCity.toLowerCase())) {
    notFound();
  }

  return (
    <>
      <AgeGate />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-accent-gold/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="py-16">
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-4">
                Male Escorts in <span className="text-accent-gold">{cityName}</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl">
                Discover verified male escorts and companions available in {cityName}. All profiles are thoroughly verified and professional.
              </p>
            </div>
          </section>

          {/* Schema.org Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: `Male Escorts in ${cityName}`,
                image: "https://privateguys.com.au/logo.png",
                description: `Find verified male escorts and companions in ${cityName}, Australia.`,
                areaServed: {
                  "@type": "City",
                  name: cityName,
                  addressCountry: "AU",
                },
                url: `https://privateguys.com.au/escorts/${params.city}`,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: cityName,
                  addressCountry: "AU",
                },
              }),
            }}
          />

          {/* Listings Grid */}
          <section className="py-12">
            {listings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
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
              </div>
            )}
          </section>

          {/* SEO Content Section */}
          <section className="py-16 mb-12">
            <div className="glass-card rounded-2xl p-12">
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">
                Male Escorts in {cityName}
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Welcome to Private Guys Australia, your premier directory for verified male escorts in {cityName}. Whether you are looking for a professional escort service for companionship, events, or special occasions, we have a selection of verified male escorts to meet your needs.
                </p>
                <p>
                  All our escorts are thoroughly verified and committed to providing a professional, discreet, and enjoyable experience. Our directory features only the most professional and reliable male escorts in {cityName} who have passed our comprehensive verification process.
                </p>
                <p>
                  Browse our listings to find the perfect escort for your needs. Each profile includes detailed information, verified photos, rates, availability, and services offered. Contact your chosen escort directly to arrange your appointment.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
