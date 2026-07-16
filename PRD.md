# PRD — HiHol 152-ФЗ and AI services site

## Status and objective

The 152-ФЗ homepage remains validation-first and sells manual audits. Active additive scope `U-AI-INTAKE-1` restores a structured presales route for the separate AI-automation direction: a first-party questionnaire produces the inputs for a manual preliminary review. It does not automate the 152-ФЗ audit or generate a guaranteed ROI/PDF result.

## Audience and promise

Primary audience: owners and executives of small businesses with websites, forms, analytics or chat bots. Secondary audience: studios and agencies that may need a white-label audit. The offer is a technical audit of the site's personal-data path with screenshots, risk priorities and an actionable remediation plan. It is not a legal opinion or a guarantee against sanctions.

## P0 user stories

### US-01 — Understand the offer in the first viewport

As a business owner, I want to understand who the audit is for, what is checked and what I receive, so that I can decide whether to continue reading.

- Given the homepage at 360–1440 px, when the first viewport renders, then the H1 names a 152-ФЗ site audit and the business outcome.
- Given the hero, when I scan its supporting text, then I see the checked surfaces, 24–48 hour term, report format and the non-legal trust boundary.

### US-02 — Get a low-friction first answer

As an owner who is unsure about compliance, I want two example findings before buying, so that I can assess relevance without registration or a call.

- Given any primary CTA, when I activate it, then I reach the final Telegram contact path or its page anchor without analytics consent being required.
- Given the hero CTA, when I read its note, then the free scope and absence of registration/calls are explicit.

### US-03 — Self-qualify the risk

As a site owner, I want a short interactive checklist, so that I can connect common site behavior to the need for an audit.

- Given the self-check, when I select an item, then the visible count and grammatically correct result update immediately.
- Given one or more selected items, when I choose the self-check CTA, then I reach the contact section and the click uses its own analytics goal when consent exists.

### US-04 — Compare the commercial options

As a decision-maker, I want clear inclusions, timeframes and prices, so that I can choose the appropriate level of work.

- Given the pricing section, when it renders, then all three tiers show price, inclusions and applicable term without contradictory annual arithmetic.
- Given a tier CTA or PDF price link, when I activate it, then the route remains usable and its analytics goal is distinguishable from other CTA positions.

### US-05 — Verify expertise and delivery boundaries

As a cautious buyer, I want to see who performs the work and what the report contains, so that I can judge credibility without fake testimonials or statistics.

- Given the proof and deliverables blocks, when I scan them, then I see only offer-backed facts: 25+ checks, 24–48 hours, 10–15 pages and a 30-minute debrief.
- Given the page copy, when it is searched, then it contains no “9 из 10”, sanction-reduction promise, near-zero-competition claim or unconditional legal conclusion.

### US-06 — Control analytics consent

As a visitor, I want the site to respect my analytics choice, so that I can use every conversion path without accepting tracking.

- Given a fresh browser context, when the page loads before consent, then no Yandex Metrika request is sent.
- Given I accept analytics, when a tracked CTA is clicked, then Metrika may receive the position-specific goal; choosing necessary-only never blocks the link.

### US-07 — Request a structured AI preliminary review

As a business owner with a repeatable process, I want to describe it in a guided questionnaire, so that I can receive a useful preliminary automation boundary without preparing a technical specification.

- Given an AI CTA, when I activate it, then `/ai-diagnostika` opens with safe source and optional page context while Telegram remains available as an alternative.
- Given the questionnaire, when I move between four steps, then required fields/ranges are validated and previously entered answers remain available.
- Given valid answers and consent, when I submit, then `POST /api/leads` stores the minimised brief and returns a lead ID; no IP/User-Agent is stored and no answers/contact are sent to Telegram.
- Given an API failure, when submit completes unsuccessfully, then the page shows an honest error, keeps the answers and offers Telegram without displaying false success.

## P0 story to endpoint mapping

| Story | Endpoint mapping |
|---|---|
| US-01, US-02, US-04, US-05 | No API needed — static content and ordinary links |
| US-03 | No API needed — client-only checklist state |
| US-06 | No product API — consent-gated browser analytics only |
| US-07 | `POST /leads` through public same-origin `/api/leads`; `GET /health` is internal liveness |

## P1 / later

- Claim register with dated legal sources and owner.
- Case-study proof after real client permission.
- Automated scanner-to-PDF for the 152-ФЗ audit only after five paid manual audits; the AI questionnaire remains a manual presales input.
- Production deployment changes are a separate authorized unit.

## Success and kill criteria

- Product signal: qualified Telegram conversations and paid manual audits, tracked by CTA position when consent exists.
- AI intake signal: starts, step progression, completed valid briefs and brief → call → proposal conversion, compared with direct Telegram contacts.
- Validation threshold: five paid audits before automation investment.
- Hold criterion: if 20 qualified sales conversations produce zero paid audits, pause further product expansion and revisit audience, promise and price.
- Claim kill rule: any commercial or legal statement without a current source or first-party evidence is removed, not polished.

## Out of scope

Public lead-read/admin UI, authentication, payments, file uploads, client/customer personal data, automatic AI report/PDF generation, Next.js migration, production activation without separate approval and fabricated cases or testimonials.
