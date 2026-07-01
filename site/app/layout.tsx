import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
      <body className="antialiased bg-void text-foreground font-sans">
        <header className="border-b border-void-border sticky top-0 bg-void/95 backdrop-blur z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-venus" />
              <span className="font-semibold text-xl tracking-tighter">Nephelis</span>
            </Link>
            <nav className="flex gap-8 text-sm">
              <Link href="/mission" className="hover:text-venus transition">Mission</Link>
              <Link href="/visuals" className="hover:text-venus transition">Visuals</Link>
              <Link href="/updates" className="hover:text-venus transition">Updates</Link>
              <Link href="#funding" className="px-5 py-1.5 rounded-full border border-venus/60 hover:bg-venus hover:text-black transition text-xs font-medium">Sponsor / Invest</Link>
            </nav>
            <a href="mailto:ehren@nephelisindustries.com" className="text-sm text-venus hover:underline">Contact</a>
          </div>
        </header>
        {children}
        <footer className="border-t border-void-border py-12 text-center text-xs text-foreground/50">
          © {new Date().getFullYear()} Nephelis Industries • AETHER Venus Probe • 2027
        </footer>
      </body>
    </html>
  );
}
