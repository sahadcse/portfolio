"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  attemptKey,
  clearAttempts,
  createSessionValue,
  isOwnerConfigured,
  isThrottled,
  registerFailedAttempt,
  verifyPassword,
} from "@/lib/owner-auth";

/**
 * Login: verifies the owner password (constant-time) and sets a signed,
 * httpOnly session cookie. Failures redirect back with a generic error
 * flag — never revealing which factor failed. Throttled per client
 * (best-effort in-memory).
 */
export async function login(formData: FormData): Promise<void> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "";
  const key = attemptKey(ip);

  if (!isOwnerConfigured() || isThrottled(key)) {
    redirect("/owner/traffic?error=1");
  }

  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    registerFailedAttempt(key);
    redirect("/owner/traffic?error=1");
  }

  clearAttempts(key);
  const { value, maxAge } = createSessionValue();
  const store = await cookies();
  store.set(SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  redirect("/owner/traffic");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/owner/traffic");
}
