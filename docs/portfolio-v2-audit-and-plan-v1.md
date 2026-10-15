<!-- ARCHIVED: superseded by docs/portfolio-v2-audit-and-plan.md (Final Audit, Requirements, and Implementation Plan, 2026-10-15). This file preserves the original v1 audit (same date) for traceability; it is NOT authoritative. -->

# Personal Portfolio V2 — Research, Audit, and Implementation Blueprint

**Date:** 2026-10-15
**Scope:** Research and planning only. No code, dependencies, or deployment settings were modified for this report.
**Audited artifacts:** Local repository (main @ `fc3a46e`), live deployment `https://sahadcse.vercel.app/`, prior planning document `docs/technical_audit.md` (2026-07-04), `docs/Portfolio SRS.pdf`.

**Evidence labels used throughout:**
`[OBSERVED]` — directly verified against the repository, the live site, or HTTP responses.
`[INFERENCE]` — reasoned conclusion from observed facts; reasoning stated.
`[RECOMMENDATION]` — judgment call; alternatives were considered.
`[UNVERIFIED]` — could not be confirmed with the tools available; flagged for follow-up.
`[ESTIMATE]` — numeric judgment, not a measurement.

> **Testing limitations (disclosed up front):** No browser automation, screenshot, or Lighthouse tooling was available in this environment, and the PageSpeed Insights API anonymous quota was exhausted (2026-10-15). Performance findings below come from direct measurement of the deployed assets (HTTP fetch of every JS/CSS/font asset and payload sizes), code inspection, and HTTP header analysis — not from a Lighthouse run. Outbound-link availability was tested from one network only. Four `*.vercel.app` demo links failed at the TCP level; re-verify from a second network before treating them as dead.

---

## 1. Executive Summary and Strongest Recommendations

### Situation

The portfolio has already absorbed one major refactor (commits `244bab0`, `831e1c7`, `fc3a46e`, July 2026) that implemented most engineering items from `docs/technical_audit.md`: data layer split into typed modules, shared `Button`/`Badge` components, a real color-token system with light/dark themes, Zod validation + HTML escaping on the contact form, `robots.ts`/`sitemap.ts`, per-project `generateMetadata`, project imagery, and a Services page with FAQ. The repository is in good technical health relative to its history.

What has *not* kept pace is the layer visitors actually experience: **positioning coherence, proof quality, discoverability, and measurement.** The site currently undermines its own goal in a handful of very fixable ways.

### Strongest recommendations (in order)

1. **Fix the self-inflicted discoverability damage first (P0, ~2–4 h).** `robots.txt` on the live site points at a sitemap on the wrong domain (`sahad.vercel.app` — an old, different deployment), every sitemap URL uses that wrong domain, four newer pages are missing from the sitemap, canonical URLs are relative (invalid without `metadataBase`), there is no Open Graph image anywhere, and `twitter:card` promises `summary_large_image` with no image. The site is effectively un-indexable-as-intended and produces no link-preview card when shared on LinkedIn/WhatsApp — the two channels that matter most for this business. All of this is a small, contained fix.

2. **Stop presenting unverifiable claims as metrics.** [OBSERVED] Case studies and the Services page currently assert "100% data confidentiality maintained," "Zero manual scheduling errors," "Sub-100ms response times," "100/100 Mobile/Desktop Performance scores," and similar — some of which are then keyword-highlighted in green as visual proof points and propagated into search-snippet meta descriptions. A technically sophisticated buyer (or a client's compliance reviewer in German healthcare) will discount everything else on the page after seeing one unfalsifiable number. Replace with verifiable, scoped statements and the project-truth labels defined in §11.

3. **Repair broken proof.** [OBSERVED] The 4j Traders live link serves a "currently unavailable" page (Base44); the Rushkat card's "view live" icon links to `#`; four demo deployments were unreachable from the test network; all `codeUrl`s point to the GitHub profile rather than repos (and the UI already hides them). Every broken link on a portfolio is evidence *against* the "reliable engineer" claim.

4. **Adopt one positioning and make the site say it consistently.** [OBSERVED] The homepage hero sells business-outcome engineering; the `<title>`/meta description sell "Software Engineer | Backend & Real-Time Systems" (recruiter-oriented); the Services page sells "Premium Digital Services" in a cyan palette that exists nowhere else on the site. §8 defines the recommended hierarchy; §9 re-maps every page to it.

5. **Make the homepage sell with the work.** [OBSERVED] The homepage is Hero + 3 text-only cards + a tech-logo grid. The 11 project screenshots added in July (0.1–2.1 MB PNGs) are never shown on the homepage or the projects index — only on detail pages. §9–§11 restructure this.

6. **Instrument the site — currently there is zero measurement.** [OBSERVED] No analytics of any kind, while the privacy page already *mentions* "Vercel Analytics" (a factual inaccuracy to fix either way). §13 specifies a minimal, free-tier, privacy-conscious stack: pageview analytics, a small set of intent events, and the existing Nodemailer server action hardened (rate limit + honeypot) as the lead channel. Email stays the lead store; no CRM.

7. **Do a content pass, not a redesign, on the design system.** [RECOMMENDATION] The indigo token system is sound; the correct V2 move is to eliminate the ~40 hardcoded `cyan-*`/`slate-*`/`blue-*`/`purple-*` utilities so one design language exists, then add the missing pieces (image treatment, empty/error states, one motion budget). A wholesale restyle would burn effort the content layer needs more.

**Total V2 launch scope [ESTIMATE]:** ~55–85 engineering hours across six stages, executable part-time in 3–5 weeks. The two P0 groups (discoverability + claims/links) are ~8–12 hours and deliver most of the risk reduction.

### What must NOT change

- The Next.js 16 / App Router / TS / Tailwind v4 architecture, the token-based theming approach, the Server Action + Zod + escaping contact pipeline, the MDX blog mechanism, and the data-driven content model. These are correct and recently rebuilt.
- The genuine, live client work (Cozee Care, Violina, Taqwa) — this is the site's most valuable asset and rarest among peer portfolios.

---

## 2. Current Website and Repository Baseline

### 2.1 Stack and structure [OBSERVED]

| Aspect | State |
|---|---|
| Framework | Next.js `^16.1.1`, App Router, React 19.2, TypeScript 5, Turbopack |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), `@theme` tokens over HSL CSS variables (shadcn-style), `next-themes` class strategy, `@tailwindcss/typography` |
| Fonts | Inter + JetBrains Mono via `next/font/google`, `display: swap` |
| Motion | framer-motion 12 (load-in and whileInView animations) |
| Content | `src/data/*.ts` (projects, services, experience, faq, site-config) + `src/types/portfolio.ts`; MDX blog via `next-mdx-remote` v6 + gray-matter + sync `fs` |
| Contact | Server Action `sendEmail` → Zod validation → HTML-escape → Nodemailer SMTP (Gmail app-password pattern); `SMTP_*` env vars |
| Routes | `/`, `/projects`, `/projects/[id]`, `/services`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, `/terms`, `/impressum` |
| SEO files | `robots.ts`, `sitemap.ts` (both present, both defective — §3) |
| Tests / CI | None |
| Analytics | None |
| Hosting | Vercel (Hobby), static-prerendered pages (`X-Nextjs-Prerender: 1`, CDN cache `HIT`) |

### 2.2 Live-deployment checks [OBSERVED] (2026-10-15)

- Homepage HTML: 53 KB; title *Software Engineer | Backend & Real-Time Systems*; meta description *Full-Stack Software Engineer specializing in NestJS, Next.js, and Cloud Infrastructure.* No Open Graph, no Twitter card, no JSON-LD, no `meta name="robots"`, no canonical on the homepage.
- `robots.txt` → `Sitemap: https://sahad.vercel.app/sitemap.xml` — **wrong domain**. `sahad.vercel.app` resolves (HTTP 200, titled *"Sahad's Portfolio"*) and appears to be an older/different deployment, not this site's canonical host.
- `sitemap.xml` → all 17 URLs on `sahad.vercel.app`; `/services`, `/terms`, `/privacy`, `/impressum` absent.
- Project detail pages: title/description/OG/Twitter present (auto-generated), but `og:image` count = 0 despite `twitter:card=summary_large_image`; `og:url` and `rel=canonical` are **relative** (`/projects/cozee-care`) because `metadataBase` is not set — Google requires absolute canonical URLs.
- Security headers: HSTS present (Vercel default). No CSP, `X-Content-Type-Options`, `X-Frame-Options`, or `Referrer-Policy`.
- Resume PDF: HTTP 200 at `/resume/Md-Sahaduzzaman-Resume.pdf`.

### 2.3 Outbound link status [OBSERVED] (from test network, 2026-10-15)

| Link | Status |
|---|---|
| `cozeecare.com.au`, `violina-pflegedienst.de`, `taqwagroupbd.com`, `odcp.vercel.app`, `travellast.netlify.app`, `minishopbd.netlify.app` | 200 OK |
| `4jtraders.com` | HTTP 402 → page titled *"4j Traders is currently unavailable - Base44"* |
| `rushkat` card "live" icon | links to `#` (`liveUrl: "#"` — truthy, so the icon renders and opens a blank tab) |
| `fcsc-nids.vercel.app`, `award-care-landing.vercel.app`, `procourier.vercel.app`, `restaurant-hubbd.vercel.app` | TCP connection failure (000) — unreachable from test network; re-verify elsewhere |
| `github.com/sahadcse`, `linkedin.com/in/sahadcse` | 200 OK |

### 2.4 Shipped payload on the homepage [OBSERVED, transfer sizes]

15 first-load assets ≈ **1,040 KB**: ~744 KB JS across 11 chunks (largest single chunk 221 KB), 74 KB CSS, ~119 KB of woff2 fonts (3 files), plus 53 KB HTML. For a page whose entire visible content is text + three text cards. The CSS is unusually large for Tailwind v4 — worth auditing once (`74 KB` compressed suggests accumulated unused utilities). The heaviest correct conclusion: framer-motion is imported into most of the page (`Hero`, `TechStack`, `Navbar`, `ProjectCard`, `ProjectDetails`, `ContactForm`), and the Hero — the LCP element — is rendered `opacity: 0` until JS hydrates, directly delaying LCP on mid-tier mobile devices. `[INFERENCE: expected mobile LCP in the ~2.5–4 s range on Slow 4G; to be confirmed with a real PSI run once quota allows.]`

### 2.5 What the design system actually is [OBSERVED]

- Token layer (`globals.css`): Royal Indigo primary (`235 85% 45%` light / `235 90% 60%` dark), Midnight Slate dark background (`223 39% 11%`), full shadcn-style token set, radius `0.625rem`, three transition tokens, focus-visible outline, and utilities `ambient-glow`, `card-elevation`, `gradient-text`, `highlight-biz` (emerald), `highlight-tech` (blue).
- Off-token layer: `Navbar`/`Footer`/`services/page.tsx`/`ProjectDetails` hardcode `cyan-*`, `slate-*`, `blue-*`, `purple-*`, `green-*`/`red-*` utilities (~40+ occurrences). The Services page — the highest-intent commercial page — is styled almost entirely in this second, undocumented palette.

### 2.6 Repository hygiene [OBSERVED]

- `.env` gitignored and untracked (verified via `git ls-files`). The July audit documented two sets of Gmail app-passwords on disk inside it; whether credentials were rotated after that audit is `[UNVERIFIED]` — treat rotation as an open action.
- `public/SAHAD.zip` (two loose SVGs) committed; five default `create-next-app` SVGs still in `public/`.
- `next.config.ts` allows `images.remotePatterns` hostname `**` (any HTTPS host) — unnecessary privilege.
- Working tree: modified `Md-Sahaduzzaman-Resume.pdf` (2026-10-14) + untracked `[DEP]-Md-Sahaduzzaman-Resume.pdf` — brackets in a public-URL filename would need URL-encoding if ever linked; currently harmless but worth normalizing.
- README is still stock `create-next-app`.

---

## 3. Findings Ranked by Severity

Effort scale: S ≤ 2 h, M 2–8 h, L 8–24 h.

| # | Severity | Finding | Evidence | Why it matters | Fix | Effort |
|---|---|---|---|---|---|---|
| F1 | **Critical** | Sitemap + robots.txt point to wrong domain; sitemap missing 4 pages | §2.2; live `robots.txt`, `sitemap.xml` | Search engines are told the canonical content lives on an old deployment (`sahad.vercel.app`); the real site's pages may not be indexed or may be treated as duplicates. Directly suppresses the primary organic channel. | Derive base URL from `env: NEXT_PUBLIC_SITE_URL` (set in Vercel), add missing routes, redeploy | S |
| F2 | **Critical** | Unverifiable claims presented as metrics across case studies, Services page, and meta descriptions; visually amplified by keyword highlighting | `projects.ts` metrics arrays; `services.ts` "100/100 Performance scores"; `experience.ts` "reducing response times by 60%"; `generateMetadata` puts "100% data confidentiality maintained" into search snippets; `ProjectDetails` highlights these strings in emerald | One compliance-minded or technically skeptical reader discounting the page poisons the whole portfolio. Also a legal/ethical exposure with German healthcare clients (Werbung/Heilmittelwerbegesetz sensitivities in health-adjacent marketing). | Claims pass per §11: verify → scope → relabel or delete | M |
| F3 | **Critical** | No Open Graph image anywhere; `twitter:card=summary_large_image` with no image; relative canonical + `og:url` (no `metadataBase`) | §2.2 | No link-preview card on LinkedIn/WhatsApp/X — the portfolio's likely referral surface — and invalid canonicals. Sharing the site looks broken/unprofessional at the exact moment someone recommends it. | `metadataBase` + static OG image (1200×630) + per-project OG via existing screenshot assets | S–M |
| F4 | **High** | Broken/misleading outbound proof links (4j 402/Base44; Rushkat `#`; 4 unreachable demos; `codeUrl` all profile-level placeholders) | §2.3; `projects.ts` | "Reliable engineer" is disproved by a dead link on the page making the claim. Rushkat's `#` link opens a blank tab — a visible defect. | Link-status pass; remove/replace dead links; Rushkat becomes a no-live-link case study | S |
| F5 | **High** | Two competing design languages: tokenized indigo system vs hardcoded cyan/slate/blue/purple (Nav Services pill, Services page, ProjectDetails accents, Footer legal links, form errors) | §2.5 | Reads as three different sites stitched together; signals exactly the visual inconsistency the owner says he wants to escape; makes future theming/contrast work impossible to do reliably. | Tokenize or delete; one accent policy per §10 | M |
| F6 | **High** | Homepage cannot convert: no project imagery, no services glimpse, no process, no FAQ, no closing CTA; "Featured" = first 3 of 12 uncurated projects; cards show no screenshots | `page.tsx`; `ProjectCard.tsx` (no `imageUrl` usage) | A business visitor gets a claim-heavy headline but no visual proof, no offering scope, and no path beyond "Discuss a Project." The homepage under-uses its strongest asset (real deployed client work). | Homepage restructure per §9 | M–L |
| F7 | **High** | Zero measurement: no analytics, no events, no lead capture beyond the form; privacy page simultaneously *describes* "Vercel Analytics" | §2.2, `privacy/page.tsx` | Cannot attribute any enquiry or know which content works; privacy statement factually wrong today (describes processing that doesn't happen) — an EU-compliance smell for German visitors. | §13 stack + privacy rewrite | M |
| F8 | **High** | LCP element animated behind `opacity: 0` + site-wide framer-motion client boundary; ~744 KB JS on a text page | §2.4 | Hero invisible until hydration on mid-tier phones; INP/TTI cost for zero persuasive benefit. The motion adds no information. | CSS-only entrance or `whileInView`-only below fold; defer framer out of Hero; investigate 74 KB CSS | M |
| F9 | **Medium** | Contact form: no rate limiting, no honeypot, no consent checkbox/notice, missing `aria-live`/`aria-invalid`/`aria-describedby`; `transporter.verify()` on every submission adds latency; errors `console.error` only | `actions.ts`, `ContactForm.tsx` | Spam exposure of the Gmail account (quota lockout = silent lead loss); a11y gaps for the single most important interactive element; German-facing form without privacy notice link near submit. | §13.4 hardening | M |
| F10 | **Medium** | Positioning incoherence: recruiter `<title>` vs B2B hero vs "Premium Services" vs Impressum "Software Architect"; "3+ years experience" vs ~2 years listed employment (Oct 2024 → present) | `site-config.ts`, `services.ts`, `impressum/page.tsx`, `experience.ts` | Each page makes a different first promise; the years mismatch is checkable by any recruiter in 30 seconds. | §8 messaging hierarchy + single source of truth for titles/descriptions | M |
| F11 | **Medium** | Case-study cards hide their images; 0.1–2.1 MB PNGs only load on detail pages; `line-clamp` implemented as `businessProblem.slice(0,150)` (can cut mid-word) | `ProjectCard.tsx`, `public/images/projects/*` | The index pages look text-only and generic; detail-page images decode slowly from large sources despite next/image; truncation artifacts look sloppy. | Show images on cards; pre-optimize PNGs→WebP/AVIF ≤ 300 KB sources | M |
| F12 | **Medium** | `metadata` gaps: no `openGraph`/`twitter` on homepage; no Person/ProfilePage JSON-LD; no `FAQPage` schema despite a real FAQ; blog post dates render raw ISO; default README | §2.2; `layout.tsx`, `blog/[slug]/page.tsx` | Missed eligibility for rich results and consistent entity signals (name, role, profiles) across search + AI surfaces. | §14.3 | M |
| F13 | **Medium** | Impressum cites "§ 5 TMG" — superseded by the Digitale-Dienste-Gesetz (DDG) since May 2024 | `impressum/page.tsx` | German B2B visitors notice; it advertises unfamiliarity with the market's rules the site claims to serve. | Update citation (and have the required fields reviewed — §7 source log) | S |
| F14 | **Low** | Repo cruft: `SAHAD.zip`, 5 scaffold SVGs, `remotePatterns: hostname **`, `[DEP]` resume copy, stock README, dead `HeroContent` duplication (`subHeadline` exists in config but Hero hardcodes the string) | §2.6; `Hero.tsx:35-39` | Small costs: repo professionalism, accidental image-proxy abuse surface, edit-two-places content drift. | Hygiene pass | S |
| F15 | **Low** | Accessibility gaps beyond form: mobile nav toggle lacks `aria-expanded`/`aria-controls`; decorative corner frames are `div`s (fine) but cyan-on-light badges risk contrast issues; no skip link; `ThemeToggle` labeled `[OBSERVED]` with `sr-only` text | `Navbar.tsx`, `services/page.tsx` | WCAG 2.2 AA items that are cheap to fix and client-visible in procurement/security questionnaires. | §14.2 checklist | M |
| F16 | **Low** | Blog: one post, dated 2024-11-28 (pre-dates listed employment start), no author/reading-time metadata | `src/content/blog/` | A stale single-post blog is weaker than no blog section in nav; either commit to a cadence (§16 P2) or de-emphasize. | Editorial decision | S |

Severity rationale, briefly: F1/F2/F3 are Critical because each one actively destroys value already produced (indexing, credibility, shareability) rather than merely missing upside. F4–F8 are High because they block the site's two core jobs (convert a business visitor; be findable). The rest degrade quality without independently sinking a deal.

---

## 4. Existing Improvement-List Inventory and Reconciliation

The prior planning document located: **`docs/technical_audit.md` (2026-07-04)** — a 349-line engineering audit with KEEP/REFACTOR/REPLACE/ADD lists. `docs/Portfolio SRS.pdf` (Dec 2025) exists but was not parsed in this session (PDF; its role is superseded by the shipped implementation). No other roadmap/TODO files exist; no TODO/FIXME comments in source (verified by grep).

### 4.1 Reconciliation of the July audit against the current tree [OBSERVED]

The July audit's REFACTOR/REPLACE/ADD items were largely **implemented** in commits `244bab0` → `fc3a46e` (2026-07-06/07). Status of every checklist item:

| July-audit item | Status today | Evidence |
|---|---|---|
| Extract type system, kill `any` | **Done** | `src/types/portfolio.ts`, typed data modules |
| Split `data.ts` god file | **Done** | `src/data/{projects,services,experience,faq,site-config}.ts` |
| Shared `Button`/`Badge`/UI components | **Done** | `src/components/ui/*` |
| Organize components by domain | **Done** | `layout/`, `projects/`, `sections/`, `ui/` |
| Color palette replacement (was black/white) | **Done** | Royal Indigo tokens, light+dark (§2.5) |
| Visual assets (screenshots) | **Partially done** | 11 PNGs exist but cards don't display them (F11); no profile photo `[OBSERVED]` |
| Zod validation + HTML escape | **Done** | `actions.ts` |
| Sitemap + robots | **Done but defective** | Present, wrong domain (F1) |
| `generateMetadata` on project pages | **Done** | `projects/[id]/page.tsx` |
| Move `notFound()` to server | **Done** | server page guards, client receives project |
| Loading/error/not-found UI | **Not done** | no `error.tsx`/`not-found.tsx`/`loading.tsx` anywhere `[OBSERVED]` |
| Reduce client-component boundary | **Not done** | still ~7 client components for motion (F8) |
| Rate limiting, CSRF, sanitization | **Partial** | escaping done; no rate limit/honeypot (F9). (Note: Next.js Server Actions have built-in origin checks; explicit rate limiting is the real gap — §13.4) |
| `.env` cleanup + credential rotation | **Partial/Unknown** | file now untracked (was it ever committed? not in current history `[OBSERVED]`); rotation status `[UNVERIFIED]` |
| Security headers, CSP | **Not done** | §2.2 |
| OG images, JSON-LD, manifest | **Not done** | F3, F12 |
| Analytics, error monitoring | **Not done** | F7 |
| Testing, CI, Prettier, Husky | **Not done** | none present |
| Resume/CV download | **Done** | `/resume/…`, CV button in nav |
| Enable image optimization | **Done** | `unoptimized` removed from `next.config.ts` |
| Blog enhancements (>1 post, reading time, TOC) | **Not done** | still 1 post |
| Animations upgrade (scroll reveals etc.) | **Partial** | `whileInView` used in cards/tech stack; no restraint policy (F8) |
| Default README / scaffold SVGs removal | **Not done** | F14 |
| Replace monochrome palette; "cursor effects for premium feel" | **Done / Rejected-by-this-audit** | palette done; cursor effects: recommend *not* doing (§19) |

**Limitation reported honestly:** the July audit is the only formal improvement list found. Ideas the owner describes as "existing improvement ideas" beyond that document were not found anywhere in the repository; none were invented or attributed here. Any V2 idea not traceable to the July audit, the SRS, or this report's research is labeled `Proposed`, never `Planned`.

### 4.2 Carried-forward and rejected July-audit items

Carried into V2 scope (re-justified by current evidence): error/not-found UI, security headers, rate limiting, OG/JSON-LD, analytics, client-boundary reduction, blog decision. Rejected or de-scoped from the July list, with reasons: Playwright/Vitest/Husky/CI for a solo static portfolio (maintenance cost > value at current traffic — §19); "cursor effects / premium animations" (contradicts the trust objective and performance findings); Sentry (no traffic volume to justify; revisit post-launch); PWA manifest (no app-like use case).

---

## 5. Audience Segments, Jobs-to-be-Done, and Decision Journeys

Audience model grounded in the owner's stated markets (AU/US/DE; SME + hiring) and the site's actual content mix. "JTBD" = the job the visitor hires the *site* to do in that session.

### Audience A — Small-business owner / founder (primary commercial audience)

- **Who:** 1–20-person service businesses (the current client base pattern: disability services, ambulatory care, real-estate — AU/DE). Non-technical; may have been burned by cheap site builders or an unreachable developer.
- **Visit motivation:** arrived from LinkedIn, a referral, Google ("software development for NDIS providers"), or the URL on an invoice/proposal.
- **JTBD:** "Help me decide whether this specific person can be trusted to build and *maintain* a system my business depends on."
- **Top uncertainties (ranked):** (1) Will he disappear after delivery? (2) Will I understand what I'm paying for? (3) Can he work in my timezone/in English/German business context? (4) What does it cost and what do I get? (5) Who owns the result?
- **Evidence needed:** real deployed client work in their sector; a visible process ("how we'd work"); ownership/maintenance answers; a human voice.
- **First-scan targets:** headline, first case-study image + sector label, services scope, FAQ ownership/retainer answers, contact friction.
- **Preferred next step:** low-commitment contact — email or short form; a call comes later. `[INFERENCE]` consistent with B2B services buying behavior (multiple touches, risk-averse — §7 sources).
- **Design elements that help them:** sector-labeled case cards with real screenshots; plain-language "what you get"; FAQ with the ownership/retainer/timezone answers the site already has (currently buried on `/services`); response-time expectation near the form.

### Audience B — SME owner / operations manager (primary commercial audience, higher ticket)

- **Who:** operations/ops-lead at 20–200-person companies with manual workflows (scheduling, tracking, quoting, reporting) or fragile internal tools.
- **JTBD:** "Show me this person has replaced a manual/chaotic process like mine with dependable software, without a consulting-firm engagement."
- **Uncertainties:** integration with existing tools; data protection (health data in AU/DE!); disruption during cutover; what happens when the solo engineer is sick/on holiday; documenting and handing over.
- **Evidence needed:** architecture-level case studies showing RBAC/data handling; explicit "handover & documentation" statements; honest limitations; evidence of ongoing maintenance (retainer model exists — surface it).
- **First-scan targets:** case-study "Challenge → What I built → How it works" blocks; tech depth used as *risk reduction* signal rather than flex; FAQ.
- **Preferred next step:** a scoped conversation — "send a summary of the process and I'll reply" — or email with a specific problem statement.
- **Solo-founder implications:** the operating model is an *advantage* here (one accountable person, no handoff loss, lower cost) *if stated plainly*, and a risk (bus factor, capacity) *if unstated*. The site should acknowledge capacity honestly (e.g., "I take on a limited number of builds at a time") without fake scarcity.

### Audience C — Larger-business stakeholder (secondary commercial)

- **Reality check (per brief):** an independent solo engineer will rarely be the primary vendor for large-org builds. The realistic entries are (a) subcontracting to agencies/digital studios, (b) time-boxed specialist work (performance, integration, backend rescue), (c) being hired via Audience D instead.
- **JTBD:** "Establish quickly whether this person is credible enough for a scoped specialist engagement or a subcontract."
- **Evidence needed:** code-adjacent proof (READMEs, architecture writing), unambiguous individual contribution, professional history.
- **Implication:** don't design the site for C; make sure nothing on the site disqualifies C. A clean repo link strategy and accurate history (fix the "3+ years" mismatch, F10) largely covers C.

### Audience D — Recruiter / engineering hiring manager (secondary audience, high current volume)

- **Who:** recruiters sourcing "Next.js / NestJS full-stack" and hiring managers screening for AU/US/DE remote roles. `[INFERENCE]` The resume updated 2026-10-14 and the "[DEP]" copy in `public/resume/` indicate active applications — this audience's traffic is real *now*.
- **JTBD:** "Verify in ≤ 5 minutes: stack fit, individual contribution, seniority signals, communication quality — then get the CV."
- **Uncertainties:** what did *he* personally build vs the team; are the projects real production systems; is the English/communication quality sufficient.
- **Evidence needed:** CV (exists), clear role-per-project, repo/work evidence, coherent history (currently undermined by F10), the technical depth already present in case studies.
- **First-scan targets:** hero title, About (experience/education), CV button, project tech tags.
- **Preferred next step:** download CV / LinkedIn / email. Fast, checklist-driven.

### Hierarchy recommendation

**Primary conversion objective: business-client enquiry (Audiences A + B). Secondary, explicitly supported: hiring verification (Audience D).** `[RECOMMENDATION]` with these trade-offs:

- Recruiters convert on *verification* — they need little persuasion and will find `/about` + CV regardless of the homepage. Business clients convert on *trust-building* — they need the homepage to do narrative work. A hero written to impress recruiters ("Software Engineer | Backend & Real-Time Systems" — the current `<title>`) actively weakens the commercial narrative while adding nothing the recruiter needs that the CV button and About page don't already provide.
- Therefore: homepage hero and page titles speak to business outcomes; the persistent quiet hiring path = CV button in nav (already exists) + About structured as the verification page (experience, education, stack, CV, LinkedIn) + case studies written to double as individual-contribution evidence (§11 satisfies D's "what did *he* build" without a separate career site).
- Expected cost of this choice: a small fraction of recruiter sessions won't self-identify ("is he open to work?") — mitigated by one line in About ("Open to full-time roles and select client engagements" — true either way) rather than by diluting the hero. This line also protects the owner's negotiating position on both sides.

### Journey map (business visitor, desktop)

1. **Land** (LinkedIn/Google/referral) → hero + headline must answer "what does he do, for whom" in one screen → **2.** scroll: proof (3–4 curated case cards *with imagery and sector labels*) → **3.** scope (services: what I build, how engagements work) → **4.** de-risk (how I work + FAQ: ownership, maintenance, timezone, communication) → **5.** act (final CTA + low-friction form or email) → **6.** [if not ready] blog case-study depth / LinkedIn / GitHub as return loops.
- **Mobile:** same order, single column; sticky contact affordance in nav; card images sized for data budgets; the FAQ + CTA reachable within ~4 screens of scrolling.
- **Recruiter journey:** hero (stack fit) → nav CV / About (history, contribution) → 1–2 case studies (depth) → contact. Served by the same pages; no separate career site justified.

---

## 6. Market and Design-System Benchmark

Research conducted via live page fetches and official documentation on 2026-10-15. Labels: **[D]** documented in official sources, **[O]** observed on the fetched page, **[I]** inference. Full per-platform detail was researched live; what follows is the decision-relevant synthesis plus the comparative matrix.

### 6.1 Comparative research matrix

| Reference | Core audience | Primary objective | Structure | Visual system | Trust mechanisms | Transferable to this portfolio | Non-transferable | Key sources |
|---|---|---|---|---|---|---|---|---|
| **Peerlist** | Developers/designers ("builders") + recruiters | Get visitors to claim a profile (proof-of-work identity) | Flat one-deep IA: hero → member proof → 3 feature sections → FAQ; FAQ literally answers "How is Peerlist different from LinkedIn?" | Green brand; every product screenshot ships in **light + dark variants**; compact card sections [O] | "Proof of work is the only thing that works. Everything else is a cheap signal." [D]; verified GitHub/Dribbble/Medium integrations; "Verified Credentials" [D] | Outcome-first project cards with verifiable links; dual-theme screenshot assets; a credibility thesis line; a FAQ that contrasts with the default alternative (LinkedIn) | Member-count avatar walls, Launchpad gamification, second content feed (retention devices) | peerlist.io; peerlist.io/blog (2026-10-15) |
| **LinkedIn** | Professionals + recruiters; business networking | Profile completeness + feed engagement | Profile as canonical object (headline, About, **Featured**, Experience, Recommendations) | Corporate blue/white cards; high density [I] | Three verification types (identity/workplace/education) with badge; LinkedIn's own data: verified members get **+60% profile views** [D]; Featured section officially "evidence of your skills" [D] | "Small badge → click → evidence" chip pattern; a Featured-equivalent of 3 pinned best items on the homepage; structured Experience-style entries on projects | Feed, reactions, "X people viewed this" urgency mechanics | linkedin.com/help (a1359065, a552452) (2026-10-15) |
| **X/Twitter** | Public conversation | Posting velocity + time-on-feed | Left-rail app shell; single-column reverse-chron feed [I] | Proprietary **Chirp** typeface; 2021 recolor to be "high contrast and a lot less blue" [D — The Verge]; post-2023 stark black/white [D] | Tiered checkmarks (blue Premium / gold Verified Orgs / gray gov) [D]; widely criticized dilution of the signal after paid checks [D] | High-contrast, near-monochrome typography as a credibility stance; **one** unambiguous proof chip per claim (diluted signals read as cheap) | Infinite feed, engagement counters, trending surfaces | help.x.com; theverge.com (2021-08-11) (2026-10-15) |
| **Reddit** | Interest communities | Participation (post/comment/vote) | Subreddit-first; profiles secondary [I] | Web app built on named web components (`<shreddit-post>`); design system "serving ~25 teams" [D — r/RedditEng] | **Context carries credibility**: every post is labeled with its community; karma + account age [I] | Label every artifact with provenance (client sector, year, your role) — the subreddit-label pattern applied to case studies; small set of named components used everywhere | Vote dynamics, anonymity, controversy sorting | r/RedditEng engineering posts (2026-10-15; direct fetch blocked — flagged) |
| **Threads** | Instagram's audience; casual conversation | Reading + light participation | Feed-first; web requires no login to read [D] | Minimal chrome, system sans [I]; April 2025 redesign: customizable columns, drafts, better search [D] | Inherited Instagram identity; no own verification [I] | Zero-friction browsing (no gates); desktop multi-column overview vs mobile single column; one consistent name/avatar across site/GitHub/LinkedIn | 500-char post thinking, trending surfaces, ephemeral content | about.fb.com; en.wikipedia.org (Threads) (2026-10-15) |
| **Instagram** | Visual creators + brands | Visual browsing, creator growth | Profile = bio + 3-column grid + tabs; Professional dashboard hub [D] | 2025: grid thumbnails standardized to **4:5 portrait, 3 columns** [D] | Professional dashboard surfaces performance data as credibility [D/I boundary] | **Design the grid, not just the tiles** — uniform project-thumbnail aspect ratio composing into a coherent gallery; one honest stats row (real numbers only); contact action always visible | Stories/ephemera, explore/virality loops | help.instagram.com; buffer.com (2026-10-15) |
| **Linear** | Product teams | Trial/upgrade software | Heading + one paragraph + product mockup per section; "Fig 0.1"-style captions [O] | "Subtle desaturated blue"; Mercury White #F4F5F8, Nordic Gray #222326 [D]; principles: **"Don't compete for attention you haven't earned"**, **"Structure should be felt not seen"**; warmer-but-not-muddy grays [D] | Logo band + one quantified claim + **exactly three testimonials, each with name/role/company, each linking to a customer story** [O] | Motion/attention restraint doctrine; figure-captioned screenshots (reads as engineering rigor for one class); the 3-testimonial pattern for later; slightly-warm neutral ramp | Enterprise scale claims; their motion reputation is reputation [I], not documentation | linear.app/brand; linear.app/now (2026-10-15) |
| **Stripe** | Businesses/developers | Start using Stripe | Asymmetric bento grid; gradient hero [O] | Custom sans (not public) [I]; translucent elevation; disciplined grays [O/I] | Stats band with verifiable scale numbers; enterprise case studies **each with its own metric**; one named headshot testimonial [O] | Proof stack structure (stats → named cases → one testimonial); numbers tied to specific engagements, not vibes | Scale ("$1.9T volume") — invented scale is exactly what §F2 warns against | stripe.com (2026-10-15) |
| **Vercel (Geist)** | Developers | Platform adoption | Preset typography classes (size+weight+lh+ls bundled); `text-label-14` most common [D] | `--ds-` tokens, 10-step scales; **gray-first**: color reserved for accents; gray-alpha for borders/shadows; keep dividers inside borders; translucent shadows; radii only 6/12/16px; Surface vs Floating elevation; tabular figures for numbers [D] | Undersell + verifiable specificity (their whole brand is engineering credibility) [I] | Gray-first doctrine; radii scale; divider-inside-border rule; alpha borders/shadows for dark mode; mono for labels/tags/dates | Their scale-assumed minimalism (they can ship a nearly text-only page; a solo portfolio needs imagery) | vercel.com/geist (2026-10-15) |
| **GitHub** | Developers + enterprises | Account/team signup | Screenshot-led bands [O] | **Primer**: functional role-named tokens (`--fgColor-default`); 9 themes including colorblind/high-contrast — dark mode as accessibility surface [D] | Hard numbers tied to products; analyst proof; screenshots showing *plausible real state* ("97% of 701 alerts complete") — verisimilitude as trust [O] | Realistic-looking screenshot states; role-named tokens (name encodes purpose, never hue) | Enterprise logos/analyst badges | github.com; primer.style (2026-10-15) |
| **brittanychiang.com** | Employers | Get hired | Single page: About → Experience → Projects → Writing; numbered experience list; project outcome numbers | **Inter + system mono only** (verified from CSS) [O] | Progression + outcome numbers ("100k+ installs") | Single-typeface discipline; experience-as-numbered-list for Audience D; CV as hand-off | No client-CTA (she's employed — wrong model for A/B audiences) | brittanychiang.com (2026-10-15) |
| **antonsten.com** | Product teams needing design leadership | Book consulting | Hero with positioning + **live availability line**; logo wall framed humbly ("teams that fit in a mid-sized van"); long-form testimonials; dedicated engagement-model page [O] | Editorial, text-first [O] | Availability status; named testimonials carrying outcomes; humility framing around logos | **The closest model for Audiences A/B**: positioning line + honest availability + engagement-model page + outcomes-in-testimonials | Newsletter-count proof (not applicable yet) | antonsten.com (2026-10-15) |
| **rauno.me** | Design engineers | Showcase craft | Manifesto-as-hero [O] | — | — | One signature micro-interaction: **click-to-copy email with inline "Copied" state** | Manifesto-only hero (too oblique for business buyers) | rauno.me (2026-10-15) |
| **leerob.com** | Developers/founders | Personal brand | Name + bio + two text lists [O] | Radical minimalism [O] | Association + writing cadence | Radical reduction as an option; one-clause availability | Too thin to sell B2B services | leerob.com (2026-10-15) |

### 6.2 What the benchmark converges on

Five patterns recur across commercial-grade trust design, independent of industry:

1. **Proof beats claims, and *verifiable* proof beats polish.** Peerlist's entire thesis, LinkedIn's verified-badge data (+60% views), Stripe's per-case metrics, GitHub's realistic screenshot states. For this portfolio: real deployed URLs, real screenshots, scoped truthful numbers, labeled provenance.
2. **Gray-first color discipline with one accent.** Geist (documented), Linear (documented), X's "less blue" recolor (documented). The portfolio's current hardcoded cyan/slate/blue/purple layer (F5) is the anti-pattern here.
3. **Motion restraint.** Linear's "don't compete for attention you haven't earned" [D] is the citable doctrine; Geist documents no motion system at all [O-absence]. A portfolio whose visitor is deciding whether to trust someone with their business should animate only where it communicates.
4. **Structured scannability.** Preset type classes (Geist), figure captions (Linear), labeled provenance (Reddit), uniform grid (Instagram). Business visitors scan for the evidence relevant to *their* risk.
5. **Always-visible, low-friction contact.** Instagram business contact button, rauno's click-to-copy email, Anton's availability line. Contact is a persistent affordance, not a single button.

Explicitly rejected patterns: feeds, avatar walls, member counters, engagement metrics, urgency/notification mechanics, ephemeral content — all retention devices that would erode the exact trust the site exists to build (multiple sources above; also §7).

---

## 7. Evidence-Based UX and Ethical Persuasion Analysis

Research basis for this section (all accessed 2026-10-15, primary sources; full URLs in §6 matrix and below): NN/g "How Users Read on the Web" (Nielsen, 1997), "F-Shaped Pattern… Misunderstood" (Pernice, 2017/rev. 2026), "Trustworthiness in Web Design" (Harley, 2016), "10 Design Guidelines for Reporting Errors in Forms" (Krause/Harley, 2019/rev. 2024); Lindgaard et al. 2006 (*Behav. & Info. Tech.* 25:2) for the 50 ms finding; Stanford Web Credibility Project (Fogg, 2002–03); Gartner B2B buying-journey research (primary page returned HTTP 403 to automated fetch — figures corroborated via Gartner-derived reporting; flagged `[UNVERIFIED-at-source]`); Dawes/Ehrenberg-Bass "95–5 rule" (LinkedIn B2B Institute, 2021); Scheibehenne, Greifeneder & Todd 2010 and Chernev, Böckenholt & Goodman 2015 meta-analyses on choice overload; WCAG 2.2 (W3C Rec., 2023-10-05; current edition 2024-12-12); GDPR Arts. 6/13; §5 DDG (verified at gesetze-im-internet.de).

### 7.1 What the evidence actually supports — applied here

1. **Visitors scan; structure determines how much they read.** The 1997 NN/g experiment (scannable layout +47% usability in the controlled condition; small-n, dated — strength: direction) and the F-pattern correction (the F is a *symptom of a wall of text*, "negative for users and businesses" — not a layout to design for). Applied: the current case cards truncate mid-word via `slice(0,150)` (F11) and the case-study body is three unbroken 60–90-word paragraphs — exactly the wall-of-text symptom. The §11 template's labeled blocks (Problem / Built / How / Outcomes) and front-loaded one-line outcomes are the evidence-based response.
2. **Visual judgment is near-instant; credibility judgment is slower but brutal on defects.** Lindgaard 2006: visual-appeal judgments stabilize within ~50 ms (peer-reviewed; measured *appeal*, not trust — do not over-claim). NN/g credibility work: typos and **broken links** degrade trust fastest; **hiding basic information** (the cited user rejected a vendor in 35 seconds over no pricing disclosure); stale content; connection to the wider web. Applied: F4's broken links and the stale single 2024 blog post are measurable credibility leaks; the FAQ's ownership/retainer answers are exactly the "up-front disclosure" factor — they're currently buried on one page (§9.2 fixes placement).
3. **B2B decisions are multi-stakeholder and mostly out-of-market.** Gartner: 6–10 stakeholders per buying group, ~17% of buying time spent with any suppliers, 77% call the purchase complex `[UNVERIFIED-at-source — Gartner page 403]`. 95–5 (Dawes 2021): ~95% of category buyers are out-of-market at any moment — a portfolio's realistic job is **brand memory for future in-market moments**, not converting a cold visit today. Applied: (a) write case studies so a technical evaluator (stakeholder 3 of 8) and a budget owner (stakeholder 1 of 8) each find their answer without scrolling to each other's section — the two-column case template (§11.1) exists for this; (b) expect most visitors to leave without contacting — the leaving-path content (case depth, About, LinkedIn/GitHub links) is itself conversion work for the 95%; don't add pop-ups or exit-intent gadgets to chase the 5%.
4. **Choice reduction helps — but only under specific conditions.** Both meta-analyses (2010: mean effect ≈ 0; 2015: small average effect, reliable only with complex/similar option sets, preference uncertainty, difficult decision goals). Business visitors choosing between "12 similar-looking project cards" or "custom software vs website vs retainer vs automation" *are* in the moderator conditions (complex, similar, preference-uncertain). So §9's curation (12 → 3 flagships + ~5, two service tiers) is evidence-aligned — but Hick's-law or "every field loses X%" claims are **not** evidence-based, and this plan deliberately uses none.
5. **Forms: error presentation is well-evidenced; field-count dogma is not.** NN/g's form-error guidelines (inline validation near the field, error state beyond color alone, no tooltip-only errors) are directly implementable and currently *partially violated* (no `aria-describedby`, no icons, color-only errors — F9). Baymard's 11.3-fields/checkout data is checkout-specific; no controlled evidence supports a universal per-field penalty for contact forms — the existing 3-field form is already minimal, so V2 adds **zero** fields (§12.5) and instead fixes disclosure (GDPR notice link at the form, Art. 13) and error UX.
6. **WCAG 2.2 AA is the current AA benchmark** (Rec. since 2023-10-05): the criteria that bind this site are 2.5.8 Target Size (≥24×24 px — the plan's 44 px buttons/buttons and 44 px nav targets clear it), 2.4.11 Focus Not Obscured (the *sticky navbar* makes this live: scrolled-page focus must not hide under it — implementation note in §14.2), 2.5.7 dragging (n/a), 3.3.8 authentication (n/a). "Focus Appearance" (2.4.13) is AAA — commonly mislabeled AA; this plan targets the existing 2 px focus outline plus AA rules.
7. **Motion: purposeful or none.** Apple HIG ("don't add motion for the sake of adding motion"; make it cancellable) and M3's Standard/Expressive split converge with Linear's doctrine (§6.2.3): the §10.3 motion budget (150/250 ms, opacity/transform, one reveal per section, reduced-motion kill-switch) is the codified outcome.

### 7.2 Ethical persuasion policy for this portfolio

Used (all evidenced above): verifiable proof placement; disclosure (process, ownership, availability); friction removal on legitimate next steps; expectation-setting near the form; familiar interaction conventions.
Permanently excluded: fake scarcity/urgency, fabricated counters or testimonials, dark-pattern forms (pre-checked consent, shame-language), engagement traps (§6.2), invented metrics (§8.10). Testimonials appear **only** when a real client, with a name/role and permission, provides one — until then the site leans on deployed-work proof, which it already has.

### 7.3 Friction map — where a visitor hesitates, and the intervention

| # | Hesitation moment | Current state | Intervention | Evidence basis |
|---|---|---|---|---|
| H1 | "Is this real work?" (10 s after land) | Text-only cards; live links buried; some broken (F4) | Proof band + screenshot cards with verified live links + evidence-tier chips (§11.2) | NN/g credibility: design quality + verifiability (§7.1.2) |
| H2 | "Has he done *my kind* of thing?" (30 s) | Sector info only in small chips | Sector-labeled flagships + filter on `/projects` (§9.3) | Scanning/comparison behavior (§7.1.1); choice moderators (§7.1.4) |
| H3 | "What happens after delivery?" (before contact) | Answer exists only in FAQ on `/services` | "How I work" + ownership statement on homepage; FAQ teaser (§9.2) | Disclosure factor (§7.1.2) |
| H4 | "Solo founder — what if he vanishes/gets sick?" | Unaddressed | Honest capacity line + retainer as continuity story (§8.4.5) — stated plainly, no fake scarcity | Disclosure; risk-perception in B2B (§7.1.3) |
| H5 | "What will it cost?" | Nothing (NN/g cites a 35-second rejection over this) | V2: add honest *starting-scope* language on Services ("websites from a fixed-scope engagement; platforms scoped per project" — no invented prices, but state the pricing *model*) | Disclosure factor (§7.1.2) |
| H6 | "I'll email instead of the form" | Email exists but styled as an afterthought | Email as equal channel: plain link + click-to-copy (§12.5) | Channel preference variance; friction removal |
| H7 | Form anxiety ("who sees this data?") | No privacy notice at point of collection (GDPR Art. 13 gap) | One-line notice + `/privacy` link above submit (§13.4) | Art. 13 (§7 sources) |
| H8 | Sent the form — now what? | Success state says only "Message sent successfully!" | Success state sets expectation ("reply within N business days" — owner picks N he can honor) + direct email fallback | Expectation-setting; NN/g form guidance |
| H9 | Recruiter: "what did *he* build?" | Role ambiguity inside client projects; years mismatch (F10) | `role:` line + evidence tiers + fixed history (§11.1, §8.10) | Multi-stakeholder evidence needs (§7.1.3) |

---

## 8. Recommended Brand Positioning and Messaging

### 8.1 What the evidence says the brand *is* [OBSERVED → synthesis]

The strongest proof on the site is not "premium websites" — it is **operational software for service businesses in regulated, real-world contexts**: an Australian disability-services platform, a German ambulatory-care platform, a land-sales SaaS, an e-commerce backend with transactional integrity, employment history shipping backends under load. The website/landing-page offering is real but is the *entry* product, not the differentiator; every competitor claims it. AI integration has no shipped evidence anywhere in the portfolio and SEO has no outcome evidence — both fail the §6 test ("verifiable proof beats claims") and must not lead.

### 8.2 Positioning statement [RECOMMENDATION]

> **For service businesses whose operations have outgrown spreadsheets and off-the-shelf tools, Sahad Labs designs, builds, and maintains the custom software that runs the business — operational platforms, internal tools, integrations, and the high-performance websites that feed them — delivered end-to-end by one accountable engineer.**

### 8.3 Value proposition (one sentence for the hero's neighborhood)

> "I turn manual, error-prone operations into dependable custom software — and I stay on to keep it running."

### 8.4 Supporting differentiators (each tied to existing proof)

| # | Differentiator | Proof that exists today | Where it shows up |
|---|---|---|---|
| 1 | **One accountable engineer, end to end** — scoping, build, deployment, maintenance; no handoffs, no agency overhead | Sahad Labs role; FAQ ownership/retainer answers already written | Hero subhead, Services page, About |
| 2 | **Operational-software depth** — RBAC, healthcare-adjacent data handling, transactional integrity, caching at scale | Cozee Care, Taqwa Group, 4j Traders, Rushkat employment | Case studies (§11), Services page |
| 3 | **Live international client systems** — production deployments serving AU and DE clients today | cozeecare.com.au, violina-pflegedienst.de, taqwagroupbd.com (all 200-verified) | Proof band, case cards |
| 4 | **Engineering-grade websites** — marketing sites built with the same discipline: performance, accessibility, structured data | FCSC, NDIS CarePlus, own site's stack | Services tier 2, case studies |
| 5 | **Built-in continuity** — the person who built it maintains it (retainer) | FAQ retainer answer exists; Impressum lists retainer service | Services, FAQ, proposal follow-up |

### 8.5 Audience hierarchy [RECOMMENDATION]

Primary: **Audience A + B** (business decision-makers). Secondary: **Audience D** (hiring) — served quietly but completely (CV in nav, About as verification page, role-per-project clarity). Rationale and trade-offs: §5.

### 8.6 CTAs

- **Primary CTA (site-wide):** "Discuss a project" → `/contact` (short form + direct email, response expectation stated).
- **Secondary CTA:** "View case studies" → `/projects`.
- **Quiet tertiary (hiring path):** "Download CV" — stays in the navbar as today; plus one line on About stating openness to full-time roles.
- `mailto:` is offered alongside the form everywhere (§12.5) — highest-intent visitors differ in preferred channel.

### 8.7 Site-wide messaging hierarchy [RECOMMENDATION]

1. **Site one-liner** (title tag, footer, social bios): `Sahad — Software engineer building operational platforms & high-performance websites for service businesses` (≤ 60 chars for the title tag portion).
2. **Hero H1:** problem-facing outcome line (copy in §9.2).
3. **Hero subhead:** who it's for + what's delivered + continuity (one sentence).
4. **Proof band:** 3–4 real numbers (§12.2) + live-client mention.
5. **Selected work:** 3 flagship case cards with imagery, sector labels, one-line outcomes.
6. **Services:** two tiers + engagement models (build / retainer).
7. **How I work:** 4 steps.
8. **FAQ:** the existing five answers (ownership, retainer, timezone, timeline, technical knowledge) — promoted from `/services` bottom to site-wide component.
9. **Final CTA.**

### 8.8 Plain-language description (non-technical reader)

> "Businesses come to me when important work is still being done by hand or held together with spreadsheets. I learn how the business actually operates, then design and build the software that replaces the chaos — booking systems, client portals, internal dashboards, integrations between tools — and the website that brings customers in. After launch, I keep the system running, updated, and secure, so there's always one person accountable for it."

### 8.9 Technical introduction (technical reader / hiring)

> "Full-stack engineer focused on backend-heavy business systems: Next.js on the front, NestJS/TypeScript services behind it, PostgreSQL + Redis for state, Prisma for type-safe data access, Docker/GitHub Actions for delivery. I've shipped production platforms with JWT/RBAC access control for healthcare-adjacent clients in Australia and Germany, built ACID-strict order backends, and tuned high-traffic APIs with Redis caching. I work solo end-to-end — requirements, architecture, implementation, deployment, and the on-call reality after launch."

### 8.10 Claims requiring evidence, correction, or removal before publication [OBSERVED claims; dispositions are RECOMMENDATIONs]

| Current claim | Where | Disposition |
|---|---|---|
| "100% data confidentiality maintained" | Cozee Care metrics + **meta description** | Remove as a "metric." Replace with what was *built*: "Isolated role-based access to sensitive records (JWT + NestJS Guards)." Confidentiality is a property you engineer for, not a result you can claim. |
| "Zero manual scheduling errors" / "reducing manual scheduling errors to zero" | Cozee Care | Remove unless a client-verifiable measurement exists. "Automated the scheduling workflow end to end" says the true thing. |
| "Sub-100ms inventory query execution" (Taqwa), "sub-100ms API response" (Rushkat), "Sub-500ms latency" (Online Doctor) | metrics | Keep only with scope + measurement basis ("cached reads served in <100 ms in load testing" — only if he actually load-tested; otherwise delete the number, keep the mechanism: "Redis caching for hot queries"). |
| "100% transactional integrity across all order checkouts" | 4j + ProjectDetails highlight list | Replace with the mechanism: "ACID transaction isolation for order workflows." |
| "95+ Google PageSpeed score", "Sub-2s initial page load" | FCSC | Keep only if a dated PSI report exists and can be re-run today on the live URL; otherwise "Performance-budgeted build (static generation, image optimization)." |
| "100/100 Mobile/Desktop Performance scores" (offered to clients!) | Services page feature list | **Remove or rewrite as a process promise**: "Performance-tested against Core Web Vitals before handover." Promising a specific score is a deliverable guarantee he may fail. |
| "Zero-downtime deployment during peak traffic" | Taqwa | Unverifiable; delete or scope to "deployments during live traffic without service interruption" only if true and witnessed. |
| "reducing response times by 60%" | Rushkat experience entry | Needs the measurement basis; if it came from profiling, phrase as "profiled and reduced endpoint latency ~60% (internal benchmarking)" — otherwise drop the figure. |
| "3+ years of experience" | About bio | Conflicts with listed employment (Oct 2024 → present ≈ 2 years professional). Either count honestly from first freelance/university client work *with a start year*, or write "2+ years professional engineering across healthcare, logistics, and e-commerce." Recruiters check this (F10). |
| "WCAG 2.1 AA compliance" | Cozee Care | Only defensible as "built to WCAG 2.1 AA criteria" unless an audit exists. Add "designed and built to" phrasing. |
| "ensuring zero downtime for your systems" (retainer FAQ) | faq.ts | Soften: "keeping your systems updated, monitored, and quickly repaired." |
| Client names (Cozee Care, Violina, Taqwa, 4j) displayed with live URLs | projects.ts | Confirm each client is comfortable with named public attribution; if not, anonymize to sector + country ("Australian disability-services provider") and drop the live link. `[UNVERIFIED — owner action]` |

---

## 9. Proposed Information Architecture and Page-by-Page Outline

### 9.1 Recommended structure (smallest effective)

**Pages (8):** `/` · `/projects` · `/projects/[id]` · `/services` · `/about` · `/contact` · legal trio (`/privacy`, `/terms`, `/impressum`) · `/blog` (kept, de-emphasized).
**Removed from nav prominence:** Blog drops from the main nav into the footer unless the owner commits to a cadence (F16). Everything else stays.

### 9.2 Homepage outline (top → bottom)

| # | Section | Purpose / question answered | Audience | Content & evidence required | Conversion role | V2? |
|---|---|---|---|---|---|---|
| 1 | **Hero** — H1: "Dependable software for businesses that have outgrown spreadsheets and templates." Sub: one sentence of who/what/continuity. CTAs: *Discuss a project* (primary) + *View case studies* (outline). Availability line: "Available for new projects" (Anton Sten pattern, §6) | What do you do, for whom, and can I engage you now? | A, B | Copy only | Primary entry to conversion | Yes (rewrite, no new component) |
| 2 | **Proof band** — 3–4 real stats (years shipping, production systems live, countries served, sectors) + "currently maintaining live systems for clients in Australia and Germany" | Why believe the headline? | A, B, D | Verified numbers only (§12.2) | First credibility anchor | Yes |
| 3 | **Selected work** — 3 flagship case cards (Cozee Care, Violina, Taqwa), each with screenshot (uniform 16:10 crop), sector chip, one-line outcome, tech tags; link to `/projects` for the rest | Show me the work — in my industry | A, B | Existing images + §11 rewrites | Core proof | Yes |
| 4 | **Services teaser** — the two tiers in one sentence each + link to `/services` | What can I actually hire you for? | A, B | Existing services.ts, tightened | Scope-setting | Yes |
| 5 | **How I work** — 4 steps: Scope → Build → Launch → Maintain (with the ownership statement: "you own everything") | What is working with him like? What happens after delivery? | A, B | New copy, honest, no new tech | De-risks contact | Yes |
| 6 | **Tech credibility strip** — compact, monochrome tech list (existing TechStack, reduced visual weight) | Is he technically legit? | B, D | Existing | Background signal | Yes (light rework) |
| 7 | **FAQ teaser** — top 3 questions (ownership, maintenance, timezone) + link | Objection handling before contact | A, B | Existing faq.ts | De-risks contact | Yes |
| 8 | **Final CTA** — "Have a process that needs software? Tell me about it." + primary CTA + email address as plain link | What's the next step? | A, B | Copy | Conversion | Yes |

Why this beats the current homepage (Hero + 3 text cards + tech grid): it answers the visitor's questions in the order §5 says they ask them — what/for-whom → proof → scope → process → objections → action — and it uses the site's two strongest existing assets (live client work + already-written FAQ) that today sit on other pages or in hidden fields.

### 9.3 Inner pages

- **`/projects` (index):** Curated grid (flagships first, then the rest), uniform image cards (fix F11), sector filter chips (Healthcare · Logistics · E-commerce · Real estate · SaaS), evidence-tier label per card (§11.2). Purpose: breadth + self-selection by sector.
- **`/projects/[id]` (template):** §11.1.
- **`/services`:** Keep the two-tier structure and FAQ; rewrite claims (§8.10); tokenize the styling (F5); add engagement models ("fixed-scope build" / "monthly retainer") with honest process descriptions instead of performance-score promises; add a mid-page CTA.
- **`/about`:** Re-sequenced for dual audiences: 1) short business-facing intro + photo `[UNVERIFIED — owner must provide a real photo or we omit]`, 2) "How I work with clients" summary, 3) full professional experience (existing), 4) education, 5) skills (curated, drop the soft-skills tag list — "Communication/Teamwork" pills read as filler to both audiences), 6) CV download + LinkedIn, 7) one line on openness to full-time roles. Fix the years claim (§8.10).
- **`/contact`:** Short form (name, email, message — existing), plus: direct email as text link (§12.5), response-time expectation, LinkedIn link, one-line privacy notice linking `/privacy`, post-submit state that sets expectations ("I'll reply within 2 business days" — only if he commits to it). No new fields in V2 (§12.5 covers why).
- **`/blog`:** De-emphasize in nav. Either commit to one substantial post per month (roadmap P2) or fold the existing post's ideas into case-study depth. The 2024-dated single post currently signals staleness (F16).
- **Legal trio:** Keep; update Impressum citation (F13) and privacy page to match reality once analytics lands (§13.6).

### 9.4 Navigation

Desktop nav: **Work · Services · About · Contact(pill) · CV · theme toggle.** "Projects" renamed "Work" (business framing); Blog moves to footer. The Services pill keeps its emphasis treatment but in token colors (F5). Mobile: same five + CV; add `aria-expanded` (F15).

### 9.5 User journeys enabled

- **Business (A/B):** Home → case study → services → contact. Or Home → services → contact directly. Every page ends in the primary CTA; FAQ reachable within one click everywhere.
- **Hiring (D):** Home → About (or nav CV directly) → case study for depth → contact/email. No dead ends.
- **Returning/referral:** `/projects/[sector]` filtered via query param (P2 — no new page, just chip state in URL for shareability).

---

## 10. Recommended Visual Direction and Design-System Specification

### 10.1 Two viable directions

| | **Direction A — "Precision Instrument"** (refine current) | **Direction B — "Warm Editorial"** (restyle) |
|---|---|---|
| Thesis | Gray-first, indigo-accented engineering aesthetic (Geist/Linear lineage, §6); the site *is* the portfolio piece | Warm paper neutrals, serif display headings, editorial consultancy feel (Anton Sten lineage) |
| Fit to positioning | Mirrors "engineering-grade operational software" — the medium demonstrates the message | Differentiates from the sea of dark developer portfolios; warmer for non-technical buyers |
| Rework cost | Low-Medium: tokens exist; delete the cyan/slate/blue/purple layer, tighten scale, add image treatment | High: new palette, new type pairing, re-skin every component, re-shoot screenshots to match |
| Risk | Less visually distinctive than B | Distinctiveness can read as "designer portfolio," undercutting the engineer claim; serif display + Inter body adds font weight and decisions |
| Verdict | **Recommended for V2** | Revisit for V3 if the brand matures |

**Why A wins now:** the July refactor already paid for A's foundation; B buys distinctiveness with ~2–3× the design/engineering hours at the exact moment the content layer (§8.10, §11) is the bottleneck. Distinctiveness in A comes from execution: figure-captioned real screenshots (Linear pattern), mono-labeled evidence tiers, one signature interaction (click-to-copy email, rauno pattern), and the restraint itself — which is rarer than another dark-glassmorphism template. `[RECOMMENDATION]`

### 10.2 Design principles (the "why" for every rule below)

1. **Grays do the work; indigo gets one job.** (Geist gray-first doctrine [D], §6.) Indigo appears on: primary button, text links, focus ring, small accents. Nowhere else.
2. **Nothing moves without informing.** (Linear principle [D].) Entrance fades only; no parallax, no loops, no cursor effects.
3. **Every claim sits next to its evidence.** Layout rule: claim → number/screenshot/link, never claim alone.
4. **Dark mode is a first-class theme, not a filter.** (Primer theme-family approach [D].) Every asset ships in both themes (Peerlist pattern [O]).
5. **Familiar conventions for structure, personal voice for content.** Nav/cards/forms look like what visitors already know (§7 familiarity); the case-study voice is where personality lives.

### 10.3 Tokens (extend `globals.css`; names are the contract)

```
/* Palette — keep existing HSL variable names; change values only where noted */
--background / --foreground          keep (light: white / 222 47% 11%; dark: 223 39% 11% / 210 40% 98%)
--primary                             keep Royal Indigo (235 85% 45% / dark 235 90% 60%)
--primary-foreground                  keep
--border / --input                    keep values; ALWAYS consume via /50–/60 alpha in dark mode (Geist alpha-border rule)
--ring                                keep (= primary; focus-visible already wired)
--success        NEW  142 70% 32%     (light) / 142 65% 45% (dark)   — replaces hardcoded text-green-500
--warning        NEW  32 95% 44%      / 38 92% 55%                    — reserved, currently unused
--danger         RENAMES destructive  keep values; replaces hardcoded red-*/text-red-500
--elev-surface   NEW  card (on page)      — Surface class (Geist)
--elev-floating  NEW  popover + shadow  — Floating class: shadow only here, always translucent:
                      0 8px 30px hsl(223 39% 5% / 0.12)
--radius-*       NEW scale (Geist's three-value rule): --radius-sm: 6px; --radius-md: 12px; --radius-lg: 16px; pills = full
                                    map: badges/inputs 6px, cards/modals 12px, image frames 12px

/* Type scale — six presets, Geist's bundled-preset approach (size+weight+lh+tracking in one utility) */
.text-hero      40/48 → md:56/60, weight 700, tracking -0.02em   (hero H1; current text-7xl is oversized for business reading)
.text-h2        28/36, 700, -0.01em                              (section heads)
.text-h3        20/28, 600
.text-lead      18/28, 400, muted-foreground                     (hero sub, section intros)
.text-body      16/26
.text-label     13/16, 500                                       (UI labels)
.text-mono      JetBrains Mono 13/16                             (tags, dates, figure captions, evidence chips; tabular-nums on numbers)
Drop the current font-mono-on-headings pattern (h2 font-mono reads "terminal theme"; mono moves to labels/captions only).

/* Spacing & layout */
Section rhythm: 96px desktop / 64px mobile (py-24 md:py-16 equivalents), one scale: 4,8,12,16,24,32,48,64,96,128
Content width: --content: 68rem (1088px) — narrows the current 80rem (1280px) max-w-7xl to a reading-first column;
               prose sections cap at 44rem; the double-constraint (layout max-w-7xl + page container) is collapsed to ONE width owner
Breakpoints: Tailwind defaults (sm 640 / md 768 / lg 1024 / xl 1280); design targets 390 / 768 / 1440

/* Motion budget (the whole policy) */
duration: 150ms (state) / 250ms (entrance); easing: ease-out; properties: opacity + transform only;
ONE entrance reveal per section (whileInView, once, 12px rise); respect prefers-reduced-motion → media query kills all;
page-level: NO load-delay staggering on hero (F8) — hero is server-painted, static.
```

### 10.4 Component rules

- **Buttons:** keep the existing `Button` variants; primary = indigo fill + white text (AAA-checked), outline = 1.5px `--input` border, ghost for tertiary. Sizes sm 36 / md 44 / lg 52 px tall (44px = WCAG 2.5.8 target minimum, §7). Kill `hover:scale-[1.02]` on primary (motion budget); keep the loading spinner.
- **Links:** body links = `--primary` + underline on hover; nav links = foreground/muted-foreground with `data-active` state; external links keep `rel="noopener noreferrer"`.
- **Cards:** `--elev-surface`, `--radius-md`, 1px `--border` (alpha in dark); hover = border darkens to `--primary/40`; NO shadow on resting cards (borders-over-shadows, §6.2.2), shadow only for the floating mobile nav / modals.
- **Case-study card (new spec):** screenshot at 16:10 in a `--radius-md` frame with 1px border; sector chip (mono, `--muted`); title (`.text-h3`); one-line outcome (`.text-body`, muted); tech tags (`.text-mono`); whole card is one link; external-live icon only when a verified live URL exists.
- **Images/screenshots:** every project image exported as WebP, source ≤ 300 KB, 1600px wide max, served via `next/image` (already active); shipped in light AND dark where the UI differs (Peerlist rule); captions in `.text-mono` — "Fig. 01 — Cozee Care scheduling board" (Linear figure pattern).
- **Forms:** labels always visible (no placeholder-as-label), 6px radius, `--input` border, focus ring `--ring` 2px, errors in `--danger` with `aria-describedby` + `aria-invalid`, success/error banners `aria-live="polite"`; submit button shows pending state (exists).
- **Icons:** lucide only (already), 20px UI / 24px feature, stroke 1.75, one color (`currentColor`); no filled/icon-color mixing.
- **Empty/error states (new):** `not-found.tsx` (friendly 404 with the two CTAs), `error.tsx` (retry + email fallback), image-failure fallback already exists and is kept.

### 10.5 Theming and accessibility contract

- Both themes must pass WCAG AA (4.5:1 body, 3:1 large/UI) — the existing indigo (`235 85% 45%` on white ≈ 6.3:1 [ESTIMATE — verify with a contrast checker at implementation]) and the current muted-foreground choices appear sound; the hardcoded cyan on white (`cyan-600`) is the risky one and dies with F5 anyway.
- `prefers-reduced-motion` handled globally (§10.3); `prefers-color-scheme` respected via existing system default.
- Focus-visible already global — keep; verify no `outline: none` regressions when restyling.

### 10.6 What stays distinctive vs conventional

Distinctive (personal brand): the case-study evidence system (§11), mono figure captions, availability line, click-to-copy email micro-interaction, the honesty of the claims. Conventional (deliberately): nav, cards, buttons, forms, footer — recognizable patterns cost visitors zero cognitive effort (§7 familiarity; X/Geist high-contrast convention).

---

## 11. Case-Study and Technical-Proof Strategy

### 11.1 Reusable case-study template (extends the existing `Project` type)

```ts
interface CaseStudy extends Project {
  evidenceLevel: "client-production" | "own-production" | "demo" | "employment";
  role: string;                    // one line: "Solo engineer — architecture, build, deployment"
  timeframe: string;               // "2026 · 8 weeks"
  constraints: string;             // 1–2 sentences: budget/regulatory/legacy context
  decisions: { decision: string; because: string }[];  // 2–4 engineering trade-offs
  screenshots: { src: string; alt: string; caption: string }[];  // mono-captioned
  outcomes: { statement: string; basis: string }[];  // basis = how known: "deployed and in use daily", "PSI report 2026-10", or omitted entirely
  nextStep: string;                // constant: "Building something similar? →" CTA
}
```

Page layout (top→bottom): sector chip + evidence-tier chip + timeframe → H1 title → role line → screenshot (Fig. 01) → **The problem** (business language) → **What I built** (business language, 3–5 bullets) → **How it works** (technical, `decisions` as "chose X over Y because Z" — the strongest seniority signal available for Audiences B/C/D) → **Outcomes** (only statements with a `basis`; honestly labeled) → stack tags → next-step CTA. Limitations/lessons where useful ("what I'd do differently" — rare among portfolios and disproportionately trusted).

### 11.2 Evidence tiers (replaces the current undifferentiated mix)

Every project gets exactly one label, shown as a mono chip: **CLIENT SYSTEM** (live, in production, for a named or anonymized client) · **CLIENT SITE** (marketing/landing for a client) · **OWN PRODUCT** (deployed, self-owned) · **DEMO** (portfolio build) · **EMPLOYMENT** (work done as an employee — provenance matters, Reddit lesson §6). This single change fixes the prototype/production equivalence problem and pre-answers Audience B's "is this real?" question. `[RECOMMENDATION]` Confidentiality note: client names appear only with client comfort (§8.10 last row); the tier system works fully anonymized.

### 11.3 Disposition of all 12 existing projects [OBSERVED data; dispositions RECOMMENDATION]

| Project | Tier | Disposition for V2 |
|---|---|---|
| Cozee Care | CLIENT SYSTEM | **Flagship #1.** Rewrite metrics per §8.10 (mechanisms, not "100%" claims); add constraints (AU disability-services context), 2–3 decisions (RBAC model, Next.js for a11y); confirm client OK with name/link. |
| Violina Pflegedienst | CLIENT SYSTEM | **Flagship #2.** Same pass; the German-market + eldercare-accessibility angle is a strong DE-lead generator; add one eldercare UX decision. |
| Taqwa Group | CLIENT SYSTEM | **Flagship #3.** Replace "sub-100ms"/"zero-downtime" with mechanisms (Redis caching, indexed search, deployment process); "Vertical SaaS plot & land sales engine" → plainer: "land-inventory and sales platform." |
| 4j Traders | EMPLOYMENT | Keep as employment-tier case study; **remove the live link** (currently serves a "currently unavailable" page — F4); merge with the experience.ts entry so contribution and dates agree. |
| Rushkat | EMPLOYMENT | Remove the `#` link (F4). Convert to a focused backend-engineering writeup (query optimization + caching) — no live URL needed; this is the Audience D depth piece. |
| Online Doctor | OWN PRODUCT | Keep with honest tier label; trim "high-availability… enabling providers to scale" — it's a personal project, say so plainly (current clientSector already says "Personal Project" — promote that honesty to the tier chip). |
| FCSC Healthcare | CLIENT SITE (verify ownership) `[UNVERIFIED]` | Keep if a live link can be verified from a second network; drop the 95+/sub-2s claims (§8.10). |
| NDIS CarePlus | CLIENT SITE | Reconcile the identity split (id `ndis-careplus`, image `award-care.png`, URL `award-care-landing`) — pick one name; verify link reachability. |
| ProCourier | DEMO `[INFERENCE]` | Link unreachable from test network (F4); if dead, keep as DEMO with screenshots only, or archive. |
| TravelLast | DEMO | Netlify URL live; label DEMO; tone down "improving conversion rates" (no evidence). |
| Restaurant Hub | DEMO | Link unreachable; decide keep-as-demo or archive. |
| MiniShop | DEMO | Live; weakest content ("pure CSS3 utility tokens"); archive unless the grid needs the number — **curation beats count** (§6.2). |

Net recommendation: **3 flagships + ~5 supporting cases** on the index; the rest archived or folded into an "other work" line. Twelve undifferentiated cards currently dilute the three genuinely strong ones.

### 11.4 Screenshot standards

Uniform 16:10 crop at 1600px; WebP ≤ 300 KB source; browser chrome cropped (product, not the browser); real data states where legally/ethically possible (GitHub's "plausible real state" pattern §6) — for client systems use anonymized/fictionalized records, never real patient/client data `[CONFIDENTIALITY RULE]`; light+dark variants when the product themes (Peerlist rule); mono captions.

---

## 12. Conversion and Trust Improvements

### 12.1 Conversion model for this site (explicit, so every choice ladders to it)

Primary conversion = **a qualified enquiry** (form submit or email initiated by a business visitor with a real problem). Leading indicators = case-study depth reached, services viewed, CTA clicks (§13 taxonomy). Anti-goal = session time / pages-per-visit (attracts the wrong design decisions — §6.2, §7.1.3).

### 12.2 The proof band (new; replaces nothing — fills the credibility gap between hero and work)

Three to four items, each one verifiable: `Systems in production — 3` (cozeecare, violina, taqwa — count only what stays live) · `Clients in AU · DE · BD` (only if every named engagement is comfortable being counted) · `Sectors: healthcare · logistics · e-commerce · real estate` · `Response within N business days` (only if the owner commits to N). Tabular-nums, mono labels. Every number here survives the §8.10 standard or it doesn't ship.

### 12.3 Trust-surface inventory (what each audience sees at decision time)

| Trust question | Surface | Status today → V2 |
|---|---|---|
| Is this real? | Live client URLs + screenshots | Buried/broken → proof band, tier chips, verified links (F4) |
| Can he do complex work? | Case-study decisions section | Absent → §11.1 decisions block |
| Will he vanish? | FAQ (ownership/retainer) | On one page only → homepage teaser + How-I-work |
| Is my data safe with him? | Privacy page + form notice | Page exists, mismatched reality (F7) → rewrite with analytics truth; Art. 13 notice at form |
| Is he legitimate in DE? | Impressum | Exists; cites dead law (F13) → §5 DDG update, review required fields |
| Is he current? | Blog dates, copyright | 1 post from 2024 → de-emphasize or commit to cadence (F16) |
| Do others vouch for him? | Testimonials | **None legitimately available — omitted in V2 by policy (§7.2)**; LinkedIn recommendations linked instead `[owner action: request 1–3 LinkedIn recommendations]` |
| Can I verify his code? | GitHub | All `codeUrl`s are profile-level placeholders → per-project: link repos where public exists, otherwise omit the button entirely (current hiding logic is right; make it the data's job) |

### 12.4 CTA system

- One primary verb-object pair site-wide: **"Discuss a project"** → `/contact`. Case-study pages use the contextual variant: **"Building something similar?"** → `/contact?from=cozee-care` (the `from` param becomes an event property, §13 — attribution without PII).
- Secondary: **"View case studies"** (hero) / **"See how I work"** (services mid-page).
- Persistent quiet paths: email (plain link + click-to-copy, §12.5), CV (nav), LinkedIn/GitHub (footer + About).
- Buttons follow §10.4 states; no urgency styling, no animation loops on CTAs.

### 12.5 Contact: what changes and what deliberately doesn't

**Doesn't change:** the 3-field form (name/email/message). No controlled evidence supports adding friction, and the form is already minimal (§7.1.5); required = nothing new for the visitor.
**Changes:** (1) email promoted to an equal channel with click-to-copy affordance (rauno pattern) — high-intent visitors split by channel preference, and a mailto works even if the form breaks; (2) Art. 13 one-liner + `/privacy` link above submit; (3) server-side hardening (honeypot field + minimum fill-time + per-IP rate limit — §13.4); (4) success/error states that announce properly (`aria-live`) and set the reply-time expectation; (5) `?from=` attribution param.
**Explicitly rejected for V2:** booking-scheduler embeds (Calendly etc.) — adds a third-party surface + tracking before trust exists; multi-step forms; newsletter capture (no content cadence to justify it — Art. 6(1)(a) burden for zero value yet).

### 12.6 Post-conversion loop

On submit: email arrives (existing Nodemailer) **plus** a structured lead record (§13.4) so replies aren't lost in inbox noise. Owner-side service standard to decide (not code): reply window N, and whether a same-day acknowledgment auto-reply is used — if so, it must be written by the owner and say a human will follow up, never fake "I'm out of office."

---

## 13. Analytics, Attribution, and Enquiry-Capture Architecture

Tool facts below were verified against official pricing/limits pages on 2026-10-15 (Vercel docs updated 2026-07→09; Resend, Formspree, Cloudflare, Google consent docs fetched same day). Page views are not leads; CTA clicks are intent, not opportunities — the taxonomy keeps those separate.

### 13.1 The three layers, mapped to what is actually available on Vercel Hobby

| Layer | Question | Verified-free capability | Honest gap |
|---|---|---|---|
| **A. Anonymous analytics** | Where does traffic come from; which pages work | **Vercel Web Analytics** — 50,000 events/mo, cookieless (daily-reset hash, no cross-site tracking; no consent banner needed for most EU uses), hard-capped: over quota → collection pauses, **never bills** | 1-month reporting window only |
| **B. Intent signals** | Which content moves visitors toward contact | Most intent is derivable from **URL-level pageviews**: each case study is its own URL, so "project viewed per case" is a pageview query, not a custom event; `/services`, `/contact` views + referrer paths give the funnel | **Custom events are Pro-only on Vercel** — discrete `cta_clicked`, `form_started`, `validation_failed` events are *not* available free. Declared limitation, not hidden (§13.3) |
| **C. Actual leads** | Who enquired, from where, about what | The existing **Server Action + Nodemailer** pipeline, hardened (§13.4) — email is the lead store; referral attribution travels *inside* the lead, requiring no analytics service | No CRM; inbox search is the query engine (fine at 0–50 enquiries/mo) |

**Recommended stack (total $0/mo):** Vercel Web Analytics (auto) + Vercel Speed Insights (optional, free, 10K events/30 d, pausable) + hardened Nodemailer pipeline. **No GA4** (EU Consent-Mode banner overhead for zero portfolio value), **no PostHog** (heavier script; exact free quotas unverifiable this session — revisit only if discrete intent events become a real decision need), **no Clarity** in V2 (session replay is disproportionate at this traffic; reconsider if a specific funnel question appears), **no new email service** (Resend free tier — 3,000/mo, 100/day — is the clean upgrade path if Gmail SMTP ever becomes the bottleneck; not needed now).

**Compliance flag worth stating plainly:** Vercel's Hobby plan is documented for *non-commercial personal use*. A personal portfolio advertising services is customary on Hobby; running paid ads or transacting through the site would cross the documented line. Keep commerce (invoices, payments) off the deployment.

### 13.2 Event taxonomy — what each event enables, and where it comes from

| Event | Source (Hobby-free) | Non-sensitive properties | Decision it enables |
|---|---|---|---|
| `page_view` | Vercel Web Analytics (automatic) | path, referrer, country/region as shown in dashboard | Which acquisition sources and pages deserve investment |
| `project_viewed` | Pageview on `/projects/[id]` (derived) | which case study | Which proof resonates; flagship selection for the homepage |
| `services_viewed` | Pageview on `/services` (derived) | — | Commercial-page reach |
| `contact_page_viewed` | Pageview on `/contact` (derived) | referrer of the visit | Funnel end-stage volume; proxy for form_started (declared proxy) |
| `enquiry_submitted` | Server Action success (the email itself + optional structured log) | referral source string, `?from=` attribution value, timestamp | **The primary business metric** — leads per source per case study |
| `enquiry_blocked` | Server Action honeypot/rate-limit path (log line only) | rule triggered | Spam pressure; when to add Turnstile |
| `cv_downloaded` | Not directly measurable (static file) | — | — — see §13.7 limitation; proxy: `/about` views |
| ~~`cta_clicked`, `form_started`, `validation_failed`~~ | **Requires Pro plan or PostHog** — excluded from V2 | — | Revisit if/when upgrading (decision rule in §13.7) |

Every event must inform a real decision — there is no event in this table whose absence or presence wouldn't change an owner action.

### 13.3 Attribution design (no PII leaves the visitor's context)

1. Case-study CTAs link to `/contact?from=<case-id>`; the contact page reads the param client-side.
2. The form adds one **hidden** field `source` = sanitized `?from` value + `document.referrer`'s origin only (e.g., `linkedin.com`, `google.com` — never the full URL with user identifiers).
3. On submit, the server action validates `source` like any other input (length-capped string) and includes it in the email header/body ("Source: linkedin.com via cozee-care").
4. Result: every lead self-reports its funnel path; Web Analytics' referrer dashboard corroborates at the aggregate level. No third party sees the join.

### 13.4 Enquiry-capture architecture (hardening the existing pipeline)

```
Browser                          Server (Vercel function)                Destination
─────────                        ────────────────────────                ───────────
form (name, email, message,   →  Zod validate (exists)                →  Nodemailer → Gmail
 honeypot, ts, source)           + honeypot check (silent success)       (label "Lead", filters by
 + 3s minimum render time        + timestamp check (<3s → drop)           subject prefix)
 [optional later: Turnstile]     + per-IP throttle: Vercel WAF rule      →  structured lead line
Next.js Server Action has        (Hobby includes free custom WAF          in function logs (1 h
built-in same-origin CSRF        rules; in-memory Maps are unreliable     retention) as audit trail
enforcement (Origin vs Host)     across isolates — documented limit)      [optional P2: Blob archive]
```

Decisions and their justifications:
- **Keep Nodemailer/Gmail** — 0–50 enquiries/mo is two orders of magnitude under Gmail's sending reality; Resend (free: 3,000/mo, 100/day, custom domain) is the named fallback, not a now-dependency.
- **Honeypot + render-time check** first; **Turnstile** (Cloudflare — free, no puzzles, privacy-light for EU) only if blocked submissions show real pressure; **reCAPTCHA excluded** (worst EU privacy posture).
- **No database, no Redis, no Upstash** at this volume — each adds an account, a dependency, and a failure mode for zero current benefit.
- **Storage = the inbox.** Gmail label + subject convention (`[Lead] …`) is queryable, durable, free, and needs zero maintenance. A Vercel Blob lead archive is a P2 nicety (quota `[UNVERIFIED]` — verify before building).
- **Error handling:** send-failure already returns a user-facing error with the mailto fallback visible on `/contact` (§12.5) — a failed form never strands a motivated visitor.
- **PII policy:** name/email/message exist only in the email pipeline and the inbox; they never enter analytics properties (nothing in Layer A/B can even receive them).

### 13.5 Privacy & security safeguards

- Cookieless analytics → no consent banner required for standard EU use (per Vercel's documented design; not legal advice).
- Privacy page rewritten to name **exactly** the processors actually present post-V2: Vercel (hosting/analytics), Google (email delivery of submitted data), the form pipeline. Fixes today's mismatch (F7).
- Art. 13 GDPR notice at the form: one line — controller identity (name/email from Impressum), purpose (responding to the enquiry), lawful basis (Art. 6(1)(b) pre-contractual), retention ("as long as needed to handle the enquiry"), rights + `/privacy` link.
- Retention: inbox leads kept while relevant to active/pipeline work; the owner should pick a cleanup ritual (e.g., quarterly) — a calendar item, not code.
- Secrets stay server-side (`SMTP_*` env, non-public); rotation handled in V2-05.

### 13.6 Testing & verification procedure (Stage 4 exit)

1. Submit the form normally → email arrives, labeled, with correct source line; dashboard shows the `/contact` pageview.
2. Submit with honeypot pre-filled (devtools) → user sees success, no email arrives (silent drop verified).
3. Submit in <3 s (scripted) → dropped; log line present.
4. 12 rapid submissions from one IP (dev proxy) → WAF/throttle engages; legit path recovers after window.
5. Submit with SMTP env misconfigured (staging) → user-visible error + mailto fallback prominent; no silent loss.
6. Mobile device run-through: keyboard types, fields scroll into view, errors announced (VoiceOver/TalkBack quick pass).
7. Verify `?from=` attribution end-to-end: click a case-study CTA → submit → email contains the case id.

### 13.7 Explicit limitations (what cannot be known on this stack)

Discrete CTA/form micro-events (Pro custom events or PostHog territory); CV-download counts (static file; proxy = About views); visitor identity or return-visit journeys (cookieless by design); per-user funnels. Decision rule: **when a real decision is blocked by the absence of a discrete event for two consecutive months, evaluate PostHog EU cloud (verify quotas at signup) or Vercel Pro** — not before.

### 13.8 Split of work: code vs owner account actions

| You code | You click (account-level, ~30 min total) |
|---|---|
| `<Analytics/>` + `<SpeedInsights/>` imports | Enable Web Analytics + Speed Insights for the project in the Vercel dashboard |
| Source/`?from` plumbing + hidden field | Gmail: rotate app password; create "Lead" label + filter |
| Honeypot, timestamp check, email template with source | (Only if needed later) Cloudflare Turnstile site key |
| WAF rule config | (Only if needed later) Add rate-limit rule in Vercel dashboard |
| Privacy/Impressum text | Search Console: verify property, submit sitemap (pairs with V2-01) |

---

## 14. Accessibility, Security, Performance, SEO, and GEO Recommendations

### 14.1 Performance

**Measured on the live deployment (2026-10-15, transfer sizes via HTTP):** homepage first-load ≈ 1,040 KB — ~744 KB JS (11 chunks; largest 221 KB), 74 KB CSS, 119 KB woff2 fonts, 53 KB HTML. No Lighthouse run was possible (tooling absent; PSI anonymous quota exhausted — see header disclosure). `[ESTIMATE]` Mobile LCP ~2.5–4 s on Slow 4G, driven by (a) the hero being painted `opacity: 0` until framer-motion hydrates, (b) 744 KB of JS for a text page. CLS risk is low-moderate (font swap handled by `next/font`; motion transforms don't reflow). INP risk is low (simple interactions) but hydration cost inflates it on mid-tier Android.

| Action | Detail | Expected effect | Effort |
|---|---|---|---|
| P1 | Remove JS entrance animation from the Hero (server-paint it static; keep `whileInView` for below-fold sections only) | LCP element renders with HTML — largest single lever | S |
| P1 | Convert the three hero-adjacent framer imports (Navbar menu, ProjectCard, TechStack) to CSS transitions where behavior allows; target framer-motion only where spring/complex motion is real | Cuts a large share of the 744 KB JS | M |
| P2 | Audit the 74 KB CSS (Turbopack output should be far smaller; check for accidental `@source`/safelist bloat or duplicated preflight) | Payload + cache hygiene | S–M |
| P1 | Recompress the 11 project PNGs → WebP ≤ 300 KB sources (server-side `next/image` then optimizes per-device; smaller sources also reduce Vercel image-transform quota usage) | Detail-page loads; quota headroom | S |
| P2 | Self-host fonts are already optimal (`next/font`, swap, preload) — keep. Add `fetchPriority="high"` to the flagship case image on `/` if it becomes LCP after the hero fix | Guards against regression | S |
| P2 | Security/consistency headers (§14.4) add zero payload | — | S |

**Acceptance criteria (to verify post-change with a real PSI run):** mobile LCP < 2.5 s (field data target per CWV guidance), total JS ≤ ~350 KB compressed on `/`, CSS ≤ ~40 KB, zero layout shift from hero, INP < 200 ms in field. Lab numbers are diagnostic only; field (CrUX) data requires real traffic and arrives after launch.

### 14.2 Accessibility (WCAG 2.2 AA)

Current state: good bones (focus-visible outline, sr-only labels, semantic landmarks, labeled nav toggle text) with specific gaps. Manual-testing items are marked **[MANUAL]** (cannot be verified without a browser/screen reader).

| Item | Criterion | Current → V2 |
|---|---|---|
| Focus hidden under sticky header when tabbing scrolled content | 2.4.11 Focus Not Obscured (AA) | `[MANUAL]` verify; fix with `scroll-margin-top` on targets or `scroll-padding-top` on root equal to header height |
| Form errors: color-only, not programmatically associated | 3.3.1/3.3.3, 1.4.1 | `aria-invalid` + `aria-describedby` + icon besides color (§10.4) |
| Success/error banners silent to AT | 4.1.3 Status Messages | `aria-live="polite"` wrapper |
| Mobile nav toggle lacks state | 4.1.2 | `aria-expanded` + `aria-controls` |
| No skip link | 2.4.1 | "Skip to content" as first focusable element |
| Cyan badges on white (`services` page) — contrast risk | 1.4.3 | Dies with F5 tokenization; verify all token pairs ≥ 4.5:1 (body) / 3:1 (UI) — `[MANUAL]` contrast pass |
| Touch targets | 2.5.8 (AA) | 24×24 minimum — audit theme toggle + social icons (currently 20px glyphs with padding — likely pass, verify **[MANUAL]**) |
| `prefers-reduced-motion` | 2.3.3 (AAA) / HIG principle | Global media query kills entrance/whileInView animations (§10.3) |
| Zoom/reflow | 1.4.10 | `[MANUAL]` 200% zoom / 320px width pass — no horizontal scroll (flex-wrap audit) |
| Heading order | 1.3.1 | Services page jumps h1→h2→h3 correctly; ProjectDetails h2/h3 fine — one **[MANUAL]** sweep |

### 14.3 SEO

State: title/description present; per-project metadata present but **no OG image, relative canonicals, wrong-domain sitemap/robots, no JSON-LD, homepage missing OG/Twitter entirely** (all F1/F3/F12).

1. **Canonical/domain (P0):** set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)` in `layout.tsx`; make `robots.ts` and `sitemap.ts` derive from the same env; add `/services`, `/terms`, `/privacy`, `/impressum` to the sitemap. Per Google's sitemap doc, a sitemap is a hint of *preferred canonical URLs* — cross-host URLs without cross-submission setup are rejected as errors, so the current file actively wastes the hint (source: developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap, accessed 2026-10-15).
2. **Social previews (P0):** static OG image 1200×630 (name + role + indigo mark, both-theme-legible), wired via `openGraph.images` at root; per-project OG uses the project screenshot (already on disk).
3. **Structured data (P1, only what Google supports today):** `ProfilePage` JSON-LD on `/about` with `mainEntity` Person (name, jobTitle, `sameAs` → GitHub/LinkedIn) — Google's current gallery supports ProfilePage and has **no standalone Person result**; `ProfessionalService` (a `LocalBusiness` subtype) JSON-LD on `/contact` or footer `[owner decision — requires real address policy; see §18]`; **no FAQPage markup** — Google retired FAQ rich results from Search (2026-05-07) and removed the docs (2026-06-15); the FAQ section stays for humans, unmarked. `Article` schema on blog posts if the blog survives (P2).
4. **Titles/descriptions (P1):** rewrite to the §8.7 hierarchy; unique per page; Google may rewrite problematic titles (title-link doc) — descriptive and honest beats keyword-stuffed.
5. **Internal linking (P2):** case studies link to 2 related cases + services; footer sitemap-style links to all pages.
6. **Content (P1):** the service pages' descriptive prose (what's built, for whom, process) is the actual ranking surface — GEO and SEO share this input (next).

### 14.4 Security

| Item | State | Action |
|---|---|---|
| SMTP credentials | `.env` untracked (good); rotation status unknown since July audit | **Rotate the Gmail app password** regardless (5 min, closes the July exposure window); keep using env-only secrets |
| Contact endpoint | Zod + HTML-escape present; no rate limit/honeypot; Server Actions have built-in same-origin checks in Next.js (actions verify Origin/Host) `[agent-verifying — final wording in §13.4]` | Honeypot + fill-time + per-IP throttle (§13.4) |
| Security headers | Only HSTS (Vercel default) | Add via `next.config.ts` headers(): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or CSP `frame-ancestors`), minimal `Content-Security-Policy` (script-src 'self' + analytics host once chosen; Vercel injects its own needs — start Report-Only) |
| `remotePatterns: hostname **` | Any host can be image-proxied through the deployment | Remove; use local images only (none remote today) |
| Dependency currency | Next 16.1.1 / React 19.2 current; `npm audit` clean per last fix commit | Add to roadmap: quarterly `npm audit` + updates (calendar item, not tooling) |
| Secrets in client bundle | None found (SMTP_ vars server-only via process.env in server action) `[OBSERVED]` | Keep; never prefix these with NEXT_PUBLIC_ |

### 14.5 GEO (Generative Engine Optimization) — grounded, not speculative

Google's documented position (AI-features doc, updated 2025-12-10; AI-optimization guide, updated 2026-07-10): **no special markup or tricks are required for AI Overviews/AI Mode**; eligibility = being indexed and snippet-eligible; `nosnippet`/`max-snippet` control AI surfaces like regular search; Google explicitly debunks `llms.txt`, chunking, and "writing for AI" rewrites. `[OBSERVED — official guidance]`

Therefore the GEO strategy for this portfolio **is** the SEO + content strategy: (1) fix indexing (F1/F3) so the pages are eligible at all; (2) keep first-hand, specific, non-commodity content — the §11 case-study decisions blocks ("chose X over Y because Z under constraint W") are exactly the first-hand specificity that neither generic agency copy nor AI-text can synthesize; (3) consistent entity signals (name, role, `sameAs` profiles, matching LinkedIn headline) so models and engines can resolve "Sahad / Sahad Labs / sahadcse" to one person; (4) don't chase GEO vendor tools or llms.txt — documented as no-ops. Emerging and unverifiable by nature; revisit when Google's guidance changes.

---

## 15. Prioritized V2 Scope and Feature-Decision Table

Effort in engineering hours, assuming familiarity with the codebase (i.e., the owner). Confidence = belief that the change produces its expected impact.

### 15.1 Master table

| ID | Feature / correction | Origin | Problem addressed | Audience | Expected impact | Confidence | Effort | Dependencies | Priority | Acceptance criteria |
|---|---|---|---|---|---|---|---|---|---|---|
| V2-01 | Canonical domain fix: `NEXT_PUBLIC_SITE_URL` env → `metadataBase`, `robots.ts`, `sitemap.ts`; add `/services`, `/terms`, `/privacy`, `/impressum` to sitemap | Defective | F1 — SEO signals point at wrong domain | All (organic) | Search visibility restored | High | 2 h | Owner sets env var in Vercel | **P0** | `robots.txt` + every sitemap `<loc>` shows `sahadcse.vercel.app`; rendered canonicals absolute; sitemap submitted in Search Console |
| V2-02 | Social preview images: root OG image 1200×630; per-project OG from screenshots; fix `summary_large_image` without image; absolute `og:url` | Defective / Planned | F3 — no link preview anywhere | A, B, D (sharers) | Shares on LinkedIn/WhatsApp render a card | High | 3–4 h | V2-01 | **P0** | `og:image` present on every page; LinkedIn Post Inspector shows the card |
| V2-03 | Outbound proof-link repair: remove/replace dead links (4j live URL, Rushkat `#`, unreachable demos); decide per project keep/archive | Defective | F4 — broken proof | A, B, D | Trust leak closed | High | 2 h (+ owner decisions) | Client-comfort check (§8.10) | **P0** | Every external link returns 200 or is removed; no `href="#"` renders as an icon |
| V2-04 | Claims & metrics rewrite per §8.10 across projects, services, experience, meta descriptions | Defective | F2 — unverifiable claims as metrics | A, B, C, D | Credibility + legal safety with DE healthcare-adjacent clients | High | 6–8 h | Owner verifies which metrics are measurable | **P0** | No claim remains without a stated basis; §8.10 dispositions applied; snippets no longer carry "100%" claims |
| V2-05 | Rotate SMTP app password; remove dead env vars | Defective (security) | §14.4 — July-audit credential exposure | Owner | Closes credential exposure window | High | 0.5 h | Owner Gmail action | **P0** | New app password in Vercel env; old one revoked; `.env` matches Vercel |
| V2-05b | Retire or de-index the legacy `sahad.vercel.app` deployment (currently live, titled "Sahad's Portfolio") | Defective | F1 companion — duplicate content on the wrong domain, referenced by the old sitemap | Organic search | Removes the duplicate the current sitemap actively promotes | High | 0.5 h | Owner Vercel dashboard | **P0** | `sahad.vercel.app` returns 404/404-style, or serves a canonical pointing here |
| V2-06 | Homepage restructure (§9.2): hero copy, proof band, 3 flagship cards **with images**, services teaser, how-I-work, FAQ teaser, final CTA | Proposed (extends Planned) | F6 — homepage can't convert | A, B | Conversion path complete above the fold and beyond | High | 12–16 h | V2-04, V2-12 | **P1** | All 8 sections present; 3 flagship cards show imagery; primary CTA reachable ≤ 1 click from every section |
| V2-07 | Case-study system: `CaseStudy` template (§11.1), evidence-tier chips, rewrite 3 flagships fully + 5 supporting lightly; archive 4 | Proposed | F2/F11 — cards without proof, claims as metrics | B, C, D | Strongest proof asset fully used | High | 12–20 h | V2-03, V2-04, V2-12 | **P1** | 3 flagships satisfy full template; every project shows exactly one tier chip; archived projects off `/projects` |
| V2-08 | Projects index: curated order, uniform image cards, sector filter chips | Proposed | F6/F11 | A, B | Self-selection by sector; visual proof at index level | Medium-High | 4–6 h | V2-07 | **P1** | Cards render images; filter works without JS reload; count ≈ 8 |
| V2-09 | Design-token consolidation: delete all hardcoded `cyan-*`/`slate-*`/`blue-*`/`purple-*`/`green-*`/`red-*` utilities; add `--success`/`--danger`/radius scale | Defective (refactor) | F5 — two design languages | All | One coherent brand surface; themable | High | 6–10 h | None | **P1** | Repo grep finds zero off-token color utilities; services page + nav match token palette |
| V2-10 | Type & spacing system: six-preset scale, mono→labels/captions only, 68rem content width, single width owner | Proposed | F5/F6 | All | Consistent hierarchy; reading-first measure | Medium | 4–6 h | V2-09 | **P1** | No `font-mono` on headings; one width constraint in layout; visual QA at 390/768/1440 |
| V2-11 | Image pipeline: 11 PNGs → WebP ≤ 300 KB, 1600 px, uniform 16:10 crops, mono captions | Defective / Proposed | F11 | A, B | Detail pages load fast; index shows work | High | 4–6 h | One-time tooling (sharp/squoosh) | **P1** | All sources ≤ 300 KB; cards + details render WebP |
| V2-12 | Motion budget + hero static paint; reduced-motion kill-switch; framer only where spring motion is real | Defective / Proposed | F8 — LCP behind JS; motion without information | All (mobile most) | LCP element in initial HTML; payload down | High | 4–8 h | V2-09 | **P1** | Hero text visible with JS disabled; `prefers-reduced-motion` kills all animation |
| V2-13 | Contact hardening: honeypot + fill-time + per-IP rate limit; `aria-invalid`/`aria-describedby`/`aria-live`; Art. 13 notice + privacy link; success expectation text | Defective / Proposed | F9 — spam exposure, a11y, Art. 13 | A, B | Lead channel reliable + compliant | High | 4–6 h | V2-16 for privacy text | **P1** | Bot submission (honeypot filled) rejected silently; 11 rapid submits → throttle; errors announced by screen reader (manual test) |
| V2-14 | Analytics implementation per §13 (pageviews + intent events + enquiry capture) | Proposed (audit ADD) | F7 — zero measurement | Owner | Decisions become data-driven | High | 3–5 h | §13 account setup | **P1** | Events visible in dashboard after test walkthrough; enquiry test arrives with attribution |
| V2-15 | Legal content: privacy page rewritten to match actual processing; Impressum → §5 DDG | Defective | F7/F13 | DE visitors | Compliance credibility | High | 2–3 h | V2-14 (know what's installed) | **P1** | Privacy names each processor actually present; Impressum cites DDG with required fields |
| V2-16 | SEO content pass: titles/descriptions per §8.7; `ProfilePage` JSON-LD (about), `ProfessionalService` JSON-LD `[owner decision on address]` | Planned / Proposed | F12 | Discovery (search + AI) | Eligible for current rich results | Medium | 4–6 h | V2-01 | **P1** | Valid JSON-LD (Rich Results Test); unique title/description per page; no FAQPage markup (retired) |
| V2-17 | About re-sequenced (§9.3): business intro, work-with-me, experience, education, curated skills, CV + LinkedIn, open-to-work line; fix years claim | Defective / Proposed | F10 — mixed positioning, checkable mismatch | D (+A) | Verification page for two audiences | High | 3–5 h | Owner: photo decision | **P1** | History consistent with case studies; years claim defensible; CV reachable from nav + About |
| V2-18 | Security headers + `remotePatterns` cleanup | Planned | §14.4 | All + owner | Baseline hardening | High | 2 h | None | **P1** | Headers present via curl; remote host allowlist empty |
| V2-19 | Services page rewrite: claims → process promises (§8.10), pricing-model language (H5), tokenized styles, mid-page CTA | Defective | F2/F5 | A, B | Commercial page credible and on-brand | High | 4–6 h | V2-04, V2-09 | **P1** | No deliverable-score promises; one palette; CTA present |
| V2-20 | A11y sweep: skip link, `aria-expanded`, 2.4.11 scroll-padding, contrast pass, 200%-zoom pass | Planned | F15 | All + procurement checklists | WCAG 2.2 AA posture | Medium | 4–6 h | V2-09 | **P2** | Checklist §17.2 passes (manual items marked) |
| V2-21 | Repo hygiene: README rewrite, delete `SAHAD.zip` + scaffold SVGs, normalize resume filename, commit the updated resume | Defective | F14 | Owner / collaborating engineers | Professional repo | Medium | 2 h | None | **P2** | No scaffold assets; README describes the project |
| V2-22 | Blog decision: nav de-emphasis + either commit to monthly cadence or fold the post into case-study depth | Proposed | F16 — stale single post | All | No stale-content signal | Medium | 1 h + editorial | Owner decision | **P2** | Nav reflects decision; no 2024-dated orphan on a prominent surface |
| V2-23 | Performance bundle diet: framer imports trimmed to real need, 74 KB CSS audit | Defective / Proposed | F8/§14.1 | Mobile visitors | Payload target ≤ ~350 KB JS | Medium | 6–10 h | V2-12; post-launch PSI baseline | **P2** | Re-run PSI (quota reset): documented before/after |
| V2-24 | Click-to-copy email affordance with "Copied" state | Proposed | §12.5 H6 | A, B | Signature micro-interaction; channel choice | Medium | 2 h | V2-09 | **P2** | Copies on click; visible confirmation; reduced-motion safe |
| V2-25 | Availability line + quarterly content ritual (§12.2, §16 Stage 6) | Proposed | Sustained trust | A, B | Site never goes stale again | High | 0.5 h + calendar | None | **P2** | Line present; calendar reminder exists |
| V2-26 | Shareable sector-filter URLs (`/projects?sector=healthcare`) | Proposed | §9.5 | A, B | Referral deep-links | Low-Medium | 2–3 h | V2-08 | **P3** | URL param applies filter on load |
| V2-27 | CI (lint + typecheck + build on push), error monitoring, test framework | Planned (July audit ADD) | §4.2 | Owner | Regression safety | Medium | 8–16 h | None | **P3** | Deferred — see §19 |
| V2-28 | Testimonials block (Linear pattern: max 3, name/role/company) | Proposed | §12.3 | A, B | Third-party voice | High (when real) | 3–4 h | **Real testimonials obtained** | **P3** | Blocked on owner securing 1–3 genuine, credited, permissioned testimonials |
| V2-29 | German-language landing summary | Proposed | DE market fit | A (DE) | Local-market signal | Low-Medium | 8–12 h + translation | DE client proof | **P3** | Deferred — see §19 |
| V2-30 | Architecture diagrams in flagships (§11 template option) | Proposed | §6 (audience C/D depth) | C, D | Seniority signal | Medium | 2–4 h / project | V2-07 | **P3** | Deferred |

### 15.2 Groupings

**Group 1 — Immediate fixes (P0; do this week; ~8–12 h):** V2-01 → V2-05. Pure risk removal; nothing here depends on design decisions. V2-01+V2-02+V2-03 alone end the "invisible/broken on share" era.

**Group 2 — V2 launch scope (P1; the release):** V2-06 → V2-19 (excluding V2-20 which can slip). Content-first ordering per §16. ~55–75 h total.

**Group 3 — Post-launch (P2; first 4–6 weeks after release):** V2-20 → V2-25, first PSI + analytics review, first content ritual cycle.

**Group 4 — Deferred (P3; no current business case or blocked):** V2-26 → V2-30.

### 15.3 Explicitly excluded from V2 (with reasons)

| Excluded | Reason |
|---|---|
| Booking-scheduler embed (Calendly/Cal.com) | Third-party surface + tracking before trust; a reply-window expectation does the same job (§12.5) |
| Newsletter capture | No content cadence yet; consent burden (Art. 6(1)(a)) for zero delivered value |
| New testimonials UI | Nothing legitimate to put in it yet (V2-28 unblocks later) |
| Client portal / login / dashboard on this site | A portfolio is not an app; auth = attack surface + maintenance |
| Full CMS migration | Content volume (~15 documents) doesn't justify it; typed data files are fine at this scale |
| Playwright/Vitest/Husky suites | Solo static site; manual checklist (§17) covers V2; revisit if the site grows dynamic surface (§19) |
| PWA/manifest | No app-like use case; no push/repeat-use loop to serve |
| Cursor effects, scroll-hijacking, page transitions, animated gradients | Contradict §7.2/§10.2; every source in §6 that discusses motion argues restraint |
| AI-service offering page | No shipped AI evidence in the portfolio (§8.1); revisit after one real AI-enabled delivery |
| Standalone SEO/GEO service page | No outcome evidence; technical SEO stays bundled inside website builds where it is verifiable |

---

## 16. Step-by-Step Implementation Roadmap

Stages sequenced to minimize rework — tokens before pages, content before chrome, measurement before optimization. Total launch-scope estimate: **~60–85 engineering hours** (Groups 1+2) `[ESTIMATE — based on the inspected codebase; excludes owner-side decisions (client permissions, photos, service standards) and account setups]`.

| Stage | Contents | Outputs | Dependencies | Risks | Acceptance |
|---|---|---|---|---|---|
| **Stage 0 — Baseline & decisions** (2–3 h) | Deploy current analytics-free state as measurement baseline; owner answers: client-name permissions per project, metric verifiability per §8.10, photo yes/no, reply-window N, availability truth, professional-service address decision | Decision sheet (can be a dated note in `docs/`) | None | Owner decisions stall — timebox to one week; defaults defined in §18 | Sheet complete |
| **Stage 1 — Discoverability & trust triage** (V2-01→05; ~8–12 h) | Domain fix, OG images, link repair, claims rewrite, credential rotation | P0 group live on production | Stage 0 (client permissions, metric decisions) | 4j link decision needs client contact — ship with link removed, restore later if cleared | Group 1 acceptance criteria; links curl-checked; deploy and verify robots/sitemap live |
| **Stage 2 — Tokens & components** (V2-09, V2-10; ~10–16 h) | Palette consolidation, success/danger tokens, radii, type presets, spacing, width owner, motion budget, reduced-motion | `globals.css` + `Button`/`Badge`/`Card`/`SectionHeader` aligned; zero off-token utilities | None (parallelizable with Stage 1) | Scope creep into full redesign — timebox; visual diffs reviewed per component | Grep acceptance; theme toggle QA light/dark; no regression on existing pages |
| **Stage 3 — Content architecture** (V2-06, V2-07, V2-08, V2-11, V2-17, V2-19; ~40–55 h) | Homepage restructure, case-study system + rewrites, image pipeline, About, Services rewrite | New homepage, `/projects`, flagship case pages, About, Services | Stage 1 (claims), Stage 2 (tokens) | Longest stage — ship section-by-section behind normal commits; screenshots may need a capture session (owner screen-time) | Each page matches §9 outlines; flagship template complete; imagery pipeline done |
| **Stage 4 — Contact & measurement** (V2-13, V2-14, V2-15; ~9–14 h) | Form hardening, analytics events, privacy rewrite, Impressum update | Hardened lead channel + working measurement + truthful legal pages | Stage 0 (N), §13 account setups (owner, ~1 h) | Analytics script choice may shift with quota verification (§13) | §13 verification procedure passes end-to-end |
| **Stage 5 — SEO, a11y, perf polish** (V2-16, V2-18, V2-12 remnants; ~8–12 h) | JSON-LD, titles/descriptions, headers, a11y quick wins, LCP fix verification | Indexed-clean, AA-postured, fast-launching site | Stages 2–4 | PSI quota/tooling for verification — schedule the run | §14 acceptance numbers; Rich Results Test passes |
| **Stage 6 — Release & ritual** (2–3 h + ongoing) | Full §17 checklist, deploy, Search Console submit + sitemap, analytics smoke test, set the quarterly content calendar (V2-25) | V2 live; measurement armed | All above | Post-launch regressions — keep previous deployment one-click revertable | §17 checklist green; announcement-ready OG card verified |

Calendar reality for a solo founder working part-time: Group 1 inside week 1; Stages 2–6 spread over **3–5 weeks**. No deadline is promised — the plan is effort-shaped, not date-shaped.

---

## 17. Acceptance Criteria and Testing Checklist

### 17.1 Pre-release functional QA (manual; ~45 min)

- [ ] Every nav link, footer link, and CTA resolves on the deployed build (click-through on production URL, not just dev)
- [ ] Every external project link opens the expected site (curl-checked + spot-checked in browser); zero `#` links render as icons
- [ ] Theme toggle: light/dark/system all render correctly on `/`, `/projects`, one case study, `/services`, `/contact`; no unstyled flash on cold load
- [ ] Mobile (390 px): nav, hero, cards, case study, form all usable one-handed; no horizontal scroll anywhere (`document.documentElement.scrollWidth <= innerWidth`)
- [ ] 200% browser zoom on `/` and `/contact`: content reflows, no clipped controls
- [ ] Form: valid submit, each field's error state, success state; back-button return shows clean form

### 17.2 Accessibility checklist (auto + manual)

| Check | Method | Pass condition |
|---|---|---|
| Automated audit | Lighthouse/axe when tooling available (or axe DevTools extension) | No critical/serious issues |
| Keyboard path **[MANUAL]** | Tab through every page | All interactive elements reachable in DOM order; focus visible at all times; nothing hidden under the sticky header (2.4.11 — test at scrolled position) |
| Skip link **[MANUAL]** | Tab from page load | First Tab shows "Skip to content"; activates to `#main` |
| Screen reader form **[MANUAL]** | VoiceOver/TalkBack on `/contact` | Labels announced; errors announced (`aria-live`); submit state announced |
| Contrast **[MANUAL]** | DevTools picker on token pairs | ≥ 4.5:1 body text, ≥ 3:1 large text/UI borders, both themes |
| Targets **[MANUAL]** | Measure toggle, socials, tags | ≥ 24×24 px each (2.5.8) |
| Reduced motion **[MANUAL]** | OS setting on | Zero entrance/scroll animations; content fully visible |
| Heading order **[MANUAL]** | Landmarks/headings extension | One h1 per page; no skipped levels |

### 17.3 Discoverability checklist

- [ ] `metadataBase` set; view-source shows absolute canonical + `og:url` on every page
- [ ] `og:image` present on `/` and all case studies; LinkedIn Post Inspector shows the intended card
- [ ] `robots.txt` → correct sitemap URL; sitemap contains all 11+ public routes on the correct host
- [ ] Rich Results Test: ProfilePage (About) valid; no invalid/retired markup shipped
- [ ] Search Console: property verified, sitemap submitted, "Page indexing" report checked after 2 weeks
- [ ] Each page: unique title + description matching §8.7; no truncated/boilerplate duplicates

### 17.4 Content & claims checklist

- [ ] §8.10 table fully dispositioned (each row: applied or consciously kept-with-basis)
- [ ] No number appears on the site without a stated or internally known basis
- [ ] Evidence-tier chip present on every case study; tier matches reality
- [ ] Privacy page names only real processors; Impressum cites §5 DDG with required fields present
- [ ] Availability line and reply-window text reflect what the owner will actually honor

### 17.5 Release procedure

1. Run `npm run lint` + `npm run build` clean → deploy to production.
2. Execute 17.1–17.4 against the production URL.
3. Analytics smoke test per §13.6 (items 1–2 minimum on day one).
4. Search Console sitemap submission; note date.
5. Keep the previous deployment available for one-click rollback until day 7.
6. Book the two-week post-launch review: PSI re-run (quota reset), indexing report, first lead check.

---

## 18. Risks, Dependencies, Unresolved Questions, and Assumptions

### 18.1 Risks

| Risk | L'hood | Impact | Mitigation |
|---|---|---|---|
| Vercel Hobby "non-commercial" interpretation tightens for service-advertising portfolios | Low-Med | Hosting change required | Keep the site non-transactual (no payments/ads); the documented line is commerce on the site, not advertising a person's services; Resend-free + static export to any host is the escape hatch |
| Client discomfort with named attribution discovered mid-rewrite | Medium | Flagship rework | Stage 0 decision sheet resolves *before* content work; anonymized tiers still work (§11.2) |
| Gmail delivery reputation (form mails spam-filtered) | Low-Med | Lost leads | Test §13.6 item 1 from a non-owner address; if deliverability wobbles, switch to Resend free tier (named fallback, 2 h swap) |
| Legacy `sahad.vercel.app` indexed content lingers after fix | Medium | Split signals for weeks | V2-05b + Search Console removal request for stale URLs; monitor indexing report |
| PSI/Lighthouse verification blocked again by quota | Medium | Acceptance gating | Criteria already labeled; borrow a different network/machine or use `pagespeed.web.dev` UI manually for the two verification runs |
| Scope creep in Stage 3 (content stage balloons into redesign) | High (typical) | Timeline blowout | Timeboxes in §16; section-by-section commits; Stage 2 acceptance gate before content starts |
| Solo capacity gap during client work | Medium | V2 stalls | Group 1 is standalone-valuable; each stage ships independently |
| Free-tier terms drift (prices/quotas verified 2026-10-15) | Medium | §13 numbers stale | Re-verify at implementation time; every number in §13 cites its source date |

### 18.2 Dependencies

Owner-side (blocking where marked): client-attribution permissions (**blocks V2-07 flagships**), metric-basis confirmation (**blocks V2-04**), Gmail rotation (**blocks V2-05**), Vercel env var + legacy deployment takedown (**blocks V2-01/V2-05b**), photo decision, reply-window N, availability statement truth. External: none — no paid services enter V2.

### 18.3 Unresolved questions (for the owner; defaults proposed so work can proceed)

1. May Cozee Care, Violina, and Taqwa appear by name with live links? *(Default if unanswered: keep links, they're public; add names only where already publicly associated.)*
2. Which current metrics have a real measurement basis? *(Default: the §8.10 "replace with mechanism" rewrites.)*
3. Photo on About? *(Default: omit — no invented placeholder.)*
4. Reply-window N the owner will honor? *(Default: omit the promise rather than over-promise.)*
5. Is he currently open to full-time roles — and should the About line say so? *(Default: neutral line.)*
6. Blog cadence commitment? *(Default: de-emphasize in nav.)*
7. German-market appetite for a DE landing summary? *(Default: defer to P3.)*

### 18.4 Assumptions (stated so they can be challenged)

1. Traffic is low-to-modest (order 10²–10³ visits/mo) with a current recruiter skew; if traffic is materially higher, Stage 4 measurement and P2 items gain priority. `[INFERENCE — zero analytics exist; based on the site's age, channels, and no referral infrastructure]`
2. The visitor mix will shift commercial-ward only with deliberate outbound/content effort — the portfolio is necessary but not sufficient for lead flow (95–5, §7.1.3).
3. Gmail SMTP continues to work for transactional form mail as it does today.
4. All free-tier facts hold as of 2026-10-15 (each cited to its source date).
5. "3+ years" was intended as calendar time since first project work, not professional FTE time — the fix in §8.10 works under either interpretation.

---

## 19. Explicit Out-of-Scope Items and Future Releases

**Out of V2 (decision + reason in §15.3):** booking embeds, newsletter, testimonials UI (until real material exists), client portal/auth, CMS migration, automated test suites/CI (P3 via V2-27), PWA, attention-grabbing motion, AI/SEO standalone service pages, German translation (V2-29, P3), architecture diagrams (V2-30, P3), discrete intent events (Pro/PostHog; decision rule §13.7).

**Natural V3 backlog (post-V2, evidence-gated):** testimonials block once 1–3 exist; a German landing summary once a German engagement justifies it; per-project repositories made public (code-proof beats code-claims — the single strongest possible Audience D upgrade); a second blog post only after the cadence decision; Pro/PostHog intent events only when a real decision is blocked (§13.7); case-study diagrams for the two deepest flagships; "writing" section if the blog commits.

---

## 20. Final Decision Memo

**What changes, in one paragraph:** The V2 portfolio keeps its architecture and rebuilds its argument. Discoverability stops self-sabotaging (correct domain in robots/sitemap, absolute canonicals, real OG images, legacy deployment retired). Every claim becomes either verified or a described mechanism; the metrics section stops asserting things nobody can check. Proof becomes visual and tiered — three flagship case studies with real screenshots, labeled by evidence level, linked to live systems that are verified live. The homepage gains the full conversion spine (proof band, selected work, services scope, how-I-work, FAQ, CTA) instead of three text cards. The form becomes a reliable, compliant, screen-reader-friendly lead channel with self-reporting source attribution, measured by a free cookieless stack whose limits are stated honestly. One design language (indigo tokens, mono labels, strict motion budget) replaces the current two.

**Why (evidence, compressed):** The site's only organic channel is actively misdirected (F1, Google sitemap docs). Its strongest asset — live client systems — is hidden behind text-only cards and dead links (F4/F11, NN/g credibility factors). Its claims would not survive a technical buyer's 30-second check (F2, §7.1.2). Its homepage doesn't answer the questions its own FAQ already answers well (F6). And no instrumentation exists to learn anything (F7) — while the privacy page describes analytics that don't exist.

**What must not change:** Next.js 16 App Router + TS + Tailwind v4 architecture; the HSL token/theming approach; the Server Action + Zod + escaping contact pipeline; the typed data-file content model; the MDX blog mechanism; the genuine client work and its live URLs; the existing FAQ copy (it's the best business writing on the site); the CV-in-nav hiring path.

**What to build first:** **V2-01, the canonical-domain fix** — one env var (`NEXT_PUBLIC_SITE_URL=https://sahadcse.vercel.app`) in Vercel, `metadataBase` in `layout.tsx`, base-URL constants in `robots.ts` + `sitemap.ts` (plus the four missing routes), then deploy, verify the served `robots.txt`/`sitemap.xml` with curl, submit in Search Console, and take down the legacy deployment (V2-05b). Two hours, zero design decisions, and it ends the only defect that suppresses every other investment this plan makes.

---

## Appendix A — Source Log

Method notes: repository findings from direct file reads + git history (2026-10-15); live-site findings from HTTP fetches of `sahadcse.vercel.app` assets/headers and outbound URLs from one test network (limitations disclosed in the report header). External sources below; all accessed 2026-10-15 unless dated otherwise.

| # | Source | Type | Date | Finding(s) supported |
|---|---|---|---|---|
| 1 | vercel.com/docs/analytics/limits-and-pricing | Official docs | upd. 2026-08-25 | 50K events/mo Hobby; custom events Pro-only; pause-not-bill over quota; cookieless design |
| 2 | vercel.com/docs/speed-insights/limits-and-pricing | Official docs | upd. 2026-09-23 | Free; 10K events/30 d; pause behavior |
| 3 | vercel.com/docs/plans/hobby; /docs/limits; /docs/limits/fair-use-guidelines; /docs/image-optimization/limits-and-pricing | Official docs | 2026-09/2026-08/2026-07 | Hobby limits: 100 GB transfer, 5K image transformations/mo (402 on new over-quota, no billing), cron ≥1/day, non-commercial clause, WAF custom rules |
| 4 | developers.google.com/search/docs/appearance/title-link; /snippet | Official docs | current | Titles/snippets guidance; Google may rewrite |
| 5 | developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | Official docs | current | Sitemap as canonical-URL hint; cross-host URLs rejected without cross-submission |
| 6 | developers.google.com/search/docs/appearance/structured-data/search-gallery; /profile-page; /local-business; /faqpage (changelog) | Official docs | current; FAQ retirement 2026-05-07/06-15 | ProfilePage supported; no standalone Person; ProfessionalService as LocalBusiness subtype; FAQ rich results retired |
| 7 | developers.google.com/search/docs/appearance/ai-features; /fundamentals/ai-optimization-guide | Official docs | upd. 2025-12-10 / 2026-07-10 | No special GEO requirements; llms.txt/chunking mythbusted |
| 8 | developers.google.com/tag-platform/security/guides/consent | Official docs | upd. 2026-10-13 | GA4 EU consent requirements |
| 9 | www.w3.org/TR/WCAG22/; /WAI/standards-guidelines/wcag/new-in-22/ | Standard | Rec. 2023-10-05; ed. 2024-12-12 | WCAG 2.2 status; 2.5.8/2.4.11/2.4.13/2.5.7/3.3.8 details |
| 10 | nngroup.com/articles/how-users-read-on-the-web/ (1997); /articles/f-shaped-pattern-reading-web-content/ (2017/rev. 2026); /articles/trustworthy-design/ (2016); /articles/errors-forms-design-guidelines/ (2019/rev. 2024); /articles/first-impressions-human-automaticity/ (2017) | UX research org | as dated | Scanning stats + limitations; F-pattern correction; credibility factors; form-error guidelines; 50 ms framing |
| 11 | Lindgaard, Fernandes, Dudek & Brown (2006), *Behav. Inf. Technol.* 25(2), doi:10.1080/01449290500330448 | Peer-reviewed | 2006 | ~50 ms visual-appeal judgment stability (appeal, not credibility) |
| 12 | credibility.stanford.edu (Fogg et al.) | Research program | 2002–03 | Credibility guidelines (dated; directional) |
| 13 | gartner.com/en/sales/insights/b2b-buying-journey | Vendor research | n/a (page 403 to fetch) | 6–10 stakeholders; 17% supplier time; 77% complexity — `[UNVERIFIED-at-source]`, corroborated via secondary reporting |
| 14 | business.linkedin.com/advertise/resources/b2b-institute/b2b-research/trends/95-5-rule (Dawes, Ehrenberg-Bass) | Vendor/academic hybrid | 2021 | 95–5 rule + caveats |
| 15 | edelman.com B2B thought-leadership study (6th/7th ed.) | Vendor research | 2024/2025 | Thought-leadership engagement patterns (commercial interest noted) |
| 16 | scheibehenne.com/ScheibehenneGreifenederTodd2010.pdf; Chernev, Böckenholt & Goodman (2015), *J. Consumer Psych.* 25(2) | Meta-analyses | 2010/2015 | Choice-overload mean effect ≈ 0; moderated small effect |
| 17 | eur-lex.europa.eu/eli/reg/2016/679/oj; gesetze-im-internet.de/dsgvo/ | Law | in force 2018 | GDPR Arts. 6(1)(b)/(a), 13 |
| 18 | gesetze-im-internet.de/ddg/__5.html | Law | DDG in force 2024-05-14 | Impressum requirements; replaces §5 TMG |
| 19 | developer.apple.com/design/human-interface-guidelines/motion; /dark-mode; /accessibility | Official HIG | upd. 2024–2025 | Motion purposefulness; dark-mode philosophy; accessibility principles |
| 20 | m3.material.io/foundations/accessible-design/overview; /styles/motion/overview | Official design system | current | Accessibility-by-default; Expressive/Standard motion schemes |
| 21 | vercel.com/geist (+/colors,/typography,/materials,/grid) | Official design system | current | Gray-first tokens; radii; Surface/Floating; dividers-inside-borders; tabular figures; preset type classes |
| 22 | linear.app/brand; linear.app/now/behind-the-latest-design-refresh | Official brand/design | current | Palette; "Don't compete for attention you haven't earned"; "Structure should be felt not seen"; 3-testimonial pattern |
| 23 | stripe.com; github.com; primer.style | Observed + official | current | Proof-stack patterns; Primer functional tokens; 9 themes |
| 24 | peerlist.io; peerlist.io/blog | Observed + official blog | current | Proof-of-work thesis; light/dark asset variants; FAQ-contrast pattern |
| 25 | linkedin.com/help/linkedin/answer/a1359065; /a552452 | Official help | current | Verification types + +60% views stat; Featured section |
| 26 | help.x.com (checkmarks, Premium Business); theverge.com/2021/8/11/22620438 | Official + press | current / 2021-08-11 | Checkmark tiers + dilution; Chirp/"less blue" |
| 27 | reddit.com/r/RedditEng (via search; direct fetch blocked) | Engineering blog | current | Shreddit web components; design-system scale |
| 28 | en.wikipedia.org/wiki/Threads_(social_network); about.fb.com/news/2023/07/introducing-threads-new-app-text-sharing | Encyclopedia + official | current | Threads web/redesign facts |
| 29 | help.instagram.com (professional dashboard); buffer.com/resources/instagram-grid | Official + industry | current | Grid 4:5 shift; dashboard as credibility |
| 30 | brittanychiang.com; joshwcomeau.com; leerob.com; antonsten.com; rauno.me; mademistakes.com | Observed portfolios | current | Portfolio patterns (§6.1 rows) |
| 31 | resend.com/pricing; formspree.io/pricing; cloudflare.com/products/turnstile; clarity.microsoft.com; posthog.com/docs/billing/limits-alerts | Official pricing | fetched 2026-10-15 | Free tiers/behaviors in §13 (PostHog quotas `[UNVERIFIED]`) |
| 32 | knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace | Official docs | upd. 2026-10-13 | Workspace sending limits (consumer limit `[UNVERIFIED]`) |
| 33 | nextjs.org/docs/app/guides/data-security | Official docs | upd. 2026-10-06 | Server Action same-origin enforcement; rate-limit guidance for expensive actions |

*End of report.*
