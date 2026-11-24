# Project AETHER / Cloudseeker — Practical Requirements Brief

**Status:** Pre-hardware | Target: Ground demonstrator → earliest plausible flight 2030–2031+  
**Purpose:** Engineering-realism baseline for design, concept art, mass/power budgets, and public messaging.  
**Visual lab:** `/preview/visuals` (noindex, not on the public nav)  
**Locked:** 2026-11-12

This brief is the current engineering-realism floor. Any design, render, or public claim that omits the items below is non-credible for a real Venus aerostat program.

---

## 1. Imaging system for sponsor visibility

Rigid selfie stick is not viable (mass, deployment risk, acid exposure, single-point failure).

Preferred architectures (ranked by risk):

1. **Baseline.** Fixed upward/outward-looking cameras mounted on the gondola (flush black bay) looking at the envelope.
2. Short deployable boom or articulated arm (post-inflation deployment only).
3. Cameras viewing through the translucent envelope (limited by material optics and haze).

Requirements:

- Acid-resistant windows (sapphire or protected fluoropolymer).
- Defined photo cadence and lighting approach (ambient preferred; LEDs only if power allows).
- Image data volume accounted for in CubeSat relay link budget.
- Must be in the mass and power budget with margins.

Visual lock: two (or more) cameras sit on the bay rim, aimed up the envelope toward the polar solar patch and sponsor marks. They are part of the sensor suite, not a separate boom.

---

## 2. Functional elements that must be visible and modeled

Concept art and renders must include the following or they will be non-credible:

- Multi-layer fluoropolymer envelope with visible seams, reinforcement patches, and load-line attachment points.
- Inflation system hardware (valves, residual tubes, gas bottles or chemical generators) — does not disappear after inflation.
- Load-bearing tethers / load lines from envelope to gondola. On the flyingprobe identity these are the equatorial load ring plus meridional tapes, not a crate hanging meters below.
- Solar power elements (envelope patches, gondola-mounted panels, or deployable array). Visual baseline: polar patch.
- Realistic sensor suite on the black lower bay:
  - Multiple camera ports with known FOV
  - Mass spectrometer inlet
  - Nephelometer optical path
  - Aerosol / bio-sensor openings
  - Temperature, pressure, and wind sensors
- Thermal control features (radiators, MLI, or louvers on the gondola).
- Communications antennas (UHF/S-band) positioned for expected attitude.
- Attitude sensors (sun sensors, IMU).
- Central cyan-blue status ring on the black bay (retain as visual signature).

Sponsor logos remain on the translucent upper envelope in light gray/white technical typography. Do not bake readable wordmarks into generated stills — keep them as faint texture; exact type lives in HTML/SVG.

---

## 3. Core engineering requirements (must close)

| Domain | Requirement | Notes / current gap |
|--------|-------------|---------------------|
| Materials | Acid-resistant envelope lifetime at 50–55 km | Coupon testing required. Protocol: `docs/materials-coupon-test-protocol.md`. Task `materials-coupon-campaign`. |
| Entry | Blunt heatshield + decelerator for ~10.7 km/s | Concept only. Task `heatshield-trade`. |
| Inflation & float | Reliable sequence + super-pressure control | Not detailed. Task `inflation-system-concept`. |
| Power | Positive energy balance including night-side | Solar architecture TBD. `docs/power-budget-v0.md`. |
| Communications | Link budget closes via CubeSat relay | v0 estimate in `docs/comms-link-v0.md`. Typical ~1.8 MB/day. Relay is a **separate orbiter**, never on the sphere. |
| Mass | Full budget with ≥30% margins early | High-level only. `site/content/data/mass-budget.json`. |
| Reliability | FMEA for envelope, inflation, sensors, power | Not public. |
| Testing | Acid chamber → subscale inflation → sensor demo | Sequence: `docs/ground-test-sequence.md`. Spend/KPIs: `docs/program-gates.md`. Not started in hardware. |

---

## 4. Programmatic requirements

- Regulatory path started early (FAA, FCC, ITAR/EAR, planetary protection). Notes: `docs/regulatory-path.md`. No filings submitted.
- Funding path beyond $500k ground-prototype budget (realistic flight system is $5–15M+ class or strong partnership). Public $500k is ground/community scale only.
- At least one named advisor or contributor with entry-system or balloon-flight experience. None listed with permission as of this brief.
- Public technical baseline (CONOPS, requirements, mass budget, risk register) that an external engineer can review. Drafts exist; visual lock and this brief sit on top.

Founder review is asynchronous during U.S. Army training. Execution loops must not wait on a same-week founder answer.

---

## 5. Visual / design language constraints

- Sphere **~4–6 m** diameter. Visual nominal **~5 m**. One continuous sphere.
- Upper ~2/3: semi-translucent golden-amber fluoropolymer envelope with subtle seams and sponsor logos.
- Lower ~1/3: matte-black sensor bay (this **is** the gondola) with central cyan-blue glow ring (`#00F0FF`) and realistic instrument ports.
- Environment: dense warm orange-gold volumetric Venusian clouds at 50–55 km, strong rim lighting, soft god rays, no Earth-blue sky.
- Show functional hardware (load lines, inflation remnants, solar elements, sensors). Do not clean them away.

**Visual lock vs CONOPS:** Engineering CONOPS still lists ~6.6 m / hanging gondola as a mass-budget concept. Visual identity follows `flyingprobe.mp4`. Do not mix the two silhouettes. The gondola is the flush black bay.

Prompt source of truth: `docs/visual-bible-cloudseeker.md`.

---

## 6. Immediate next actions

1. Baseline fixed upward-looking cameras as the primary sponsor-imaging approach. **Done in visual lock (rev 3).**
2. Update all concept art and renders to include functional elements listed in Section 2. **In progress in `/preview/visuals`. Homepage still uses the older flyingprobe collage.**
3. Publish a one-page “minimum viable functional elements” diagram. **HTML/SVG on `/preview/visuals` (`FunctionalElements.tsx`).**
4. Define and schedule the ground test sequence (acid coupons → helium float prototype → sensor telemetry demo). **`docs/ground-test-sequence.md`.** Program gates 0–8 with spend and KPIs: **`docs/program-gates.md`.** Gate 0 RFQ is written; send is blocked on a ship-to.

Do not promote preview stills to the homepage or public `/visuals` until the founder says so.
