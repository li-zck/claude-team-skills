---
name: deal-summary
description: Turn a property listing, offering memo or rent roll into a one-page deal summary with key numbers, the math behind them, risks and missing data. Use when someone shares a deal to review.
metadata:
  version: "0.1.0"
---

# Deal summary

Use this when someone shares a property deal: a listing, an offering memorandum, a rent roll, a T-12 or a broker email.

## Rules
- Use only numbers that are in the documents. Never estimate or fill in a missing number; list it under "Missing" instead.
- Show the math for every calculated figure in one line, e.g. `Cap rate = NOI $84,000 / price $1,200,000 = 7.0%`.
- If two documents disagree (e.g. the listing and the rent roll give different rents), show both and say which document each came from.
- Use the document's own currency and units. Round money to the dollar and percentages to one decimal.
- Plain English, no jargon without a short explanation. The reader is busy and reads this on a phone.

## Output
**Property:** address, type, units or square feet, year built.

**Price and terms:** asking price, price per unit or per square foot, any seller terms.

**Key numbers** (only those the documents support):
| Metric | Value | Math |
|---|---|---|
| Gross scheduled rent | | |
| Vacancy | | |
| Operating expenses | | |
| NOI | | |
| Cap rate | | NOI / price |
| Cash-on-cash return | | only if loan terms are given |
| DSCR | | only if loan terms are given |

**Risks:** 3–5 bullets, most serious first (e.g. leases expiring soon, below-market rents, deferred maintenance, one tenant paying most of the rent).

**Missing:** what's needed before a decision, as a checklist.

**Next step:** one line suggesting what to ask the broker or seller first.
