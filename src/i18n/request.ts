import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import type { Locale } from "./config";
import en from "../../messages/en.json";
import de from "../../messages/de.json";
import fr from "../../messages/fr.json";
import ar from "../../messages/ar.json";

type MessageDict = Record<string, unknown>;

const MESSAGES: Record<Locale, MessageDict> = { en, de, fr, ar };

/**
 * Deep-merge `override` on top of `base`. Arrays and primitives replace.
 */
function deepMerge(base: MessageDict, override: MessageDict): MessageDict {
    const result: MessageDict = { ...base };
    for (const [key, value] of Object.entries(override)) {
        const baseValue = base[key];
        result[key] =
            value &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            baseValue &&
            typeof baseValue === "object" &&
            !Array.isArray(baseValue)
                ? deepMerge(baseValue as MessageDict, value as MessageDict)
                : value;
    }
    return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // English fallback (plan §10.5): the requested locale's messages are
    // merged OVER the English set, so a missing key renders the English
    // string instead of a raw key path. Completed translations land via
    // V2-24 and are gated by `npm run i18n:check`.
    const messages = deepMerge(MESSAGES.en, MESSAGES[locale]);

    return { locale, messages };
});
