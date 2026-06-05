export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            Acceptable Usage Policy
          </h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString("en-AU")}
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">1. Prohibited Content</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Users may not post content that:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Depicts or promotes illegal activities</li>
              <li>Involves minors or suggests minors are present</li>
              <li>Is violent, threatening, or promotes violence</li>
              <li>Contains malware, viruses, or malicious code</li>
              <li>Infringes on intellectual property rights</li>
              <li>Is defamatory, libelous, or invasive of privacy</li>
              <li>Promotes human trafficking or exploitation</li>
              <li>Is false, misleading, or fraudulent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">2. Prohibited Activities</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Users may not:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Use automated systems to access or scrape the platform</li>
              <li>Attempt to bypass security measures or access restricted areas</li>
              <li>Impersonate other users or entities</li>
              <li>Harass, stalk, or intimidate other users</li>
              <li>Distribute spam or unsolicited communications</li>
              <li>Manipulate ratings, reviews, or platform metrics</li>
              <li>Share account credentials or allow unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">3. Image Requirements</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              All uploaded images must:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Feature only persons aged 18 or older</li>
              <li>Be owned by the uploader or properly licensed</li>
              <li>Not contain explicit sexual content</li>
              <li>Be clear, well-lit, and appropriate</li>
              <li>Not be digitally altered to misrepresent appearance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">4. Reporting Violations</h2>
            <p className="text-text-secondary leading-relaxed">
              Users can report violations through the reporting mechanism on every profile 
              or by contacting support@privateguys.com.au. We investigate all reports promptly 
              and take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">5. Enforcement</h2>
            <p className="text-text-secondary leading-relaxed">
              Violations of this policy may result in content removal, account suspension, 
              permanent banning, and/or legal action. We reserve the right to determine 
              violations at our sole discretion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
