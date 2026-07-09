'use client';

import React, { useState } from 'react';

const SKILLS = [
  { id: 'structures', label: 'Structures' },
  { id: 'avionics', label: 'Avionics' },
  { id: 'software', label: 'Software' },
  { id: 'ai', label: 'AI' },
  { id: 'fabrication', label: 'Fabrication' },
  { id: 'science', label: 'Science' },
  { id: 'ops', label: 'Ops' },
  { id: 'design', label: 'Design' },
  { id: 'other', label: 'Other' },
] as const;

export default function VolunteerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  function toggleSkill(id: string) {
    setSkills((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, skills }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to submit');
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setSkills([]);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 text-left max-w-xl mx-auto border border-white/10 glass-panel p-6"
    >
      <div className="font-mono text-xs text-venus tracking-widest mb-4">VOLUNTEER INTAKE</div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-mono text-gray-500 mb-1">NAME</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/60 border border-white/15 px-3 py-2 text-sm font-mono focus:outline-none focus:border-venus"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-gray-500 mb-1">EMAIL</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/60 border border-white/15 px-3 py-2 text-sm font-mono focus:outline-none focus:border-venus"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[10px] font-mono text-gray-500 mb-2">SKILLS</label>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => {
            const on = skills.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleSkill(s.id)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition ${
                  on
                    ? 'border-venus bg-venus/20 text-venus'
                    : 'border-white/15 text-gray-400 hover:border-white/40'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[10px] font-mono text-gray-500 mb-1">MESSAGE</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="What can you help with?"
          className="w-full bg-black/60 border border-white/15 px-3 py-2 text-sm font-mono focus:outline-none focus:border-venus placeholder:text-gray-600"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-venus disabled:opacity-60"
      >
        {status === 'loading' ? 'Transmitting…' : 'Join the Build'}
      </button>
      {status === 'success' && (
        <p className="mt-3 text-xs text-venus text-center">
          Signal received. Check your email — we review every application.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-3 text-xs text-red-400 text-center">{error}</p>
      )}
    </form>
  );
}
