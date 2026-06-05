const pillars = [
  {
    title: "Verified before live",
    body: "Advertiser identity, age and image review sit before public placement.",
  },
  {
    title: "Placement is the product",
    body: "Paid tiers buy visibility by city, with Premium and Platinum surfaced first.",
  },
  {
    title: "Independent advertisers",
    body: "The platform sells classified advertising space only, not representation.",
  },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-background-elevated py-20">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(197,81,208,0.18),transparent_26rem),radial-gradient(circle_at_90%_60%,rgba(201,168,76,0.1),transparent_28rem)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="section-subtitle">Platform position</span>
            <h2 className="section-title mt-4">
              A premium classifieds model, not an agency.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-text-secondary">
              Private Guys is built as the male companion sister site to
              PrivateGirls: a national adult directory where verified
              independent advertisers can purchase visibility by location and
              tier.
            </p>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="luxury-panel p-6">
                <h3 className="font-heading text-2xl font-semibold text-text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border border-accent-gold/28 bg-background/72 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="tier-badge bg-secondary-wine text-white">Important notice</div>
            <p className="text-sm leading-7 text-text-secondary">
              Private Guys provides classified advertising space only and does
              not employ, represent, manage, broker, negotiate for or facilitate
              transactions between advertisers and clients. All advertisers are
              independent adults operating their own businesses. This website is
              strictly for persons aged 18 years or older.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
