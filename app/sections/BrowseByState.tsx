import Link from "next/link";

const states = [
  { name: "New South Wales", image: "/images/states/nsw.jpg", slug: "new-south-wales" },
  { name: "Queensland", image: "/images/states/qld.jpg", slug: "queensland" },
  { name: "Victoria", image: "/images/states/vic.jpg", slug: "victoria" },
  { name: "Western Australia", image: "/images/states/wa.jpg", slug: "western-australia" },
  { name: "South Australia", image: "/images/states/sa.jpg", slug: "south-australia" },
  { name: "Tasmania", image: "/images/states/tas.jpg", slug: "tasmania" },
  { name: "Northern Territory", image: "/images/states/nt.jpg", slug: "northern-territory" },
  { name: "ACT", image: "/images/states/act.jpg", slug: "act" },
];

export default function BrowseByState() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-subtitle">Explore</span>
          <h2 className="section-title">Browse By State</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/location/${state.slug}`}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden glass-card hover:border-accent-gold transition-colors"
            >
              {/* Placeholder Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-background-elevated to-background-card group-hover:from-background-elevated/80 group-hover:to-background/80 transition-colors" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h3 className="text-text-primary font-heading font-semibold text-lg text-center group-hover:text-accent-gold transition-colors">
                  {state.name}
                </h3>
                <span className="text-text-muted text-xs mt-2 group-hover:text-accent-gold-light transition-colors">
                  View Listings →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
