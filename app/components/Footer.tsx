import Link from "next/link";
import BrandLogo from "@/app/components/BrandLogo";

const quickLinks = {
  "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
  Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast"],
  Victoria: ["Melbourne", "Geelong", "Ballarat"],
  "Western Australia": ["Perth", "Bunbury", "Mandurah"],
  "South Australia": ["Adelaide"],
  Tasmania: ["Hobart", "Launceston"],
  "Northern Territory": ["Darwin"],
  ACT: ["Canberra"],
};

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/copyright", label: "Copyright" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/acceptable-use", label: "Acceptable Use" },
  { href: "/legal/terms", label: "Terms" },
];

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background-ink">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(197,81,208,0.15),transparent_28rem),radial-gradient(circle_at_86%_48%,rgba(201,168,76,0.1),transparent_26rem)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Link href="/" className="inline-flex flex-col gap-3">
              <BrandLogo className="h-auto w-[246px] text-white" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-text-muted">
                Classified advertising platform
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-text-secondary">
              A national adult directory for independent verified advertisers.
              Built on the PrivateGirls structure with a distinct male-companion
              brand expression.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-full bg-accent-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-background transition-colors hover:bg-accent-gold-light"
              >
                Advertise
              </Link>
              <Link
                href="/search"
                className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-accent-gold hover:text-accent-gold"
              >
                Browse
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {Object.entries(quickLinks).map(([state, cities]) => (
              <div key={state}>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">
                  {state}
                </h4>
                <ul className="space-y-2">
                  {cities.map((city) => (
                    <li key={city}>
                      <Link
                        href={`/${toSlug(city)}`}
                        className="text-sm text-text-muted transition-colors hover:text-text-primary"
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 metal-rule" />

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-accent-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Private Guys Australia. 18+ only.
          </p>
        </div>

        <p className="mt-6 max-w-5xl text-xs leading-6 text-text-muted">
          This website contains adult content. Private Guys provides classified
          advertising space only and does not employ, represent, manage, broker
          or facilitate transactions between any advertiser and client.
        </p>
      </div>
    </footer>
  );
}
