import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Private Guys Australia | Premier Male Companion Directory",
  description:
    "Australia's premier directory for verified male companions. Browse professional male escorts across Australia.",
  keywords: [
    "male companions",
    "male escorts",
    "Australia",
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "companion directory",
    "verified escorts",
    "professional companions",
  ],
  authors: [{ name: "Private Guys Australia" }],
  creator: "Private Guys Australia",
  publisher: "Private Guys Australia",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://privateguys.com.au"),
  alternates: {
    canonical: "https://privateguys.com.au",
  },
  openGraph: {
    title: "Private Guys Australia | Premier Male Companion Directory",
    description: "Australia's premier directory for verified male companions",
    url: "https://privateguys.com.au",
    type: "website",
    locale: "en_AU",
    siteName: "Private Guys Australia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Private Guys Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Guys Australia | Premier Male Companion Directory",
    description: "Australia's premier directory for verified male companions",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
