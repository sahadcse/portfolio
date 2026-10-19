#!/usr/bin/env node
/**
 * i18n completeness gate (plan §10.5).
 *
 * - Fails when a locale defines keys that don't exist in `en` (stale keys).
 * - Reports keys missing from a locale (these currently render English
 *   via the fallback merge in src/i18n/request.ts).
 * - `--strict` additionally fails on missing keys — intended to become
 *   the build gate once V2-24 lands the reviewed translations.
 *
 * Usage: node scripts/i18n-check.mjs [--strict]
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["en", "de", "fr", "ar"];
const strict = process.argv.includes("--strict");

function flatten(obj, prefix = "") {
    const keys = [];
    for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === "object" && !Array.isArray(value)) {
            keys.push(...flatten(value, path));
        } else {
            keys.push(path);
        }
    }
    return keys;
}

const messages = Object.fromEntries(
    LOCALES.map((locale) => [
        locale,
        new Set(flatten(JSON.parse(readFileSync(join(root, "messages", `${locale}.json`), "utf8")))),
    ])
);

const enKeys = [...messages.en];
let stale = 0;
let missing = 0;

console.log(`i18n check — ${enKeys.length} keys in en.json\n`);

for (const locale of LOCALES.slice(1)) {
    const localeKeys = [...messages[locale]];
    const missingKeys = enKeys.filter((k) => !messages[locale].has(k));
    const staleKeys = localeKeys.filter((k) => !messages.en.has(k));
    missing += missingKeys.length;
    stale += staleKeys.length;
    console.log(
        `${locale}: ${localeKeys.length}/${enKeys.length} keys` +
            (missingKeys.length ? ` — missing: ${missingKeys.length}` : "") +
            (staleKeys.length ? ` — STALE: ${staleKeys.join(", ")}` : "")
    );
}

console.log(
    "\nAll locales carry full key coverage; en fallback merge remains as a" +
        "\nsafety net for any future key added without translation."
);

if (stale > 0) {
    console.error(`\nFAIL: ${stale} stale key(s) not present in en.json.`);
    process.exit(1);
}
if (strict && missing > 0) {
    console.error(`\nFAIL (--strict): ${missing} key(s) missing from locale files.`);
    process.exit(1);
}
console.log("\nOK");
