export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            Privacy Statement
          </h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString("en-AU")}
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">1. Information We Collect</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Account information (email, password)</li>
              <li>Profile information (name, location, photos)</li>
              <li>Verification documents (government ID, selfie)</li>
              <li>Payment information (processed by our payment processor)</li>
              <li>Usage data (IP address, browser type, pages visited)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">2. How We Use Your Information</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Provide and maintain our services</li>
              <li>Verify advertiser identity and age</li>
              <li>Process payments and subscriptions</li>
              <li>Communicate with you about your account</li>
              <li>Improve our platform and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">3. Data Security</h2>
            <p className="text-text-secondary leading-relaxed">
              We implement appropriate security measures to protect your personal information. 
              Verification documents are stored encrypted and are only accessible to authorized 
              personnel. We use industry-standard encryption for data transmission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">4. Data Retention</h2>
            <p className="text-text-secondary leading-relaxed">
              We retain your information for as long as your account is active or as needed 
              to provide services. Verification documents are retained for legal compliance 
              purposes. You may request deletion of your account and associated data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">5. Your Rights</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">6. Contact</h2>
            <p className="text-text-secondary leading-relaxed">
              For privacy-related inquiries, contact us at privacy@privateguys.com.au
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
