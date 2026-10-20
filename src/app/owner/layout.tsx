import type { Metadata } from "next";
import "../globals.css";

/**
 * Standalone root layout for the private owner area (multi-root setup —
 * no shared chrome with the public site, no links from it).
 * robots: noindex/nofollow — the route is not for search engines.
 */
export const metadata: Metadata = {
  title: "Owner",
  robots: { index: false, follow: false },
};

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
