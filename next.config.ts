import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * next-intl plugin wires src/i18n/request.ts (message loading with the
 * English fallback merge) into the Next.js build.
 */
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.104'],
};

export default withNextIntl(nextConfig);
