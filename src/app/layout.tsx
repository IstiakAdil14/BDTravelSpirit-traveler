import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";
import { Providers } from "@/components/providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "BD Travel Spirit - Discover Bangladesh's Hidden Gems",
  description: "Explore Bangladesh's breathtaking destinations, cultural heritage, and adventure experiences with BD Travel Spirit. Your gateway to authentic travel in Bangladesh.",
  keywords: "Bangladesh travel, tourism Bangladesh, cultural tours, adventure travel, heritage sites, travel guides, Bangladesh destinations",
  authors: [{ name: "BD Travel Spirit" }],
  creator: "BD Travel Spirit",
  publisher: "BD Travel Spirit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bdtravelspirit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BD Travel Spirit - Discover Bangladesh's Hidden Gems",
    description: "Explore Bangladesh's breathtaking destinations, cultural heritage, and adventure experiences with BD Travel Spirit.",
    url: "https://bdtravelspirit.com",
    siteName: "BD Travel Spirit",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BD Travel Spirit - Bangladesh Travel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Travel Spirit - Discover Bangladesh's Hidden Gems",
    description: "Explore Bangladesh's breathtaking destinations, cultural heritage, and adventure experiences with BD Travel Spirit.",
    images: ["/og-image.jpg"],
    creator: "@bdtravelspirit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "BD Travel Spirit",
  description: "Explore Bangladesh's breathtaking destinations, cultural heritage, and adventure experiences with BD Travel Spirit.",
  url: "https://bdtravelspirit.com",
  logo: "https://bdtravelspirit.com/logo.png",
  sameAs: [
    "https://facebook.com/bdtravelspirit",
    "https://twitter.com/bdtravelspirit",
    "https://instagram.com/bdtravelspirit",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+880-123-456-7890",
    contactType: "customer service",
    areaServed: "BD",
    availableLanguage: "en",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
    addressLocality: "Dhaka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased font-inter`}
      >
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
