# Materials — acid resistance for Venus cloud float

**Status:** living · last reviewed 2026-07-09  
**Links to:** risk `R-01`, mass-budget balloon element, mission-control materials test

## Context

Venus cloud aerosols include concentrated sulfuric acid. Super-pressure balloon films must survive weeks of exposure while maintaining leak rates compatible with float life.

## Material families (starting list)

| Family | Pros | Cons | Notes |
|--------|------|------|-------|
| PTFE / fluoropolymers | Excellent acid resistance | Processing, mass, sealing | Baseline for Cloudseeker concept |
| FEP / PFA | Good formability | Creep, seam design | Coupons for weld/heat-seal tests |
| Multilayer laminates | Tailor barrier vs strength | Interface failures | VEGA-era lessons relevant |
| Coatings on polymers | Potentially lower mass | Pinholes, abrasion | High risk without long soak data |

## Test plan (ground)

**Full protocol:** [`docs/materials-coupon-test-protocol.md`](../../docs/materials-coupon-test-protocol.md)

1. Coupon soak in concentrated H₂SO₄ at relevant T  
2. Fold / crease cycle + re-soak  
3. Seam / weld samples under differential pressure  
4. Mass loss / permeability trending  

## Data ownership

- Update `risks.json` R-01 when test campaign starts (`status: mitigating`)  
- Log results under `research/notes/YYYY-MM-DD-materials-test.md`  
- Adjust balloon mass line in `mass-budget.json` only with measured areal density

## Sources to collect

- VEGA balloon materials literature  
- Modern aerobot / NASA Venus balloon studies  
- Vendor datasheets (once RFQ issued)

## Agent notes

Do not claim flight-proven materials until tests exist. Prefer “candidate fluoropolymer multilayer” language.
