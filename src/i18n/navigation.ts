import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation — Link/useRouter/usePathname from here apply
 * the current locale's URL scheme automatically (English unprefixed,
 * others /{locale}-prefixed) and keep the current path on locale switch.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
