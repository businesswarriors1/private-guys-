import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>

        <p className="text-xl text-slate-300 mb-4">
          Your subscription has been activated. You can now create and manage your listings.
        </p>

        <p className="text-slate-400 mb-8">
          A confirmation email has been sent to your registered email address.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition"
          >
            Create Listing
          </Link>
        </div>

        <div className="mt-12 p-6 bg-slate-700/50 rounded-lg border border-slate-600">
          <h3 className="font-bold mb-3">What&apos;s Next?</h3>
          <ul className="text-left text-slate-300 space-y-2">
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
