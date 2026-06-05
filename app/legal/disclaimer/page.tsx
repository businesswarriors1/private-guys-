export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            Disclaimer
          </h1>
        </div>

        <div className="glass-card rounded-xl p-8 space-y-8">
          <section className="glass-card-gold rounded-xl p-6">
            <h2 className="text-xl font-semibold text-accent-gold mb-4">
              Important Legal Notice
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Private Guys Australia provides <strong className="text-text-primary">classified advertising space only</strong>. 
              We do not employ, represent, manage, broker, or facilitate transactions between 
              any advertiser and client. All advertisers listed on this platform are independent 
              contractors operating their own businesses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Nature of Platform</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              This platform operates as:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>A directory where verified advertisers can be found by location</li>
              <li>An advertising platform where advertisers pay for visibility</li>
              <li>A neutral marketplace connecting independent service providers with potential clients</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">No Employment Relationship</h2>
            <p className="text-text-secondary leading-relaxed">
              Private Guys has no employment, agency, partnership, or joint venture relationship 
              with any advertiser. Advertisers are not employees, contractors, or agents of 
              Private Guys. We do not control, supervise, or direct the activities of advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">No Verification of Services</h2>
            <p className="text-text-secondary leading-relaxed">
              While we verify the identity and age of advertisers, we do not verify, endorse, 
              or guarantee the quality, legality, or safety of any services offered. Users 
              are responsible for conducting their own due diligence before engaging with any advertiser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Limitation of Liability</h2>
            <p className="text-text-secondary leading-relaxed">
              Private Guys shall not be liable for any direct, indirect, incidental, special, 
              consequential, or punitive damages arising from your use of this platform or any 
              interactions with advertisers. This includes but is not limited to damages for 
              loss of profits, goodwill, data, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">User Responsibility</h2>
            <p className="text-text-secondary leading-relaxed">
              Users acknowledge that they are responsible for their own actions and decisions 
              when using this platform. Users must comply with all applicable laws in their 
              jurisdiction regarding adult services and advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Age Verification</h2>
            <p className="text-text-secondary leading-relaxed">
              All persons depicted in images on this website were at least 18 years of age 
              at the time of photography. We require proof of age from all advertisers and 
              maintain records as required by law.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
