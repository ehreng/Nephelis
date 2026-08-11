# Funding fulfillment SOP

**Status:** Operational draft — use with live Stripe  
**Date:** 2026-07-09  
**Owner:** Ehren / ops  
**Tiers:** see `site/content/data/funding.json`  
**Related:** `docs/go-live.md`, task `funding-campaign-v1`, webhook `POST /api/webhooks/stripe`

> **PII rule:** Never commit customer names, emails, or DNA correspondence to the public git repo. Use a private spreadsheet or CRM; optional monthly **counts-only** snapshot in ops notes.

---

## 1. Scope

| Tier | Product | Price | Capacity (config) | Deliverable |
|------|---------|------:|-------------------|-------------|
| 1 · Legacy | Balloon Engraving | $100 | 500 | Name laser-etched on aerostat (or designated panel) |
| 2 · Immortal | DNA Capsule | $500 | 100 | Sealed inert sample carrier on mission (kit process) |

Interest-only reserves (`/api/reserve`) are **not** paid slots — follow up or convert to Checkout; do not engrave until paid.

---

## 2. Happy path (paid)

```
Customer → Checkout (/api/checkout)
        → Stripe payment success
        → Webhook checkout.session.completed
        → Team email (PAID) + customer auto-reply
        → Ops: log in private master list
        → Fulfillment by tier (below)
```

### 2.1 Automated (already built)

On paid session:

1. Contact tagged in Resend audience (`tier1`/`tier2` + `paid`) when audience configured  
2. Team notify to `TEAM_EMAIL` with name, email, tier, amount, session id  
3. Customer auto-reply (“payment confirmed…”)  

### 2.2 Manual ops (within 1 business day of PAID email)

- [ ] Open private **Master Fulfillment Sheet** (see §7)  
- [ ] Add row: date, tier, name (as paid), email, Stripe session id, status=`paid_logged`  
- [ ] Confirm spelling with customer if ambiguous (reply to their email)  
- [ ] Check capacity: `GET https://www.nephelisindustries.com/api/allocation`  
  - If at capacity: stop sales copy / sell waitlist; email customer options  
- [ ] Set status=`confirmed` after spelling OK  

---

## 3. Tier 1 — Balloon engraving

### 3.1 Name rules (defaults — adjust at freeze)

| Rule | Default |
|------|---------|
| Max length | 40 characters |
| Allowed | Letters, numbers, spaces, hyphen, apostrophe, period |
| Case | Preserve customer preference; engrave as confirmed |
| Logo / Unicode art | Not in $100 tier — route to corporate sponsor path |
| Duplicate names | Allowed; distinguish by email in sheet only |

### 3.2 Master list fields

`date | tier | display_name | email | session_id | status | notes`

Statuses: `paid_logged` → `confirmed` → `on_fab_list` → `engraved` → `closed`

### 3.3 Freeze

- Hard freeze aligned with task `payload-engraving-freeze` (2030-Q3 target)  
- After freeze: no new paid Tier 1 without explicit exception  
- Export final list to fabricator under NDA; do not put emails on fab export if avoidable (id + display_name only)

### 3.4 Communications

| When | Message |
|------|---------|
| Payment | Auto-reply (system) |
| +7d if no issues | Optional “you’re on the flight list” (manual batch) |
| At freeze | “Name locked for engraving” |
| Post-launch | Mission update only — not individual tracking of etch photo unless offered |

---

## 4. Tier 2 — DNA / sample capsule

> **Counsel review required** before large-scale marketing of biological samples. Until reviewed: treat process as **draft**, sealed/inert only, no claim of “approved planetary protection category.”

### 4.1 Principles (from CONOPS)

- Sample is **inert, sealed**, no release mechanism  
- Crowdfund items must not break mass / entry / science requirements  
- PII and sample chain-of-custody stay private  

### 4.2 Kit outbound (what we send)

Draft contents (finalize with packaging partner):

1. Instructions card (PDF also emailed)  
2. Sample envelope / vial for hair or nail only (no fluids)  
3. Return mailer with tracking  
4. Consent / acknowledgment form (counsel template TBD)  

### 4.3 Inbound processing

- [ ] Confirm payment + form signed  
- [ ] Log kit ship date + tracking  
- [ ] On return: inspect seal, assign **capsule slot id** (not public)  
- [ ] Store sealed until integration; no open lab processing beyond sealing  
- [ ] Status: `kit_sent` → `sample_received` → `sealed_in_capsule` → `integrated`  

### 4.4 If sample never returned

- Slot remains paid (no auto-refund) unless policy says otherwise  
- After deadline (TBD, e.g. T−6 months to launch): email reminder; then close as `no_sample` — still mission donor, no capsule content  

### 4.5 Public language (safe)

Prefer: “optional biological memento in a sealed inert carrier.”  
Avoid: medical claims, guaranteed recovery, surface contact, or PP category numbers without memo.

---

## 5. Refunds, disputes, failures

| Case | Action |
|------|--------|
| Customer requests refund &lt; 14 days, not yet `on_fab_list` | Refund via Stripe; status=`refunded`; remove from engraving list |
| After fab freeze / sample sealed | Case-by-case; default no refund |
| Chargeback | Respond with Checkout session + emails; pause fulfillment |
| Checkout cancel | No ops action |
| Webhook missed but Stripe shows paid | Manually log from Stripe Dashboard; fix webhook |

---

## 6. Capacity & sales hygiene

- Live counts: `/api/allocation` (baseline + paid metadata)  
- Marketing copy should not invent “120/500” — use live UI  
- When Tier 1 ≥ 90% capacity: plan waitlist copy  
- Corporate logos: not this SOP — partner `p-sponsor-corp`  

---

## 7. Systems of record

| Data | Where |
|------|--------|
| Payments | Stripe Dashboard |
| Automated emails | Resend |
| Fulfillment master | **Private** Google Sheet / Airtable (recommended) |
| Allocation | Stripe sessions + `funding.json` baseline |
| Public site | No customer PII |

Monthly (optional): record **counts only** in `research/notes/YYYY-MM-funding-counts.md` (paid_legacy, paid_dna).

---

## 8. Per-order checklist (copy per payment)

```
Order date:
Tier: 1 / 2
Stripe session:
Email:
Display name (Tier 1):
[ ] Logged in master sheet
[ ] Spelling confirmed
[ ] Allocation OK
[ ] Tier 1: status → confirmed
[ ] Tier 2: kit shipped / tracking ___
[ ] Tier 2: sample received / sealed id ___
```

---

## 9. Stripe live (human)

Follow `docs/go-live.md` § Stripe live:

1. Live secret key on Vercel  
2. Live webhook → `/api/webhooks/stripe`  
3. Redeploy  
4. One real $100 test (+ refund if desired)  
5. Confirm PAID email + allocation increment  

---

## 10. History

| Ver | Date | Notes |
|-----|------|-------|
| 0.9 | 2026-07-09 | First SOP from war board + existing Stripe/Resend flow |
