import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG, SITE_URL } from "@/data/site-config";
import { ThemeProvider } from "@/components/layout/theme-provider";
import GoToTop from "@/components/shared/GoToTop";
import { routing } from "@/i18n/routing";
import { LOCALE_DIR, localeAlternates, localePath, type Locale } from "@/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Arabic UI face (plan §10.8) — self-hosted at build; Latin/numerals keep
// Inter via per-glyph fallback in the --font-sans/--font-mono stacks
const plexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Segment-level metadata. Child pages that define their own `alternates`
 * replace this object per Next.js shallow merge — every page therefore
 * builds its canonical + hreflang cluster from the same helpers
 * (localePath / localeAlternates) so they can never drift apart (§10.6).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    alternates: {
      canonical: localePath(locale as Locale, "/"),
      languages: localeAlternates("/"),
    },
    openGraph: {
      type: "website",
      url: localePath(locale as Locale, "/"),
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Validate the locale and enable static rendering for this segment
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={LOCALE_DIR[locale as Locale]}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Pre-hydration theme init — prevents a light/dark flash before React
            mounts. Rendered via next/script (beforeInteractive): Next hoists it
            into the initial HTML and does NOT re-render it during client-side
            locale navigation, which is what triggered React's
            "script tag inside React component" warning with the previous raw
            <script> element. Same code as before; no nonce/CSP in this app. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var resolvedTheme = theme === 'system' ? systemTheme : theme || systemTheme;
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${plexSansArabic.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Navbar />
            {/* Full-width main: sections may bleed backgrounds/borders to the
                viewport edges; content constrains itself via .container-content */}
            <main className="grow flex flex-col">
              {children}
            </main>
            <Footer />
            <GoToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
