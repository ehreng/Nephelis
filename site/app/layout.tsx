import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nephelisindustries.com";
const GA_MEASUREMENT_ID = "G-0D5C7VZD35";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nephelis Industries | Project AETHER",
    template: "%s | Nephelis Industries",
  },
  description:
    "Project AETHER: a crowd-funded super-pressure balloon probe for Venus's habitable cloud layer. Launch window Q4 2027. Sponsor a payload slot or join the crew.",
  keywords: [
    "Venus",
    "aerostat",
    "Project AETHER",
    "Nephelis Industries",
    "cloud layer",
    "space crowdfunding",
    "CubeSat",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nephelis Industries",
    title: "Nephelis Industries | Project AETHER",
    description:
      "Humanity's return to the clouds — private Venus cloud-layer probe, launch 2027.",
    images: [
      {
        url: "/assets/visuals/Venus Visions.png",
        width: 1200,
        height: 630,
        alt: "Project AETHER — Venus cloud visions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NephelisCo",
    title: "Nephelis Industries | Project AETHER",
    description: "Private Venus cloud-layer probe. Launch Q4 2027. Join the flight crew.",
    images: ["/assets/visuals/Venus Visions.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fonts matching old site */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#050505] text-[#e0e0e0] font-sans">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* Scanline Overlay for Retro-Futurism Feel */}
        <div className="scanline-overlay"></div>

        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo - vibrant wordmark to match deck / live site */}
              <Link href="/" className="flex-shrink-0 flex items-baseline gap-2.5 logo-container">
                <img src="/assets/visuals/logo.jpg" alt="Nephelis Industries" className="h-9 md:h-10 w-auto" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">INDUSTRIES</span>
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8 font-mono text-xs uppercase tracking-widest">
                  <a href="/#mission" className="hover:text-venus transition-colors">Mission</a>
                  <a href="/#trajectory" className="hover:text-venus transition-colors">Trajectory</a>
                  <a href="/#thesis" className="hover:text-venus transition-colors">Thesis</a>
                  <a href="/#heritage" className="hover:text-venus transition-colors">History</a>
                  <Link href="/updates" className="hover:text-venus transition-colors">Updates</Link>
                  <Link href="/roadmap" className="hover:text-venus transition-colors">Roadmap</Link>
                  <a href="/#contribute" className="hover:text-venus transition-colors">Contribute</a>
                  <a href="/#funding" className="text-venus border border-venus/50 px-4 py-2 hover:bg-venus hover:text-black transition-all">Sponsor</a>
                </div>
              </div>

              {/* Mobile Menu Button (client) */}
              <div className="-mr-2 flex md:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 pt-16">
          {children}
        </main>

        <footer className="bg-black border-t border-white/10 py-10 text-xs text-gray-500 font-mono">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-y-2">
            <div>
              <span className="text-white tracking-wider">Nephelis Industries</span>
              <span className="ml-2 text-gray-600">EST. 2025 // SALT LAKE CITY</span>
            </div>
            <div className="flex items-center gap-x-5">
              <a href="https://x.com/NephelisCo" target="_blank" className="hover:text-venus">X</a>
              <a href="mailto:ehren@nephelisindustries.com" className="hover:text-venus">Contact</a>
              <span>© Nephelis Industries {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
