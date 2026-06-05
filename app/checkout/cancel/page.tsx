import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-4xl font-bold mb-4">Checkout Cancelled</h1>

        <p className="text-xl text-slate-300 mb-4">
          Your checkout was cancelled. Your account has not been charged.
        </p>

        <p className="text-slate-400 mb-8">
          No worries! You can try again anytime. All your information has been saved.
        </p>

        <div className="flex gap-4 justify-center flex-col">
          <Link
            href="/checkout"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-12 p-6 bg-slate-700/50 rounded-lg border border-slate-600 text-left">
          <h3 className="font-bold mb-3">Need Help?</h3>
          <p className="text-slate-300 text-sm mb-3">
            If you&apos;re having trouble completing your purchase, please contact our support team.
          </p>
          <Link href="/contact" className="text-blue-400 hover:text-blue-300 text-sm">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
