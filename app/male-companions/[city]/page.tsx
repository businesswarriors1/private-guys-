import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { mockListings } from "@/app/data/mockListings";
import ListingCard from "@/app/components/cards/ListingCard";

interface MaleCompanionPageProps {
  params: {
    city: string;
  };
}

const cities = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Hobart",
  "Canberra",
  "Darwin",
  "Gold Coast",
  "Newcastle",
  "Wollongong",
  "Logan City",
  "Geelong",
];

export async function generateMetadata({
  params,
}: MaleCompanionPageProps): Promise<Metadata> {
  const decodedCity = decodeURIComponent(params.city.replace(/-/g, " "));
  const cityName =
    cities.find((c) => c.toLowerCase() === decodedCity.toLowerCase()) ||
    decodedCity;

  return {
    title: `Male Companions in ${cityName} | Private Guys Australia`,
    description: `Find verified male companions and escorts in ${cityName}. Browse professional male companions across Australia.`,
    keywords: [
      "male companions",
      cityName,
      "male escorts",
      "companions",
      "Australia",
    ],
    openGraph: {
      title: `Male Companions in ${cityName}`,
      description: `Find verified male companions and escorts in ${cityName}.`,
      type: "website",
    },
  };
}

export const dynamicParams = true;

export default function MaleCompanionPage({
  params,
}: MaleCompanionPageProps) {
  const decodedCity = decodeURIComponent(params.city.replace(/-/g, " "));
  const cityName =
    cities.find((c) => c.toLowerCase() === decodedCity.toLowerCase()) ||
    decodedCity;

  // Filter listings by city
  const listings = mockListings.filter((listing) =>
    listing.location.toLowerCase().includes(decodedCity.toLowerCase())
  );

  if (listings.length === 0 && !cities.some((c) => c.toLowerCase() === decodedCity.toLowerCase())) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-accent-gold/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="py-16">
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-4">
                Male Companions in <span className="text-accent-gold">{cityName}</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl">
                Discover verified male companions and escorts available in {cityName}. All profiles are thoroughly verified and professional.
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
                name: `Male Companions in ${cityName}`,
                image:
                  "https://privateguys.com.au/logo.png",
                description: `Find verified male companions and escorts in ${cityName}, Australia.`,
                areaServed: {
                  "@type": "City",
                  name: cityName,
                  addressCountry: "AU",
                },
                url: `https://privateguys.com.au/male-companions/${params.city}`,
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
                  No Companions Available
                </h3>
                <p className="text-text-secondary mb-6">
                  Check back soon for new listings in {cityName}.
                </p>
                <a
                  href="/register"
                  className="inline-block bg-accent-gold hover:bg-accent-gold-light text-background px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Register as a Companion
                </a>
              </div>
            )}
          </section>

          {/* SEO Content Section */}
          <section className="py-16 mb-12">
            <div className="glass-card rounded-2xl p-12">
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">
                Male Companions in {cityName}
              </h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Welcome to Private Guys Australia, your premier directory for verified male companions in {cityName}. Whether you're looking for a professional companion for a special event, a dinner date, or simply to spend time with an engaging and attractive man, we have a selection of verified male escorts to meet your needs.
                </p>
                <p>
                  All our companions are thoroughly verified and committed to providing a professional, discreet, and enjoyable experience. Our directory features only the most professional and reliable male companions in {cityName} who have passed our comprehensive verification process.
                </p>
                <p>
                  Browse our listings to find the perfect companion for your needs. Each profile includes detailed information, verified photos, rates, and availability. Contact your chosen companion directly to arrange your appointment.
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
