# Partner outreach drafts — Project AETHER

**Human gate:** personalize names, cut anything you wouldn’t stand behind.  
**After send:** set `last_touched` on the partner in `site/content/data/partners.json`.

Boilerplate facts: `decks/press-kit.md` · site: https://www.nephelisindustries.com

---

## 1. Sensor lab / university (P0) — `p-sensor-lab`

**Goal:** find 2–3 groups; get a call; path to mass-spec / nephelometer / met package in-kind or joint proposal.

**Subject:** Collaboration inquiry — Venus cloud-layer probe (2027), instrument partnership

```
Hi [Name],

I'm Ehren Goossens, co-founder of Nephelis Industries. We're building Project AETHER
(Cloudseeker): a lean super-pressure balloon probe aimed at Venus's ~55 km cloud layer,
with a target launch window in late 2027.

We're looking for a science/instrument partner—ideally mass spectrometry, nephelometry,
or compact meteorology—who might contribute a sensor path, student involvement, or a
joint proposal. Our stack is intentionally small (~400 kg wet class; gondola sensors on
the order of tens of kg total), crowd-supported, and built in public.

Would you (or a colleague) have 20 minutes in the next two weeks for a call? Happy to
send a one-pager and mass/power envelope.

Best,
Ehren Goossens
Nephelis Industries
ehren@nephelisindustries.com
https://www.nephelisindustries.com
https://x.com/NephelisCo
```

**Target list stub (fill real names):**

| Org / lab | Contact | Status | Notes |
|-----------|---------|--------|-------|
| | | not contacted | Venus atmosphere / clouds |
| | | | Planetary balloons / aerobots |
| | | | Compact mass-spec / aerosol |

---

## 2. Fluoropolymer / materials supplier (P0) — `p-materials`

**Goal:** small-batch film samples + acid-test guidance for envelope coupons.

**Subject:** RFQ — small-batch fluoropolymer film samples for Venus aerostat R&D

```
Hi [Name / Sales engineering],

Nephelis Industries is developing a super-pressure balloon envelope for a Venus
cloud-layer probe (Project AETHER; target launch 2027). We need small-batch film
samples for sulfuric acid exposure and seam trials—not a production order yet.

Please quote or advise on availability of:

• PTFE / FEP / PFA (or recommended multilayer) films suitable for acid resistance
• Thickness options in the [X–Y] mil / µm range (we can discuss)
• Sheet or roll samples suitable for ~[N] coupon sets
• Any data on H2SO4 compatibility, weld/heat-seal guidance, lead time, NDA

Ship-to: [address]
Point of contact: Ehren Goossens <ehren@nephelisindustries.com>

Mission context (one line): private, low-cost Venus aerostat; public roadmap at
https://www.nephelisindustries.com/roadmap

Thank you,
Ehren
```

**RFQ checklist before send:**

- [ ] Coupon size & count  
- [ ] Thickness range  
- [ ] Ship-to address  
- [ ] Budget ceiling for samples  

---

## 3. Corporate / logo sponsor (P1) — `p-sponsor-corp`

**Subject:** Sponsor the first private Venus cloud probe — logo / mission partnership

```
Hi [Name],

I'm reaching out from Nephelis Industries about a sponsorship opportunity on
Project AETHER—a crowd-supported probe to Venus's habitable cloud layer (launch
target late 2027).

We're offering mission-visible participation (including payload-adjacent branding
tiers beyond individual name engraving) for partners who want to back a concrete
deep-space hardware story, not a vapor deck.

Happy to share a one-pager and discuss a package that fits [Company].

Best,
Ehren Goossens
ehren@nephelisindustries.com
https://www.nephelisindustries.com
```

**Attach:** `decks/press-kit.md` (export PDF when ready) + `decks/metrics-one-pager.md`

---

## 4. CubeSat / comms (P1) — `p-comms-cubesat`

**Subject:** 3U relay / radio partnership for Venus aerostat mission (2027)

```
Hi [Name],

Nephelis is building Cloudseeker, a Venus cloud-layer balloon probe. We're baselining
a 3U-class relay (or hybrid direct-to-Earth) for float-phase data return and want to
talk with teams who have flight-heritage UHF/S-band radios or buses open to a
secondary-mission partnership.

Could we schedule a short technical intro? I can share mass/power/data-rate envelopes
and a draft link architecture.

Ehren Goossens
Nephelis Industries
ehren@nephelisindustries.com
```

---

## 5. Launch / rideshare broker (P1) — `p-launch`

**Subject:** Secondary payload inquiry — ~400 kg class, Venus transfer window 2027

```
Hi [Name],

We're Nephelis Industries (Project AETHER): ~400 kg wet-class secondary payload targeting
a late-2027 Venus transfer opportunity (rideshare or dedicated small vehicle). Seeking
rough ROM pricing, mass/volume constraints, and window feasibility—not a firm book yet.

Can you point us to the right intake for a 2027 Venus-compatible secondary?

Ehren Goossens
ehren@nephelisindustries.com
https://www.nephelisindustries.com
```

---

## 6. Soft advisor ask — task `advisor-board-soft`

**Subject:** Informal technical advisory — Venus aerostat (few hours / quarter)

```
Hi [Name],

I'm building a lean private Venus cloud-layer balloon probe (Project AETHER) with a
2027 launch target. I'd value informal advice from someone with [structures / entry /
planetary science] experience—on the order of a few hours per quarter, not a board seat.

Would you be open to a 30-minute call? No pressure if timing is bad.

Ehren
ehren@nephelisindustries.com
https://www.nephelisindustries.com/roadmap
```

---

## Tracking

After each send:

```json
"last_touched": "YYYY-MM-DD",
"status": "prospect" | "active"
```

in `site/content/data/partners.json`, then:

```bash
npx tsx automation/scripts/evolve.ts partners
```
