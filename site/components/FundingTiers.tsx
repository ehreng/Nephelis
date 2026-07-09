'use client';

import React, { useEffect, useState } from 'react';

type TierKey = 'legacy' | 'dna';

type Allocation = {
  legacy: { allocated: number; capacity: number };
  dna: { allocated: number; capacity: number };
  stripe_configured: boolean;
};

export default function FundingTiers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TierKey>('legacy');
  const [form, setForm] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'pay' | 'interest'>('pay');
  const [allocation, setAllocation] = useState<Allocation | null>(null);
  const [banner, setBanner] = useState<'success' | 'cancel' | null>(null);

  useEffect(() => {
    fetch('/api/allocation')
      .then((r) => r.json())
      .then((data) => {
        if (data?.legacy) setAllocation(data);
      })
      .catch(() => {});

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const checkout = params.get('checkout');
      if (checkout === 'success') setBanner('success');
      if (checkout === 'cancel') setBanner('cancel');
    }
  }, []);

  function openModal(type: TierKey, pay: boolean = true) {
    setModalType(type);
    setMode(pay ? 'pay' : 'interest');
    setForm({ name: '', email: '' });
    setIsSubmitting(false);
    setSubmitted(false);
    setError('');
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setError('');
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (mode === 'pay') {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            tier: modalType,
          }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || 'Checkout failed');
        }
        if (result.url) {
          window.location.href = result.url;
          return;
        }
        throw new Error('No checkout URL returned');
      }

      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          type: modalType === 'legacy' ? 'sponsor' : 'dna',
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to send reservation request');
      }
      setSubmitted(true);
      setTimeout(() => closeModal(), 2200);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try emailing directly.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const legacyAlloc = allocation?.legacy.allocated ?? 0;
  const legacyCap = allocation?.legacy.capacity ?? 500;
  const legacyPct = Math.min(100, Math.round((legacyAlloc / legacyCap) * 100));

  return (
    <>
      {banner === 'success' && (
        <div className="mb-6 border border-venus/40 bg-venus/10 px-4 py-3 text-center text-sm text-venus font-mono">
          Payment received. Welcome to the flight crew — check your email for next steps.
        </div>
      )}
      {banner === 'cancel' && (
        <div className="mb-6 border border-white/20 bg-white/5 px-4 py-3 text-center text-sm text-gray-400 font-mono">
          Checkout cancelled. You can retry anytime — or request info without payment.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* TIER 1 */}
        <div className="glass-panel p-8 tier-card text-left border border-white/10">
          <div className="text-venus font-mono text-sm mb-3 tracking-[1px]">TIER 1: THE LEGACY</div>
          <h3 className="text-2xl font-bold text-white mb-2">Balloon Engraving</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Laser-etch your name onto the aerostat balloon of Cloudseeker.
          </p>
          <div className="flex items-end justify-between mb-1">
            <span className="text-3xl font-bold text-white tabular-nums">$100</span>
            <button
              onClick={() => openModal('legacy', true)}
              className="text-venus font-mono hover:underline flex items-center gap-1 group"
            >
              Reserve → <span className="group-hover:translate-x-0.5 transition"> </span>
            </button>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
              <span>Allocated</span>
              <span>
                {legacyAlloc}/{legacyCap}
              </span>
            </div>
            <div className="funding-progress">
              <div style={{ width: `${legacyPct}%` }} />
            </div>
            <p className="mt-2 text-[10px] text-gray-600 font-mono">
              {allocation?.stripe_configured
                ? 'Live count: baseline + paid Stripe slots'
                : 'Live count when Stripe is configured'}
            </p>
          </div>
        </div>

        {/* TIER 2 */}
        <div className="glass-panel p-8 tier-card text-left border border-white/10">
          <div className="text-tech font-mono text-sm mb-3 tracking-[1px]">TIER 2: THE IMMORTAL</div>
          <h3 className="text-2xl font-bold text-white mb-2">DNA Capsule</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Send a biological sample (hair/nail) in our inert time capsule. Let a part of you make it
            to Venus.
          </p>
          <div className="flex items-end justify-between mb-1">
            <span className="text-3xl font-bold text-white tabular-nums">$500</span>
            <button
              onClick={() => openModal('dna', true)}
              className="text-tech font-mono hover:underline flex items-center gap-1 group"
            >
              Reserve → <span className="group-hover:translate-x-0.5 transition"> </span>
            </button>
          </div>
          {allocation && (
            <div className="mt-5 text-[10px] font-mono text-gray-500">
              Allocated {allocation.dna.allocated}/{allocation.dna.capacity}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <p className="text-gray-500 font-mono text-xs tracking-[1px] mb-5">BACKED BY VETERANS FROM</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[2px] text-white/40">
          <div>SPACEX</div>
          <div>NASA JPL</div>
          <div>DARPA</div>
          <div>ESA</div>
          <div>BLUE ORIGIN</div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="glass-panel max-w-md w-full p-8 relative modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-white mb-1">
              {modalType === 'legacy' ? 'Reserve Balloon Space' : 'Request DNA Kit'}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {mode === 'pay'
                ? modalType === 'legacy'
                  ? 'Secure your engraving with a $100 payment via Stripe.'
                  : 'Secure your DNA capsule slot with a $500 payment via Stripe.'
                : 'Send interest only — no payment yet. We will follow up.'}
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-venus uppercase mb-1 tracking-widest">
                    Callsign (Name)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-white focus:border-venus focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-venus uppercase mb-1 tracking-widest">
                    Comms (Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-white focus:border-venus focus:outline-none font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-venus hover:bg-white hover:text-black transition-colors text-black font-bold font-mono uppercase py-3.5 tracking-wider mt-2 disabled:opacity-60"
                >
                  {isSubmitting
                    ? mode === 'pay'
                      ? 'Redirecting…'
                      : 'Sending…'
                    : mode === 'pay'
                      ? 'Continue to Payment'
                      : 'Transmit Interest Only'}
                </button>
                {error && <p className="text-center text-xs text-red-400">{error}</p>}
                <button
                  type="button"
                  className="w-full text-center text-[11px] text-gray-500 hover:text-venus font-mono"
                  onClick={() => setMode(mode === 'pay' ? 'interest' : 'pay')}
                >
                  {mode === 'pay' ? 'Or request info without payment →' : '← Switch to payment checkout'}
                </button>
              </form>
            ) : (
              <div className="py-6 text-center text-sm text-venus">
                Interest received! We&apos;ll contact you shortly at {form.email}.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
