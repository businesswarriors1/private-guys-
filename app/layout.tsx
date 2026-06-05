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
  ],
  authors: [{ name: "Private Guys Australia" }],
  openGraph: {
    title: "Private Guys Australia",
    description: "Australia's Premier Male Companion Directory",
    type: "website",
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
