import type { Metadata } from "next";
import { headers } from "next/headers";
import { login, logout } from "./actions";
import {
  hasValidSession,
  isOwnerConfigured,
  isThrottled,
  attemptKey,
} from "@/lib/owner-auth";
import { fetchTrafficData } from "@/lib/traffic";

export const metadata: Metadata = {
  title: "Website Traffic — Owner",
  robots: { index: false, follow: false },
};

// Private owner data: never cached anywhere
export const dynamic = "force-dynamic";

const numberFormat = new Intl.NumberFormat("en-US");

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-card p-5">
      <p className="text-3xl font-bold text-primary tabular-nums">{value}</p>
      <p className="text-label text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function LoginScreen({
  error,
  throttled,
}: {
  error?: string;
  throttled: boolean;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-h2 mb-2">Owner access</h1>
      <p className="text-body text-muted-foreground mb-6">
        This dashboard is private. Enter the owner password to continue.
      </p>
      <form action={login} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-sm border border-input bg-background px-4 py-3 text-body focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {throttled && (
          <p role="alert" className="text-sm text-destructive">
            Too many attempts — try again in a few minutes.
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

function DailyChart({ daily }: { daily: { date: string; pageviews: number; visitors: number }[] }) {
  const max = Math.max(1, ...daily.map((row) => row.pageviews));
  return (
    <div
      className="flex h-40 items-end gap-1"
      role="img"
      aria-label={`Daily page views for the last ${daily.length} days`}
    >
      {daily.map((row) => (
        <div key={row.date} className="group relative flex-1 flex flex-col items-center justify-end h-full">
          <span className="pointer-events-none absolute -top-6 hidden group-hover:block whitespace-nowrap rounded-sm border border-border bg-popover px-1.5 py-0.5 text-mono text-muted-foreground z-10">
            {row.date}: {row.pageviews} views · {row.visitors} visitors
          </span>
          <div
            className="w-full rounded-t-sm bg-primary/70 group-hover:bg-primary transition-colors"
            style={{ height: `${Math.max(2, (row.pageviews / max) * 100)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

async function DashboardContent() {
  const result = await fetchTrafficData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h2">Website Traffic</h1>
          <p className="text-label text-muted-foreground mt-1">
            Vercel Web Analytics · aggregate, cookieless · daily grouping in UTC
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-sm border border-input px-4 py-2 text-label hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Log out
          </button>
        </form>
      </div>

      {result.state === "unconfigured" && (
        <div className="rounded-md border border-warning/40 bg-warning/10 p-6" role="status">
          <h2 className="text-h3 mb-2">Analytics not configured yet</h2>
          <p className="text-body text-muted-foreground">
            Missing server environment variable
            {result.missing.length > 1 ? "s" : ""}:{" "}
            <span className="font-mono">{result.missing.join(", ")}</span>. Set
            {result.missing.length > 1 ? " them" : " it"} in the Vercel project
            settings (or <span className="font-mono">.env.local</span> locally)
            and redeploy. See{" "}
            <span className="font-mono">docs/visitor-analytics-setup.md</span>.
          </p>
        </div>
      )}

      {result.state === "error" && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-6" role="alert">
          <h2 className="text-h3 mb-2">Traffic data unavailable</h2>
          <p className="text-body text-muted-foreground">{result.message}</p>
        </div>
      )}

      {result.state === "ok" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard
              label={`Total page views (retention window)`}
              value={
                result.data.totalPageviews === null
                  ? "—"
                  : numberFormat.format(result.data.totalPageviews)
              }
            />
            <StatCard
              label="Total unique visitors"
              value={
                result.data.totalVisitors === null
                  ? "—"
                  : numberFormat.format(result.data.totalVisitors)
              }
            />
            <StatCard
              label="Today's page views"
              value={numberFormat.format(result.data.todayPageviews ?? 0)}
            />
            <StatCard
              label="Today's unique visitors"
              value={numberFormat.format(result.data.todayVisitors ?? 0)}
            />
          </div>

          <section className="rounded-md border border-border/60 bg-card p-6 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-h3">Daily traffic</h2>
              <p className="text-mono text-muted-foreground">
                {result.data.since} → {result.data.until} (UTC)
              </p>
            </div>
            {result.data.daily.length === 0 ? (
              <p className="text-body text-muted-foreground py-8 text-center">
                No data collected yet. Page-view tracking starts once the
                deployment with Vercel Web Analytics is live and the feature is
                enabled in the Vercel dashboard — check back after the first
                visits.
              </p>
            ) : (
              <>
                <DailyChart daily={result.data.daily} />
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-body">
                    <thead>
                      <tr className="border-b border-border/60 text-start">
                        <th scope="col" className="py-2 pe-4 text-label text-muted-foreground uppercase text-start">Date</th>
                        <th scope="col" className="py-2 px-4 text-label text-muted-foreground uppercase text-end">Page views</th>
                        <th scope="col" className="py-2 text-label text-muted-foreground uppercase text-end">Unique visitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...result.data.daily].reverse().map((row) => (
                        <tr key={row.date} className="border-b border-border/30">
                          <td className="py-2 pe-4 text-mono text-muted-foreground">{row.date}</td>
                          <td className="py-2 px-4 text-end tabular-nums">{numberFormat.format(row.pageviews)}</td>
                          <td className="py-2 text-end tabular-nums">{numberFormat.format(row.visitors)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-mono text-muted-foreground">
                  Note: daily unique-visitor counts do not sum to the period
                  total — the same visitor can appear on multiple days. Totals
                  come from Vercel's own count query.
                </p>
              </>
            )}
          </section>

          <p className="text-label text-muted-foreground">
            Refresh this page for the latest numbers (fetched live, never
            cached).
          </p>
        </>
      )}
    </div>
  );
}

export default async function TrafficPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const configured = isOwnerConfigured();
  const authenticated = configured && (await hasValidSession());

  if (!authenticated) {
    const headerList = await headers();
    const ip =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerList.get("x-real-ip") ??
      "";
    return (
      <LoginScreen
        error={error === "1" ? "Incorrect password." : undefined}
        throttled={error === "1" && isThrottled(attemptKey(ip))}
      />
    );
  }

  return <DashboardContent />;
}
