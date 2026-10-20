# Visitor Analytics — Setup & Reference

Aggregate, cookieless traffic analytics for the portfolio via **Vercel Web Analytics**, plus a **private owner dashboard** at `/owner/traffic`.

## 1. How page views are collected

The `@vercel/analytics` package's `<Analytics />` component (mounted in `src/app/[locale]/layout.tsx`) sends an anonymous page-view event to Vercel on every route visit, including client-side navigations. Vercel aggregates these into **page views** and **unique visitors** (anonymized — no cookies for cross-site tracking, no personal profiles, no fingerprinting per Vercel's Web Analytics privacy documentation).

## 2. Page views vs. unique visitors

- A **page view** is one page load (or soft navigation) — one person browsing 5 pages generates 5 page views.
- A **unique visitor** is a distinct anonymized visitor within the measured window.
- Daily unique-visitor counts **do not sum** to a month's unique total — the same person on 5 days is counted once per day but once overall. The dashboard's totals come from Vercel's own count query, not from adding daily rows.

## 3. Source & limitations

- Data source: Vercel's aggregate Web Analytics store (same data as the Vercel dashboard).
- **Collection starts when the feature is enabled** — there is no historical backfill. Expect an empty state at first; that empty state is real.
- Daily aggregate queries are subject to Vercel's **plan reporting window**; lifetime totals use Vercel's count query, which reports within Vercel's data-retention window. Totals are therefore labeled "retention window" rather than "all-time" in the dashboard.
- Analytics data can lag a few minutes behind live traffic.

## 4. Required environment variables (server-only)

| Variable | Purpose |
|---|---|
| `OWNER_DASHBOARD_PASSWORD` | Password for `/owner/traffic` (min 8 chars) |
| `OWNER_SESSION_SECRET` | Random signing secret for the session cookie (min 16 chars; `openssl rand -base64 32`) |
| `VERCEL_TOKEN` | Vercel access token with Web Analytics read scope |
| `VERCEL_PROJECT_ID` | This project's id (`prj_...`) |
| `VERCEL_TEAM_ID` | Team id — **only** for team-owned projects; omit otherwise |

Never put these in `NEXT_PUBLIC_*` variables or commit them. `.env*` files are gitignored.

## 5. How to configure

**Locally:** copy the variable names into `.env.local` with real values.

**Vercel project (required for the hosted dashboard):** Project → Settings → Environment Variables → add the five variables (server scope) → redeploy.

**Enable Web Analytics:** Vercel dashboard → project → **Analytics** → **Enable**. Without this step the tracking endpoint stays inactive and the dashboard will show the empty state.

**Access token:** Account Settings → Tokens → create with the minimum scope needed for Web Analytics reads. Rotate by creating a new token, updating `VERCEL_TOKEN`, and deleting the old one.

## 6. Accessing the dashboard

Visit `/owner/traffic` (not linked anywhere public). Sign in with `OWNER_DASHBOARD_PASSWORD`. The session cookie is httpOnly, signed (HMAC-SHA256 with `OWNER_SESSION_SECRET`), expires after 7 days, and is re-verified server-side on every request. "Log out" clears it.

## 7. Rotating credentials

- **Password:** change `OWNER_DASHBOARD_PASSWORD` and redeploy. Active sessions remain valid until expiry — also rotate `OWNER_SESSION_SECRET` to invalidate all sessions immediately (every signed cookie fails verification).
- **Vercel token:** create → replace `VERCEL_TOKEN` → delete the old token.

## 8. Behavior before data exists

| Situation | Dashboard shows |
|---|---|
| Env vars missing | Named missing variables (no values leaked) |
| Enabled, no visitors yet | Empty-state message (a real zero, not a placeholder) |
| Vercel API error | Generic "temporarily unavailable" message (details server-logged only) |
| Not logged in | Login screen — no analytics data is exposed |

## 9. Privacy notes

Vercel Web Analytics is cookieless and aggregates anonymously. This portfolio adds no tracking cookies, no fingerprinting, and no custom identifiers; all analytics credentials are server-side. The public privacy notice carries a short disclosure sentence — have it reviewed before making any compliance claims; no compliance representation is made here.
