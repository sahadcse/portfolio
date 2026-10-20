import { ImageResponse } from "next/og";

/**
 * Root Open Graph image (1200x630) — generated at build time via next/og.
 * Language-neutral (name + role + domain) so it works as the fallback
 * preview for every route that doesn't define its own image.
 * Child routes that set their own openGraph.images in generateMetadata
 * override this; routes without explicit OG metadata inherit it.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sahad — Full-Stack Software Engineer";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "96px",
                    backgroundColor: "#101A2E",
                    color: "#F8FAFC",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
                    <div style={{ width: 72, height: 8, backgroundColor: "#5A5FF5", marginRight: 24 }} />
                    <div style={{ fontSize: 28, letterSpacing: 8, color: "#94A3B8" }}>PORTFOLIO</div>
                </div>
                <div style={{ fontSize: 104, fontWeight: 700, display: "flex" }}>Sahad</div>
                <div style={{ fontSize: 46, color: "#A5A9F8", marginTop: 16, display: "flex" }}>
                    Full-Stack Software Engineer
                </div>
                <div style={{ fontSize: 26, color: "#64748B", marginTop: 40, display: "flex" }}>
                    sahadcse.vercel.app
                </div>
            </div>
        ),
        { ...size }
    );
}
