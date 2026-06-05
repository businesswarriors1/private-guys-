import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="premium-shell min-h-screen text-text-primary flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>

        <p className="text-xl text-text-secondary mb-4">
          Your subscription has been activated. You can now create and manage your listings.
        </p>

        <p className="text-text-secondary mb-8">
          A confirmation email has been sent to your registered email address.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-accent-gold hover:bg-accent-gold-light text-background font-bold rounded-lg transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/dashboard/listing"
            className="px-6 py-3 bg-background-elevated hover:bg-accent-gold hover:text-background text-text-primary font-bold rounded-lg transition"
          >
            Create Listing
          </Link>
        </div>

        <div className="mt-12 p-6 glass-card rounded-lg border border-border-default">
          <h3 className="font-bold mb-3">What&apos;s Next?</h3>
          <ul className="text-left text-text-secondary space-y-2">
            <li>✓ Complete your profile</li>
            <li>✓ Add profile photos</li>
            <li>✓ Set your availability</li>
            <li>✓ Configure notifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
