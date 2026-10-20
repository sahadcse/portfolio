# Portfolio V2 — Implementation Status

**Plan:** `docs/portfolio-v2-audit-and-plan.md` (v2.1, approved 2026-10-15) — authoritative specification.
**Current stage:** **R3-equivalent reached early.** R1 · V2-06/07/08 · V2-09…14 · Phase 2 · Refinement · Multilingual pass · **Canva hero + tools tabs + minimal footer complete** (owner brief 2026-10-20).
**Working branch:** `v2-r1-implementation` (based on `main` @ `fc3a46e`). **Nothing pushed or deployed.**

---

## Completed — Canva hero, tools tabs, minimal footer (2026-10-20, commit `341c1f2`)

### Hero (owner Canva reference) — `Hero.tsx`, `headlineStart/headlineEnd/proofPoints/panel` keys
Left (~60%): green-dot availability line **"Available for new projects · Direct Founder-Led Delivery (AU / DE / USA)"**, editorial headline (green `First` accent + sparkle motif; lavender `.headline-mark` sweep under the platform phrase), revenue-critical description with accent verbs, CTAs (**View Case Studies** now), check-marked proof row (MVPs→Platforms · 100% IP & Source Ownership · Zero Agency Handoffs). No identity on the business side. Right (~35%): tall bordered profile card — identity header, five hands-on rows (owner-supplied durations: Backend & Database 4+ · Frontend & UI 3.5+ · Cloud & DevOps 3+ · System Design & DSA 2+ · AI-Augmented 1+), AI detail line (Claude Code · Gemini — 100% human-architected & reviewed), Engineering Standards, divider + monospaced SLA statement.

**Factual flags for the owner (spec asked for these explicitly):**
1. **"ENGINEERING SLA"** reads as a contractual service-level commitment. No such contract is offered anywhere on the site. Implemented verbatim as instructed — say the word and it becomes "Engineering standard" or similar.
2. The durations are the owner-specified figures; the previous "study + professional combined" honesty note no longer fits the card inventory and was moved out — the About tools section + this handoff remain the labeling of record. Professional project work began Feb 2024; owners reviewing should confirm the "hands-on" framing (including academic work) is intended.
3. **Gemini** and **NDA Ready** are owner-supplied claims with no repo evidence — implemented as instructed, flagged here.

### Tools I Reach For → interactive tabs — `ToolsTabs.tsx` (About `#tools`)
ARIA tablist/tab/tabpanel, `aria-selected`, direction-aware Arrow/Home/End keyboard nav (RTL flips), visible focus, scrollable tab bar on mobile, in-place panel swap. Five tabs (AI Tools · Frontend · Backend & DB · DevOps · Soft Skills), each with tagline + working set + an **evidence note naming the backing projects**. All four locales translated. Verified: click selection, ArrowRight (LTR) / ArrowLeft (RTL) advance, panels swap, zero overflow.

### Footer — exact minimal spec — `Footer.tsx`
Dot-matrix texture + radial spotlight + gradient **SAHADUZZAMAN** wordmark (single line at every width) + 3 social pills (Email/GitHub/LinkedIn) + description + hairline + copyright + 3 legal links. **Nothing else** — the previous invitation band, site columns, CV and Blog links were removed per the spec's strict inventory. Verified inventory programmatically (3 pills, 3 legal, no CTA, wordmark text exact).
**Note:** the Blog route is now reachable only by direct URL (it had already left the navbar; the footer was its last visible link). Flag if a Blog link should live somewhere.

### Theme-system fix (caught by dark-footer verification)
Tailwind v4's `dark:` variant defaulted to the OS media query while the site themes via next-themes' `.dark` class — literal `dark:` utilities (footer, ThemeToggle icon swap) ignored the site's own toggle. Fixed with `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`. All `dark:` utilities now follow the site toggle.

### Wordmark fit (two measured corrections)
1. Clamp max **9.25rem → 7.75rem**: 12 characters at font-black −0.04em overflow the 1056px container above ~1333px viewports at the spec's cap.
2. `letter-spacing` as inline style: the Arabic tracking neutralizer (`html[lang=ar] [class*=tracking-]`) correctly strips `tracking-` classes, widening the Latin mark — the neutralizer targets Arabic cursive; the Latin lockup is exempt by design.
Verified single-line in all 12 capture contexts including AR.

### Gates and evidence (2026-10-20)
`npm run lint`: **0 errors, 0 warnings** · `npm run i18n:check`: **strict OK** (389/389 ×4 — footer slimmed) · `npm run build`: clean · 12+ captures inspected (`c-hero-*` EN light/dark/mobile + AR/DE/FR, `c-footer-*` EN light/dark/mobile + AR/DE/FR dark, `c-tabs-backend`): hero composition matches the reference in both themes and RTL; tabs all functional; footer inventory exact; **zero console errors, zero horizontal overflow** everywhere.

---

## Completed — Multilingual + navigation pass (2026-10-20, commit `8707c64`)

### Translations — full coverage (390/390 keys × de/fr/ar)
All four locales now serve complete translated content: homepage (hero, proof band, needs cards, projects, process, capabilities, trust, FAQ teaser), About (intro, journey, principles, working-with-me, tools), Services (4 services, process, FAQ), projects index, contact + form + validation, footer, nav, 404, a11y labels, and **per-locale metadata** (new `meta` namespace; every page `generateMetadata` is message-driven). FAQ content migrated from `src/data/faq.ts` (deleted) into the `faq` message namespace. Server validation messages became **stable error codes** translated client-side (server has no locale context). `i18n:check` flipped to `--strict` (the plan §10.5 post-V2-24 gate): de/fr/ar at 390/390 keys. Approved §5.3 copy-deck lines used verbatim; brand/tech names protected; **verified client geography (AU/DE/KR/BD) kept factual** — USA added only to availability/time-zone contexts (about working-with-me + open-to-work fact) in all four locales.
**Quality caveat (honest):** translations are model-produced drafts. The **V2-25 native-review track is still required** before these should be considered publication-quality — structure, terminology, tags, placeholders, and facts are verified; idiomatic quality awaits native review.

### Case-study bodies (documented trade-off, §10.5)
The 12 case studies' long-form prose lives in `src/data/projects.ts` and **remains English on non-English locales behind a visible localized notice** on each case-study page (§10.5's sanctioned pattern). Translating ~400 strings of regulated-industry technical prose without native review was judged worse than the notice; flagships can be prioritized in the V2-24 data-translation pass.

### Section navigation (brief §2) — `OnThisPage.tsx` reworked
- **≥2xl:** fixed labeled panel, inline-end, vertically centered, subtle border/blur surface
- **xl:** footprint-reduced dot rail (sr-only + hover labels) so it never overlaps the 68rem content
- **<xl:** floating TOC button (bottom-inline-end, above Go to Top) opening a popover dialog — labeled links, active indicator, X + outside-tap + **Escape** dismiss, focus return, background scroll lock
- One IntersectionObserver per page; anchor targets keep `scroll-margin-top: 5rem`; RTL mirrors via logical `end-*` positioning. Verified: panel viewport-stable while scrolled; active dot tracks; mobile jump dismisses and lands 90px clear; Escape works.

### Hero (brief §3) — `Hero.tsx` + `headlineStart/headlineEnd` keys
Left side now carries **no identity content** (name/title/company removed). Editorial two-part headline: quiet muted opening line + full-scale bold platform line with a `.headline-mark` highlighter sweep (decoration over live text). Right panel: **experience-based technical profile** — identity header (portrait, accent name, role, location) + five rows with labeled durations (Backend & Database 4+ yrs · DevOps 3+ · Frontend 3+ · AI Tools "in use" · Soft skills) and an explicit honesty note: *"Study and professional work combined; professional projects since early 2024."* AI row states assisted-development-only.

### USA geo (brief §4)
Added in all four locales to availability/time-zone statements (About working-with-me, open-to-work fact). Verified client history (AU/DE/KR/BD) deliberately unchanged.

### Go to Top (brief §5) — `GoToTop.tsx`, mounted in locale layout
Appears past 600px scroll, smooth-scrolls unless reduced motion (checked at click), bottom-inline-end, stacked clear of the mobile TOC button. Verified: hidden at top, visible at 2500px, returns scrollY→0.

### Footer (brief §6) — `Footer.tsx` rebuilt
Full-bleed `bg-muted/30` + viewport-spanning top border; invitation band (CTA); identity (accent name + tagline) / site links / connect (GitHub, LinkedIn, email, CV) columns; legal row with copyright. All prior destinations preserved. Verified EN + AR (mirrored).

### RTL defect found and fixed
The honeypot's physical `-left-[9999px]` offset produced **9999px of scrollable overflow in RTL** (leftward = forward in RTL). Changed to a zero-size clip wrapper (direction-safe). AR contact overflow now 0px.

### Gates and evidence (2026-10-20)
`npm run lint`: **0 errors, 0 warnings** · `npm run i18n:check`: **strict OK, 390/390 × 3 locales** · `npm run build`: clean (TypeScript pass) · Verification suite (`verify-i18n.js`, `%LOCALAPPDATA%\Temp\portfolio-shots\`): 14 captures + interactions inspected — 4-locale home first-viewports, AR/DE/FR full pages, contact AR, case study AR, mobile; **zero console errors, zero overflow** (post-fix); desktop TOC viewport-stable; mobile TOC open/jump/dismiss/Escape verified; Go to Top verified; language switch `/services` → `/de/services` preserves path and `lang` attribute.

### Owner actions / limitations
1. **Native review of de/fr/ar (V2-25)** — translations are verified drafts, not native-reviewed copy. Legal pages remain English by the §11.4 human-only path.
2. Case-study long-form bodies remain English behind a visible notice (§10.5) — data-translation pass optional next.
3. Experience durations use the owner-supplied figures with the "study + professional" honesty note — owner may reword.
4. Real form click-test post-deploy (O4) still pending; ceo_image.png tracking decision open.

---

## Completed — Refinement pass (2026-10-20, commit `f180ae5`)

### Translation errors — root cause and fix (brief §2)
`MISSING_MESSAGE: home.process / home.faqTeaser for locale en` — **root cause: the Phase-2 messages rewrite recreated `messages/en.json` from scratch and dropped both namespaces while `HowIWork`/`FaqTeaser` still consumed them** (regression introduced in Phase 2, caught by the owner). Both restored with their original copy; a key audit of `home.*` vs consuming components passes. Verified gone: zero console errors across 11 page captures (was the failing signal).

### Hero (brief §3) — `src/components/home/Hero.tsx`
Two-audience composition, static server component. **Left (business):** eyebrow with accent identity, headline, four-verb subhead with accent emphasis via `t.rich`, both CTAs, availability. **Right (technical):** compact editorial panel — 96px portrait, accent identity line, role, based-in mono line, five **evidence-backed** engineering-focus rows (websites / backend+APIs / databases / booking+operations / integrations+deployment+maintenance), evidence link. Mobile stacks business-first.

### Identity system (brief §4)
`IdentityName` component + `.identity-name` utility (uppercase + primary color; screen readers read natural case; no effect on metadata/SEO or client/project names). Applied: hero eyebrow + panel, About facts rail, trust sign-off.

### Keyword emphasis (brief §5)
`.em-accent` utility (primary color + 600 weight, no backgrounds) applied via `t.rich` `<accent>` tags at: hero four verbs, proof-band regions line, services lead. Restrained by design — headings untouched, no mechanical decoration.

### Tools I Reach For (brief §6) — About `#tools`
Five categories in **one row at desktop** (`lg:grid-cols-5`), 2-col tablet, stacked mobile. **AI Tools explicitly labeled** "AI-assisted development workflow — used for velocity in my own process. No AI features have been shipped to clients to date" (Claude Code · Cursor — owner should confirm the named tools). Frontend/Backend/DevOps items all evidenced in the project inventory; Soft Skills each carry an evidence note (sole-engineer delivery, client handovers).

### Trust section (brief §7) — `TrustSection.tsx`, homepage `#trust`
No verified testimonials exist (plan §9.4 stands) — so the section is **honest by construction**: heading "Why clients trust the work", subtitle states no purchased quotes, three verifiable evidence cards (live systems → cozeecare.com.au; verified counts → proof band; ownership → handover), plus a personal sign-off. Approved testimonials render automatically when permissioned entries land; `TestimonialSection` (About) unchanged and ready.

### On this page (brief §9) — `OnThisPage.tsx` on home/about/services
Compact horizontal index, one IntersectionObserver for active tracking, `section[id] { scroll-margin-top: 5rem }` for the sticky header, reduced-motion disables smooth scroll. Verified: clicking `#capabilities` lands the section 80px from the viewport top (clear of the header).

### Full-bleed architecture (brief §10)
**Root cause: `<main>` carried the max-width constraint**, so every section background/border stopped at 1088px. Fix: main is full-width; new `.container-content` utility (max-width + padding, one width owner) applied inside every page/section; full-bleed sections (proof band, capabilities, trust, tools, flagships) bleed backgrounds/borders to the viewport edges. Verified: `overflowX = 0px` on all 13 captures (one 105px mobile overflow — proof-band tooltips — was found by this pass and fixed: tooltips span their stat on mobile, w-72 from md up).

### Contact verification (brief §8) — **full delivery path tested locally**
Ran a raw-socket **SMTP sink on 127.0.0.1:2525** (captures bytes, delivers nothing) and pointed the production server's SMTP env at it. Playwright-submitted the real form: success banner shown; the sink captured the email with `[project]` subject tag, budget line, name, reply-to, message body, and the correct `To:` addressee. Honeypot fill → fake success banner, **zero mail written**. Hiring type → budget field hidden. Validation-error rendering + `aria-invalid` re-verified. **No real email was sent; no real credentials used.** Remaining owner action: one real click-test after deploy (O4).

### Gates and evidence (2026-10-20)
`npm run lint`: **0 errors, 0 warnings** · `npm run i18n:check`: OK · `npm run build`: clean (TypeScript pass) · 13 screenshot captures inspected (`p3-*.png`, `%LOCALAPPDATA%\Temp\portfolio-shots\`): home first-viewport desktop+mobile, full pages, About/Services/Projects/Contact, Cozee case study, /ar home+about (RTL mirrored correctly), mobile full — **zero console errors, zero horizontal overflow after the tooltip fix**.

### Owner actions / limitations
- Confirm the named AI-assisted tools (Claude Code, Cursor) and whether to keep them public.
- Testimonial content still awaits permissioned statements (§9.4 acquisition plan); trust section covers meanwhile.
- One real form click-test after deploy; O1–O10 otherwise unchanged.
- ceo_image.png still untracked (owner decision).

---

## Completed — Phase 2: website-wide professional redesign (2026-10-19, commit `d6cb904`)

**Visual verification: before/after screenshots** (headless Edge). BEFORE: `before-{about,services,contact}.png`; AFTER: `after-{home,about,services,contact,projects}.png` + mobile (`after-{about,services,contact}-mobile.png`) + RTL (`after-ar-{about,services,contact}.png`) — all in `%LOCALAPPDATA%\Temp\portfolio-shots\`. **Zero console errors on all 11 captures.** Form interaction tested in-browser: honeypot present and off-screen, validation errors render (3 field errors after a bad submit), `aria-invalid` wired, budget field conditionality verified. **No live submission performed** (would send real email — delivery path unchanged from production, pending owner click-test).

### About (rebuilt)
Narrative intro (portrait + facts rail: location/education/experience/status) → **verified timeline** (5 entries from the resume-reconciled record; Rushkat carries the concurrency note per recorded finding #2) → **five engineering principles, each with a "See it" deep link to its case study** (understand-first/Taqwa EMI, secure-by-default/Cozee RBAC, performance-as-decision/Rushkat+4j, commit-to-production/4j pipelines, leave-clients-independent/handover) → **working with me** (timezone overlap, async updates, plain language, confidentiality — all traceable to FAQ copy and delivered work; no invented traits or hobbies) → testimonial slot → tools line → CTA. Old resume-dump layout (portrait + prose + identical cards) gone.

### Services (rebuilt)
Agency voice deleted (incl. a residual "zero-downtime" claim the V2-04 sweep missed). Four evidence-backed services in **alternating editorial rows with oversized ghost numerals** — Custom web applications / Backend & API engineering / Business systems & workflow automation / Websites & frontend engineering — each answering problem → what I deliver → why me (named evidence) → proof deep-links. **AI deliberately omitted** (no shipped evidence in the inventory — the brief's honesty rule applied). "Something else?" honest-edges strip. Five-step engagement process (Discover → Scope → Build → Launch → Afterwards) with explicit no-timeline/no-guarantee framing. FAQ retained, heading now message-driven. Nested `<main>` removed.

### Contact (rebuilt)
Two-column invitation: audience reasons (hiring / new project / improve / collaborate) + email with click-to-copy + GitHub/LinkedIn + availability and privacy notes beside a redesigned form card. Form: **inquiry-type pills** (radio group), **conditional budget/scope field** (shows for project/improve), **honeypot spam trap** (hidden `website` field; bot fills → fake success, nothing sent), `aria-invalid`/`aria-describedby` on errors, `role="alert"`/`role="status"` banners, localized labels. Server action extended (`inquiryType` in subject, budget + type in the email body) with existing zod validation, XSS escaping, and SMTP delivery **unchanged**.

### Capabilities + naming + cohesion
- Homepage tech list → **Engineering capabilities accordion** (native `<details>`, keyboard-accessible, zero JS): six capabilities, each with problems solved, deliverables, tools as supporting mono detail, and proof deep-links. AI-free per the evidence rule.
- **"Projects" naming restored** per brief §8: nav, "Selected Projects" index heading + metadata, homepage "Selected projects" section, "Back to all projects" links.
- Shared `PageHero` / `CtaPanel` / `TestimonialSection` components extracted; About/Services/Contact/Projects now share one opening grammar and one closing CTA.
- Data fix: 4j Traders timeframe corrected to the resume-reconciled **Sep–Dec 2025** (was Jul–Sep — mismatch with `experience.ts`).

### Testimonial status (evidence per brief §7)
No verified testimonial material exists in the repo (plan §9.4 OBSERVED stands). The section component ships design-ready and renders **absent** until a permission-gated entry lands in `src/data/testimonials.ts`. What's missing for each candidate (Cozee Care, Violina, Taqwa, Rushkat, 4j contacts): author name + role confirmed, written statement or LinkedIn recommendation, and explicit written permission for named publication (`permission` field, §9.4).

### Acceptance evidence (2026-10-19)
`npm run lint`: **0 errors, 0 warnings** (the FAQ unused-var warning fixed in passing) · `npm run i18n:check`: OK (155 keys en; de/fr/ar remain English-fallback by design until V2-24/25) · `npm run build`: clean, all locales prerendered. Screenshots: 11 after-captures + 3 before-captures inspected; form interactions verified in-browser (see above).

### Known limitations
- Form **delivery** not re-verified end-to-end (requires real SMTP send = real email); validation/UI/honeypot verified. Owner click-test recommended post-deploy (O4 rotation still pending owner-side).
- Capabilities/About copy is English-only in messages (de/fr/ar fallback) — translation track unchanged (V2-24/25).
- Ghost numerals and the capabilities accordion are intentionally calm (no JS animation added); motion budget remains V2-13.

---

## Completed tasks — V2-09/V2-10/V2-11/V2-12/V2-14 (visible redesign, 2026-10-19)

The user-facing vertical slice, executed as one stage per the owner's course correction. **Visual verification performed with headless-Edge screenshots (desktop 1440px + mobile 390px + /ar RTL)** — a first for this project; screenshots archived outside the repo in `%LOCALAPPDATA%\Temp\portfolio-shots\`.

### V2-12 — Image pipeline
- `scripts/optimize-images.mjs` (sharp): raw captures → `<name>.webp` (1600px, case-study figures) + `<name>-card.webp` (uniform 16:10) + `<name>-og.jpg` (1200×630 social preview — WebP is unreliable in some scrapers) + `sahad-portrait.webp` from the owner-supplied `public/ceo_image.png` (owner's file, left untracked). **All 34 outputs ≤ 300 KB budget** (largest 134 KB vs a 2.1 MB source). Card/OG crops anchor **left** — centre crop clipped the screenshots' headline text ("mpowering Lives").
- Sources: raw PNGs no longer live in `public/` (git history retains them); the script takes a source dir argument for future re-runs (`node scripts/optimize-images.mjs <dir-with-pngs>`).
- 11 heavy PNGs deleted from the served tree; ~9 MB lighter.

### V2-14 — Verified metrics + testimonial system
- `src/data/verified-metrics.ts`: the four §9.3/§9.5-gated metrics (8 delivered · 6 sectors · 4 countries · 3 live client systems, verified 2026-10), each with its counting methodology. Owner-gated slots (clients served, response time) deliberately absent.
- `src/data/testimonials.ts`: typed §9.4 model with the hard `permission.written` gate; **ships empty — the section renders absent, never placeholder**. Adding a permissioned entry makes it appear.
- `ProofBand` component: stats with methodology disclosed on hover AND keyboard focus; verification dates shown inline.

### V2-09 — Homepage rebuild (§6.3 outline, complete)
1. **Hero** — identity eyebrow (mono), scope-ladder H1 ("From a first website to a full platform."), four-verb subhead, CTAs, availability line; **owner's portrait** with mono caption; **static server component — first viewport paints without JS** (framer-motion removed from the hero).
2. **Proof band** (§9.5) + personal proof line (§5.4).
3. **Needs cards** — Launch / Improve / Automate / Build, each: plain definition, example deliverables, "See proof →" deep-link to a real case study (Violina, Rushkat, Cozee, Taqwa).
4. **Selected work** — 3 flagship cards with screenshots, tier + sector chips, one-line outcomes.
5. **How I work** — Scope → Build → Launch → Maintain + ownership statement.
6. **Tech strip** — compact monochrome list (16 technologies, all evidenced by shipped work).
7. **FAQ teaser** — ownership / retainer / timezone + link.
8. **Final CTA** — "Tell me what you're trying to do." + click-to-copy email.
- Nav per §6.2: "Projects" → "Work"; Blog moved from nav to footer. All homepage strings extracted to `messages/en.json` (`home.*`, `projectsIndex.*`, `caseStudy.*` namespaces); de/fr/ar stay on English fallback (review gates §11.4 respected — no unreviewed translations shipped).
- Old Hero/ValueProposition/TechStack/Badge/ProjectCard components and their types removed as dead code.

### V2-10 — Case-study system (§9.1)
- `Project` extended with `status` (flagship/supporting/archived), `evidenceLevel`, `role`, `timeframe`, card/OG image refs, `oneLineOutcome`, and the flagship fields (constraints, decisions "chose X over Y because Z", screenshots with mono captions, outcomes with basis).
- `ProjectDetails` rewritten to the §9.1 template: chips → title → role line → context → Fig. 01 → problem → what I built → how it works → outcomes (only with stated basis) → stack → next-step CTA. Archived demos carry an explicit "Archived demo" banner and no CTA.
- **3 flagships full** (Cozee Care, Violina, Taqwa), **5 supporting light**, **4 archived** (procourier, travellast, restaurant-hub, minishop — off the index AND the sitemap; routes still resolve for old links). Sitemap now 72 entries (18 paths × 4 locales).
- Tier assignments: Cozee/Violina = client-system; FCSC/NDIS = client-site (pending O2/O3 confirmation); Online Doctor = own-production; 4j/Rushkat/Taqwa = employment (recorded finding #1); the 4 archived = demo. **Spec reconciliation:** §9.1's type sketch lists 4 evidence levels, §9.2 mandates 5 chips — implemented §9.2's five (the more specific, normative semantics).
- Claim hygiene kept: outcomes state mechanisms with honest bases ("delivered system capability", "live-URL verification, 2026-10"); stale highlight phrases pruned (recorded finding #4); per-project OG now uses the JPEG variant.

### V2-11 — Projects index
- Curated grid (8), uniform 16:10 image cards, tier + sector chips, working sector filter (All + 6 normalized sectors matching the §9.3 metric), honest "No preview" for image-less Rushkat, external-live icon only on verified live URLs.

### Acceptance evidence (2026-10-19)
- `npm run lint`: **0 errors** (2 pre-existing warnings in files this stage didn't touch) · `npm run i18n:check`: OK (93 keys, en) · `npm run build`: clean, 94 pages × 4 locales.
- **Screenshots inspected (headless Edge, real rendering):** homepage desktop + mobile, /projects desktop, /projects/cozee-care desktop, /ar desktop + mobile — **zero console errors on any captured page**. RTL verified visually: mirrored layout, flipped arrows, correct card order, Western digits.
- HTTP checks: sitemap 72 entries with archived demos excluded; archived route 200 with banner; all 8 homepage sections render; `/de` renders `lang="de"` with fallback English; per-project `og:image` → JPEG on the canonical host.

### Known limitations & follow-ups
- **Visual verification is one reviewer's reading of static screenshots** — no interaction testing (menu open, filter clicks, form submit were not exercised in-browser; filter logic is unit-simple but unexercised). Owner should click through the preview.
- ceo_image.png (owner's original, 523 KB) remains untracked at `public/`; decide whether to commit the source or leave it workspace-only (the optimized webp is committed).
- Proof-band tension to adjudicate (O6): Taqwa is tiered *employment* (recorded finding #1) while §9.5's approved band text says "3 live client systems" — the count methodology (live-URL verification) still holds; owner may want to relabel or re-scope that metric.
- The remaining R2b tasks (V2-13 motion budget, V2-15..V2-23) are unchanged; next by dependency: V2-13 (deps met) and V2-15 (contact hardening).

---

## Completed tasks — V2-08 (type/spacing system + RTL logical-property conversion)

Implements plan §8.3 (type/spacing), §8.4/§10.8/§10.9 (RTL + Arabic typography), and the V2-07 handoff's fold-in (`.card-elevation` → elevation tokens). 20 files changed.

| Area | What was built |
|---|---|
| Type presets | Six bundled presets in `globals.css` — `.text-hero` (40/48 → md:56/60, 700, −0.02em), `.text-h2` (28/36, 700, −0.01em), `.text-h3` (20/28, 600), `.text-lead` (18/28, 400, muted), `.text-body` (16/26), `.text-label` (13/16, 500), `.text-mono` (JetBrains Mono 13/16 + `tabular-nums`). Applied across all pages/components |
| Mono off headings | `font-mono` removed from every heading (About ×4, Hero ×2, TechStack, Contact, Blog list, Projects, 404 h1, ProjectDetails h1, home h2, `prose-headings:font-mono`). Remaining `font-mono` is the legitimate chip/label system (Badge, tech tags, 404 "404" label) |
| Arabic typography | `IBM_Plex_Sans_Arabic` via `next/font/google` (arabic subset, weights 400–700, self-hosted — 16 @font-face blocks verified in build); per-glyph fallback stacks `--font-sans`/`--font-mono` include `var(--font-arabic)`; `html[lang="ar"]` line-height overrides (body 1.75, hero/h2 1.35, h3 1.4, lead/body 1.75, label/mono 1.7); `tracking-*` neutralizer `html[lang="ar"] [class*="tracking-"] { letter-spacing: 0 !important }` |
| Width owners | `--container-content: 68rem` (→ `max-w-content`) replaces all three `max-w-7xl` (layout main, Navbar, Footer); `--container-reading: 44rem` (→ `max-w-reading`) replaces prose/legal `max-w-3xl`; per-page `container mx-auto` constraints removed (single width owner); services' redundant `max-w-6xl` and ProjectDetails' redundant `max-w-7xl` dropped |
| Section rhythm | 96px desktop / 64px mobile (`py-16 md:py-24`) normalized across Hero, TechStack, FAQ, services sections, all page containers; home gap-20/pb-20 → gap-16 md:gap-24 / pb-16 md:pb-24 |
| RTL logical conversion | All physical directional utilities → logical: `ml-/mr-`→`ms-/me-` (Button, CTA, ProjectDetails, Logo, blog/home/services arrows, About list), `text-left/right`→`text-start/end` (FAQ, LocaleSwitcher, About dates), `pr-`→`pe-`, `right-0`→`end-0` (LocaleSwitcher dropdown), `left-2`→`start-2` (ThemeToggle — fixes a real RTL bug where Moon detached from Sun), corner accent frames → `-start-3/-end-3` + `border-s-2/border-e-2` (mirrors composition in RTL per §8.4), `space-x`→`gap` (Navbar, Footer, contact email row) |
| Directional icons | `rtl:rotate-180` on ArrowRight ×5, ArrowLeft (+ mirrored hover translate `rtl:group-hover:translate-x-1`), Send, services SVG arrow; `rtl:-scale-x-100` on ArrowUpRight (external-link mirror); FAQ chevron non-directional, untouched. Logo root locked `dir="ltr"` (Latin brand lockup never mirrors) |
| Forms | Free-text inputs (`name`, `message`) get `dir="auto"` per §8.4; labels moved to `.text-label` |
| Buttons (§8.5) | Height metrics 36/44/52 px (md `py-3`→`py-2.5`, lg `py-4`→`py-3`); outline border 2px→1.5px |
| Elevation fold-in | `.card-elevation` → `var(--shadow-elev-surface)`, `.card-elevation-hover` → `var(--shadow-elev-floating)` — duplicated literals removed, tokens are the single source |

**V2-08 acceptance evidence (2026-10-19):**
- **Repo grep: ZERO physical directional utilities** in `src/**` (`ml-/mr-/pl-/pr-`, `border-l/r`, `rounded-l/r/tl/…`, `text-left/right`, physical `left-N`/`right-N` positioning) — acceptance criterion met. Remaining `translate-x` is the ArrowLeft hover nudge with its `rtl:` mirror (allowed: "translate-x flipped under rtl:")
- Compiled CSS (`.next/static/chunks/*.css`, 79.4 KB) verified: all seven presets present; `.text-hero` md bump (`@media (min-width:768px)` 3.5rem/3.75rem); `.max-w-content`/`.max-w-reading`; `me-2`/`ms-2`→`margin-inline-*`, `text-start/end`, `end-0`/`start-2`→`inset-inline-*`, `border-e-2`/`border-s-2`→`border-inline-*`, negative `-start-3`/`-end-3` incl. group-hover −4 variants; `[dir=rtl]` variants compiled (rotate/scale-x/group-hover translate); Arabic overrides + tracking neutralizer with `!important` present; `tabular-nums` present; `@font-face` 16× IBM Plex Sans Arabic + 7× Inter + 6× JetBrains Mono + 10× Montserrat, all self-hosted woff2
- Production server (port 3007): `/`, `/ar`, `/de/services`, `/ar/projects/cozee-care`, `/fr/contact`, `/about`, `/privacy` → all 200; `/ar` serves `lang="ar" dir="rtl"`; served HTML contains `text-hero`/`max-w-content`/`ms-2`/`start-2`; served `class` attributes contain no `ml-/mr-/text-left` (only legit `font-mono` chips)
- V2-06 behaviors unregressed: `/en/about` → 307 `/about`; `/` + `NEXT_LOCALE=de` cookie → 307 `/de`
- `npm run lint`: 0 errors (3 pre-existing warnings: unused vars in `projects/[id]/page.tsx`, `ContactForm` catch, `FAQ` map — untouched by this task) · `npm run i18n:check`: OK · `npm run build`: clean, TypeScript pass, 94 static pages × 4 locales

**Intentional visual shifts for owner review (all spec-driven):**
1. Hero headline caps at 56px desktop (was 72px at `lg:text-7xl`); lead paragraph 18px (was 20–24px)
2. All headings now Inter (mono wordmark styling gone from headings); inner page h1s 40→56px responsive
3. Content column 1280px → 1088px (68rem); prose/legal columns 48rem → 44rem
4. Section rhythm tightened on desktop: 128px → 96px (hero, value-prop gap), 80px → 64px mobile
5. Buttons: md 48→44px tall, lg 56→52px; outline border hairline-thinner
6. Card hover shadow now uses the floating-elevation token (blur 32→30px, same feel)
7. In RTL: corner accent frames mirror to the opposite corners, dropdowns/tables of content flip sides, arrows point the other way — expected by design

**Honest limitation:** no visual/browser tooling in this environment — verification was compiled-CSS-level, HTTP-level, and structural. Arabic rendering (joining, line-height feel, mirrored chrome) needs human eyeballing in R3 (V2-26 deep QA as planned). Same post-deploy eyeball list as V2-07 applies.

## Environment notes (this session, 2026-10-19)

- **Orphan server:** a `next start` (production server, PID 14544, started 18:45 today) is still listening on port 3000. It predates this build and may serve stale manifests — kill/restart it (`npm run start`) when previewing. V2-08 verification ran on port 3007 against the fresh build.
- **Build warnings to triage (not from V2-08):** 4× `metadataBase … using "http://localhost:3000"` during page-data collection. The V2-08 diff touches no metadata files; likely the root `opengraph-image.tsx` / per-page metadata resolution outside the `[locale]` layout's `metadataBase`. Triage in V2-09.

---

## Completed tasks — V2-07 (design-token consolidation, commit `39d805b`)

Kills the off-token design language (finding F5) per plan §8.3. 23 files changed (+226/−206).

| Change | Detail |
|---|---|
| Status tokens | `--color-success` / `--color-warning` / `--color-danger` (danger aliases destructive values) with light+dark values; contact-form error/success states and Badge's success variant now semantic |
| Radius scale (§8.3) | `--radius-sm 6px` (buttons/inputs/badges/tags) · `--radius-md 12px` (cards/menus/image frames) · `--radius-lg 16px` (large surfaces) · pills `rounded-full`; all component classes migrated to spec tiers |
| Elevation tokens | `--shadow-elev-surface` / `--shadow-elev-floating` (floating-only, translucent); LocaleSwitcher uses the floating token |
| Color sweep | 194+ hardcoded utilities across 11 files: slate-* → foreground/muted-foreground/card/muted/border; cyan-* → primary (services pill, Services CTA, FAQ link, Footer, Logo, ProjectDetails frames); blue/purple section accents unified to primary; cyan shadow-glow removed |

**V2-07 acceptance evidence (2026-10-15):**
- **Repo grep: ZERO off-token color utilities** in `src/**` (acceptance criterion) — intentional exceptions: `highlight-biz`/`highlight-tech` classes in `globals.css` (centrally defined keyword-highlight colors, part of the evidence-chip system, not scattered utilities)
- Compiled CSS (served bundle): contains `--success` (both themes), `--warning` (both), radius scale 6/12/16, `.text-success`/`.text-destructive`/`.text-primary` utilities; **zero cyan utilities** compiled
- `npm run lint`: 0 errors (3 pre-existing warnings) · `npm run build`: clean, 94 static pages
- Spot-rendered 200s across locales (`/`, `/about`, `/de/services`, `/ar/projects`, `/fr/contact`); V2-06 behaviors re-verified unregressed: `/en/about` → 307 `/about`, de-cookie `/` → 307 `/de`, `/ar` `dir="rtl"`, hreflang cluster present
- **Honest limitation:** no visual/browser tooling in this environment — verification was compiled-CSS-level, HTTP-level, and structural. A human should eyeball light+dark on `/`, `/services`, a case study, and the contact form after deploy. Intentional visual shifts to review: panels 8→12px radius, buttons 8→6px, the Services CTA and nav pill changed cyan→indigo.

## Completed tasks — V2-06 (i18n architecture foundation, commit `eb521cb`)

Implements plan §10 exactly. 40 files changed (+1,557/−192); routes moved via git-tracked renames into `src/app/[locale]/`.

| Area | What was built |
|---|---|
| Library & wiring | next-intl 4.14.9 (peer-verified `next ^16`); plugin in `next.config.ts`; `src/i18n/{config,routing,request,navigation}.ts`; `src/proxy.ts` (Next 16 middleware convention, verified present in 16.2.10) |
| Routing | All routes under `app/[locale]/`; `localePrefix: "as-needed"` — English URLs byte-identical (unprefixed); `generateStaticParams` + `setRequestLocale` preserve SSG (build emits 4 prerenders per route) |
| Negotiation | Middleware only: explicit path locale > `NEXT_LOCALE` cookie > Accept-Language > default en; **no IP redirects** (country hint reserved for the future picker) |
| RTL foundation | `<html lang dir>` per locale — `/ar` renders `dir="rtl"`; typography (Arabic font, line-height) is V2-08 |
| Fallback | English deep-merge in `request.ts`: `messages/{de,fr,ar}.json` intentionally empty until V2-24 — missing keys render English, never key paths; `npm run i18n:check` gate (fails on stale keys; `--strict` becomes the build gate post-V2-24) |
| SEO | Bidirectional hreflang + self-canonicals per locale on every page via shared `localeAlternates`/`localePath` helpers; localized sitemap — 88 entries (22 URLs × 4), `xhtml:link` alternates |
| UI | `LocaleSwitcher` (native names, path-preserving, `aria-expanded`/`listbox`); Navbar/Footer message keys; all internal links locale-aware (`@/i18n/navigation` `Link`); locale-scoped catch-all + not-found |

**V2-06 acceptance evidence (production build + local server, 2026-10-15):**
- build clean: TS pass, `ƒ Proxy (Middleware)` registered, all locales prerendered
- `/about` 200 unprefixed `lang="en" dir="ltr"` · `/en/about` **307 → /about** · `/de/about` 200 `lang="de"` · `/ar` `lang="ar" dir="rtl"` · `/fr/services` + `/ar/projects/cozee-care` 200
- `/` with `NEXT_LOCALE=de` cookie → **307 /de** (manual choice governs ambiguous entries); `/` without cookie → 200 (no geo/redirect)
- unknown path → localized 404 (English fallback in de) · hreflang cluster (en/de/fr/ar/x-default) + per-locale self-canonicals verified in served HTML · sitemap 88 entries with alternates · `/de/about` renders English fallback content as documented
- `npm run lint`: 0 errors (3 pre-existing warnings) · `npm run i18n:check`: OK

## Completed tasks — R1 (details in the R1 handoff, preserved below)

| Task ID | Change | Commit |
|---|---|---|
| — | Planning docs committed (plan v2.1 + v1 archive) | `343776f` |
| V2-05c / R1-CV3 | Deprecated resume PDF (verified by content as the superseded version) moved out of the served `public/` tree to `docs/archive/resume/[DEP]-Md-Sahaduzzaman-Resume.pdf`; `public/resume/` now contains exactly one file | `f4c4067` |
| V2-01 | `SITE_URL` constant (env-overridable, production fallback) in `src/data/site-config.ts`; `metadataBase` + root canonical/openGraph/twitter in `layout.tsx`; `robots.ts` sitemap URL on canonical host (was the stale `sahad.vercel.app`); `sitemap.ts` on canonical host + 4 missing routes (`/services`, `/terms`, `/privacy`, `/impressum`) | `acd7fa2` |
| V2-02 | Root `opengraph-image.tsx` (next/og, 1200×630, language-neutral card, generated at build); per-project OG/twitter images from case-study screenshots with `summary`-card fallback when no image exists (fixes imageless `summary_large_image`); case-study meta description now derives from the business outcome instead of `metrics[0]`, so removed claims can't leak into snippets | `7f0f2f4` |
| V2-03 | Broken proof links removed: 4j Traders `liveUrl` (domain serves a "currently unavailable" page), Rushkat `liveUrl: "#"` (rendered a broken external-link icon). Unreachable demo URLs kept pending owner verification (O2) | `9e73be6` |
| V2-04 | Unverifiable claims removed per plan §9.6: case-study metrics/outcomes now state mechanisms (no "100% …", "zero errors", "sub-100ms/500ms", "95+ PageSpeed", "zero-downtime"); Services page "100/100 Performance scores" → Core Web Vitals testing process promise, "Sub-100ms" → caching/query-optimization description; retainer FAQ "zero downtime" → honest maintenance language | `05e2a4a` |
| Lint fixes | 8 pre-existing lint **errors** fixed (unescaped entities in CallToAction/privacy/projects/services/terms + unused icon imports in site-config). Remaining: 4 pre-existing warnings in untouched files (deferred to R2 hygiene) | `7b67382`, `bf25679` |
| R1-CV1 | `experience.ts` reconciled with the actual updated resume PDF (read in full): 4j Traders **Jul → Sep 2025** start; Rushkat end **Jun → Jan 2025**; unverifiable "60% response time" claim removed (absent from the new resume too); **Taqwa Group employment entry added** (Feb 2024 – Aug 2025, bullets condensed from resume content, nothing invented); bio "3+ years" → "Working professionally since 2024" | `7d6a84a` |
| R1-CV2 | Approved updated resume committed at the frozen canonical path `public/resume/Md-Sahaduzzaman-Resume.pdf` (URL, filename, navbar link, new-tab behavior unchanged). Reaches production only on merge + push | `bcce21c` |

## Files changed

`src/data/site-config.ts` · `src/data/projects.ts` · `src/data/services.ts` · `src/data/experience.ts` · `src/data/faq.ts` · `src/app/layout.tsx` · `src/app/robots.ts` · `src/app/sitemap.ts` · `src/app/opengraph-image.tsx` (new) · `src/app/projects/[id]/page.tsx` · `src/components/sections/CallToAction.tsx` · `src/app/{privacy,projects,services,terms}/page.tsx` (lint escapes) · `docs/archive/resume/[DEP]-Md-Sahaduzzaman-Resume.pdf` (moved) · `docs/portfolio-v2-audit-and-plan{,-v1}.md` (committed)

## Commands run and results

| Command | Result |
|---|---|
| `npm run lint` | **0 errors**, 4 pre-existing warnings (unused vars in untouched `Navbar`/`ContactForm`/`FAQ` — R2 hygiene) |
| `npm run build` | ✅ Compiled (Turbopack 32.9 s), TypeScript clean, 28 static pages generated incl. `/opengraph-image`, `/robots.txt`, `/sitemap.xml` |
| `npm run start` + curl verification (local production server) | See acceptance evidence below |

## Acceptance evidence (verified against generated output, 2026-10-15)

- `robots.txt` → `Sitemap: https://sahadcse.vercel.app/sitemap.xml` ✅ (was `sahad.vercel.app`)
- `sitemap.xml` → 22 URLs, **all** on `https://sahadcse.vercel.app`, incl. the 4 added routes ✅
- Homepage: `<link rel="canonical" href="https://sahadcse.vercel.app"/>` (absolute) ✅ · `og:image` → generated card ✅ · `og:url` absolute ✅ · `twitter:card=summary_large_image` ✅
- OG image endpoint: HTTP 200, `image/png`, 40.5 KB — visually verified (name + role card, language-neutral) ✅
- `/projects/cozee-care`: absolute canonical ✅ · `og:image` = case-study screenshot ✅ · meta description claim-safe (no "100%" figures) ✅
- `/projects/rushkat`: twitter card falls back to `summary` (no image) ✅
- `/about` renders the reconciled history (Taqwa Group entry, corrected periods, "Working professionally since 2024") ✅
- Claim scan (`100%`, `Sub-100ms`, `95+`, `zero downtime`, `60%`, `3+ years`, `100/100`, …) over `src/`: only legitimate hits remain (terms/privacy disclaimers, ownership promise, inert highlight patterns) ✅

## Recorded findings (for later roadmap use)

1. **Taqwa Group is an employer, not a client** (per the updated resume). The `taqwa-group` case study is therefore **employment-tier** work. Delivered count stays 8; composition becomes 2 client systems + 2 client sites + 1 own product + 3 employment. Apply the tier in V2-10; update §9.3 composition note at the next plan touch.
2. **Date overlaps:** Taqwa (Feb 2024–Aug 2025) overlaps Rushkat (Oct 2024–Jan 2025) — presumably concurrent remote roles. Recruiters may ask; owner may want a one-line note in About (V2-19).
3. **FCHC vs FCSC:** resume says "FCHC Healthcare Portal", site project is `fcsc-healthcare` / "FCSC Healthcare Portal". Needs owner adjudication (O6) before V2-10 rewrites case studies.
4. `ProjectDetails.tsx` `BUSINESS_KEYWORDS`/`TECH_KEYWORDS` highlight lists still reference removed claim phrases — now inert (no data matches); prune during the V2-10 rework.

## Remaining R1 items — manual actions (owner only)

| Action | Task | Where |
|---|---|---|
| Set `NEXT_PUBLIC_SITE_URL=https://sahadcse.vercel.app` in Vercel project env (code has a matching fallback, so this is belt-and-braces) | O1 / V2-01 | Vercel dashboard |
| Rotate the Gmail app password used by the contact form; prune dead env vars from Vercel | O4 / V2-05 | Google account + Vercel |
| Retire (or pause + de-index) the legacy `sahad.vercel.app` deployment | O5 / V2-05b | Vercel dashboard |
| Verify the 4 unreachable demo links (fcsc-nids, award-care-landing, procourier, restaurant-hubbd) from a second network; confirm/remove | O2 / V2-03 follow-up | Browser |
| Confirm client-name/link permissions (Cozee Care, Violina, Taqwa, FCSC/FCHC, NDIS CarePlus, 4j) | O2 | — |
| Confirm the resume adjudications applied in R1-CV1 (dates, Taqwa entry, FCHC/FCSC) | O6 | — |
| After merge + deploy: submit `https://sahadcse.vercel.app/sitemap.xml` in Search Console; request removal of stale `sahad.vercel.app` URLs | V2-01 closeout | Search Console |
| LinkedIn Post Inspector spot-check of the share card once deployed | V2-02 closeout | LinkedIn |

## Known limitations & deferred items (V2-06)

- **de/fr/ar content is English by fallback** — per plan §10.5 this is the documented architecture-stage behavior; translations are V2-24 (MT drafts) + V2-25 (human review). `i18n:check --strict` will gate completeness once translations land.
- **Arabic typography not yet wired** — font loading, line-height, letter-spacing rules and the full logical-property component pass are V2-08. Only `dir="rtl"` is active.
- **LocaleSwitcher styling** uses current tokens (fine for now); visual pass happens with the design work (V2-07+).
- **Dev server interrupted:** an `npm run dev` session was running against this repo and held Windows file locks on `src/app/blog` and `src/app/projects`; it was stopped (PIDs documented in session) so the route moves could proceed. Restart with `npm run dev` as needed.
- **Extracted strings are nav/footer/not-found only** — the rest of the UI strings migrate into `messages/` during their owning tasks (V2-09 homepage, V2-15 contact form localization, etc.), per plan scope boundaries.

## Next task

**V2-13 — Motion budget + reduced-motion** (Group 2 / R2b, deps V2-07 ✅ V2-08 ✅; hero static paint already delivered by V2-09) and **V2-15 — contact hardening** (deps V2-06 ✅ V2-17) are the next unblocked tasks. Owner inputs to arrange in parallel: O7–O10, plus the still-open R1 manual actions below.

---

## Remaining manual actions (owner only — carried from R1)

| Action | Task | Where |
|---|---|---|
| Set `NEXT_PUBLIC_SITE_URL=https://sahadcse.vercel.app` in Vercel env (code has a matching fallback) | O1 / V2-01 | Vercel dashboard |
| Rotate the Gmail app password used by the contact form; prune dead env vars | O4 / V2-05 | Google account + Vercel |
| Retire (or pause + de-index) the legacy `sahad.vercel.app` deployment | O5 / V2-05b | Vercel dashboard |
| Verify the 4 unreachable demo links from a second network; confirm/remove | O2 / V2-03 follow-up | Browser |
| Confirm client-name/link permissions (Cozee Care, Violina, Taqwa, FCSC/FCHC, NDIS CarePlus, 4j) | O2 | — |
| Confirm the resume adjudications applied in R1-CV1 (dates, Taqwa employment entry, FCHC/FCSC naming) | O6 | — |
| After merge + deploy: submit the sitemap in Search Console; request removal of stale `sahad.vercel.app` URLs | V2-01 closeout | Search Console |
| LinkedIn Post Inspector spot-check of the share card once deployed | V2-02 closeout | LinkedIn |

---

## Completed tasks — R1 (archive of the prior handoff)
