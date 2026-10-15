# Portfolio V2 — Implementation Status

**Plan:** `docs/portfolio-v2-audit-and-plan.md` (v2.1, approved 2026-10-15) — authoritative specification.
**Current stage:** **R1 — Immediate corrections (Group 1 P0 tasks + resume operations)** — code complete, pending owner review and manual account actions.
**Working branch:** `v2-r1-implementation` (based on `main` @ `fc3a46e`). **Nothing pushed or deployed.**

---

## Completed tasks

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

## Next task

**V2-06 — i18n architecture foundation** (Group 2 / R2a), dependencies satisfied: V2-01 ✅. Prerequisites to arrange in parallel: O7–O10 owner inputs. Per the plan's staging, R2a = V2-06 (i18n) + V2-07 (token consolidation); R1 should be reviewed and the manual actions above completed (or consciously deferred) before R2 begins.
