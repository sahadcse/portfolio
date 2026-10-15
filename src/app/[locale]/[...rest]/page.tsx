import { notFound } from "next/navigation";

/**
 * Locale-scoped catch-all: unknown paths under any locale render the
 * localized not-found page (within the locale layout) instead of erroring.
 */
export default function CatchAllPage() {
    notFound();
}
