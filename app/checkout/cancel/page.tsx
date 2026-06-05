import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="premium-shell min-h-screen text-text-primary flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-4xl font-bold mb-4">Checkout Cancelled</h1>

        <p className="text-xl text-text-secondary mb-4">
          Your checkout was cancelled. Your account has not been charged.
        </p>

        <p className="text-text-secondary mb-8">
          No worries! You can try again anytime. All your information has been saved.
        </p>

        <div className="flex gap-4 justify-center flex-col">
          <Link
            href="/checkout"
            className="px-6 py-3 bg-accent-gold hover:bg-accent-gold-light text-background font-bold rounded-lg transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-background-elevated hover:bg-accent-gold hover:text-background text-text-primary font-bold rounded-lg transition"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-12 p-6 glass-card rounded-lg border border-border-default text-left">
          <h3 className="font-bold mb-3">Need Help?</h3>
          <p className="text-text-secondary text-sm mb-3">
            If you&apos;re having trouble completing your purchase, please contact our support team.
          </p>
          <Link href="/contact" className="text-accent-gold hover:text-accent-gold-light text-sm">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
