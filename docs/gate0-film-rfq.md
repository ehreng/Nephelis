# Gate 0 — Film RFQ package

**Status:** Ready to send except **ship-to** (blocked)  
**Date:** 2026-11-24  
**Gate:** 0 in `docs/program-gates.md` and `docs/ground-test-sequence.md`  
**Protocol:** `docs/materials-coupon-test-protocol.md`  
**Issue:** [#45](https://github.com/ehreng/Nephelis/issues/45)  
**Safety:** Concentrated H₂SO₄ is a lab job. This file is paperwork. Do not run acid outside a qualified lab.

Vendors and labs below are a **research shortlist**. None have been contacted. None are partners.

---

## Frozen coupon matrix (fills the RFQ blanks)

| Item | Value |
|------|--------|
| Materials | FEP, PFA, PTFE sheet if offered, one multilayer if quoted |
| Thickness | **12.5–50 µm (0.5–2 mil)**. Prefer a 1 mil (25 µm) and a 2 mil (50 µm) of the same resin when both exist. |
| Coupon size | 25 mm × 50 mm (or lab standard nearest) |
| Replicates | **n = 3** per condition |
| Conditions | C0 control, C1 24 h soak, C2 7 d soak, C3 crease×10 then 24 h, C4 seam 24 h |
| Coupons / film | 5 conditions × 3 = 15 + 3 seam extras = **18** |
| Films | **4** candidate lots (FEP 1 mil, FEP 2 mil, PFA 1 mil, multilayer or PTFE) |
| Total coupons | **~72** plus 20% spare ≈ **90** |
| Film area | Coupons are ~0.12 m²; order **0.5–1 m²** per lot for waste, labeling, and a seam strip |
| Sample budget ceiling | **$500–1,500** for film only |
| Lab budget (Gate 1) | **$3,000–12,000** (ASTM D543-class immersion + photos + mass) |
| Ship-to | **TBD — blocked.** Needs a US address that can receive industrial film and, separately, a lab that will accept coupons. |

Standard to name on the lab RFQ: **ASTM D543 Practice A (immersion)** at ambient, 24 h and 7 d, reagent = concentrated sulfuric acid **as the lab will legally handle** (record actual %). C3 crease is a documented deviation (fold 180° ×10 before soak). C4 uses a vendor heat-seal coupon if they will supply one; otherwise we seal a strip after film arrives.

---

## Film vendors (research — not contacted)

| # | Name | Why | How to ask | Source |
|---|------|-----|------------|--------|
| 1 | **CS Hyde Company**, Lake Villa, IL | Stocks optically clear Chemours Teflon™ FEP (Type A) and PFA (Type LP) by the foot, sheets and rolls. Small-quantity path. | sales@cshyde.com · 1-800-461-4161 · https://cshyde.com | Public catalog; 0.5 mil × 24 in FEP listed on their FEP/PFA page (~$11 / linear foot as of fetch 2026-11-24 — **quote required**) |
| 2 | **American Durafilm**, Holliston, MA | Distributor/converter of Chemours Teflon™ FEP/PFA and Saint-Gobain Norgard® FEP/PFA. Heat-seal and fabrication in-house. Useful for **seam coupons** and later Gate 2 seaming. | https://americandurafilm.com/film-distribution/ | Public site |
| 3 | **Saint-Gobain Norgard®** (via #2 or other distributors) | Mechanical-grade FEP (Type WF) and PFA films used as chemical liners. | Via Durafilm or Saint-Gobain films sales | americandurafilm.com/film-distribution/norgard-fep-film/ |
| 4 | **Chemours Teflon™ film** (via distributors) | Resin-brand owner. Direct mill minimums are likely too large; use #1 or #2. | Distributor first | Brand pages via distributors |

**Send order:** CS Hyde and American Durafilm. Two quotes satisfies the Gate 0 KPI.

Do not claim samples received until a packing slip exists.

---

## Labs (research — not contacted)

Ask for ASTM D543 Practice A, sulfuric acid, 24 h + 7 d, mass + dimensions + appearance, photos with scale. Attach our C3/C4 deviation. Require a written EHS/waste plan in the quote.

| # | Name | Why | Source |
|---|------|-----|--------|
| 1 | **Sterling Analytical** | Publishes ASTM D543 immersion, lists sulfuric acid as a reagent, 24 h / 7 d. | https://sterlinganalytical.com/material-compatibility-testing/material-chemical-resistance-astm-d543/ |
| 2 | **APM Testing** | ASTM D543 chemical resistance; quote on request. | https://apmtesting.com/test-methods/astm-d543/ |
| 3 | **Infinita Lab** (network) | ASTM D543 / ISO 175 chemical resistance for plastics. | https://infinitalab.com/blog/comparing-astm-d543-with-other-plastic-chemical-resistance-tests/ |
| 4 | **Intertek** Chemicals & Materials | Polymer chemical / physical testing network. | https://www.intertek.com/chemicals/testing-and-analysis/ |
| 5 | University polymer / materials teaching lab | Often cheaper; needs a PI willing to host concentrated acid. | TBD — operator identifies one near ship-to |

**KPI:** one lab under contract. Three quote requests is enough to start.

---

## RFQ body (film) — ready except ship-to

Subject: RFQ — small-batch FEP / PFA / PTFE film samples for Venus aerostat R&D (coupons, not production)

```
Hi [Name / Sales engineering],

Nephelis Industries is developing a super-pressure balloon envelope for a Venus
cloud-layer probe (Project AETHER; target launch class in the 2030s). We need
small-batch film samples for sulfuric-acid exposure and seam trials — not a
production order.

Please quote:

• FEP and PFA film (PTFE sheet if you stock it; multilayer laminate if you
  recommend one for concentrated H2SO4)
• Thicknesses 0.5 mil, 1 mil, and 2 mil (12.5 / 25 / 50 µm) as available
• ~1 m² per thickness/resin, or your minimum cut
• One heat-sealed seam sample per resin if you fabricate
• Any H2SO4 compatibility data, weld/heat-seal guidance, lead time, NDA

Coupon plan (for context): 25 mm × 50 mm, n=3, five conditions including
24 h and 7 d immersion at a qualified lab (ASTM D543 Practice A).

Ship-to: [BLOCKED — insert US address]
Bill-to / POC: Ehren Goossens <ehren@nephelisindustries.com>
Budget ceiling this buy: USD 1,500

Mission context: private, low-cost Venus aerostat; public roadmap at
https://www.nephelisindustries.com/roadmap
Protocol: https://github.com/ehreng/Nephelis/blob/main/docs/materials-coupon-test-protocol.md

Thank you,
Ehren Goossens
Nephelis Industries
```

**Do not send until ship-to is filled.** Founder sign-off can be async; the operator fills the address.

---

## RFQ body (lab) — ready except ship-from / account

Subject: Quote request — ASTM D543 immersion of fluoropolymer film in sulfuric acid (R&D coupons)

```
Hello,

Nephelis Industries needs a quote for chemical-resistance testing of thin
fluoropolymer films (FEP / PFA / possible PTFE or multilayer), ~25–50 µm.

Please quote ASTM D543 Practice A (immersion) at ambient:

• Reagent: concentrated sulfuric acid as your lab will legally handle
  (record actual %). We do not ask you to improvise concentration.
• Durations: 24 h and 7 d
• n = 3 per condition per film; up to 4 films
• Measurements: dry mass before/after, thickness if practical, visual
  score, photographs with scale
• Optional documented deviations: (C3) 180° crease ×10 before 24 h soak;
  (C4) vendor heat-seal coupon, 24 h soak
• Waste / neutralization per your EHS SOP

We will supply labeled coupons. Need: lead time, specimen intake
instructions, and a not-to-exceed price.

POC: Ehren Goossens <ehren@nephelisindustries.com>
Protocol: https://github.com/ehreng/Nephelis/blob/main/docs/materials-coupon-test-protocol.md
```

---

## Checklist (Gate 0 exit)

- [x] Thickness range, coupon count, sample budget written
- [x] ≥2 named film vendor classes with public contact paths
- [x] ≥1 named lab class with ASTM D543 / H₂SO₄ capability (shortlist of 4 + university option)
- [ ] Ship-to address
- [ ] RFQ actually sent
- [ ] Lab quote in hand
- [ ] `partners.json` last_touched updated when a human sends (research shortlist dated 2026-11-24)

---

## Related

- Program plan: `docs/program-gates.md`
- Partner boilerplate: `docs/partner-outreach-drafts.md`
- Partners data: `site/content/data/partners.json`
