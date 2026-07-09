import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

export const metadata: Metadata = {
  title: "Nephelis Industries | Project AETHER",
  description: "A super-pressure balloon probe targeting Venus's habitable cloud layer. Launching 2027.",
  icons: {
    icon: "/favicon.ico",
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
