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

export const metadata = {
  title: "Private Guys Australia | Premier Male Companion Directory",
  description:
    "Australia's premier directory for male companions. Browse verified, professional male escorts and companions across Australia.",
};

export default function Home() {
  const newListings = getNewListings();
  const premiumListings = getPremiumListings();
  const platinumListings = getPlatinumListings();

  return (
    <>
      <AgeGate />
      <Header />
      <main className="bg-background">
        <Hero />

        <div id="listings">
          <ListingsRow
            title="New Listings"
            subtitle="Just Added"
            listings={newListings}
            tier="new"
          />

          <ListingsRow
            title="Premium Companions"
            subtitle="Verified & Professional"
            listings={premiumListings}
            tier="premium"
          />

          <ListingsRow
            title="Platinum Elite"
            subtitle="Top Tier"
            listings={platinumListings}
            tier="platinum"
          />
        </div>

        <BrowseByState />

        <AboutSection />

        {/* Blog Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="section-subtitle">Latest</span>
                <h2 className="section-title">From The Blog</h2>
              </div>
              <a
                href="/blog"
                className="text-accent-gold hover:text-accent-gold-light text-sm font-medium"
              >
                View All →
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "How to Choose the Right Companion",
                  excerpt:
                    "A guide to finding the perfect companion for your needs and preferences.",
                  date: "June 1, 2024",
                },
                {
                  title: "Etiquette for First-Time Clients",
                  excerpt:
                    "Essential tips for making your first experience smooth and enjoyable.",
                  date: "May 28, 2024",
                },
                {
                  title: "Understanding Verification",
                  excerpt:
                    "Why we verify all advertisers and what it means for your safety.",
                  date: "May 25, 2024",
                },
              ].map((post, i) => (
                <article
                  key={i}
                  className="glass-card rounded-xl p-6 hover:border-accent-gold transition-colors cursor-pointer"
                >
                  <span className="text-text-muted text-xs">{post.date}</span>
                  <h3 className="text-text-primary font-semibold text-lg mt-2 mb-3 hover:text-accent-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{post.excerpt}</p>
                  <span className="text-accent-gold text-sm mt-4 inline-block">
                    Read More →
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
