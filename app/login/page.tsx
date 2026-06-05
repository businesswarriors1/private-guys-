import AgeGate from "@/app/components/AgeGate";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Login | Private Guys Australia",
  description: "Sign in to your Private Guys Australia account.",
};

export default function LoginPage() {
  return (
    <>
      <AgeGate />
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">Sign in to your account</p>
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
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="accent-accent-gold"
                  />
                  <label
                    htmlFor="remember"
                    className="text-text-secondary text-sm"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-accent-gold text-sm hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-gold hover:bg-accent-gold-light text-background font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-accent-gold hover:underline">
                  Register now
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
