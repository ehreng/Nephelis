'use client';

import Link from "next/link";
import React from "react";

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={toggle}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path className="block" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-50 bg-black/95 border-b border-white/10 backdrop-blur">
          <div className="px-4 py-4 space-y-1 font-mono text-sm uppercase">
            <a href="#mission" onClick={close} className="block px-3 py-2 text-gray-300 hover:text-venus">Mission</a>
            <a href="#trajectory" onClick={close} className="block px-3 py-2 text-gray-300 hover:text-venus">Trajectory</a>
            <a href="#thesis" onClick={close} className="block px-3 py-2 text-gray-300 hover:text-venus">Thesis</a>
            <a href="#heritage" onClick={close} className="block px-3 py-2 text-gray-300 hover:text-venus">History</a>
            <a href="#gallery" onClick={close} className="block px-3 py-2 text-gray-300 hover:text-venus">Visuals</a>
            <Link href="/updates" onClick={close} className="block px-3 py-2 text-gray-300 hover:text-venus">Updates</Link>
            <a href="#contribute" onClick={close} className="block px-3 py-2 text-gray-300 hover:text-venus">Contribute</a>
            <a href="#funding" onClick={close} className="block px-3 py-2 text-venus font-bold">Sponsor</a>
          </div>
        </div>
      )}
    </>
  );
}
