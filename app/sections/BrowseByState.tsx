import Link from "next/link";
import { australianLocations } from "@/app/types";

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function BrowseByState() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="absolute inset-x-0 top-0">
        <div className="metal-rule" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <span className="section-subtitle">Location network</span>
            <h2 className="section-title mt-4">Browse by state.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-text-secondary sm:text-base lg:justify-self-end">
            Match the PrivateGirls geography model: state first, city second,
            then tiered placement inside each result set.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {australianLocations.map((location, index) => {
            const featuredCity = location.cities[0];
            return (
              <Link
                key={location.state}
                href={`/location/${toSlug(location.state)}`}
                className="group relative min-h-56 overflow-hidden border border-white/10 bg-background-card p-5 transition duration-300 hover:-translate-y-1 hover:border-accent-gold/60 hover:shadow-elevated"
              >
                <div
                  className="absolute inset-0 opacity-80 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      index % 2 === 0
                        ? "radial-gradient(circle at 20% 0%, rgba(197,81,208,0.26), transparent 13rem), linear-gradient(145deg, rgba(22,13,30,0.74), rgba(0,0,0,0.92))"
                        : "radial-gradient(circle at 80% 0%, rgba(224,64,200,0.22), transparent 13rem), linear-gradient(145deg, rgba(201,168,76,0.1), rgba(0,0,0,0.94))",
                  }}
                />
                <div className="relative flex h-full flex-col">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">
                    {location.cities.length} cities
                  </span>
                  <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight text-text-primary">
                    {location.state}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-text-secondary">
                    Start with {featuredCity}
                    {location.cities[1] ? `, ${location.cities[1]}` : ""} and
                    nearby regions.
                  </p>
                  <span className="mt-auto pt-8 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">
                    View listings
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
