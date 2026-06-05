import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { mockListings } from "@/app/data/mockListings";
import EscortPageClient from "@/app/components/EscortPageClient";

interface EscortsPageProps {
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
}: EscortsPageProps): Promise<Metadata> {
  const decodedCity = decodeURIComponent(params.city.replace(/-/g, " "));
  const cityName =
    cities.find((c) => c.toLowerCase() === decodedCity.toLowerCase()) ||
    decodedCity;

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

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.toLowerCase().replace(/\s+/g, "-"),
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
          <EscortPageClient cityName={cityName} listings={listings} city={params.city} />

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
        </div>
      </main>
      <Footer />
    </>
  );
}
