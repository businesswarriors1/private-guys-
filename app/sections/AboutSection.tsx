export default function AboutSection() {
  return (
    <section className="py-16 bg-background-elevated">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="section-subtitle">About Us</span>
        <h2 className="section-title mb-6">
          Australia&apos;s Trusted Male Companion Directory
        </h2>

        <div className="space-y-6 text-text-secondary">
          <p className="text-lg leading-relaxed">
            Private Guys is Australia&apos;s premier directory for male companions, connecting
            discerning clients with verified, professional advertisers across the country.
            Our platform is designed to provide a safe, discreet, and reliable way to find
            the perfect companion for any occasion.
          </p>

          <p className="leading-relaxed">
            Every advertiser on our platform undergoes a rigorous verification process to
            ensure authenticity and professionalism. We pride ourselves on maintaining
            the highest standards of quality and discretion in the industry.
          </p>

          <div className="glass-card-gold rounded-xl p-6 mt-8">
            <h3 className="text-accent-gold font-semibold mb-4">Important Notice</h3>
            <p className="text-text-secondary text-sm">
              Private Guys provides classified advertising space only and does not employ,
              represent, or manage any advertiser listed on this platform. All advertisers
              are independent contractors operating their own businesses. We do not
              broker, negotiate, or facilitate transactions between advertisers and clients.
              This website contains adult content and is strictly for persons aged 18 years
              or older.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
