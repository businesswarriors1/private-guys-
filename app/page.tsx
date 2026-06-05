import Link from "next/link";
import AgeGate from "@/app/components/AgeGate";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Hero from "@/app/sections/Hero";
import ListingsRow from "@/app/sections/ListingsRow";
import BrowseByState from "@/app/sections/BrowseByState";
import AboutSection from "@/app/sections/AboutSection";
import {
  getNewListings,
  getPremiumListings,
  getPlatinumListings,
} from "@/app/data/mockListings";
import { getAllBlogPosts } from "@/app/data/blogPosts";

export const metadata = {
  title: "Private Guys Australia | Premier Male Companion Directory",
  description:
    "Australia's premier directory for male companions. Browse verified, professional male escorts and companions across Australia.",
};

const tierModel = [
  {
    tier: "Free",
    title: "Entry listing",
    body: "Basic presence at the bottom of city results, built to encourage upgrades.",
  },
  {
    tier: "Standard",
    title: "Thumbnail grid",
    body: "Image, attributes and profile depth for advertisers ready to be compared.",
  },
  {
    tier: "Premium",
    title: "Priority visibility",
    body: "Badged placement above standard listings with phone visibility.",
  },
  {
    tier: "Platinum",
    title: "Pinned spotlight",
    body: "Top city placement and homepage rotation for the highest-value advertisers.",
  },
];

export default function Home() {
  const newListings = getNewListings();
  const premiumListings = getPremiumListings();
  const platinumListings = getPlatinumListings();
  const latestPosts = getAllBlogPosts().slice(0, 3);

  return (
    <>
      <AgeGate />
      <Header />
      <main className="bg-background">
        <Hero />

        <section className="relative bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <span className="section-subtitle">Placement ladder</span>
                <h2 className="section-title mt-4">Visibility is the product.</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-text-secondary sm:text-base lg:justify-self-end">
                The page now makes the business model obvious: verified
                advertisers enter by tier, then move higher through paid city
                placement.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {tierModel.map((item, index) => (
                <div
                  key={item.tier}
                  className="relative min-h-52 overflow-hidden border border-white/10 bg-background-card p-5"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-gold" />
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-gold">
                    0{index + 1} / {item.tier}
                  </p>
                  <h3 className="mt-5 font-heading text-2xl font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-text-secondary">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="listings">
          <ListingsRow
            title="New listings"
            subtitle="Recently approved"
            listings={newListings}
            tier="new"
            description="Fresh profiles entering the marketplace, surfaced first so returning visitors see what changed."
          />

          <ListingsRow
            title="Premium companions"
            subtitle="Paid visibility"
            listings={premiumListings}
            tier="premium"
            description="Premium profiles sit above standard results and carry stronger trust cues, direct contact display and richer cards."
          />

          <ListingsRow
            title="Platinum elite"
            subtitle="Pinned spotlight"
            listings={platinumListings}
            tier="platinum"
            description="The top tier is treated as a spotlight product: larger cards, stronger gold treatment and the clearest path to profile views."
          />
        </div>

        <BrowseByState />
        <AboutSection />

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="section-subtitle">Latest editorial</span>
                <h2 className="section-title mt-4">Guides for safer browsing.</h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex w-fit rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-accent-gold hover:text-accent-gold"
              >
                View all posts
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative min-h-80 overflow-hidden border border-white/10 bg-background-card p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-gold/55 hover:shadow-elevated"
                >
                  <div
                    className="absolute inset-0 opacity-[0.22] transition-opacity group-hover:opacity-30"
                    style={{
                      backgroundImage: `url(${post.featuredImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
                  <div className="relative flex min-h-[17rem] flex-col">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">
                      {post.category} / {post.readTime} min
                    </span>
                    <h3 className="mt-auto font-heading text-3xl font-semibold leading-tight text-text-primary transition-colors group-hover:text-accent-gold">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-text-secondary">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
