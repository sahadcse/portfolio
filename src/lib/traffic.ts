/**
 * Server-side Vercel Web Analytics fetcher for the owner dashboard
 * (aggregate, cookieless traffic stats — page views ≠ visitors).
 *
 * Credentials (server-only env vars, never NEXT_PUBLIC):
 *   VERCEL_TOKEN       — Vercel access token (Web Analytics read scope)
 *   VERCEL_PROJECT_ID  — project id (prj_...)
 *   VERCEL_TEAM_ID     — team id, only for team-owned projects (optional)
 *
 * API: https://vercel.com/docs/analytics/web-analytics-api
 *   count      → /v1/query/web-analytics/visits/count   (lifetime totals)
 *   aggregate  → /v1/query/web-analytics/visits/aggregate (by=day; within the
 *                 plan's reporting window — labeled accordingly in the UI)
 */

export interface DailyRow {
  date: string; // YYYY-MM-DD
  pageviews: number;
  visitors: number;
}

export interface TrafficData {
  totalPageviews: number | null;
  totalVisitors: number | null;
  todayPageviews: number | null;
  todayVisitors: number | null;
  daily: DailyRow[];
  since: string;
  until: string;
}

export type ConfigMissing = "VERCEL_TOKEN" | "VERCEL_PROJECT_ID";
export type TrafficResult =
  | { state: "ok"; data: TrafficData }
  | { state: "unconfigured"; missing: ConfigMissing[] }
  | { state: "error"; message: string };

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

function config(): { token: string; projectId: string; teamId?: string } | null {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;
  return { token, projectId, teamId: process.env.VERCEL_TEAM_ID || undefined };
}

async function callApi(
  token: string,
  params: Record<string, string>
): Promise<unknown> {
  const url = new URL("https://api.vercel.com/v1/query/web-analytics/visits/" + params.__path);
  for (const [key, value] of Object.entries(params)) {
    if (key !== "__path") url.searchParams.set(key, value);
  }
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    // Owner dashboard: never cache private analytics responses
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Vercel Analytics API responded ${response.status}`);
  }
  return response.json();
}

/**
 * Fetches totals + the last 30 days of daily data. Distinguishes:
 *  - unconfigured → named missing env vars (no values)
 *  - API failure  → generic server-side-safe message
 *  - ok           → real numbers (which may legitimately be zero)
 */
export async function fetchTrafficData(): Promise<TrafficResult> {
  const cfg = config();
  if (!cfg) {
    const missing: ConfigMissing[] = [];
    if (!process.env.VERCEL_TOKEN) missing.push("VERCEL_TOKEN");
    if (!process.env.VERCEL_PROJECT_ID) missing.push("VERCEL_PROJECT_ID");
    return { state: "unconfigured", missing };
  }

  const until = isoDaysAgo(0);
  const since = isoDaysAgo(29);
  const today = isoDaysAgo(0);

  const baseParams: Record<string, string> = {
    __path: "count",
    projectId: cfg.projectId,
    ...(cfg.teamId ? { teamId: cfg.teamId } : {}),
  };

  try {
    const countJson = (await callApi(cfg.token, baseParams)) as {
      data?: { pageviews?: number; visitors?: number };
    };

    const dailyJson = (await callApi(cfg.token, {
      ...baseParams,
      __path: "aggregate",
      since,
      until,
      by: "day",
    })) as { data?: { timestamp: string; pageviews: number; visitors: number }[] };

    const daily: DailyRow[] = (dailyJson.data ?? []).map((row) => ({
      date: row.timestamp.slice(0, 10),
      pageviews: row.pageviews ?? 0,
      visitors: row.visitors ?? 0,
    }));

    const todayRow = daily.find((row) => row.date === today) ?? null;

    return {
      state: "ok",
      data: {
        totalPageviews: countJson.data?.pageviews ?? null,
        totalVisitors: countJson.data?.visitors ?? null,
        todayPageviews: todayRow?.pageviews ?? 0,
        todayVisitors: todayRow?.visitors ?? 0,
        daily,
        since,
        until,
      },
    };
  } catch (error) {
    // Server-side log only; the UI receives a generic message
    console.error("[owner-traffic] analytics fetch failed:", error);
    return {
      state: "error",
      message: "Traffic data is temporarily unavailable. Try again later.",
    };
  }
}
