export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            Copyright Notice
          </h1>
          <p className="text-text-secondary">
            © {new Date().getFullYear()} Private Guys Australia. All rights reserved.
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">1. Ownership</h2>
            <p className="text-text-secondary leading-relaxed">
              All content on this website, including but not limited to text, graphics, 
              logos, icons, images, audio clips, digital downloads, and software, is the 
              property of Private Guys Australia or its content suppliers and is protected 
              by Australian and international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">2. User Content</h2>
            <p className="text-text-secondary leading-relaxed">
              By uploading content to this platform, you grant Private Guys a non-exclusive, 
              royalty-free, worldwide license to use, display, and distribute your content 
              for the purpose of operating and promoting the platform. You retain ownership 
              of your original content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">3. Restrictions</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>Reproduce, duplicate, copy, sell, or resell any part of this website</li>
              <li>Use our content for commercial purposes without permission</li>
              <li>Modify or create derivative works from our content</li>
              <li>Remove any copyright or proprietary notices</li>
              <li>Frame or mirror any part of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">4. DMCA/Copyright Infringement</h2>
            <p className="text-text-secondary leading-relaxed">
              If you believe your copyrighted material has been used on this platform without 
              authorization, please contact our copyright agent with the following information:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mt-4">
              <li>Description of the copyrighted work</li>
              <li>Location of the infringing material on our platform</li>
              <li>Your contact information</li>
              <li>Statement of good faith belief</li>
              <li>Statement under penalty of perjury</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">5. Trademarks</h2>
            <p className="text-text-secondary leading-relaxed">
              &quot;Private Guys&quot; and associated logos are trademarks of Private Guys Australia. 
              Unauthorized use of these trademarks is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">6. Contact</h2>
            <p className="text-text-secondary leading-relaxed">
              For copyright inquiries, contact: copyright@privateguys.com.au
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
