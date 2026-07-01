'use client';

import React, { useState } from 'react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Demo: simulate API or just client-side success
    // In real: integrate with Formspree, Resend, or Vercel form
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 2800);
    }, 650);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@signal.earth"
          required
          className="flex-1 bg-black/60 border border-white/15 px-4 py-3 text-sm font-mono placeholder:text-gray-500 focus:outline-none focus:border-venus"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3 bg-venus text-black font-mono uppercase text-sm tracking-widest hover:bg-white disabled:opacity-60 transition"
        >
          {status === 'loading' ? 'JOINING...' : 'SUBSCRIBE'}
        </button>
      </div>
      {status === 'success' && (
        <p className="mt-2 text-xs text-venus text-center">Thanks — you're on the list. Expect signals from the clouds.</p>
      )}
      <p className="mt-2 text-[10px] text-center text-foreground/50">Low volume. No spam. Mission updates + crew calls.</p>
    </form>
  );
}
