# Portfolio V2 — Implementation Status

**Plan:** `docs/portfolio-v2-audit-and-plan.md` (v2.1, approved 2026-10-15) — authoritative specification.
**Current stage:** **R2b — Experience build (start).** R1 complete · V2-06 complete · V2-07 complete · **V2-08 complete**.
**Working branch:** `v2-r1-implementation` (based on `main` @ `fc3a46e`). **Nothing pushed or deployed.**

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

**V2-12 — Image pipeline** (Group 2 / R2b): PNG→WebP ≤ 300 KB, 1600px max, uniform 16:10 crops, mono captions ("Fig. 01 — …"). It has zero dependencies and is the unblocker for the content build — V2-09 (homepage flagships), V2-10 (case-study system), and V2-11 (projects index) all depend on it. In parallel, V2-13 (motion budget + hero static paint + reduced-motion, dep V2-07 ✅) can run. Owner inputs to arrange in parallel: O7–O10, plus the still-open R1 manual actions below.

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
