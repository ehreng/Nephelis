'use client';

import React, { useState } from 'react';

export default function FundingTiers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'sponsor' | 'dna'>('sponsor');
  const [form, setForm] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function openModal(type: 'sponsor' | 'dna') {
    setModalType(type);
    setForm({ name: '', email: '' });
    setIsSubmitting(false);
    setSubmitted(false);
    setError('');
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    // Reset after close animation
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
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          type: modalType,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send reservation request');
      }

      setSubmitted(true);
      // Auto close after success
      setTimeout(() => {
        closeModal();
      }, 2200);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try emailing directly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
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
              onClick={() => openModal('sponsor')}
              className="text-venus font-mono hover:underline flex items-center gap-1 group"
            >
              Reserve → <span className="group-hover:translate-x-0.5 transition"> </span>
            </button>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
              <span>Allocated</span>
              <span>120/500</span>
            </div>
            <div className="funding-progress">
              <div style={{ width: '24%' }} />
            </div>
          </div>
        </div>

        {/* TIER 2 */}
        <div className="glass-panel p-8 tier-card text-left border border-white/10">
          <div className="text-tech font-mono text-sm mb-3 tracking-[1px]">TIER 2: THE IMMORTAL</div>
          <h3 className="text-2xl font-bold text-white mb-2">DNA Capsule</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Send a biological sample (hair/nail) in our inert time capsule. Let a part of you make it to Venus.
          </p>
          <div className="flex items-end justify-between mb-1">
            <span className="text-3xl font-bold text-white tabular-nums">$500</span>
            <button
              onClick={() => openModal('dna')}
              className="text-tech font-mono hover:underline flex items-center gap-1 group"
            >
              Reserve → <span className="group-hover:translate-x-0.5 transition"> </span>
            </button>
          </div>
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
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4" onClick={closeModal}>
          <div
            className="glass-panel max-w-md w-full p-8 relative modal"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">×</button>

            <h3 className="text-2xl font-bold text-white mb-1">
              {modalType === 'sponsor' ? 'Reserve Balloon Space' : 'Request DNA Kit'}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {modalType === 'sponsor'
                ? 'Join the others etching their name on the Cloudseeker aerostat balloon.'
                : 'Secure your biological legacy in the Venusian clouds.'}
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-venus uppercase mb-1 tracking-widest">Callsign (Name)</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-white focus:border-venus focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-venus uppercase mb-1 tracking-widest">Comms (Email)</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-white focus:border-venus focus:outline-none font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-venus hover:bg-white hover:text-black transition-colors text-black font-bold font-mono uppercase py-3.5 tracking-wider mt-2 disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Transmit Data'}
                </button>
                {error && (
                  <p className="text-center text-xs text-red-400">{error}</p>
                )}
                <p className="text-center text-[10px] text-gray-500 pt-1">
                  Your details will be emailed directly to the team.
                </p>
              </form>
            ) : (
              <div className="py-6 text-center text-sm text-venus">
                Reservation received! We'll contact you shortly at {form.email}.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
