# Personal Portfolio V2 — Final Audit, Requirements, and Implementation Plan

**Date:** 2026-10-15 (v2 of the audit; supersedes the same-day v1 report, preserved at `docs/portfolio-v2-audit-and-plan-v1.md`)
**Status:** **This file is the single authoritative planning document for Portfolio V2.** No implementation has been performed; all findings below are planning inputs.
**Scope of this revision:** integrates six requirement changes from the owner — (1) strict personal-portfolio identity (not a Sahad Labs agency site), (2) a broad multi-sector, multi-need audience with needs-based entry points, (3) a candidate-driven tagline/messaging decision, (4) a testimonials + verified-metrics system as a V2 requirement, (5) four-language support (en/de/fr/ar incl. RTL) with automatic-but-polite locale selection, (6) resume scope correction (file replacement only, existing behavior preserved) — and rebuilds priorities, estimates, and acceptance criteria around them.

**Evidence labels:** `[OBSERVED]` verified against repository/live site/HTTP this session · `[INFERENCE]` reasoned from observed facts · `[RECOMMENDATION]` judgment; alternatives weighed · `[UNVERIFIED]` could not be confirmed; follow-up flagged · `[DRAFT-TRANSLATION]` machine- or self-drafted rendering; requires native review before publication.

> **Verification notes (2026-10-15):** Repository state was re-verified immediately before writing this revision: HEAD is still `fc3a46e`, the working tree is unchanged apart from the uncommitted resume PDF and the untracked `[DEP]-` resume copy, and no i18n packages are installed. Every v1 finding was therefore re-checked against the same-day baseline and remains current. No browser automation, screenshot tooling, or Lighthouse run was available (unchanged from v1); performance figures remain asset-measurement + code-based estimates. Outbound-link checks ran from one network. All tooling/pricing facts cite their verification date.

---

## 1. Executive Summary and Final Strategic Decisions

### 1.1 What changed and why

The v1 audit found a technically sound, recently refactored portfolio undermined by discoverability defects, unverifiable claims, broken proof links, missing measurement, and a split design language — and recommended a business-client-first, sector-narrow positioning. The owner's revised requirements keep every technical finding but correct the strategy in six ways, each of which changes the plan materially:

| # | Decision | What it replaces (v1) | Consequence in this plan |
|---|---|---|---|
| **D1** | **This is a personal professional portfolio.** Identity is the person — Md Sahaduzzaman ("Sahad"), full-stack software engineer — in first person, name-led, throughout. Sahad Labs appears only as founder affiliation and work context. | v1's positioning statement, one-liner, and proof band drifted into company-voice ("Sahad Labs designs, builds, and maintains…"). | §7 defines hard brand boundaries; §5 rewrites positioning/tagline in personal voice; §6 re-frames services as personal capability areas. |
| **D2** | **Broad, needs-based audience strategy.** One personal identity; visitors self-serve through *what they need* (Launch / Improve / Automate / Build), not through sector or audience segments. Recruiter path stays quiet but complete. | v1's "service businesses with operational problems" primary-audience framing and sector-led homepage. | §4 defines the five-layer audience model (identity / problems / navigation / evidence / depth); §6 restructures the homepage around the needs taxonomy; case-study sector labels carry industry breadth without sector pages. |
| **D3** | **Tagline chosen by comparison.** Five distinct candidates evaluated against seven criteria incl. ar/de/fr translatability; a hybrid of the two strongest is recommended. | v1 hero copy aimed at one segment. | §5 contains the candidate matrix, the recommended hierarchy, and `[DRAFT-TRANSLATION]` copy for all four languages. |
| **D4** | **Testimonials + verified metrics are a V2 requirement.** The *system* (data model, components, proof surfaces, governance) ships in V2; it renders nothing until owner-supplied evidence passes the verification gates. Missing evidence is a content dependency, never fake content. | v1 deferred testimonials entirely and left proof metrics informal. | §9 specifies data models, per-metric counting methodology, evidence gates, publication rules, and the owner-input checklist; §15 adds the engineering tasks. |
| **D5** | **Four languages are in V2 scope:** English (default), German, French, Arabic (full RTL). Locale selection: explicit locale URL > saved manual choice (cookie; governs ambiguous entries) > browser preference > English final; country/IP hints may preselect the language picker only — never redirect or override a preference. | v1 deferred all localization to post-V2 (German landing "P3"). | §10 specifies the architecture (routing, negotiation, fallback, SEO wiring); §14 extends SEO/a11y/perf for four locales; estimates and stages rebuilt (§17). |
| **D6** | **Translation workflow:** machine-drafted (Azure Translator free tier via Azure for Students — feasibility verified in §11), committed as static per-locale files, then mandatory human review per locale before publication. No runtime translation API. Legal content has special handling. | (New requirement.) | §11 defines the workflow, review gates per content type, Arabic-specific QA, and the Azure verdict. |
| **D7** | **Resume scope corrected:** the download already works (raw PDF, new tab). V2 contains exactly one resume task — replace the file at `public/resume/Md-Sahaduzzaman-Resume.pdf` once the owner approves the final PDF. URL, filename, button, and behavior unchanged. | Any implied resume-viewer/redesign work is removed; the v1 hygiene item that suggested renaming the resume file is **withdrawn** (filename must stay). | §12; also flags that the uncommitted PDF and the `[DEP]-` copy in `public/` are owner actions (§16). Translated resumes stay optional (§19). |
| **D8** | **Design direction refined, not replaced:** keep the "Precision Instrument" token system (v1 Direction A) and add what the new requirements demand — Arabic typography layer, RTL discipline via logical properties, and "luxurious" quality through scale, whitespace, and restraint rather than new font families or decorative effects. | v1 rejected Direction B for cost; that rejection stands, now with the added four-language argument (every new Latin family would need an Arabic companion). | §8. |
| **D9** | **Staged, reviewable releases with an i18n-ready core:** R1 critical fixes (ships alone, English) → R2 design system + personal-brand homepage + evidence system (i18n-ready architecture) → R3 four-language rollout + translation QA → R4 post-launch. Content is written *into* the localization structure from R2 onward so nothing is rewritten twice. | v1's single-launch, single-language plan. | §17. |
| **D10** | **Revised effort:** ≈147–225 engineering hours across R1–R3 (mid-point ~165–185 after range overlap) `[ESTIMATE]`, plus a separate non-engineering translation-review track with its own calendar time; staged R1–R4 so value ships continuously. | v1's 55–85 h single-language estimate. | §17 with the per-category breakdown the owner requested. |

### 1.2 Strongest recommendations (unchanged in kind, re-scoped)

1. **Ship the P0 credibility/discoverability fixes immediately and independently** (wrong-domain sitemap, relative canonicals, missing OG images, dead proof links, claims rewrite, SMTP rotation, legacy deployment retirement). They are small, language-independent, and stop active damage while the larger build proceeds. §15 Group 1.
2. **Build the localization architecture before locking content.** The single most expensive mistake available in V2 is writing final copy into `src/data/*.ts` and then retrofitting four languages. §17 Stage R2 sequences this.
3. **Let the evidence system carry both breadth and credibility:** three flagship case studies with evidence tiers and engineering decision narratives serve hiring managers, technical evaluators, and non-technical buyers alike; the needs taxonomy routes everyone else. No "industries I serve" page ever gets built.
4. **Publish nothing unverifiable — including in Arabic, German, and French.** The v1 claims pass (§3, F2 disposition table) applies per locale; a translated overclaim is still an overclaim.
5. **Instrument from day one of R1** (Vercel Web Analytics + hardened Nodemailer pipeline, locale-aware), so R2/R3 decisions run on data.

### 1.3 What must not change

Next.js 16 App Router + TS + Tailwind v4 architecture; the HSL token theming; the Server Action + Zod + escaping contact pipeline; typed data-file content model (extended for locales, not replaced); the MDX mechanism; the genuine client work and its live URLs; the existing FAQ copy quality; the CV-in-nav hiring path and raw-PDF resume behavior; the site's recognizability as a *personal* portfolio.

---

## 2. Verified Current Repository and Website Baseline

Re-verified 2026-10-15 immediately before this revision (same session day as v1; no intervening commits — HEAD `fc3a46e`). The v1 baseline stands in full; what follows is the decision-relevant summary plus new observations.

### 2.1 Stack and structure `[OBSERVED]`

Next.js `^16.1.1` (App Router, Turbopack), React 19.2, TypeScript 5, Tailwind CSS v4 (`@theme` tokens over shadcn-style HSL variables, `next-themes` class strategy, `@tailwindcss/typography`), Inter + JetBrains Mono via `next/font`, framer-motion 12, `next-mdx-remote` v6 + gray-matter (one MDX post), contact via Server Action → Zod → HTML-escape → Nodemailer (`SMTP_*` env). Routes: `/`, `/projects`, `/projects/[id]`, `/services`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, `/terms`, `/impressum`. `robots.ts` + `sitemap.ts` exist (both defective). No tests, no analytics, **no i18n packages** (`[OBSERVED]`: no `next-intl`/`next-i18next` in `package.json`), static-prerendered on Vercel Hobby.

### 2.2 Live-deployment findings `[OBSERVED]` (unchanged from v1, re-confirmed same day)

- Homepage 53 KB HTML; title *Software Engineer | Backend & Real-Time Systems*; **no OG/Twitter/canonical/JSON-LD on the homepage**.
- `robots.txt` → `Sitemap: https://sahad.vercel.app/sitemap.xml` (**wrong domain**); all 17 sitemap `<loc>` entries on the wrong domain; `/services`, `/terms`, `/privacy`, `/impressum` missing from the sitemap; `sahad.vercel.app` is a live, stale, differently-scoped deployment (duplicate-content risk).
- Project pages: auto-generated metadata present; `og:image` absent despite `twitter:card=summary_large_image`; `og:url` and `rel=canonical` relative (no `metadataBase`).
- Headers: HSTS only; no CSP / `X-Content-Type-Options` / `X-Frame-Options` / `Referrer-Policy`.
- Outbound: `4jtraders.com` → 402 "currently unavailable – Base44"; Rushkat card links `#`; `fcsc-nids` / `award-care-landing` / `procourier` / `restaurant-hubbd` unreachable from the test network; the three flagship client sites (cozeecare.com.au, violina-pflegedienst.de, taqwagroupbd.com) and `github.com/sahadcse`, `linkedin.com/in/sahadcse` all resolve 200.
- Homepage payload ≈ 1,040 KB transfer: ~744 KB JS (11 chunks), 74 KB CSS, 119 KB fonts. Hero (LCP element) is painted `opacity: 0` until framer-motion hydrates.

### 2.3 New observations from this revision pass `[OBSERVED]`

1. **Resume files — identified by content, not filename assumption (verified 2026-10-15 by reading both PDFs):**
   - `public/resume/[DEP]-Md-Sahaduzzaman-Resume.pdf` (Jun 7; 104 KB; untracked) is the **deprecated previous version**: 4j Traders "July 2025 – Dec 2025", Rushkat "Oct 2024 – Jun 2025", **no** Taqwa Group employment entry, clients named inline ("Violina Pflegedienst"), interior-design wording in the 4j entry. The `[DEP]` prefix is accurate.
   - `public/resume/Md-Sahaduzzaman-Resume.pdf` (Oct 14 23:22; 127 KB; modified, **uncommitted**) is the **updated source PDF**, already sitting at the canonical publication path.
2. **Updated resume vs. website data — reconciliation deltas for the content-review task (§12):** 4j Traders start **Jul → Sep 2025**; Rushkat end **Jun → Jan 2025**; a **new Taqwa Group employment entry** (Software Engineer, Dhaka, **Feb 2024 – Aug 2025**, sole engineer — land-plot EMI engine, SSLCommerz integration, multi-tier referral system, admin dashboards) that `src/data/experience.ts` lacks; "FCHC Healthcare Portal" (resume) vs "FCSC Healthcare Portal" (site) naming variance; the resume **drops** the "60% response time reduction" claim, consistent with this plan's claims policy; professional start moves to **Feb 2024** (the "Professional engineer since 2024" metric still holds and strengthens).
3. **Deploy exposure:** because `public/` is served wholesale, a deploy of the current working tree would publish the updated (not-yet-approved-committed) resume *and* keep exposing the `[DEP]-` file at a second public URL. Both are owner actions and §12 tasks — not performed in this session.
4. **Identity evidence in the current UI:** `SITE_CONFIG.name = "SAHAD"`; nav logo is personal; footer is personal. The company-leaning drift lives in *content and metadata* (Services page tone, Impressum metadata, the v1 report's own recommendations) — so D1 is primarily a content/metadata revision, not a redesign.
5. **i18n readiness:** the content layer (typed TS data files + one MDX file + inline JSX strings) is small and centralized — favorable for extraction, but several strings are hardcoded in components (e.g., `Hero` hardcodes its subheadline, nav labels, form messages) and must move into the string layer as part of the i18n architecture (§10).
---

## 3. Original Audit Findings That Remain Valid

All sixteen v1 findings were re-verified against the unchanged repository today and **remain valid**. Restated compactly; full evidence lives in v1 §2–§3 and §2 above.

| ID | Severity | Finding (essence) | Disposition in this plan |
|---|---|---|---|
| F1 | Critical | Sitemap + robots point to wrong domain; 4 pages missing from sitemap; legacy deployment live | **Retain** — P0 task V2-01 (+V2-05b legacy retirement). Now additionally the foundation for hreflang (§14). |
| F2 | Critical | Unverifiable claims as metrics (projects, services, meta descriptions), visually amplified, propagated to snippets | **Retain** — P0 task V2-04; now formalized by the §9 metrics methodology and applied per locale (§11). |
| F3 | Critical | No OG image; broken `summary_large_image`; relative canonicals | **Retain** — P0 task V2-02; extended to per-locale alternates in §14. |
| F4 | High | Broken/misleading proof links (4j Base44 page, Rushkat `#`, unreachable demos, profile-level `codeUrl`s) | **Retain** — P0 task V2-03. |
| F5 | High | Two design languages (tokenized indigo vs hardcoded cyan/slate/blue/purple) | **Retain** — V2-09 token consolidation; prerequisite for the four-language RTL work (§8). |
| F6 | High | Homepage cannot convert (no imagery, no scope, no process, no FAQ, no closing CTA; "featured" = first 3 of 12 uncurated) | **Retain, revised** — homepage rebuilt per §6 (needs-based, personal-voice). |
| F7 | High | Zero measurement; privacy page describes analytics that don't exist | **Retain** — §13; extended with locale-aware reporting. |
| F8 | High | LCP behind `opacity:0` + framer-motion client boundary; ~744 KB JS on a text page | **Retain** — §14.1; motion budget (§8) now also governs four-locale font loading. |
| F9 | Medium | Contact form: no rate limiting/honeypot, missing ARIA live/invalid wiring, `verify()` latency | **Retain** — §13.4; form must also localize validation messages (§10). |
| F10 | Medium | Positioning incoherence (recruiter title vs B2B hero vs "Premium Services" vs "Software Architect"); "3+ years" vs ~2 years listed | **Retain, revised** — resolved by §5 messaging + §9 metrics methodology; titles carry the personal identity consistently. |
| F11 | Medium | Cards hide their images; 0.1–2.1 MB PNGs only on detail pages; mid-word truncation | **Retain** — V2-11 image pipeline. |
| F12 | Medium | Metadata gaps: no root OG, no Person/ProfilePage JSON-LD, raw ISO blog dates, default README | **Retain** — §14.3 (ProfilePage JSON-LD; FAQPage markup stays excluded — Google retired FAQ rich results 2026-05-07). |
| F13 | Medium | Impressum cites superseded §5 TMG (DDG since 2024-05-14) | **Retain** — §12-adjacent legal tasks in §15; German version becomes the legally operative one (§11.5). |
| F14 | Low | Repo cruft (SAHAD.zip, scaffold SVGs, `remotePatterns: **`, `[DEP]` resume copy, stock README) | **Retain, revised** — resume-filename normalization withdrawn (D7); remainder stays V2-21. |
| F15 | Low | A11y gaps: no skip link, `aria-expanded` missing, contrast risk on cyan, sticky-header focus occlusion | **Retain** — §14.2, extended with RTL/`lang`-switch a11y. |
| F16 | Low | Stale single 2024 blog post in main nav | **Retain** — V2-22 editorial decision; blog de-emphasized in nav regardless. |

Also retained from v1 — now an **archived research reference only**; every normative specification needed for implementation is inlined in this document (§8.3–8.5 tokens/components, §9.1/§9.6 case-study template and claims dispositions, §12 resume operations, §13 analytics, §14 technical specs, §18 checklists): the July-2026 audit reconciliation (v1 §4 — its open subset is distributed across §15's tasks), the design-benchmark and UX/B2B evidence bases (distilled into §4, §5, §8), and the v1 source log (Appendix A remains valid for sources 1–33).

---

## 4. Updated Personal-Brand and Audience Strategy

### 4.1 The five-layer model

A single portfolio serves wildly different visitors only when each layer has a distinct job. Everything on the site belongs to exactly one:

| Layer | Question it answers | Where it lives | Rule |
|---|---|---|---|
| 1. **Primary identity** | "Who is this person?" | Hero eyebrow + name, About, page titles, footer, structured data | One sentence, universal, non-sector-bound: *software engineer who designs, builds, and maintains digital systems end to end.* |
| 2. **Range of problems** | "Can he help with *my kind* of problem?" | Homepage needs strip (§6.3), "What I can do" page, case-study variety | Expressed as **needs** (launch/improve/automate/build), never as an industry list; industries appear only as *labels on real evidence*. |
| 3. **Needs-based navigation** | "Where do I go for my situation?" | Four entry cards → filtered case views + category explanation on the services page | Four categories maximum; each card states plainly who it's for and what's delivered. |
| 4. **Evidence** | "Prove it." | Proof band (§9 metrics), flagship case studies, live links, testimonials (when verified), GitHub/LinkedIn | Every claim sits next to its evidence; tier labels separate prototypes from productions. |
| 5. **Audience-specific depth** | "I need the details." | Inside case studies (role, decisions, architecture), About (history/CV for hiring), FAQ (ownership/maintenance for buyers), services page (engagement models) | Depth is opt-in — progressive disclosure, never forced on the homepage. |

### 4.2 Who the site must serve — mapped, not pandered to

The owner's visitor list (non-technical owners, individuals wanting personal sites, SMEs, corporates, HR/recruiters/hiring managers, engineers, home-services businesses, creators and public figures, researchers/educators/agri, healthcare, food/retail/SaaS, non-native English speakers, "many other sectors") resolves into **four behavioral groups** — the site adapts through *content and routing*, not through audience-specific pages:

1. **"I need something made"** (owners, individuals, creators, any sector wanting a site/portfolio/store/landing page) → *Launch*.
2. **"Something I have is wrong or weak"** (existing sites: slow, outdated, broken, un-integrated) → *Improve*.
3. **"Work that should run itself doesn't"** (booking, quoting, reporting, manual processes — the operational wedge from v1, now a category instead of the whole identity) → *Automate*.
4. **"I need real software built"** (web apps, portals, SaaS, integrations) → *Build*.
5. **"I need to verify this person"** (recruiters, hiring managers, corporate stakeholders, collaborating engineers) → the quiet hiring path: nav CV, About, case-study depth.

Two implications `[INFERENCE, consistent with v1's UX evidence base]`: non-technical and non-native-English visitors are best served by *familiar patterns and short need-verbs* (the four categories are deliberately single common words), and technical visitors are served by *depth being one click away*, not by jargon up front.

### 4.3 Positioning approaches evaluated

| Approach | Description | Strengths | Failures | Verdict |
|---|---|---|---|---|
| A. Sector-led (v1 drift) | "Operational software for service businesses" | Sharp differentiation; strong case-study fit | Gates out most of the owner's intended audience; portfolio reads as a niche agency; conflicts with the personal-portfolio mandate | Rejected as primary; retained as one strong case-study cluster (healthcare/NDIS) |
| B. Role-led | "Backend & real-time systems engineer" (current `<title>`) | Precise, recruiter-friendly | Unintelligible to most non-technical visitors; defines *him*, not the visitor's need | Rejected as hero; retained inside About/titles for hiring findability |
| C. Audience-led | "For small businesses and creators…" | Immediately relatable | "For X" lists exclude everyone unlisted; ages badly; agency-flavored | Rejected |
| **D. Needs-led with personal identity (recommended)** | Identity sentence (who I am) + four need verbs (what you can get) + evidence (proof I've done each) | Universal; self-routing; scales to any future sector; personal; each verb is provable today | Requires disciplined copy so the breadth doesn't blur into "I do everything" — mitigated by the four-verb constraint and per-category evidence pointers | **Recommended** |

### 4.4 How breadth stays credible

- **Never claim industries — label evidence.** "Healthcare · logistics · e-commerce · real estate · …" appears only as chips on real case studies and in the proof band's "sectors delivered" metric (§9), both traceable to projects.
- **Each need-verb points at proof.** Launch → client sites; Improve → performance/SEO work; Automate → Cozee Care scheduling, Taqwa inventory; Build → platforms, telemedicine, e-commerce backend. A visitor clicking any category lands on work that substantiates it.
- **Depth stays honest.** v1's differentiators (solo end-to-end accountability; operational-software depth; live international client systems; engineering-grade websites; built-in continuity) survive intact as the *substance* beneath the broader framing — they describe how he works, not which industries he serves.
- **No "anything you need" copy.** The category cards state concrete deliverables; the FAQ/engagement model states what's out of scope (e.g., native mobile apps today) — honesty about edges increases trust in the center.

### 4.5 Conversion hierarchy (revised from v1)

**Primary conversion: an enquiry of any size** — from "I need a landing page" to "I need a custom platform" — because the needs taxonomy intentionally qualifies visitors *by fit, not by ticket size*. **Secondary conversion: hiring verification** (CV download, LinkedIn contact, recruiter email). `[RECOMMENDATION]` Trade-off vs v1: the hero no longer argues the highest-ticket story; the case-study depth still does that work for the visitors who matter most (Automate/Build), while Launch/Improve visitors — previously bounced by over-positioning — now have a path. Expected cost: some high-ticket magnetism in the first impression; accepted deliberately per the owner's broader-audience requirement, mitigated by flagship case placement directly beneath the hero.

---

## 5. Recommended Tagline, Messaging, and Positioning

### 5.1 Evaluation matrix

Five distinct candidates, each scored on the seven required criteria (1 = weak, 5 = strong). "Translates" = renders naturally into Arabic, German, and French with the register business audiences expect (Sie/vous/MSA-formal) `[DRAFT-TRANSLATION assessment — native review still required]`.

| # | Candidate (headline) | Non-technical clarity | Technical credibility | Small + large scope | Personal (not agency) | Distinctive | Substantiable | Translates | Total /35 |
|---|---|---|---|---|---|---|---|---|---|
| T1 | **Software, engineered around your goals.** | 5 | 4 | 5 | 5 | 3 | 5 | 5 | 32 |
| T2 | **From a first website to a full platform.** | 5 | 4 | 5 | 5 | 4 | 5 | 5 | 33 |
| T3 | **Launch. Improve. Automate. Build.** | 5 | 3 | 5 | 3 | 4 | 5 | 5 | 30 |
| T4 | **Your work deserves software that keeps up.** | 5 | 2 | 4 | 4 | 3 | 3 | 3 | 24 |
| T5 | **The digital side of your business, handled.** | 4 | 2 | 4 | 4 | 3 | 3 | 2 (idiom-dependent) | 22 |

Notes: T3 is punchy but agency-scented without an "I" and reads as slogan rather than identity; T4/T5 lean on idiom and comfort-language that drifts badly in translation and promises warmth more than capability. T1 and T2 are the strongest and complementary: T2 carries the *scope ladder* (instantly answers "does he do small things too?"), T1 carries the *posture* (deliberate, personal, goal-anchored).

### 5.2 Recommendation: T2 headline + T1 vocabulary as the supporting system

**Hero hierarchy (desktop order):**

1. **Identity eyebrow (mono, small):** `Md Sahaduzzaman (Sahad) — Software Engineer · Founder, Sahad Labs`
2. **H1:** `From a first website to a full platform.`
3. **Subhead:** `I help founders, businesses, and professionals launch, improve, automate, and build the digital systems their work depends on — designed, delivered, and maintained personally, end to end.`
4. **CTAs:** primary `Discuss a project` → `/contact` · secondary `See the work` → `/projects` · quiet tertiary in nav: `CV`.
5. **Availability line (small, under CTAs):** `Currently available for new projects` (plainly true state; owner keeps it updated — §16).

**Why this wins:** the H1 is a scope ladder a non-technical visitor parses instantly; the subhead names the four need-verbs that become the site's navigation (§6), states the personal delivery promise, and contains zero buzzwords; the eyebrow keeps the *personal* identity and the founder affiliation in their correct sizes. The four verbs are also the translation backbone — short, common words that hold meaning across all four locales (below).

**Page-title/metadata strategy (hiring findability preserved):** while the hero stays human, titles/descriptions carry the searchable professional identity, e.g. `<title>Sahad — Full-Stack Software Engineer | Personal Portfolio</title>`; per-page titles follow the pattern `Sahad — <Page> | Full-Stack Software Engineer`, personal name first. Recruiters searching "Sahad software engineer" land on a page whose title matches their query; visitors reading the hero meet a person, not a keyword string. `[RECOMMENDATION]`

### 5.3 Sample copy, all four languages

English (canonical, publication-ready once owner-approved):

> **From a first website to a full platform.**
> I help founders, businesses, and professionals launch, improve, automate, and build the digital systems their work depends on — designed, delivered, and maintained personally, end to end.

`[DRAFT-TRANSLATION]` German (Sie-form, business register):

> **Von der ersten Website bis zur kompletten Plattform.**
> Ich helfe Gründern, Unternehmen und Fachleuten, die digitalen Systeme ihrer Arbeit zu starten, zu verbessern, zu automatisieren und aufzubauen — persönlich konzipiert, umgesetzt und betreut, von Anfang bis Ende.

`[DRAFT-TRANSLATION]` French (vous-form):

> **D'un premier site web à une plateforme complète.**
> J'aide fondateurs, entreprises et professionnels à lancer, améliorer, automatiser et créer les systèmes numériques dont leur activité dépend — conçus, réalisés et maintenus personnellement, de bout en bout.

`[DRAFT-TRANSLATION]` Arabic (MSA, formal):

> **من موقعك الأول إلى منصة متكاملة.**
> أساعد المؤسسين والشركات والمحترفين على إطلاق وتحسين وأتمتة وبناء الأنظمة الرقمية التي يعتمد عليها عملهم — بتصميم وتنفيذ وصيانة شخصية من البداية إلى النهاية.

Needs-category labels `[DRAFT-TRANSLATION]`: Launch → *Starten / Lancer / إطلاق* · Improve → *Verbessern / Améliorer / تحسين* · Automate → *Automatisieren / Automatiser / أتمتة* · Build → *Bauen / Créer / بناء*. All are single common words in each language — the navigation survives translation without explanation. Arabic renders right-to-left and must join correctly (§8.4, §11.4).

### 5.4 Supporting proof line (hero-adjacent, personal-voice)

`Designed and delivered for clients and teams in Australia, Germany, and beyond — healthcare, real estate, e-commerce, and more.` — every clause traceable to §9's metrics methodology; the "and more" is earned by the diversity metric, not an open promise.

---

## 6. Updated Site Map, Navigation, and Page-by-Page Structure

### 6.1 Site map

```
/                          Home (en, unprefixed default locale)
/de /fr /ar/…              Same tree per locale (architecture §10)
/projects                  Case-study index (curated, sector chips, tier labels)
/projects/[id]             Case study (template §9.1)
/services                  "What I can do" — the four needs categories + engagement models
/about                     Personal: identity, how I work, history, CV, LinkedIn
/contact                   Enquiry: short form + email + expectations
/privacy /terms /impressum Legal (per-locale handling §11.5)
/blog                      Kept, de-emphasized in nav (v1 F16 decision stands)
404 / error                New (v1 open item)
```

### 6.2 Navigation

`Work · What I can do · About · Contact (pill) · CV · [language] · [theme]`
Changes from v1: "Projects" → "Work" (retained); "Services" → "What I can do" (plain-language, matches the needs framing; label `[DRAFT-TRANSLATION]` per locale — DE *Leistungen* stays acceptable as the conventional German term); Blog → footer; **language selector added** (persistent, never buried — §10.4); CV unchanged (D7).

### 6.3 Homepage outline (top → bottom)

| # | Section | Job | Notes vs v1 |
|---|---|---|---|
| 1 | **Hero** (§5.2 hierarchy + availability line) | Identity + scope ladder + routing intent | Personal-voice rewrite; CTAs kept |
| 2 | **Proof band** (3–4 verified personal metrics + testimonials-in-waiting slot) | First credibility anchor | §9 methodology; personal counts, not company counts |
| 3 | **How can I help?** — the four needs cards (Launch / Improve / Automate / Build), each: one-line plain definition, 2–3 example deliverables, "see proof →" link to the matching case view | **New — the core v2 addition.** Replaces v1's "Services teaser"; the primary routing device for a broad audience | |
| 4 | **Selected work** — 3 flagship case cards (Cozee Care, Violina, Taqwa) with screenshots, sector chips, tier labels, one-line outcomes | Evidence that the ladder's top end is real | v1 F6 fix, retained |
| 5 | **How I work** — Scope → Build → Launch → Maintain + ownership statement | De-risk contact; solo-model transparency | Retained from v1, personal voice |
| 6 | **Tech credibility strip** — compact monochrome tech list | Background signal for technical visitors | Retained, light rework |
| 7 | **FAQ teaser** — ownership, maintenance, timezone + link | Objection handling | Retained (existing copy quality praised in v1) |
| 8 | **Final CTA** — "Tell me what you're trying to do." + primary CTA + email | Conversion | Retained |

### 6.4 Inner pages

- **`/projects`:** curated grid (3 flagships + ~5 supporting; 4 demos archived or clearly tiered), uniform image cards (F11 fix), sector chips, evidence-tier chips (§9.2). Sector chip filter retained (shareable URL form P3).
- **`/projects/[id]`:** the §9.1 template in full (role line, constraints, decisions, outcomes-with-basis, tier chip, next-step CTA). `role` clarity is the hiring-audience hook — unchanged.
- **`/services` → "What I can do":** the four needs categories as full sections (who it's for, what's delivered, what it costs *in shape* — fixed-scope vs project-scoped vs retainer, honest edges), engagement models, FAQ, mid-page CTA. The v1 rewrite goals (claims → process promises, tokenized styling) carry over; the agency tone ("Premium Digital Services", "Fixed Developer Retainer" as product names) is rewritten to personal capability language.
- **`/about`:** v1 structure retained (business intro → how I work → experience → education → curated skills → CV/LinkedIn → open-to-work line) + founder-of-Sahad-Labs context in its correct size (§7). Photo decision remains owner input.
- **`/contact`:** v1 form hardening retained + **locale field** (the locale the visitor submitted from — one hidden input, feeds the lead email) + localized validation messages + localized Art. 13 notice.
- **Legal trio:** per-locale handling per §11.4 and the §10.5 scope matrix (privacy/terms fully translated via the human-only path; Impressum German original governs with marked translations).
- **`/blog`:** de-emphasized; localizing the single stale post is **not** planned — fold into case depth or commit to cadence first (v1 V2-22 stands).

### 6.5 Why this structure wins

Versus the current site: it answers, in order, the questions a mixed audience actually asks — *who is this person → can I trust them → do they do what I need → proof → what would working together be like → remaining doubts → act* — and it routes by need instead of by jargon. Versus v1: same evidence spine (proof band, flagships, process, FAQ), with the sector-gated hero replaced by a personal identity + needs router, so the widest possible visitor still finds a path within one screen of scrolling.

---

## 7. Personal Portfolio versus Sahad Labs Brand Boundaries

### 7.1 The distinction the site must preserve

| Entity | Role on this site | Presence |
|---|---|---|
| Md Sahaduzzaman ("Sahad") | **The brand.** First-person voice, name in logo/titles/metadata, all promises made by "I" | Everywhere |
| His engineering work | The portfolio's substance: case studies, employment history, open work | Projects + About |
| Sahad Labs (founder role) | **Context, not brand**: the vehicle through which some client work is delivered and retainer relationships run | About (one clear founder paragraph), relevant case-study context lines, Impressum (business identification), footer text line — never in the logo, nav, hero, or CTA copy |
| Client industries | Labels on evidence (chips, proof-band metric) | Projects + proof band |
| Sahad Labs' broader service catalog | **Out of scope entirely** on this site | Future separate project |

### 7.2 Hard rules `[RECOMMENDATION]`

1. The wordmark stays `SAHAD` (personal) — the Labs logo/name never appears in the navbar, hero, or footer's primary row.
2. Copy voice: first person singular for everything the site promises ("I build", "I maintain"); Sahad Labs only ever appears in third person as context ("delivered through my studio, Sahad Labs", "as founder of Sahad Labs").
3. No "we" anywhere. No agency vocabulary ("our team", "full-service", "premium digital agency").
4. Metadata uses the personal name first: `Sahad — Full-Stack Software Engineer`; the current `Impressum` metadata ("SAHAD - Software Architect") is corrected to personal-name-first phrasing in the §14 metadata pass.
5. Legal/business identification (Impressum) names the person; Sahad Labs is mentioned only as the trading context he actually operates under `[owner confirms the legal/trading reality — §16]`.
6. Structured data: `ProfilePage`/Person as the primary entity (§14.3); any Sahad Labs Organization mention is `worksFor`/`founder` relationship properties on the Person, never a competing site-level entity.
7. The future Sahad Labs website is a separate project: it may reuse design tokens and the needs-taxonomy copy structure, but its content, identity, and domain are independent; nothing in this plan builds Labs-branded surfaces.

### 7.3 Where v1 got this wrong (corrected)

v1's positioning statement ("Sahad Labs designs, builds, and maintains…"), its site one-liner construction, and the proof band's implicit company framing all read agency-first. This revision rewrites those in personal voice (§5, §9.3); the underlying substance — solo end-to-end accountability — survives, because for a founder-engineer the personal and the operational claim are the same claim, stated in the right voice.

---

## 8. Final Design Direction and Design-System Requirements

*This section is self-contained: it incorporates the normative token and component specifications from the archived v1 report (§10.3–§10.4) so implementation never needs the archive.*

### 8.1 Direction decision (revisited under the new requirements)

v1 chose **Direction A "Precision Instrument"** (refine the existing indigo token system) over Direction B "Warm Editorial" (serif restyle). The new requirements *strengthen* that choice:

1. **Four-language parity:** every added Latin type family needs an Arabic companion of equal quality, doubling font decisions, weights, and QA surface. A distinctive serif display face would demand an Arabic display serif harmonizing with it — real cost and a real risk of the Arabic version feeling second-class. A disciplined sans system with one Arabic companion is far more robust.
2. **"Luxurious, creative, clean, approachable":** luxury here comes from execution — generous scale, whitespace, restraint, refined neutrals, real imagery, typographic precision (the Geist/Linear evidence base, v1 §6) — not from novelty families or decorative effects. Creativity lives in the signature elements (mono figure captions, evidence-tier chips, click-to-copy email, availability line) plus the needs-card system.
3. **Personal, not agency:** personal identity is carried through name-first composition, a real portrait (owner input pending), and first-person copy — not company chrome.

**Final direction: "Precision Instrument, personal edition."**

### 8.2 Design principles

1. **Grays do the work; indigo gets one job** (Geist gray-first doctrine). Indigo appears on: primary button, text links, focus ring, small accents. Nowhere else.
2. **Nothing moves without informing** (Linear principle). Entrance fades only; no parallax, no loops, no cursor effects.
3. **Every claim sits next to its evidence.** Layout rule: claim → number/screenshot/link, never claim alone.
4. **Dark mode is a first-class theme, not a filter** (Primer theme-family approach). Every asset ships in both themes.
5. **Familiar structure, personal voice:** conventions stay conventional *in all four languages*; the personal voice (copy, portrait, availability) is the differentiator.
6. **One system, four scripts:** any component accepted into the system must work in LTR-English and RTL-Arabic at equal quality; a component that can't is a defect, not an edge case.
7. **Length is a design input:** German runs ~15–35% longer than English; Arabic is often shorter but taller; no fixed-width labels, no text in fixed-height boxes, buttons sized for the longest locale.

### 8.3 Token specification (concrete values; implemented in `src/app/globals.css`)

```
/* Palette — the existing shadcn-style HSL variable contract, with current values */
Light: --background 0 0% 100% · --foreground 222 47% 11% · --card/popover 0 0% 100%
       --primary 235 85% 45% (Royal Indigo) · --primary-foreground 0 0% 100%
       --secondary/-muted/-accent 220 20% 97% · --muted-foreground 215 16% 47%
       --destructive 0 84% 60% · --border/--input 214 32% 91% · --ring = primary · --radius 0.625rem
Dark:  --background 223 39% 11% (Midnight Slate) · --foreground 210 40% 98%
       --card/popover 222 47% 13% · --primary 235 90% 60% (brightened) · --primary-foreground 223 39% 11%
       --secondary/-muted 223 39% 16% · --muted-foreground 215 20% 65% · --accent 223 39% 20%
       --destructive 0 63% 31% · --border/--input 217 33% 23%
Additions: --success 142 70% 32% (light) / 142 65% 45% (dark) — replaces hardcoded greens
           --warning 32 95% 44% / 38 92% 55% (reserved)
           --danger = destructive (rename usage; replaces hardcoded reds)
           --elev-surface = card (resting; borders over shadows) · --elev-floating = popover +
                0 8px 30px hsl(223 39% 5% / 0.12) — floating only, always translucent
Radii scale (Geist-derived, three values): --radius-sm 6px (inputs/badges) · --radius-md 12px
           (cards/modals/image frames) · --radius-lg 16px (fullscreen) · pills = full

/* Type — six presets (size/weight/lh/tracking bundled), Inter only for Latin */
.text-hero 40/48 → md:56/60, 700, -0.02em · .text-h2 28/36, 700, -0.01em · .text-h3 20/28, 600
.text-lead 18/28, 400, muted-foreground · .text-body 16/26 · .text-label 13/16, 500
.text-mono JetBrains Mono 13/16 — tags, dates, figure captions, evidence chips; tabular-nums on all numbers
Mono moves OFF headings (h2 font-mono dies); mono is for labels/captions only.
Arabic: --font-arabic = IBM Plex Sans Arabic (§10.8); [lang="ar"] presets swap the family,
       line-height +0.1–0.2em, letter-spacing: 0 always (cursive joining).

/* Spacing & layout */
Section rhythm 96px desktop / 64px mobile; scale 4,8,12,16,24,32,48,64,96,128
--content: 68rem (1088px) reading-first width — replaces the current 80rem; ONE width owner
       (the layout's max-w-7xl + per-page container double constraint is collapsed)
Prose sections cap at 44rem. Breakpoints: Tailwind defaults; design targets 390 / 768 / 1440.

/* Motion budget — the whole policy */
150ms (state) / 250ms (entrance); ease-out; opacity + transform only; ONE entrance reveal per
section (whileInView, once, 12px rise); prefers-reduced-motion kills all; hero is server-painted, static.
```

### 8.4 RTL and multilingual component rules

- `<html lang dir>` set per locale at the layout level; never mixed-direction chrome.
- Directional icons (arrows, chevrons, external-link) flip in RTL (`rtl:rotate-180`); non-directional icons never flip.
- Decorative asymmetric frames (project-image corner accents) use logical border utilities so they mirror — or are dropped in RTL contexts if mirroring reads badly (decide in QA).
- Mixed-direction inline content (Arabic sentence containing "Next.js"): wrap ambiguous runs in `<bdi>` / `dir="auto"` (§10.8).
- Form labels always visible (never placeholder-as-label); RTL inputs flip naturally; validation messages inherit document direction.
- The language switcher is a first-class nav citizen in every locale, showing native names (English / Deutsch / Français / العربية) — never translated.

### 8.5 Component system (normative specifications)

- **Buttons** (existing `Button` component retained): variants primary (indigo fill + white text, AAA-checked), secondary, outline (1.5px `--input` border), ghost; sizes sm 36 / md 44 / lg 52 px tall (44px+ clears WCAG 2.5.8); focus-visible ring per global style; loading spinner kept; **kill** `hover:scale-[1.02]` (motion budget).
- **Links:** body links `--primary` + hover underline; nav links foreground/muted-foreground with active state; external links `rel="noopener noreferrer"`.
- **Cards:** `--elev-surface`, `--radius-md`, 1px `--border` (alpha in dark); hover = border darkens toward `--primary/40`; no shadow at rest; shadow only on floating surfaces (mobile nav, modals).
- **Case-study card:** screenshot 16:10 in a `--radius-md` 1px frame; sector chip (mono, `--muted`); title `.text-h3`; one-line outcome `.text-body` muted; tech tags `.text-mono`; whole card one link; external-live icon only when a verified live URL exists.
- **Need-category card** (new): 4-up desktop / stacked mobile; icon + label + one-line definition + examples + proof link; equal height without fixed text boxes (length rule); whole card clickable; must survive German length.
- **Language switcher** (new): compact nav control (icon + current locale code); dropdown lists all four in native names; `aria-expanded`/keyboard accessible; preserves current path (§10.4).
- **Testimonial card** (new, §9.4): localized quote, author name, role, company/relation, optional project link, date; no ratings/stars unless owner supplies verified ones; renders nothing when data is empty.
- **Metric stat** (new, §9.3): value (tabular-nums) + label + methodology tooltip ("how this is counted"); Western digits in all locales by default (§10.8).
- **Images/screenshots:** WebP sources ≤ 300 KB, 1600px max, uniform 16:10 crops, served via `next/image`; light + dark variants when the product themes; captions in `.text-mono` ("Fig. 01 — Cozee Care scheduling board").
- **Forms:** labels above inputs; `--input` borders, 6px radius; focus ring `--ring`; errors `--danger` with icon + `aria-describedby` + `aria-invalid`; success/error banners `aria-live="polite"`; free-text inputs `dir="auto"`.
- **Icons:** lucide only, 20px UI / 24px feature, stroke 1.75, `currentColor`.
- **Empty/error states:** `not-found.tsx` (friendly 404 with the two CTAs), `error.tsx` (retry + email fallback), image-failure fallback (exists, kept).

### 8.6 What stays distinctive vs conventional

Distinctive (personal brand): the evidence system (tiers, captions, methodology tooltips), the needs-card router, availability honesty, click-to-copy email, the personal portrait and first-person voice. Conventional (deliberately): nav, cards, buttons, forms, footer — identical patterns across locales so a German or Arabic first-time visitor recognizes every affordance.
## 9. Case-Study, Testimonial, and Evidence-Backed Metrics Strategy

*Self-contained: incorporates the case-study template, per-project dispositions, and English claims-disposition table from the archived v1 report (§11.1–§11.4, §8.10) as normative specifications.*

### 9.1 Case-study template (locale-aware)

```ts
interface CaseStudy extends Project {
  evidenceLevel: "client-production" | "own-production" | "demo" | "employment";
  role: string;                    // one line: "Solo engineer — architecture, build, deployment"
  timeframe: string;               // "2026 · 8 weeks"
  constraints: string;             // 1–2 sentences: budget/regulatory/legacy context
  decisions: { decision: string; because: string }[];  // 2–4 engineering trade-offs
  screenshots: { src: string; alt: string; caption: string }[];  // mono-captioned
  outcomes: { statement: string; basis: string }[];  // basis = how known, or omitted entirely
  nextStep: string;                // constant: "Building something similar? →" CTA
}
```

**Page layout (top→bottom):** sector chip + evidence-tier chip + timeframe → H1 title → role line → screenshot (Fig. 01) → **The problem** (business language) → **What I built** (business language, 3–5 bullets) → **How it works** (technical, `decisions` as "chose X over Y because Z" — the strongest seniority signal for technical evaluators and hiring managers) → **Outcomes** (only statements with a `basis`; honestly labeled) → stack tags → next-step CTA. Limitations/lessons where useful ("what I'd do differently" — rare among portfolios and disproportionately trusted). Localized fields per §10.5's scope matrix; long-form bodies of non-flagship case studies may remain English behind a visible localized notice (§10.5).

### 9.2 Evidence tiers

CLIENT SYSTEM · CLIENT SITE · OWN PRODUCT · DEMO · EMPLOYMENT — exactly one chip per case study, localized in every locale, semantics never blurred. This is the primary defense against the prototype-equals-production problem. Confidentiality note: client names appear only with client comfort (§16 O2); the tier system works fully anonymized.

### 9.3 Verified metrics: definitions, evidence, and publication rules (corrected arithmetic)

The proof band may contain **only** metrics passing all gates below; every metric ships with its counting methodology visible (tooltip/caption) — the transparency is the trust mechanism.

| Metric | Definition / counting methodology | Evidence required | Supported today? | Where |
|---|---|---|---|---|
| Projects delivered | Portfolio projects that reached a real recipient: client-accepted work, own products in production, shipped employment deliverables. Pure demos excluded (tracked separately). | Project list + tier labels + live URLs | **Yes — 8 delivered** = 3 client systems (Cozee Care, Violina, Taqwa) + 2 client sites (FCSC*, NDIS CarePlus*) + 1 own product (Online Doctor) + 2 employment (4j Traders, Rushkat). *Client-site ownership pending owner confirmation (O2/O3). 8 + 4 demos = the full 12-item inventory ✓ | Proof band |
| Countries reached | Distinct countries of clients/employers with delivered work | Client/employment records | **Provisionally yes: AU, DE, KR, BD = 4** `[owner confirms — O3]` | Proof band |
| Years of professional experience | Time since first listed professional role — **Feb 2024** per the updated resume (Taqwa Group), pending R1-CV1 reconciliation | Approved resume + employment records | **Yes: "Professional engineer since 2024"** (the v1 "3+ years" phrasing stays removed) | About + proof band |
| Sectors served | Distinct normalized sectors **of the delivered set only** (demos excluded) | Project sector fields | **Yes — 6**, recomputed: disability services · healthcare (outpatient + medical) · telemedicine · real estate · e-commerce/retail · digital-asset marketplace. Recount after R1-CV1 if inventory changes | Proof band (chips) |
| Systems maintained in production | Client systems live and maintained at statement time | Live-URL checks (this audit: 3 verified) | **Yes, with date** ("3 live client systems, verified 2026-10"); re-verified each publication cycle | Proof band |
| Clients served | Distinct paying engagements | Invoices/contracts `[owner only]` | **No — blocked on owner records (O3)** | Reserved slot |
| Response time | "Replies within N business days" | Owner's genuine commitment | **Owner decision (O4)** — omit rather than over-promise | Contact page |
| Performance/success numbers ("95+ PageSpeed", "zero errors") | Only with a dated, reproducible measurement | The measurement artifact | **No today** (see §9.6 dispositions) | Nowhere until evidenced |

**Rules:** (1) numbers update on a quarterly review cadence or carry the verification date; (2) a metric losing its evidence is withdrawn, not defended; (3) demo builds never count as delivered; (4) all counts are personal ("projects I delivered"), never agency-scale (D1).

### 9.4 Testimonials: system in V2, content gated by verification

**What ships in V2 (engineering):** the data model, the localized testimonial card, homepage/index slots that render *only* from verified data — "add a typed entry + it appears."

**Data model** (`src/data/testimonials.ts`):

```ts
interface Testimonial {
  id: string;
  quote: Record<Locale, string>;        // per-locale approved text; fallback rules §10.5
  authorName: string;
  authorRole: string;
  authorOrg?: string;                    // never shown without permission
  relation: "client" | "employer" | "colleague" | "collaborator";
  projectRef?: Project["id"];
  obtainedVia: "written-statement" | "linkedin-recommendation" | "email";
  obtainedOn: string;
  permission: { written: true; scope: "named-publication"; on: string };  // hard gate
  displayLocales: Locale[];              // language versions the author approved
}
```

**Distinct content classes (never conflated):** client *reviews* (public/verifiable, e.g., a LinkedIn recommendation), *direct testimonials* (written for this site with permission), *project evidence* (deployed work, screenshots, live URLs — not quotes), *professional recommendations* (employers/colleagues, labeled by `relation`). Each renders with its class visible.

**Hard gates:** nothing renders without `permission.written`; quotes shown as obtained (light copy-editing only with author approval); no invented names, ratings, or attribution; withdrawal → removal at the next content pass.

**Status today** `[OBSERVED]`: zero verified testimonial material exists, so **V2 ships with the section hidden (empty = absent)** — the capability exists; content awaits §16 O9. No placeholders at any point. **Acquisition plan (owner, non-blocking):** request 1–3 LinkedIn recommendations (Rushkat, 4j Traders, Taqwa Group, Sahad Labs contacts); convert positive email feedback into written-statement testimonials with explicit publication permission; prefer nameable authors with role + organization.

### 9.5 Proof band composition (final)

`[8 projects delivered] · [6 sectors] · [4 countries] · [3 live client systems — verified 2026-10]` + one-line personal context + (when available) a rotating approved testimonial. Every number passes §9.3 today except the two owner-gated slots (clients served, response time), which ship reserved, never invented.

### 9.6 English claims dispositions (normative; carried from the v1 audit's §8.10)

The basis for task V2-04. Where the site and this table disagree, the table governs. Applied per locale at translation time — a translated overclaim is still an overclaim.

| Current claim | Where | Disposition |
|---|---|---|
| "100% data confidentiality maintained" | Cozee Care metrics + **meta description** | Remove as a "metric"; state the mechanism: "Isolated role-based access to sensitive records (JWT + NestJS Guards)." |
| "Zero manual scheduling errors" / "reducing manual scheduling errors to zero" | Cozee Care | Remove unless a client-verifiable measurement exists; "Automated the scheduling workflow end to end" states the true thing. |
| "Sub-100ms inventory query execution" (Taqwa), "sub-100ms API response" (Rushkat), "Sub-500ms latency" (Online Doctor) | metrics | Keep only with scope + measurement basis actually performed; otherwise delete the number, keep the mechanism ("Redis caching for hot queries"). |
| "100% transactional integrity across all order checkouts" | 4j + highlight list | Replace with the mechanism: "ACID transaction isolation for order workflows." |
| "95+ Google PageSpeed score", "Sub-2s initial page load" | FCSC | Keep only if a dated PSI report exists and re-runs clean today; otherwise "Performance-budgeted build (static generation, image optimization)." |
| "100/100 Mobile/Desktop Performance scores" (offered to clients) | Services feature list | Rewrite as a process promise: "Performance-tested against Core Web Vitals before handover." Never promise a score. |
| "Zero-downtime deployment during peak traffic" | Taqwa | Unverifiable; delete or scope strictly if true and witnessed. |
| "reducing response times by 60%" | Rushkat experience entry | Already dropped from the updated resume `[OBSERVED]`; remove from the site unless the profiling basis is produced. |
| "3+ years of experience" | About bio | Superseded: with the resume's Taqwa entry (Feb 2024 start) use "Professional engineer since 2024" after R1-CV1 reconciliation. |
| "WCAG 2.1 AA compliance" | Cozee Care | Only as "built to WCAG 2.1 AA criteria" unless an audit exists. |
| "ensuring zero downtime for your systems" (retainer FAQ) | faq.ts | Soften: "keeping your systems updated, monitored, and quickly repaired." |
| Client names (Cozee Care, Violina, Taqwa, 4j) with live URLs | projects.ts | Confirm client comfort (O2); anonymize to sector + country if not. |
## 10. Four-Language Architecture and Locale-Selection Behavior

All framework facts verified 2026-10-15 against official Next.js, next-intl, Tailwind, Google Search Central, Vercel, and MDN/W3C sources (citations in Appendix A).

### 10.1 Architecture decision table

| Decision | Recommendation | Basis (verified) |
|---|---|---|
| Library | **next-intl v4** (current v4.14.9; peer deps explicitly `next ^16`, `react ^19`) | next-intl package.json, fetched 2026-10-15 |
| Routing | `app/[locale]/` segment wrapping all routes; `generateStaticParams` over the four locales | Next.js i18n guide (upd. 2026-06-10) + next-intl App Router setup |
| URL scheme | **`localePrefix: 'as-needed'`** — English stays at today's URLs (`/projects`), others prefixed (`/de/projects`, `/fr/…`, `/ar/…`) | next-intl routing config; rationale §10.3 |
| Static rendering | **Preserved**: existing `generateStaticParams` (projects/blog) compose with the locale params; `setRequestLocale(locale)` in every layout/page before any i18n call | next-intl with-i18n-routing docs (SSG requirement) |
| Negotiation | `src/proxy.ts` — Next 16's renamed middleware — via `createMiddleware(routing)`; single negotiation point | next-intl middleware docs; Next 16 proxy rename documented in both |
| Messages | `messages/{en,de,fr,ar}.json`; ICU plurals built in | next-intl messages docs |
| Missing-translation behavior | Deep-merge `en` under the current locale + custom `getMessageFallback` returning the English string + **build-time key-set completeness gate** (script fails the build on missing keys) | next-intl request-config docs (manual merge pattern; no built-in fallbackLocale) |
| RTL | `dir` on `<html>` from a locale→direction map (`ar` → `rtl`); Tailwind v4.3 logical utilities, no plugin | Tailwind v4.3 docs (each utility verified) |
| Arabic font | **IBM Plex Sans Arabic** (`arabic` subset verified on Google Fonts; pairs with Inter as a neutral grotesque), Noto Sans Arabic as documented fallback | Google Fonts metadata, fetched 2026-10-15 |
| hreflang/canonical | `alternates.languages` in `generateMetadata` (+ `x-default` → `/`) and `alternates.languages` per sitemap entry | Next metadata (upd. 2026-08-19) + sitemap (upd. 2026-08-18) docs; Google localized-versions (upd. 2026-09-21) |

### 10.2 What Next.js documents vs what a library provides

The official Next.js App Router i18n guide documents only the skeleton: a `[lang]` dynamic segment, locale matching via `@formatjs/intl-localematcher` + `negotiator` inside **`proxy.ts`**, `generateStaticParams` returning all locales, `<html lang>` in the layout, and a hand-rolled dictionaries pattern — explicitly delegating localization mechanics ("not something specific to Next.js") and listing **next-intl first** among libraries. Hand-rolling would mean writing negotiation, cookie persistence, locale-aware `Link`, prefix redirects, and a plural engine solo; next-intl provides all of it, is maintained against Next 16, and adds ICU plurals and `t.has()`. `[RECOMMENDATION: next-intl]` — the one gap (no `fallbackLocale` option) is closed by its own documented merge pattern plus the completeness gate (§10.5).

### 10.3 URL strategy: `as-needed` (English unprefixed)

The three documented modes: `'always'` (all prefixed, `/` → `/en`), `'as-needed'` (default locale unprefixed, superfluous prefixes 307-cleaned: `/en/about` → `/about`), `'never'` (alternate links disabled — disqualified, since URLs must be unique per locale for hreflang). **`as-needed` wins for this site** because: (1) existing English URLs stay byte-identical — no redirect layer over the pages that carry today's (small but real) search equity, versus `'always'` converting every current URL into a 307; (2) hreflang/canonical pairs stay simple and explicit (`/projects` ↔ `/de/projects` ↔ `/fr/projects` ↔ `/ar/projects`); (3) Vercel static routing is unaffected — pages remain prerendered; middleware only rewrites the bare root path. `[RECOMMENDATION]`

### 10.4 Locale selection — the exact behavior

**Negotiation priority (single implementation point: `proxy.ts`):**

1. **Explicit path locale** — `/de/…` always wins per-request; a visitor clicking an explicit language link gets that language. The middleware rewrites the `NEXT_LOCALE` cookie on every explicit visit, so the last manual choice persists for later ambiguous requests (documented behavior).
2. **`NEXT_LOCALE` cookie** — set by the switcher and by explicit visits; long-lived; **manual selection is never repeatedly overridden** because the cookie outranks every inference *and* every explicit path visit refreshes it.
3. **`Accept-Language` header** — browser preference, matched "best fit" (`en-GB` → `en`, `fr-CA` → `fr`) by the documented matcher.
4. **Default `en`** — for everyone else: bots (Googlebot sends no Accept-Language and is documented US-based — it always receives English, never a geo-redirect), privacy工具, and fresh browsers.

**Country-level IP hints — evaluated, deliberately restricted.** Vercel's `x-vercel-ip-country` header (two-letter ISO 3166-1 code, available in middleware — Vercel docs, upd. 2025-12-13) would allow country→language defaults, e.g.:

| Countries | Hint language |
|---|---|
| DE, AT, LI, (CH optionally) | de |
| FR, BE, LU, MC | fr |
| SA, AE, QA, KW, BH, OM, JO, LB, EG, MA, DZ, TN, LY, SD, IQ, SY, YE, PS | ar |
| US, GB, AU, NZ, IE, CA*, IN, PK, BD, NG, ZA, … (*CA: en/fr split) | en |

**Limitations (why this stays out of the redirect path):** IP↔country is unreliable (VPNs, mobile CGNAT, travel); country ≠ language (Belgium, Switzerland, Canada are internally multilingual; Gulf expatriates often prefer English); diaspora users in any country may prefer any language; and Google's documented guidance is explicit — "Avoid automatic redirects based on perceived user language" and "IP analysis is discouraged as unreliable" (managing-multi-regional-sites, upd. 2025-12-10). **Therefore the country hint is used for exactly one compliant purpose: preselecting the highlighted (not auto-switched) language in the manual selector for first-time visitors with no cookie and no Accept-Language signal.** It never redirects, never overrides browser preference, and never applies to requests lacking the geo header (bots).

**New-visitor flow:** first request with no cookie → path (if any) → Accept-Language → default en; any explicit switch sets the cookie; from then on the cookie governs ambiguous paths (`/`). No redirect chains: all middleware outputs are single-hop 307s to terminal URLs; negotiation happens in exactly one place (the documented matcher excludes `_next`, static files, api), and no root-page redirect is stacked on top — the documented loop trap.

**The language selector** (§8.4): persistent nav control; native names (English / Deutsch / Français / العربية); preserves the current path across locales (via next-intl's locale-aware `Link`); keyboard/screen-reader accessible; switching to a locale without a translation for the current page → lands on that locale's equivalent page if it exists, else the locale homepage, with the English source one click away (fallback rules §10.5).

### 10.5 Content architecture, translation scope, and fallback

```
messages/{en,de,fr,ar}.json        UI strings, nav, forms, metadata templates (ICU)
src/data/*.ts                      structured content; flagship models localized per-field
                                   (Record<Locale,string>) per the scope matrix below
src/content/blog/*.mdx             English-only in V2 (§6.4 decision)
src/i18n/{routing,request,navigation,config}.ts
src/proxy.ts                       createMiddleware(routing) — the only negotiator
app/[locale]/…                     every current route moves inside the segment
app/sitemap.ts                     alternates.languages ×4 + x-default per entry
```

**V2 translation scope matrix** (the definitive statement of what is fully localized — referenced by §11, §14, §15, and §18):

| Content type | en | de | fr | ar | Visibility rule |
|---|---|---|---|---|---|
| UI chrome: nav, buttons, forms, validation, errors, metadata, 404/error | full | full | full | full | — |
| Homepage, What-I-can-do, About, Contact | full | full | full | full | — |
| Flagship case studies (Cozee Care, Violina, Taqwa) | full | full | full | full | — |
| Supporting case studies (~5) | full | card fields* | card fields* | card fields* | *title/summary/sector/tier translated; long-form body stays English behind a localized "available in English" notice on the page |
| Blog | full | — | — | — | English-only, de-emphasized in nav; visible EN note on the section |
| Privacy Policy, Terms | full | full (human) | full (human) | full (human) | governing-language clause states which version prevails (§11.4) |
| Impressum | convenience translation | **German original (operative)** | convenience translation | convenience translation | every non-German version carries "The German version governs" |
| Testimonials | per approval | per `displayLocales` | per `displayLocales` | per `displayLocales` | unapproved locales show the English original with an "original language" note |

**The claim discipline:** the site may be described as four-language only for the full-coverage rows; every exception above is *marked on the page itself* — a visitor never lands on silent English. The §18.5 acceptance run checks exception visibility explicitly.

**Fallback behavior (explicit and safe):** `getRequestConfig` deep-merges `en` messages under the active locale (next-intl's documented suggestion); a custom `getMessageFallback` renders the English string instead of a raw key-path; a **build-time completeness script** diffs key sets across the four message files and fails the build on gaps — a missing translation is a build error, never a silent English leak into a reviewed locale; `t.has()` covers genuinely optional strings.
### 10.6 SEO wiring

- **hreflang:** every localized page emits a bidirectional cluster — each version lists *itself and all others*, fully-qualified URLs, ISO 639-1 codes (`en`, `de`, `fr`, `ar`), `x-default` → `/`; Google ignores incomplete clusters ("if two pages don't both point to each other, the tags will be ignored"). Emitted via `alternates.languages` and mirrored in sitemap entries (`alternates.languages` per `<url>`); using both tags and sitemap is compliant (a third method adds nothing, per Google). RTL pages need no special SEO treatment (Google detects language from content, not `lang`/hreflang).
- **Canonicals:** self-canonical per locale; never cross-language canonicalization.
- **Sitemap:** one `<url>` per (page × locale) with alternates; generated from the same routing config so it can never drift.
- **Per-locale metadata:** titles/descriptions via `generateMetadata` per `[locale]`; `openGraph.locale` set per version (§14.1).

### 10.7 Directory sketch

```
src/i18n/routing.ts      defineRouting({ locales: ['en','de','fr','ar'],
                         defaultLocale: 'en', localePrefix: 'as-needed' })
src/i18n/request.ts      getRequestConfig + en-fallback merge + getMessageFallback
src/i18n/navigation.ts   createNavigation → locale-aware Link/useRouter/usePathname
src/i18n/config.ts       LOCALES, LOCALE_DIR: { en:'ltr', de:'ltr', fr:'ltr', ar:'rtl' }
src/proxy.ts             createMiddleware(routing), documented matcher
messages/{en,de,fr,ar}.json
app/[locale]/layout.tsx  <html lang dir> + locale generateStaticParams + setRequestLocale
app/[locale]/{page,projects,services,about,contact,blog,privacy,terms,impressum}/…
app/sitemap.ts           alternates.languages ×4 + x-default per entry
```

### 10.8 Arabic typography specification

- **Family:** IBM Plex Sans Arabic as the sole Arabic UI face (neutral grotesque; sits naturally beside Inter; `arabic` subset verified; loads via `next/font/google` as `IBM_Plex_Sans_Arabic`, self-hosted at build). Body stack `Inter, 'IBM Plex Sans Arabic', system-ui` — per-glyph fallback renders Latin/numerals with Inter and Arabic with Plex automatically in both directions. Noto Sans Arabic (variable, largest coverage) is the documented fallback family. One Arabic family total — the §8.1 four-language-parity cost argument honored.
- **Line-height:** Arabic ascenders/descenders extend further than Latin (W3C Arabic & Persian Layout Requirements) — body line-height bumps for `[lang="ar"]` to ≈1.7–1.8 vs Latin ≈1.55–1.65; headings ≈1.3–1.4 `[numeric ranges are practice-based — UNVERIFIED as official figures; the direction (more than Latin) is W3C-documented]`.
- **Letter-spacing: zero for Arabic, always.** MDN: applying letter-spacing to Arabic "may lead to the text looking broken" (it disconnects joined letters and disables ligature features). All `tracking-*` utilities are neutralized under `[lang="ar"]` in the global stylesheet (v1's mono-label letter-spacing included).
- **Numerals:** Western digits (`0-9`) throughout — consistent with en/de/fr and common in Gulf business UIs `[convention UNVERIFIED by an official source; CLDR's ar-locale default is Arabic-Indic, so digits are passed as plain strings, never `Intl.NumberFormat('ar')`-reformatted]`. Owner can flip this at review time (V2-25 gate).
- **Mixed-direction content:** Arabic sentences containing "Next.js", "Redis", emails, or URLs — wrap ambiguous runs in `<bdi>` (or `dir="auto"` for user-originated text such as form input echoes) per MDN's directionality guidance; audit every template's tech-term mentions (V2-26).

### 10.9 RTL implementation rules

Tailwind v4.3 (verified) provides logical utilities natively — `ms-/me-`, `ps-/pe-`, `mx-*` now compiles to `margin-inline`, `text-start/text-end`, `rounded-s-/rounded-e-`, `inset-s-/inset-e-` (v4.3 naming — audit any copied v3-era `start-*` class names), and `rtl:`/`ltr:` variants keyed off `<html dir>`. v4's `space-x-*` generates inline-start/end margins and is inherently direction-aware (prefer `gap` anyway, per docs). **Hand-audit checklist (physical properties that never auto-flip)** — enforced as the V2-08/V2-26 review list: `ml/mr/pl/pr/border-l/border-r/rounded-l/rounded-r` → logical; `left/right` positioning → `inset-s/inset-e` where start-side semantics; `text-left/right` → `text-start/end`; `translate-x` and keyframes flipped under `rtl:`; shadow offsets mirrored or symmetric in RTL; directional icons `rtl:rotate-180`; free-text inputs `dir="auto"`; no `tracking-*` on Arabic (§10.8).

### 10.10 Maintainability and review gates

Solo-maintainable by construction: one routing config, one message namespace convention, the completeness gate in the build, MT drafts generated by a committed script (§11.5), and reviewed locales marked in-file. Content updates: English edit → regenerate drafts for affected keys → re-review only changed strings (F0's free quota makes re-runs a non-decision). The §11.4 review gates and §16's reviewer dependency are the only non-code commitments.

### 10.11 Explicit limitations

`'never'` prefix mode is disqualified (hreflang requires unique URLs per locale — next-intl docs disable alternate links there). No `fallbackLocale` option exists — the merge pattern substitutes. The blog remains English-only in V2 (§6.4). Google documents that hreflang/sitemaps guide *serving*; they do not guarantee translation quality signals — content quality gates (§11.4) remain the quality mechanism. The proxy rename means pre-Next-16 next-intl tutorials show `middleware.ts` — the current docs cover both; implementation follows the Next 16 name.

---

## 11. Translation Strategy, Review Requirements, and Azure Feasibility

All service facts below verified 2026-10-15 from official Microsoft/DeepL/Google sources (full citations in Appendix A). Language-choice validation first, per the owner's framing: **languages belong to markets, not currencies** — de/fr/ar are justified here by *audience reach* (German and French are the largest European markets using the euro that the owner targets; Arabic serves an enormous multilingual diaspora and Gulf business audience), not by any currency mapping. The euro observation is a byproduct, not the rationale.

### 11.1 Static reviewed translations vs API-based translation — decision

**Static, reviewed, committed per-locale files. Machine translation is a build-time draft tool only; no translation API exists anywhere in the site's runtime.** Verified justifications: (1) the site is fully static — there is no server that *could* call a translation API; (2) Azure for Students hard-disables at credit exhaustion ("If you exhaust your available credits, your Azure subscription will be disabled" — offer terms) with no auto-billing, so a runtime dependency would be a self-sabotaging failure mode; (3) MT output is draft-grade pending human review and must never render as final content; (4) committed files are diffable, reviewable, versioned, and free forever once reviewed.

### 11.2 Azure feasibility — verified verdict

**Useful, free, and low-risk as the draft generator.**

| Fact | Verified value | Source (2026-10-15) |
|---|---|---|
| Azure AI Translator F0 free tier | **2M characters/month, $0** (confirmed via Azure Retail Prices API: F0 = $0.00/1M; S1 paid = $10/1M) | azure.microsoft.com Translator pricing + prices.azure.com |
| Deployable on Azure for Students | **Yes** — Translator is explicitly listed among the offer's usable AI services; $100 credit / 12 months / no card | Azure for Students offer page + offer terms (MS-AZR-0170P) |
| Credit exhaustion | Subscription **disabled** (hard stop); manual upgrade to Pay-As-You-Go only; never auto-billed | Offer terms |
| Text Translation limits | 50,000 chars/request; F0 throttled at ~2M chars/hour (pace batch scripts; irrelevant at this volume) | learn.microsoft.com service-limits (ms.date 2026-08-11) |
| Language support | Arabic (ar), German, French all supported | Language-support doc (ms.date 2026-06-06) |
| Proper-noun protection | **Dynamic dictionary** markup (`<mstrans:dictionary translation="…">`) with `textType=html`, explicit `from=en` — for "Sahad Labs", "Next.js", "NDIS", "Cozee Care" etc. | learn.microsoft.com dynamic-dictionary (ms.date 2026-06-02) |
| **Document Translation (batch)** | **Not recommended** — requires Azure Blob Storage and supports neither `.json` nor `.mdx` (batch supports html/md/txt/docx…; sync supports neither md nor json); converting TS/JSON/MDX out and back would mangle frontmatter, JSX, and interpolation placeholders | learn.microsoft.com doc-translation overview (ms.date 2026-08-07) |

**Cost math** `[ESTIMATE]`: ~60–120K source characters of translatable content (15 pages incl. 8 case studies; legal excluded per §11.5) × 3 target locales = **~360K characters per full pass** — 18% of one month's free F0 allowance. Even five full re-runs fit within a single F0 month. The $100 student credit is effectively untouched; **do not treat the credit as making a paid service "free" — the plan never needs paid tier at all.**

### 11.3 Alternatives (brief, verified)

- **DeepL API Free:** 500K chars/month — covers one pass at the ceiling but re-runs spill across months; Strong de/fr quality reputation; Arabic support present in the current language list `[card-at-signup requirement UNVERIFIED]`. Viable fallback if Azure F0 becomes unavailable.
- **Google Cloud Translation Basic:** 500K chars/month free *as a $10 monthly credit*, but **requires a payment method** — excluded by the owner's constraints.

### 11.4 Review requirements by content type (the non-negotiable gates)

ISO 17100 (translation-services standard) frames published translation as translation **plus revision by a second linguist** `[clause text UNVERIFIED — iso.org blocked fetch; the standard's scope is widely documented]`. Applied pragmatically to a solo portfolio:

| Content class | MT drafting | Review required before publication |
|---|---|---|
| UI strings, nav, buttons, forms | Yes | Native-speaker review (competent friend/colleague acceptable; accuracy + naturalness pass) |
| Marketing/homepage copy | Yes | Native review **+ owner approval of tone** (the personal voice is the brand) |
| Case studies — flagships | Yes | Native review; technical nouns spot-checked; numbers/dates verified against the English source |
| Case studies — supporting (card fields only, §10.5) | Yes | Same gates, smaller surface |
| Blog | Not translated (§10.5) | — |
| **Legal: Privacy, Terms** | **Excluded from MT — human translation only** | Translated in all four locales by a reviewer with legal-adjacent competence (or a professional service); a governing-language clause states which version prevails; privacy is the Art. 13 disclosure, so full translation is a compliance asset, not a nicety |
| **Legal: Impressum** | **Excluded from MT** | **German original is the operative version** (best practice for German-facing commercial credibility); EN/FR/AR versions are human-translated conveniences, each marked "The German version governs" |
| Arabic-specific (all content) | Yes | Reviewer checks: RTL rendering, letter joins (below), formal-MSA register for business copy, numerals (Western digits by default), mixed Arabic/Latin runs |

Rationale for the legal policy (changed in this corrective pass): the owner's four-language requirement covers legal content, and the earlier "one authoritative language only" stance conflicted with it. The reconciliation keeps both truths: legal pages are **fully translated in all four locales**, but never by machine — machine-translated legal text creates exposure with no authoritative source text. §5 DDG requires provider details "leicht erkennbar, unmittelbar erreichbar, ständig verfügbar" but does not literally mandate German; keeping the German Impressum as the operative original plus marked translations satisfies both the statute's practice and the four-language requirement.

**Arabic technical review items** (W3C CSS Text Module Level 3, fetched 2026-10-15): letter-spacing must be zero for Arabic (spacing "breaks the joining" of cursive scripts); justification must not open gaps between joined letters; `dir="rtl"` at the locale root with mirrored layouts/icons; `<bdi>`/`dir="auto"` for mixed runs audited on every template.

### 11.5 The workflow (V2-24 + V2-25)

1. **Extract:** script pulls all translatable strings from the §10 string layer into `content/strings.en.json` (placeholders tokenized so `{{name}}`-style values survive round-trips).
2. **Protect:** wrap product/proper terms ("Sahad Labs", "Next.js", "NDIS", "Cozee Care") in Azure's dynamic-dictionary markup (§11.2).
3. **Draft:** local Node script calls Translator v3 (`from=en`, `textType=html`, ≤50K-char chunks, paced under the F0 hourly cap); writes `strings.{de,fr,ar}.json` flagged `draft: true`. API keys live only in local env/CI secrets — never in client code.
4. **Commit per-locale files; render nothing flagged draft.**
5. **Review** per §11.4 gates (legal via the human-only path, not this pipeline); reviewer signs off; flag flips to reviewed; commit.
6. **Re-runs are free** within F0 — regenerated drafts never overwrite reviewed content without re-review.

Owner account actions (one-time, ~30 min): create the Azure for Students Translator F0 resource, obtain the key, store it in a local gitignored `.env` — separate from the site's runtime env.

### 11.6 What this adds to the running site

Nothing at runtime: zero new client scripts, zero API dependencies, zero banners. The apparatus exists at build time and in the repository. The failure mode of an expired student subscription is "you can't generate new drafts" — the site and its four reviewed locales are unaffected.
---

## 12. Resume: Source Discovery, Content Reconciliation, Publication, and Archival

*The resume-download **functionality already works and is frozen**: the nav "CV" button links to `/resume/Md-Sahaduzzaman-Resume.pdf` (`target="_blank"`, `rel="noopener noreferrer"`), serving the raw PDF in a new tab. URL, filename, asset path, button, and behavior never change. There is no viewer, download system, route, or third-party integration to build. What follows are three distinct content/asset operations.*

### 12.1 Repository facts (verified 2026-10-15 by reading both PDFs — re-verify at implementation)

| File | Identity (established by content) | Git state |
|---|---|---|
| `public/resume/Md-Sahaduzzaman-Resume.pdf` (127 KB, 2026-10-14) | The **updated source PDF**, already at the canonical publication path | Modified, **uncommitted** |
| `public/resume/[DEP]-Md-Sahaduzzaman-Resume.pdf` (104 KB, Jun 7) | The **deprecated previous version** (4j "July 2025", Rushkat "Oct 2024–Jun 2025", no Taqwa employment) — the `[DEP]` prefix is accurate | Untracked |

The approved source PDF's local filename does **not** need to match the public URL filename — but today it already does, which is the simplest state. The implementation agent must re-discover the actual file names and identities at implementation time (files may have changed since this audit) and must not rename or overwrite anything based on this audit's snapshot alone.

### 12.2 Three distinct operations

**R1-CV1 — Resume content review and website reconciliation (engineering + owner data; parallel, non-blocking).**
Read the latest source PDF during implementation and reconcile its verified contents with the website's professional information. Known deltas from this audit `[OBSERVED]`: 4j Traders start **Jul → Sep 2025**; Rushkat end **Jun → Jan 2025**; a **new Taqwa Group employment entry** (Feb 2024 – Aug 2025; sole engineer; EMI/land-plot engine, SSLCommerz, referral system) missing from `experience.ts`; "FCHC" (resume) vs "FCSC" (site) naming; professional start becomes Feb 2024. Placement rules: resume entries map to *About employment history*, *case-study context*, and *skills* by relevance — **do not blindly copy every resume line into the portfolio**; reconcile against existing project data; do not invent outcomes, client permissions, dates, metrics, or project details; where site and approved resume conflict, the approved resume governs (surface each change in the release notes); where the resume itself is ambiguous, flag for the owner instead of guessing. Note: the resume's own phrasings (e.g., "100% data confidentiality") remain subject to the §9.6 claims policy wherever they appear on the site.

**R1-CV2 — Resume publication (asset operation).**
Once the owner confirms the updated PDF is approved for publication (it already sits at the canonical path), commit it at `public/resume/Md-Sahaduzzaman-Resume.pdf` and deploy. The navbar link and new-tab behavior need **zero** changes. Acceptance: production serves the approved updated PDF at `/resume/Md-Sahaduzzaman-Resume.pdf` (HTTP 200, opens as a valid PDF); content matches the approved version (owner spot-check); dates/employers/titles on the site are consistent with it after R1-CV1; exactly one resume PDF remains under `public/resume/`.

**R1-CV3 — Legacy PDF archival (asset operation, after R1-CV2).**
The old/deprecated copy — the existing `[DEP]-Md-Sahaduzzaman-Resume.pdf`, verified as the superseded version — is moved **out of `public/`** (e.g., to a non-served `docs/archive/` or a local drafts location outside the repo's public tree), so it is no longer exposed as a public asset. Acceptance: `public/resume/` contains exactly one PDF; the former `[DEP]` URL returns 404 after deploy; the archived copy remains available to the owner outside the public tree. If the implementation discovers the file situation has changed, it archives whatever the inspection establishes as the deprecated copy — never by assumption.

### 12.3 Sequencing and non-blocking rules

R1-CV1 is parallel and must never block unrelated development; it only gates *content* tasks that depend on reconciled professional data (About rebuild V2-19, flagship rewrites V2-10 — both already sequenced after R1 in §17). R1-CV2 waits only on explicit owner approval (O6) — if approval is delayed, everything else proceeds; the working-tree PDF stays untouched until then. R1-CV3 follows R1-CV2's deploy.

### 12.4 Translated resumes — evaluated, optional

Keep the website out of the translated-resume business: international applications conventionally accept English CVs; four PDFs × every update is a drift machine; a translated CV is a per-application artifact, not a site feature. If a specific market demand emerges, produce that PDF as a one-off and link it from the relevant locale's About page later. `[DEFER — post-launch, per-market]` No V2 scope, no architecture impact.
## 13. Analytics, Enquiry Capture, and Privacy Plan

*Self-contained (incorporates the v1 report's §13 specification; tool facts verified 2026-10-15 from official Vercel docs). Page views are not leads; CTA clicks are intent, not opportunities.*

### 13.1 Recommended stack (total $0/mo) — verified facts

| Layer | Tool | Verified free-tier facts | Source date |
|---|---|---|---|
| A. Anonymous analytics | **Vercel Web Analytics** | 50,000 events/mo; **custom events are Pro-only** (declared limitation — §13.2 works within it); cookieless (no EU consent banner needed); over quota → collection pauses, never bills | Vercel analytics limits doc, upd. 2026-08-25 |
| A. Performance field data | **Vercel Speed Insights** (optional) | Free, 10K events/30 d, pausable | upd. 2026-09-23 |
| C. Leads | **Existing Server Action + Nodemailer/Gmail**, hardened (§13.4) | Email is the lead store; Gmail sending capacity is two orders of magnitude above 0–50 enquiries/mo | Workspace sending-limits doc, upd. 2026-10-13 |

Excluded, with reasons: GA4 (EU Consent-Mode banner overhead, zero portfolio value), PostHog (heavier script; free quotas unverifiable this session — revisit only per §13.7's decision rule), Microsoft Clarity in V2 (session replay disproportionate at this traffic), Resend (named fallback if Gmail ever bottlenecks — 3,000/mo, 100/day free), any CRM or database. Compliance flag: Vercel Hobby is documented for non-commercial personal use — keep commerce (payments, ads) off the deployment.

### 13.2 Event taxonomy (Hobby-free, pageview-derived + server-derived)

| Event | Source | Non-sensitive properties | Decision it enables |
|---|---|---|---|
| `page_view` | Web Analytics (automatic) | path (locale-scoped by URL prefix), referrer, country | Acquisition sources; per-locale traffic share |
| `project_viewed` | Pageview on `/projects/[id]` (derived) | which case study, which locale | Which proof resonates; flagship selection |
| `services_viewed` | Pageview on `/services` (derived) | locale | Commercial-page reach |
| `contact_page_viewed` | Pageview on `/contact` (derived) | referrer, locale | Funnel end-stage volume; declared proxy for form_started |
| `enquiry_submitted` | Server Action success (the email itself) | source string, `?from=` value, **locale**, timestamp | **The primary business metric** — leads per source per case study per language |
| `enquiry_blocked` | Honeypot/throttle path (log line) | rule triggered | Spam pressure; when to add Turnstile |

Not measurable on Hobby (declared): discrete `cta_clicked`/`form_started`/`validation_failed` (Pro custom events or PostHog); CV downloads (static file; proxy = `/about` views); visitor identity or return-visit journeys (cookieless by design). Decision rule: when a real decision is blocked by a missing discrete event for two consecutive months, evaluate PostHog EU cloud or Vercel Pro — not before.

### 13.3 Attribution (no PII leaves the visitor's context)

Case-study CTAs link to `/contact?from=<case-id>`; the contact page reads the param client-side; the form adds hidden `source` (sanitized `?from` + referrer **origin** only — e.g., `linkedin.com`, never full URLs with user identifiers) and hidden `locale` (the submitting language). The server action validates both like any input (length-capped strings) and includes them in the lead email ("Source: linkedin.com via cozee-care · Locale: de"). Every lead self-reports its funnel path; Web Analytics' referrer dashboard corroborates in aggregate; no third party sees the join.

### 13.4 Enquiry-capture architecture

```
Browser                          Server (Vercel function)                Destination
─────────                        ────────────────────────                ───────────
form (name, email, message,   →  Zod validate (exists, localized msgs) →  Nodemailer → Gmail
 honeypot, ts, source, locale)   + honeypot: filled → silent success      (label "Lead", subject
 + ≥3s minimum render time       + timestamp: <3s → drop                   prefix; source+locale
 [optional later: Turnstile]     + per-IP throttle via Vercel WAF rule     in header/body)
                                 (Hobby includes free custom WAF rules;
Server Actions already have      in-memory Maps are unreliable across
built-in same-origin CSRF        serverless isolates — documented limit)
enforcement (Origin vs Host;
Next.js docs recommend adding
rate limits for expensive actions)
```

Decisions: keep Nodemailer/Gmail (Resend is the named fallback, a 2 h swap if deliverability wobbles); honeypot + render-time first, Cloudflare Turnstile (free, no puzzles, privacy-light for EU) only if blocked-submission data shows real pressure; reCAPTCHA excluded (worst EU privacy posture); storage = the Gmail inbox ("Lead" label + subject convention; a Vercel Blob archive is a P2 nicety, quota `[UNVERIFIED]`); send-failure returns a visible error with the mailto fallback prominent — a failed form never strands a motivated visitor; PII (name/email/message) exists only in the email pipeline and inbox, never in analytics.

### 13.5 Privacy safeguards and content

- Cookieless analytics → no consent banner required for standard EU use (Vercel's documented design; not legal advice).
- The privacy page (a) names exactly the processors present post-V2 — Vercel (hosting + Web Analytics), Google (email delivery of submitted data) — fixing v1's F7 inaccuracy; (b) is **fully translated in all four locales via the human-only legal path** (§11.4, §10.5) since it is the Art. 13 disclosure; (c) lands together with R1's analytics enablement.
- Art. 13 notice at the form (controller identity from Impressum, purpose = responding to the enquiry, lawful basis Art. 6(1)(b), retention, rights, `/privacy` link) — translated ×4.
- Lead retention: owner picks a cleanup ritual (e.g., quarterly) — a calendar item, not code. Secrets stay server-side (`SMTP_*`); rotation is V2-05.

### 13.6 Testing & verification procedure (Stage 4 exit)

1. Normal submit → email arrives, labeled, correct source/locale line; dashboard shows the `/contact` pageview.
2. Honeypot pre-filled (devtools) → user sees success, no email arrives.
3. Scripted submit <3 s → dropped; log line present.
4. 12 rapid submissions one IP (dev proxy) → throttle engages; legit path recovers after window.
5. SMTP env misconfigured (staging) → user-visible error + mailto fallback; no silent loss.
6. Mobile run-through: keyboard, field scroll-into-view, errors announced (screen-reader quick pass).
7. `?from=` + `locale` attribution end-to-end: case-study CTA → submit → email contains both.
8. Arabic form pass in R3: RTL labels, localized validation errors, `dir="auto"` inputs, announcements.

### 13.7 Code vs owner actions

| You code | You click (account-level, ~30 min) |
|---|---|
| `<Analytics/>` + `<SpeedInsights/>` imports | Enable Web Analytics + Speed Insights in the Vercel dashboard |
| Source/locale plumbing + hidden fields | Gmail: rotate app password (V2-05); create "Lead" label + filter |
| Honeypot, timestamp check, localized messages, lead email format | (Later, if needed) Cloudflare Turnstile site key |
| WAF rule config | (Later, if needed) Add rate-limit rule in Vercel dashboard |
| Privacy/Impressum text coordination | Search Console: verify property, submit sitemap (pairs with V2-01) |
## 14. SEO, Accessibility, Security, Performance, and Social-Preview Requirements

*Self-contained (incorporates the v1 report's §14 specifications and this audit's own measurements).*

### 14.1 Performance

**Measured baseline on the live deployment (2026-10-15, transfer sizes via HTTP):** homepage first-load ≈ 1,040 KB — ~744 KB JS (11 chunks; largest 221 KB), 74 KB CSS, 119 KB woff2 fonts, 53 KB HTML. No Lighthouse run was possible in this environment (tooling absent; PSI anonymous quota exhausted) — figures below are asset measurements and code-derived estimates, to be confirmed with a real PSI run post-change. `[ESTIMATE]` Mobile LCP ~2.5–4 s on Slow 4G, driven by the hero painting `opacity: 0` until framer-motion hydrates plus 744 KB of JS on a text page. CLS risk low-moderate; INP risk low but hydration-inflated on mid-tier Android.

| # | Action | Expected effect | Effort |
|---|---|---|---|
| P1 | Remove JS entrance animation from the Hero (server-paint static; `whileInView` only below fold) | LCP element renders with HTML — largest single lever | S |
| P1 | Convert hero-adjacent framer imports (Navbar menu, ProjectCard, TechStack) to CSS transitions; keep framer only for real spring motion | Cuts a large share of the 744 KB JS | M |
| P1 | Recompress the 11 project PNGs → WebP ≤ 300 KB sources (V2-12) | Detail-page loads; Vercel image-transform quota headroom | S |
| P2 | Audit the 74 KB CSS (unusually large for Tailwind v4 — check for safelist/`@source` bloat or duplicated preflight) | Payload + cache hygiene | S–M |
| P2 | `fetchPriority="high"` on the flagship image if it becomes LCP after the hero fix | Regression guard | S |
| P2 | Arabic font discipline (§10.8): one family, `arabic` subset, locale-scoped loading — English pages pay zero | Four-language pages stay lean | S |

**Acceptance targets (verify with a real PSI run post-change):** mobile LCP < 2.5 s; total JS ≤ ~350 KB compressed on `/`; CSS ≤ ~40 KB; zero hero layout shift; INP < 200 ms in field. Lab numbers are diagnostic; field (CrUX) data requires real traffic post-launch.

### 14.2 Accessibility (WCAG 2.2 AA)

`[MANUAL]` marks items requiring human/browser testing (unavailable in this audit environment).

| Item | Criterion | Current → V2 |
|---|---|---|
| Focus hidden under sticky header when tabbing scrolled content | 2.4.11 (AA) | `[MANUAL]` verify; fix with `scroll-margin-top`/`scroll-padding-top` = header height |
| Form errors: color-only, not programmatically associated | 3.3.1/3.3.3, 1.4.1 | `aria-invalid` + `aria-describedby` + icon besides color |
| Success/error banners silent to AT | 4.1.3 | `aria-live="polite"` |
| Mobile nav toggle lacks state | 4.1.2 | `aria-expanded` + `aria-controls` |
| No skip link | 2.4.1 | "Skip to content" as first focusable |
| Cyan badges on white (services page) — contrast risk | 1.4.3 | Dies with tokenization (V2-07); `[MANUAL]` contrast pass: ≥4.5:1 body, ≥3:1 UI, both themes |
| Touch targets | 2.5.8 (AA) | ≥24×24 px — audit theme toggle + social icons `[MANUAL]` |
| `prefers-reduced-motion` | 2.3.3 (AAA) / HIG principle | Global media query kills all entrance/scroll animation |
| Zoom/reflow | 1.4.10 | `[MANUAL]` 200% zoom / 320 px pass, no horizontal scroll |
| Heading order | 1.3.1 | One `[MANUAL]` sweep |
| **Language of page** | 3.1.1/3.1.2 | `<html lang>` correct per locale — a wrong `lang` on an Arabic page is a failure; switcher labeled accessibly |

### 14.3 SEO

**Base (P0/P1, language-independent):** fix the canonical domain (V2-01: `metadataBase` + env-derived robots/sitemap + 4 missing routes); social preview images (V2-02: root OG 1200×630, per-project OG from screenshots, fix the imageless `summary_large_image`); titles/descriptions rewritten to the §5.2 hierarchy (personal name first, unique per page — Google may rewrite problematic titles per its title-link doc); **no FAQPage markup** — Google retired FAQ rich results from Search (2026-05-07) and removed the docs (2026-06-15); the FAQ section stays for humans, unmarked; `ProfilePage`/Person JSON-LD on About (`sameAs` → GitHub/LinkedIn) — the current gallery supports ProfilePage and has no standalone Person result; `ProfessionalService` (LocalBusiness subtype) JSON-LD `[owner decision on address — O10]`.

**Four-locale additions:** hreflang cluster — every page emits `alternates.languages` for `en, de, fr, ar, x-default(=en)`; hreflang is bidirectional ("if two pages don't both point to each other, the tags will be ignored" — Google localized-versions doc, upd. 2026-09-21); per-locale self-canonicals (never cross-language); sitemap = one `<url>` per (page × locale) with alternates, generated from the routing config so it cannot drift; localized titles/descriptions + `og:locale` per version; Arabic pages keep ID-based slugs (`/ar/projects/cozee-care`) — translated slugs add fragility with no demonstrated benefit `[RECOMMENDATION]`; legacy-domain fix is a prerequisite (hreflang on a broken canonical foundation multiplies damage).

**Verification methods (corrected — the Search Console International Targeting report was deprecated in 2022 with no replacement; Google still fully supports hreflang as a signal):** (1) served-HTML inspection (curl the `<head>`) for hreflang tags, self-canonicals, and OG on every localized URL — deterministic, in CI; (2) Search Console **URL Inspection** (live URL) for Google's selected canonical and indexability per representative URL; (3) **Page Indexing** report for coverage of locale URLs; (4) **Sitemaps** report for submission/processing of the localized sitemap; (5) a third-party hreflang validator/crawler for return-tag reciprocity across the cluster; (6) Rich Results Test for JSON-LD validity. Source: Google's deprecation notice (support.google.com/webmasters/answer/12474899; accessed 2026-10-15).

### 14.4 Security

| Item | State | Action |
|---|---|---|
| SMTP credentials | `.env` untracked (good); rotation unknown since the July audit | **Rotate the Gmail app password** (V2-05) regardless |
| Contact endpoint | Zod + escaping present; no rate limit/honeypot; Server Actions have built-in same-origin checks (Next.js docs) | §13.4 hardening |
| Security headers | Only HSTS (Vercel default) | Add via `next.config.ts` `headers()`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, minimal CSP starting Report-Only (script-src 'self' + analytics host once chosen) |
| `remotePatterns: hostname **` | Any HTTPS host can be image-proxied | Remove; local images only |
| Dependency currency | Next 16.1.1 / React 19.2 current; last fix commit cleaned `npm audit` | Quarterly `npm audit` + update calendar item |
| Secrets in client bundle | None found `[OBSERVED]` | Never prefix `SMTP_*` with `NEXT_PUBLIC_` |

### 14.5 Social previews

Root OG image stays language-neutral (name + role + mark); per-locale OG titles/descriptions flow from localized metadata; the `summary_large_image`-without-image defect is fixed by V2-02; per-locale OG *images* remain P3 (V2-38) unless analytics shows meaningful per-locale sharing.
## 15. Updated Feature-Priority Table (P0–P3)

Priorities: **P0** = release-blocking credibility/security/discoverability defects · **P1** = required for the complete V2 scope (final release includes all P1) · **P2** = valuable, post-final-release · **P3** = optional/experiment. Release staging in §17. Effort = engineering hours `[ESTIMATE]`. Origin tracks the v1 reconciliation (§20).

### 15.1 Group 1 — Immediate corrections (P0; ship independently, English; ~13–19 h)

| ID | Task | Origin | Effort | Dependencies | Acceptance criteria |
|---|---|---|---|---|---|
| V2-01 | Canonical-domain fix: `NEXT_PUBLIC_SITE_URL` → `metadataBase`, `robots.ts`, `sitemap.ts`; add 4 missing routes | Retain (F1) | 2 h | Owner sets env var (O1) | robots/sitemap show correct host; canonicals absolute; sitemap submitted |
| V2-02 | Social previews: root OG image 1200×630; per-project OG from screenshots; fix broken `summary_large_image` | Retain (F3) | 3–4 h | V2-01 | `og:image` on every page; LinkedIn inspector renders card |
| V2-03 | Outbound proof-link repair (4j link, Rushkat `#`, unreachable demos, `codeUrl`s) | Retain (F4) | 2 h | Owner client decisions (O2) | No dead/misleading links; no `#` icons |
| V2-04 | English claims rewrite per **§9.6** (projects, services, experience, meta) | Retain (F2) | 6–8 h | Owner metric confirmations (O3) | No claim without a basis; all §9.6 dispositions applied |
| V2-05 | Rotate SMTP app password; prune dead env vars | Retain | 0.5 h | Owner Gmail action (O4) | New password in Vercel; old revoked |
| V2-05b | Retire/de-index legacy `sahad.vercel.app` deployment | Retain | 0.5 h | Owner Vercel action | Legacy URL no longer serves a duplicate site |
| V2-05c | Move `[DEP]-…Resume.pdf` out of `public/` (superseded by R1-CV3's fuller archival, but safe to do immediately) | New (§12) | 0.1 h | Owner/agent | `public/resume/` contains only the approved asset |
| R1-CV1 | **Resume content review & reconciliation**: read the latest source PDF, reconcile dates/entries/skills with site data (§12.2) | New | 2–4 h | None (parallel; source PDF exists). Conflicts adjudicated by O6 approval | Site professional data matches the approved resume or carries documented owner adjudication; no invented content |
| R1-CV2 | **Resume publication**: commit the approved PDF at the canonical path; zero link/behavior changes | New | 0.5 h | Owner approval (O6); R1-CV1 for the consistency check | §12.2 acceptance: production serves the approved updated PDF at `/resume/Md-Sahaduzzaman-Resume.pdf` |
| R1-CV3 | **Legacy PDF archival**: move the verified-deprecated `[DEP]-` copy out of `public/` | New | 0.2 h | R1-CV2 deploy | Former `[DEP]` URL 404s; exactly one PDF in `public/resume/` |

### 15.2 Group 2 — Main V2 build (P1; i18n-ready, English content; R2 release)

| ID | Task | Origin | Effort | Dependencies | Acceptance criteria |
|---|---|---|---|---|---|
| V2-06 | **i18n architecture foundation**: `[locale]` routing, string layer + dictionaries, middleware negotiation (**explicit path locale > `NEXT_LOCALE` cookie > Accept-Language > default en**; country hint = picker preselection only, never a redirect), locale switcher, en-fallback + build-time completeness gate, per-locale `lang`/`dir`, hreflang/canonical metadata, localized sitemap | New / Promote (v1 deferred all i18n) | 24–40 h | V2-01; §10 design | All routes render ×4 locales; explicit URLs always respected; manual choice persists and governs ambiguous entries; no redirect loops; hreflang valid |
| V2-07 | Design-token consolidation (kill off-token palette; success/danger; radii) | Retain (F5) | 6–10 h | — | Zero off-token utilities in repo grep |
| V2-08 | Type/spacing system + **RTL logical-property conversion** of all components | Revise (v1 V2-10 + RTL rule) | 6–10 h | V2-06, V2-07 | No physical left/right utilities; Arabic renders correctly (deep QA in R3) |
| V2-09 | Homepage rebuild: personal hero (§5.2), availability line, proof band (§9.5), needs cards (§6.3), flagships with images, how-I-work, FAQ teaser, final CTA | Revise (v1 V2-06) | 14–18 h | V2-04, V2-12, V2-14 | §6.3 outline complete; hero static-paints; bilingual length-safe |
| V2-10 | Case-study system: `CaseStudy` model + template (§9.1), 3 flagships full, 5 supporting light, 4 archived | Retain (v1 V2-07) | 12–20 h | V2-03, V2-04, V2-12 | Flagships meet §9.1 template; tier chips (§9.2); archives off index |
| V2-11 | Projects index: curation, image cards, sector chips, filter | Retain (v1 V2-08) | 4–6 h | V2-10, V2-12 | Cards show imagery; filter works; count ≈ 8 |
| V2-12 | Image pipeline: PNG→WebP ≤ 300 KB, 16:10 crops, mono captions | Retain (F11) | 4–6 h | — | All sources within budget; captions present |
| V2-13 | Motion budget + hero static paint + reduced-motion | Retain (F8) | 4–8 h | V2-07 | Hero visible without JS; reduced-motion kills animation |
| V2-14 | **Testimonials + verified-metrics system**: typed models (§9.3–9.4), stat + testimonial components, empty-safe rendering | New / Promote | 6–10 h | §9 models | Band renders only §9.3-gated metrics; section absent with no approved testimonials; zero placeholder content |
| V2-15 | Contact hardening: honeypot, fill-time, throttle path, `aria-live`/`aria-invalid`/`aria-describedby`, localized messages, Art. 13 notice, `source`+`locale` attribution | Retain (F9), revised | 5–7 h | V2-06, V2-17 | §13.6 items 1–6 pass in EN; AR pass in R3 |
| V2-16 | Analytics enablement: Web Analytics + Speed Insights, locale-scoped reporting verified | Retain (F7) | 2–3 h | Owner dashboard enablement (O5) | Events/pageviews visible after test walkthrough |
| V2-17 | Legal content: privacy rewrite (real processors), Impressum → §5 DDG, personal-name-first metadata, governing-language clauses | Retain (F7/F13), revised | 3–4 h | V2-16; O10 | Privacy names actual processors; DDG citation correct; governing-language notes present |
| V2-18 | SEO pass: titles/descriptions per §5.2, ProfilePage + ProfessionalService JSON-LD, hreflang scaffolding | Retain (F12) | 4–6 h | V2-01, V2-06 | Rich Results Test valid; unique per page; no FAQPage markup |
| V2-19 | About rebuild: identity-first, founder context (§7), reconciled history (R1-CV1), curated skills, CV+LinkedIn, open-to-work line | Retain (F10), revised | 4–6 h | R1-CV1; owner photo (O7) | Consistent with resume + case studies; hiring path one click |
| V2-20 | Security headers + `remotePatterns` cleanup | Retain | 2 h | — | Headers present via curl; allowlist empty |
| V2-21 | "What I can do" page rebuild: four needs categories, engagement models, honest edges, mid-page CTA; personal voice | Revise (v1 V2-19) | 6–8 h | V2-04, V2-07 | No deliverable-score promises; categories match homepage cards |
| V2-22 | A11y sweep (EN): skip link, `aria-expanded`, 2.4.11 scroll-padding, contrast | Retain (F15) | 4–6 h | V2-07 | §18.2 checklist passes (EN) |
| V2-23 | Repo hygiene: README, delete SAHAD.zip + scaffold SVGs | Retain (F14), revised | 2 h | — | No scaffold assets; no resume-filename changes (§12) |

### 15.3 Group 3 — Localization, review, and QA (P1 for final V2; R3 release)

| ID | Task | Origin | Effort | Dependencies | Acceptance criteria |
|---|---|---|---|---|---|
| V2-24 | Translation production: extract strings per §10 architecture, MT drafts per §11.5, commit per-locale files | New / Promote | 6–10 h (engineering) | V2-06; **EN content freeze** | All four locales build complete; §10.5 scope matrix satisfied; fallback verified |
| V2-25 | Human review per locale (DE, FR, AR) incl. **legal pages via the human-only path** (§11.4) | New (non-engineering track) | review-time (not eng h) | V2-24; reviewers (O11) | Sign-off recorded per locale; legal sign-off recorded separately |
| V2-26 | Arabic RTL QA + typography pass: direction, joining, mixed-content bidi, icon flips, forms, LCP re-check | New | 6–10 h | V2-08, V2-24 | §18.5 Arabic items green |
| V2-27 | Four-locale SEO verification: hreflang reciprocity, per-locale canonicals, localized sitemap, indexing checks per §14.3's method list | New | 3–5 h | V2-06, V2-18 | §14.3 verification methods all pass; no cross-language canonicals |
| V2-28 | Four-locale acceptance run: §18.5 checklists × 4 locales | New | 6–10 h | All above | All locales green; release R3 |

### 15.4 Group 4 — Post-launch (P2/P3)

| ID | Task | Priority | Note |
|---|---|---|---|
| V2-29 | Blog decision + nav de-emphasis | P2 | fold-or-commit decision (§19) |
| V2-30 | Performance bundle diet (framer trim, CSS audit) | P2 | Re-run PSI after |
| V2-31 | Click-to-copy email affordance | P2 | — |
| V2-32 | Availability-line ritual + quarterly content/verification calendar | P2 | Includes §9.3 metric re-verification |
| V2-33 | Shareable sector-filter URLs | P3 | — |
| V2-34 | CI (lint/typecheck/build), error monitoring, tests | P3 | Reasoning §19 |
| V2-35 | Populate testimonials as approvals arrive | P1-gated content | System ships in V2-14; content per O9 |
| V2-36 | Translated resume PDFs per market demand | P3/Defer | §12.4 |
| V2-37 | Architecture diagrams in flagships | P3 | — |
| V2-38 | Per-locale OG images | P3 | Only if analytics shows per-locale sharing |

**Dependency integrity note (verified this pass):** every dependency references an earlier-priority or external task; no task depends on itself; the only cross-group dependency is V2-19 → R1-CV1 (Group 1), which is satisfied because Group 1 ships first.
## 16. Dependencies and Precise Owner-Input Checklist

Every item below is content/account/decision work only the owner can do, with the task it unblocks. Nothing here blocks starting V2-01…V2-03 or V2-06–V2-08.

| # | Owner input (precise) | Unblocks | Needed by |
|---|---|---|---|
| O1 | Set `NEXT_PUBLIC_SITE_URL=https://sahadcse.vercel.app` in Vercel env | V2-01 | R1 |
| O2 | Confirm, per client project (Cozee Care, Violina, Taqwa, FCSC, NDIS/award-care, 4j): name+link may appear publicly? (yes / anonymized / remove link) | V2-03, V2-10 | R1/R2 |
| O3 | Metric confirmations: which of §9.3's counts match your records — countries (AU/DE/KR/BD?), client count from invoices, any measurable performance claims with artifacts | V2-04, V2-14 | R2 |
| O4 | Gmail: rotate app password; create "Lead" label + filter; approve reply-window N (or omit) | V2-05, V2-15 | R1/R2 |
| O5 | Vercel: retire legacy deployment; enable Web Analytics + Speed Insights | V2-05b, V2-16 | R1/R2 |
| O6 | Resume adjudication: confirm the updated working-tree PDF (2026-10-14) is approved for publication (→R1-CV2); confirm the approved resume governs the site's professional data where they conflict — 4j start Sep 2025, Rushkat end Jan 2025, the new Taqwa Group employment entry (→R1-CV1); adjudicate the FCHC-vs-FCSC project name | R1-CV1/CV2/CV3, V2-19 | R1/R2 |
| O7 | Photo: provide a professional portrait (or confirm omission) | V2-19 | R2 |
| O8 | Availability truth: are you open to new projects now? Open to full-time roles line — exact wording you'll stand behind | V2-09, V2-19 | R2 |
| O9 | Testimonials: initiate requests (LinkedIn recommendations from Rushkat/4j/Sahad-Lab contacts; written permissions per §9.4 gates) | V2-35 (content) | R2+ (non-blocking) |
| O10 | Legal/trading reality for Impressum: operate as individual, or under Sahad Labs as registered/trading name? Any VAT/tax numbers that must appear? | V2-17 | R2 |
| O11 | Translation reviewers: identify native reviewers for DE, FR, AR (friends/colleagues/community, or budget for professional review) **plus legal-competent review for privacy/terms/impressum** (§11.4 — engage a professional service if reviewers lack that competence) | V2-25 | R3 |
| O12 | Blog commitment: monthly cadence yes/no (drives V2-29) | V2-29 | R2 |

**Provisional defaults if an input doesn't arrive** (so work is never blocked): O2 → keep links for currently-live sites, anonymize on request later; O3 → publish only the §9.3 "supported today" metrics; O4 → omit the reply-window promise; O7 → omit portrait; O8 → omit availability line; O10 → individual trading name, email-only contact; O12 → de-emphasize blog. Each default is safe, honest, and reversible. If O6 approval is delayed, the currently committed (older) resume keeps serving and R1-CV2/CV3 simply defer — nothing else waits on them.

---

## 17. Revised Effort Estimates and Implementation Stages

All figures are engineering hours `[ESTIMATE — based on the inspected codebase and the §15 task table; excludes owner-side inputs (§16) and translation review time (tracked separately)]`.

### 17.1 Effort by requested category

| Category | Tasks | Engineering hours |
|---|---|---|
| 1. Critical fixes & release blockers (incl. the three resume operations) | V2-01…V2-05c, R1-CV1/CV2/CV3 | 13–19 |
| 2. Positioning, content, personal-brand refinements | V2-09 (homepage), V2-19 (about), V2-21 (what-I-can-do) | 24–32 |
| 3. Internationalization architecture | V2-06 | 24–40 |
| 4. Design-system & page-experience updates | V2-07 (tokens), V2-08 (RTL conversion), V2-12 (images), V2-13 (motion) | 20–34 |
| 5. Case studies, testimonials, verified metrics | V2-10, V2-11, V2-14 | 22–36 |
| 6. Resume (content review / publication / archival) | R1-CV1, R1-CV2, R1-CV3 (also counted in category 1; listed here for the owner's requested breakdown — exclude from the sum) | 3–5 |
| 7. Analytics & enquiry handling | V2-15, V2-16 | 7–10 |
| 8. Accessibility, security, SEO, legal, performance | V2-17, V2-18, V2-20, V2-22 | 13–18 |
| 9. Localization production & QA (engineering share) | V2-24, V2-26, V2-27, V2-28 | 21–35 |
| **Total engineering (categories 1–5, 7–9)** | | **≈ 147–225** |

**Translation preparation & human review (non-engineering track):** draft generation is inside V2-24; human review adds DE ≈ 6–10 h, FR ≈ 6–10 h, AR ≈ 8–12 h of *reviewer* time (native speakers — O11), plus owner tone approval ≈ 2–3 h per locale; **legal-page translation (privacy/terms/impressum) is the human-only path and may require a professional service** — budget separately if reviewers lack legal-adjacent competence. Ranges overlap (V2-08's RTL conversion partially happens inside component rebuilds counted in category 2), so the realistic mid-point is **~165–185 engineering hours**. Post-launch P2/P3 excluded. Solo part-time at 10–15 h/week: R1 in week 1–2, R2 across ~6–9 weeks, R3 across ~4–6 weeks *including reviewer availability* — a realistic calendar of **3–4.5 months** to the complete four-language V2, dominated by review logistics, not code.

### 17.2 Implementation stages

| Stage | Contents | Gate to exit | Parallelizable with |
|---|---|---|---|
| **S0 — Owner inputs** (§16 O1–O12) | Decisions, accounts, approvals | Defaults declared where inputs lag | Everything |
| **R1 — Immediate corrections** (Group 1) | V2-01…05c + R1-CV1 (parallel) + R1-CV2/CV3 when O6 lands | §18.3 gate green on production | S0; design work after |
| **R2a — Foundation** | V2-06 (i18n architecture), V2-07 (tokens) | All routes render ×4 locales; fallback + completeness gate working; tokens clean | V2-12, V2-04, content drafting |
| **R2b — Experience build** | V2-08…V2-23 in dependency order | §18.4 gate green (English) | Owner inputs O7–O10 throughout |
| **Content freeze** | English copy + flagship case studies locked | Owner sign-off of EN | — |
| **R3 — Localization & QA** | V2-24 (drafts) → V2-25 (review incl. legal) → V2-26 (Arabic QA) → V2-27 (SEO) → V2-28 (acceptance) | §18.5 green ×4 locales | Reviewers per locale run concurrently |
| **R4 — Post-launch** | P2/P3 backlog, first analytics review, quarterly ritual | — | — |

**Sequencing logic:** R1 is language-independent and stops active damage (the resume operations ride inside it without blocking anything — §12.3). The i18n architecture precedes the experience build so all copy lands directly in the string layer (retrofitting four languages later is the most expensive rework available in this scope). Translation waits for the content freeze so nothing is translated twice. Review starts the moment the first locale's drafts land — it is the calendar bottleneck.

### 17.3 Assumptions

1. Solo-engineer capacity of 10–15 focused hours/week alongside client work; higher capacity compresses the calendar linearly.
2. Translation reviewers (O11) available within 2–3 weeks of drafts; if not, R3 stalls — the site remains shippable as R2 (English) meanwhile.
3. The Azure F0 resource works as documented on the owner's Azure for Students subscription (verified offer terms; residual risk noted in §11.2).
4. The resume file state documented in §12.1 was verified 2026-10-15 — the implementation agent re-verifies at start; owner adjudication (O6) governs conflicts.
5. Third-party facts (Vercel/next-intl/Tailwind/Azure quotas) current as of 2026-10-15 — re-verify at implementation if significant time passes.
6. No client emergencies preempt the schedule; stage gates make interruption recoverable.

### 17.4 Work-type separation (per the owner's instruction)

**Engineering work:** everything in §15 with hour estimates. **Owner-provided content:** O2/O3/O6/O7/O8/O9/O10/O12 — decisions, approvals, records, portrait, testimonial requests. **Third-party review:** locale reviewers and legal-competent review (O11) — human hours, not engineering. **External account actions:** O1 (Vercel env), O4 (Gmail rotation/label), O5 (Vercel dashboards + legacy deployment), Azure F0 resource creation (§11.5), Search Console verification. Each §15 row's Dependencies column names which of the four types gates it.
## 18. Acceptance Criteria and Release Checklist

*Self-contained (incorporates the v1 report's §17 checklists as the base). `[MANUAL]` items require browser/screen-reader testing unavailable in this audit environment.*

### 18.1 Base functional QA (every release; ~45 min)

- [ ] Every nav link, footer link, and CTA resolves on the deployed build (click-through on production, not just dev)
- [ ] Every external project link opens the expected site (curl-checked + spot-checked in browser); zero `#` links render as icons
- [ ] Theme toggle: light/dark/system correct on `/`, `/projects`, one case study, services, contact; no unstyled flash on cold load
- [ ] Mobile (390 px): nav, hero, cards, case study, form usable one-handed; no horizontal scroll (`scrollWidth <= innerWidth`)
- [ ] 200% browser zoom on `/` and `/contact`: content reflows, no clipped controls
- [ ] Form: valid submit, each field's error state, success state; back-button shows a clean form

### 18.2 Base accessibility checklist (WCAG 2.2 AA; EN)

| Check | Method | Pass condition |
|---|---|---|
| Automated audit | Lighthouse/axe when tooling available | No critical/serious issues |
| Keyboard path `[MANUAL]` | Tab every page | All interactives reachable in DOM order; focus visible; nothing hidden under the sticky header (2.4.11 — test scrolled) |
| Skip link `[MANUAL]` | Tab from load | First Tab shows "Skip to content"; activates to `#main` |
| Screen-reader form `[MANUAL]` | VoiceOver/TalkBack on `/contact` | Labels announced; errors announced (`aria-live`); submit state announced |
| Contrast `[MANUAL]` | DevTools picker on token pairs | ≥4.5:1 body, ≥3:1 large/UI, both themes |
| Targets `[MANUAL]` | Measure toggle, socials, tags | ≥24×24 px (2.5.8) |
| Reduced motion `[MANUAL]` | OS setting on | Zero entrance/scroll animations; content fully visible |
| Heading order `[MANUAL]` | Headings extension | One h1 per page; no skipped levels |

### 18.3 R1 gate (English, unchanged architecture)

- [ ] 18.1 + 18.2 pass
- [ ] robots.txt + sitemap on the correct host; canonicals absolute; sitemap submitted in Search Console
- [ ] `og:image` present on `/` and all case studies; LinkedIn Post Inspector renders the card
- [ ] Every §9.6 claims disposition applied (or consciously kept with a stated basis)
- [ ] Evidence-tier chip on every case study; legacy deployment retired; SMTP rotated
- [ ] Resume: §12.2 publication acceptance (when O6 lands) and §12.2/§12.2 archival acceptance for R1-CV3
- [ ] Analytics smoke test (§13.6 items 1–2)

### 18.4 R2 gate (new experience, English)

- [ ] Homepage §6.3 outline complete; hero static-paints (LCP in initial HTML); needs cards route correctly
- [ ] Proof band renders only §9.3-gated metrics with methodology visible; testimonial section absent (no approved content) — **zero placeholder content anywhere**
- [ ] Token grep clean; zero physical left/right utilities in components (§8.4)
- [ ] i18n dry-run: all routes render under `/de`, `/fr`, `/ar` with English fallback; explicit locale URLs always respected; switcher preserves path; cookie persists the manual choice and governs ambiguous entries; `/en/…` 307s to unprefixed; no redirect loops (§10.4)
- [ ] hreflang clusters valid and bidirectional on every page; sitemap lists all (page × locale) URLs
- [ ] 18.2 passes (EN)

### 18.5 R3 gate (four locales) — run per locale, ×4

- [ ] Full page-by-page review in the locale per the §10.5 scope matrix: nav, hero, needs cards, one flagship case study, services, contact form, legal pages — no raw keys, no untranslated chrome; English fallback only where the matrix allows
- [ ] **Exception visibility:** supporting case-study bodies show the localized "available in English" notice; blog shows its EN note; Impressum non-German versions show "The German version governs"; unapproved testimonial locales show the original-language note — a visitor never lands on silent English
- [ ] **Translation sign-off recorded** per locale (§11.4 gates; owner tone approval for marketing copy); **legal sign-off recorded separately** (human-only path)
- [ ] `<html lang>`/`dir` correct; switcher accessible and path-preserving in every locale; explicit locale URLs always win
- [ ] Localized metadata: unique title/description, correct `og:locale`, hreflang cluster intact
- [ ] Forms: localized labels, each validation error triggered, success/error announcements, Art. 13 notice present
- [ ] **Arabic-specific:** RTL mirrored correctly (spacing, cards, icons, corner-frame decision); letter joins intact (zero letter-spacing — W3C/MDN rule); line-height adjustment applied; mixed Arabic/Latin runs (`<bdi>`) unscrambled; form inputs `dir="auto"`; LCP re-verified in RTL; Arabic font loads (subset) and English pages pay zero Arabic-font cost
- [ ] SEO verification per §14.3's corrected method list: served-HTML hreflang/canonical checks (deterministic), Search Console URL Inspection on representative URLs, Page Indexing coverage of locale URLs, Sitemaps report processing, third-party hreflang reciprocity validation, Rich Results Test for JSON-LD. (The International Targeting report no longer exists — deprecated 2022.)
- [ ] Performance: homepage budgets hold in all locales (JS unchanged; Arabic pages +1 font family only)

### 18.6 Release procedure

`npm run lint` + `npm run build` clean → deploy → run the applicable gate against production → analytics smoke test → Search Console sitemap submission (R1) → keep the previous deployment one-click revertable for 7 days → book the two-week post-launch review (PSI re-run with reset quota, indexing report, first leads check). R3 deploys all four locales simultaneously (they share prerenders), then spot-checks the R3 gate on production in at least Arabic and German.
## 19. Scope Exclusions and Post-Launch Ideas

**Excluded from V2** (decision + reason): booking-scheduler embeds, newsletter, fake/placeholder testimonials (policy §9.4), client portal/auth, CMS migration, automated test suites/CI (V2-34, P3 — solo static site; the §18 gates cover V2), PWA/manifest, attention-grabbing motion, AI/SEO standalone service pages, **runtime translation APIs or auto-translate widgets** (§11.1), **additional locales** (es/zh/etc. — the architecture extends by adding a config entry + message file, but each locale costs translation + review; add only on demonstrated demand), **blog localization** (single stale post — fold or commit first, §6.4/§10.5), **machine translation of legal content** (excluded as a *tool*; the pages themselves ARE translated — by humans, §11.4), **translated resumes as a site feature** (§12.4), per-locale OG images (V2-38, P3), GA4/consent banner (cookieless stack needs neither).

**Post-launch ideas (evidence-gated):** populate testimonials as approvals arrive (V2-35 — the highest-value content unlock); first-90-days analytics review (per-locale pageview share may reorder effort); sector-filter shareable URLs (V2-33); click-to-copy email (V2-31); performance diet after a real PSI baseline (V2-30); architecture diagrams for flagships (V2-37); a German-language content piece if DE traffic justifies it; the Sahad Labs website as the separate follow-on project (§7) reusing tokens and the needs-taxonomy copy structure.
## 20. Change Log — Differences from the Original (v1) Audit

| # | v1 position | Class | v2 disposition |
|---|---|---|---|
| 1 | Positioning statement in Sahad Labs company voice (§8.2) | **Revise** | Personal first-person identity statement; Labs as affiliation context only (§5, §7) |
| 2 | Primary audience: service businesses with operational problems (A/B) | **Revise** | Needs-led universal audience (§4); the operational wedge survives as the *Automate* category and case-study cluster, no longer the site's identity |
| 3 | Recruiters/hiring as secondary audience with quiet path | **Retain** | Unchanged mechanism (nav CV, About verification, case-study role clarity); §5.2 keeps titles recruiter-findable |
| 4 | Hero: sector-outcome headline ("Dependable software for businesses that have outgrown spreadsheets…") | **Revise** | Scope-ladder personal hero (§5.2) after 5-candidate comparison |
| 5 | Homepage 8-section outline | **Revise** | Same evidence spine; needs-cards section replaces the services teaser; proof band personal (§6.3) |
| 6 | Services page: two premium tiers ("Premium Websites", "Enterprise Software") | **Revise** | "What I can do": four needs categories + engagement models; personal voice; honest edges (§6.4) |
| 7 | Case-study template, evidence tiers, per-project dispositions | **Retain** | Unchanged substance; fields become locale-aware (§9.1) |
| 8 | Proof band with informal numbers | **Revise** | Formal metrics methodology with counting rules, evidence gates, visible methodology (§9.3) |
| 9 | Testimonials deferred to P3 until material exists | **Promote** | System ships in V2 (model + components + governance); content remains evidence-gated; zero placeholders (§9.4) |
| 10 | Localization deferred entirely; "German landing summary" was P3 | **Promote** | Full four-language V2 (en/de/fr/ar + RTL) with verified architecture (§10) and review workflow (§11) |
| 11 | Design Direction A "Precision Instrument" | **Retain** | Plus Arabic typography layer, RTL logical-property discipline, four-language parity rules (§8) |
| 12 | Rejection of serif "Warm Editorial" Direction B | **Retain (rejection)** | Rejection strengthened: every new Latin family demands an Arabic companion (§8.1) |
| 13 | Motion budget; claims rewrite; token consolidation; link repair; canonical/OG/sitemap fixes; analytics stack; contact hardening; security headers; JSON-LD choices (incl. FAQPage exclusion); Impressum DDG fix; availability line; blog de-emphasis | **Retain** | All carried into §15 Group 1/2 with original IDs where unchanged |
| 14 | Analytics: pageview-derived intent (custom events Pro-only), email-as-lead-store, no GA4/CRM | **Retain, revised** | Locale dimension added; lead email carries `locale` field (§13) |
| 15 | Contact form: 3 fields, hardening list | **Retain, revised** | Localized validation + Art. 13 notice ×4; Arabic form in R3 QA (§13.2) |
| 16 | Privacy rewrite naming real processors | **Retain, revised** | ×4 locales under legal-content rules (§13.3, §11.4) |
| 17 | Resume: v1 V2-21 suggested filename normalization; no viewer work existed | **Remove** (the normalization) / **Retain** (the freeze) | Filename/URL/button frozen; single replacement task R1-CV; `[DEP]` exposure flagged as owner action (§12) |
| 18 | Translated resumes: not addressed in v1 | **Defer** | Evaluated and excluded from scope with rationale (§12.4) |
| 19 | German-language landing summary (P3) | **Superseded** | Absorbed into the full de locale (§10) |
| 20 | "cursor effects / premium animations" from the July audit | **Retain (rejection)** | Still excluded; §19 |
| 21 | Effort estimate 55–85 h, single language, single launch | **Revise** | ≈147–225 eng h, mid ~165–185 (corrected in §20.1) + separate review track; staged R1–R4 (§17) |
| 22 | Owner-input list (v1 Stage 0) | **Revise/Expand** | Precise 12-item checklist O1–O12 with task mapping and safe defaults (§16) |
| 23 | Estimates/quotas verified 2026-10-15 | **Retain** | Same-day re-verified; new tools (Azure, next-intl, DeepL, GCT) verified this session (Appendix A) |
| 24 | v1's own agency-voiced copy samples | **Revise** | All rewritten personal-first (§5.3); v1 §8.8/§8.9 intros remain usable with voice pass |

### 20.1 Corrections in this quality-control pass (v2.1, 2026-10-15)

| # | Issue found | Correction |
|---|---|---|
| 1 | Metrics table claimed "9 delivered" but the stated breakdown (3+2+1+2) totals 8; the sector count (8) included a demo project | §9.3 recomputed: **8 delivered** (3 client systems + 2 client sites + 1 own product + 2 employment; 8 + 4 demos = the 12-item inventory); sectors recomputed from the delivered set only = **6, named**; proof band (§9.5) updated; both flagged for recount after R1-CV1 |
| 2 | §15's V2-06 dependency ("cookie > path") contradicted §10.4's documented negotiation order | One consistent behavior everywhere (§1 D5, §10.4, §15 V2-06, §18.4/18.5): explicit locale URL > saved manual choice (cookie, governs ambiguous entries) > browser language > English final; country/IP hint may only preselect the picker, never redirect or override |
| 3 | V2-27's dependency field contained a self-reference ("V2-27←V2-18") | Fixed to V2-06, V2-18; all 30+ dependency fields audited — no other self-references (integrity note added to §15) |
| 4 | §18.3/§14.3 referenced the removed Search Console "International Targeting report" | §14.3 now specifies current verification methods (served-HTML checks, URL Inspection, Page Indexing, Sitemaps report, third-party hreflang reciprocity validators, Rich Results Test) with Google's deprecation notice cited; §18.5 updated |
| 5 | Legal-content treatment was contradictory (§11.4 "one authoritative language" vs §13.3 "privacy in four locales") | Single policy (§11.4, §10.5): privacy/terms/impressum are **fully translated in all four locales via human-only translation** (MT excluded); Impressum's German original governs with marked convenience translations; terms carry a governing-language clause; §19 exclusion reworded (MT of legal is excluded, not legal translation itself) |
| 6 | v2 referenced the archived v1 report for normative specifications (claims dispositions, case template, analytics/SEO/a11y/security specs, base checklists) | All normative specifications inlined: §8.3/§8.5 (full token + component values), §9.1 (template), §9.6 (claims table), §13 (analytics spec), §14 (technical specs), §18 (base checklists); v1 demoted to archived research reference throughout |
| 7 | Resume section assumed the pre-correction file state and didn't separate the three required operations | §12 rewritten around verified-by-content file identities (both PDFs read; `[DEP]` confirmed as the superseded version; the uncommitted Oct-14 file confirmed as the updated source at the canonical path) with three distinct tasks — content review (R1-CV1), publication (R1-CV2), archival (R1-CV3) — plus reconciliation deltas, non-blocking rules, and per-task acceptance criteria |
| 8 | §15/§16/§17 hadn't absorbed the resume-task split and corrected estimates | Group 1 gains R1-CV1/CV2/CV3 (13–19 h total); §17.1 categories and totals updated (≈147–225 h, mid ~165–185); stage table and work-type separation (§17.4) updated; O6 rewritten with precise owner adjudications (dates, FCHC/FCSC name, publication approval) |

---

## Appendix A — Source Log (v2 additions; v1 log in the archived report remains valid)

Same method notes as v1: repository/live-site findings from direct inspection 2026-10-15; external sources fetched and dated. New sources introduced by this revision:

| # | Source | Type | Date / version | Finding(s) supported |
|---|---|---|---|---|
| 34 | nextjs.org/docs/app/guides/internationalization | Official docs | upd. 2026-06-10 | `[locale]` segment pattern; proxy.ts negotiation skeleton; generateStaticParams; libraries delegated (next-intl listed first) |
| 35 | next-intl package.json (GitHub raw) | Package metadata | v4.14.9, fetched 2026-10-15 | Version + `next ^16` / `react ^19` peer compatibility |
| 36 | next-intl.dev docs: with-i18n-routing; middleware; routing configuration; messages; request-config | Official docs | v4, undated pages | `[locale]` setup; `setRequestLocale` SSG requirement; `localePrefix` modes incl. `as-needed` cleanup + root behavior; `NEXT_LOCALE` cookie; negotiation order; ICU; fallback-merge pattern; getMessageFallback |
| 37 | developers.google.com/search/docs/specialty/international/localized-versions | Official docs | upd. 2026-09-21 | hreflang bidirectionality; ISO codes; x-default; tags/headers/sitemap equivalences |
| 38 | developers.google.com/search/docs/specialty/international/managing-multi-regional-sites; /locale-adaptive-pages | Official docs | upd. 2025-12-10 | Subdirectory recommendation; avoid auto language redirects; IP analysis unreliable; Googlebot behavior (no Accept-Language, US-based) |
| 39 | vercel.com/docs/headers/request-headers | Official docs | upd. 2025-12-13 | `x-vercel-ip-country` availability in middleware |
| 40 | nextjs.org generate-metadata; sitemap convention | Official docs | upd. 2026-08-19 / 2026-08-18 | `alternates.languages` emission; sitemap `alternates` hreflang support |
| 41 | nextjs.org font docs; Google Fonts metadata (IBM Plex Sans Arabic, Noto Sans Arabic) | Official docs + font metadata | upd. 2026-09-24; fetched 2026-10-15 | next/font subsetting; Arabic families' `arabic` subset availability |
| 42 | tailwindcss.com v4.3 docs: margin, border-radius, inset, text-align, hover-focus-and-other-states | Official docs | v4.3 | Logical utilities (`ms/me/ps/pe/rounded-s/inset-s/text-start`), `rtl:`/`ltr:` variants, space-x direction-aware, v4.3 naming notes |
| 43 | MDN: `dir` global attribute; `letter-spacing` | Reference | upd. 2026-09-08 / 2026-09-10 | `dir="auto"`/`<bdi>` for mixed runs; letter-spacing breaks Arabic joining |
| 44 | W3C: Arabic & Persian Layout Requirements (alreq); CSS Text Module Level 3 | Standards | current | Arabic line-height care; letter-spacing "must not" apply to cursive scripts; justification rules |
| 45 | azure.microsoft.com Translator pricing; prices.azure.com Retail Prices API | Official pricing | fetched 2026-10-15 | F0 = 2M chars/mo at $0; S1 $10/1M text, $15/1M doc |
| 46 | azure.microsoft.com/free/students; offer terms MS-AZR-0170P | Official offer | fetched 2026-10-15 | $100 credit / 12 mo / no card; Translator among usable AI services; credit exhaustion = subscription disabled, no auto-bill |
| 47 | learn.microsoft.com Translator: service-limits; language-support; dynamic dictionary; document-translation overview | Official docs | ms.date 2026-08-11 / 2026-06-06 / 2026-06-02 / 2026-08-07 | 50K chars/request; F0 hourly cap; ar/de/fr support; dictionary markup; Document Translation format limits (no json/mdx) + Blob requirement |
| 48 | support.deepl.com (free tier); developers.deepl.com supported languages | Official docs | fetched 2026-10-15 | DeepL Free 500K chars/mo; Arabic in language list; card requirement `[UNVERIFIED]` |
| 49 | cloud.google.com/translate/pricing; Google Cloud free-tier docs | Official pricing | fetched 2026-10-15 | 500K chars/mo credit-based; payment method required |
| 50 | gesetze-im-internet.de/ddg/__5.html (re-verified) | Law | in force 2024-05-14 | Impressum fields; no explicit German-language mandate (supports the authoritative-language rule) |
| 51 | iso.org ISO 17100 | Standard | fetched attempt 2026-10-15 (403) | Translation + second-linguist revision benchmark `[clause text UNVERIFIED]` |

| 52 | support.google.com/webmasters/answer/12474899 | Official notice | fetched 2026-10-15 | International Targeting report deprecated (2022); hreflang remains a supported signal — basis for §14.3's verification methods |

*End of report — v2.1, authoritative. Prior versions preserved at `docs/portfolio-v2-audit-and-plan-v1.md` (v1 audit) — archived research reference only.*
