export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString("en-AU")}
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">1. Age Restriction</h2>
            <p className="text-text-secondary leading-relaxed">
              This website contains adult content and is strictly for persons aged 18 years or older. 
              By accessing this website, you confirm that you are of legal age in your jurisdiction. 
              We reserve the right to verify the age of any user at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">2. Nature of Service</h2>
            <p className="text-text-secondary leading-relaxed">
              Private Guys provides classified advertising space only. We do not employ, represent, 
              manage, or broker any advertiser listed on this platform. All advertisers are independent 
              contractors operating their own businesses. We do not facilitate transactions between 
              advertisers and clients.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">3. User Conduct</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Users agree to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Use the platform in accordance with all applicable laws</li>
              <li>Not use the platform for any illegal activities</li>
              <li>Respect the privacy and boundaries of advertisers</li>
              <li>Not harass, abuse, or discriminate against any user</li>
              <li>Not post false, misleading, or defamatory content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">4. Advertiser Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              Advertisers must be at least 18 years of age and provide accurate information. 
              All advertisers must complete our verification process before listings go live. 
              We reserve the right to remove any listing that violates our policies or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">5. Liability</h2>
            <p className="text-text-secondary leading-relaxed">
              Private Guys is not responsible for the conduct of any advertiser or user. 
              We do not guarantee the accuracy of any information posted by advertisers. 
              Users engage with advertisers at their own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">6. Modifications</h2>
            <p className="text-text-secondary leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the 
              platform constitutes acceptance of updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">7. Contact</h2>
            <p className="text-text-secondary leading-relaxed">
              For questions regarding these terms, please contact us at legal@privateguys.com.au
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
