import AgeGate from "@/app/components/AgeGate";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Register | Private Guys Australia",
  description: "Create your advertiser account on Private Guys Australia.",
};

export default function RegisterPage() {
  return (
    <>
      <AgeGate />
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Create Account
            </h1>
            <p className="text-text-secondary">
              Start your journey as a verified advertiser
            </p>
          </div>

          <div className="glass-card-gold rounded-xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-text-primary text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-background-elevated border border-border-default rounded-lg px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-text-primary text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-background-elevated border border-border-default rounded-lg px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none"
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label className="block text-text-primary text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full bg-background-elevated border border-border-default rounded-lg px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="age"
                  className="mt-1 accent-accent-gold"
                />
                <label htmlFor="age" className="text-text-secondary text-sm">
                  I confirm I am 18 years or older
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 accent-accent-gold"
                />
                <label htmlFor="terms" className="text-text-secondary text-sm">
                  I agree to the{" "}
                  <a href="/legal/terms" className="text-accent-gold hover:underline">
                    Terms &amp; Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/legal/privacy" className="text-accent-gold hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-gold hover:bg-accent-gold-light text-background font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-accent-gold hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
