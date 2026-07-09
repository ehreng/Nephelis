# Materials coupon test protocol — Venus aerostat film

**Status:** Test plan draft — not a certified lab SOP  
**Date:** 2026-07-09  
**Risk link:** R-01 acid degradation (`risks.json`)  
**Tasks:** `materials-coupon-campaign`, `partner-materials-samples`, `balloon-prototype-1`  
**Science note:** `research/science/materials-acid-resistance.md`

> **Safety:** Concentrated sulfuric acid is hazardous. This document does **not** replace institutional lab SOPs, training, PPE, fume hood, or waste disposal rules. If you lack proper facilities, **outsource** to a qualified lab and use this only as a requirements brief.

---

## 1. Objective

Down-select fluoropolymer (or multilayer) candidate films for Cloudseeker super-pressure envelope by measuring:

1. Visual / mass change after acid exposure  
2. Integrity after fold/crease preconditioning  
3. Seam/weld survival (if samples allow)  

**Decision gate:** Go / no-go / conditional for `balloon-prototype-1` film choice.

---

## 2. Pass / fail philosophy

| Result | Meaning |
|--------|---------|
| **Pass** | No catastrophic embrittlement/holes; mass change within agreed band; seams hold for short pressure check if tested |
| **Conditional** | Usable with multilayer, coating, or shorter life assumption — document |
| **Fail** | Pinholes, severe attack, seam failure, unusable flexibility |

Exact numeric acceptance criteria = **TBD** after first pilot run (protocol v0.9 uses qualitative + % mass change recording).

---

## 3. Coupon matrix

### 3.1 Materials (target classes)

| Code | Class | Notes |
|------|-------|-------|
| M-PTFE | PTFE film | Excellent acid resistance; processability TBD |
| M-FEP | FEP film | Formability / seal interest |
| M-PFA | PFA film | If available |
| M-ML | Multilayer / vendor laminate | Preferred flight-like |
| M-REF | Reference (e.g. PE) | Optional negative control — expect fail |

Source films via `p-materials` RFQ (`docs/partner-outreach-drafts.md`).

### 3.2 Geometry (default)

| Param | Default | Notes |
|-------|---------|-------|
| Coupon size | 25 mm × 50 mm | Or lab standard |
| Thickness | As supplied (record µm) | Multiple gauges if quoted |
| Replicates | **n = 3** per condition | Minimum |
| Variants | Base film + **seam** sample | Seam = heat-seal or weld per vendor guidance |

### 3.3 Condition grid (minimum set)

| ID | Precondition | Acid | Temp | Duration |
|----|--------------|------|------|----------|
| C0 | None | None (control) | Ambient | — |
| C1 | None | H₂SO₄ proxy | Ambient | 24 h |
| C2 | None | H₂SO₄ proxy | Ambient | 7 d |
| C3 | Fold/crease ×10 | H₂SO₄ proxy | Ambient | 24 h |
| C4 | Seam sample | H₂SO₄ proxy | Ambient | 24 h |

**Stretch:** 30 d soak; elevated T if chamber available.

### 3.4 Acid proxy (assumption — confirm with lab)

- Concentrated sulfuric acid **as available under lab rules** (often ~95–98%; **do not improvise concentration**)  
- Volume: enough to fully immerse coupons  
- Container: glass, acid-rated, labeled, secondary containment  

Record actual concentration, lot, and SDS reference in the log.

---

## 4. Procedure outline

### 4.1 Prep

1. Label coupons (laser/print + acid-resistant tag method TBD)  
2. Photograph each coupon (scale bar)  
3. Weigh dry mass m₀ (0.1 mg balance if available)  
4. Measure thickness if micrometer available  

### 4.2 Precondition (C3)

1. Fold 180° and crease firmly ×10 along long axis  
2. Unfold; photograph; note whitening/cracks  

### 4.3 Exposure

1. Immerse per matrix; cover vessel  
2. Note start time  
3. At end: remove with appropriate tools; **neutralize/rinse per lab SOP**  
4. Dry to constant mass method (lab standard)  

### 4.4 Post measurements

1. Photograph  
2. Mass m₁ → Δm% = 100 × (m₁ − m₀) / m₀  
3. Qualitative score: 0 none → 3 severe attack  
4. Flexibility bend test (qualitative)  
5. Seam samples: optional low ΔP air check if fixture exists — **no improvised pressure bombs**

### 4.5 Records

Use §7 template; store photos in private drive; summary table may land in `research/notes/YYYY-MM-DD-materials-test.md` (**no unsafe how-to selfies**).

---

## 5. Equipment / order list (generic)

| Item | Qty | Notes |
|------|-----|-------|
| Candidate films | per RFQ | From materials partners |
| Analytical balance | 1 | Borrow lab |
| Glass vessels + lids | as needed | Acid rated |
| PPE | per lab | Face shield, gloves, coat |
| Fume hood access | — | Required for conc. acid |
| Camera + scale | 1 | Documentation |
| Micrometer | optional | Thickness |
| pH / waste stream | per EHS | Disposal |

---

## 6. Decision gate → balloon prototype

After C1–C4 on ≥2 candidate films:

| If… | Then… |
|-----|--------|
| ≥1 film Pass on C1–C3 | Baseline that film for `balloon-prototype-1` |
| Only Conditional | Prototype with multilayer plan; keep risk R-01 open |
| All Fail | Do not fab flight-like envelope; expand supplier search |

Update `risks.json` R-01 status to `mitigating` when campaign starts; `closed` only after multi-duration Pass.

---

## 7. Data log template

```
Test ID:
Date start/end:
Operator:
Lab location:
Acid: conc ___%  SDS:
Temp:

Coupon ID | Material | Variant | Condition | m0 | m1 | d% | Visual 0-3 | Notes
---------|----------|---------|-----------|----|----|----|-----------|------
```

---

## 8. Outsourcing brief (if no in-house acid lab)

Send vendor/lab:

- Goal: fluoropolymer film H₂SO₄ immersion + crease + optional seam  
- Matrix §3.3  
- Deliverables: photos, mass table, short memo  
- Schedule: pilot within 30 days preferred  

---

## 9. History

| Ver | Date | Notes |
|-----|------|-------|
| 0.9 | 2026-07-09 | Initial protocol for war board Week 3 unlock |
