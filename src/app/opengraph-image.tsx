import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Antonio Brescia — Senior Energy Consultant";

/**
 * Social preview image, generated on demand at `/opengraph-image`.
 * Referenced from the root layout metadata.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#081426",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: "bold",
            }}
          >
            AB
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: "bold" }}>Antonio Brescia</div>
            <div style={{ fontSize: 22, color: "#6ee7b7" }}>
              Senior Energy Consultant
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: "bold",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            L&apos;energia è un costo. La gestiamo come un asset.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a3bcd8",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Audit, efficienza, rinnovabili e decarbonizzazione per imprese e
            investitori.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#7499c0",
          }}
        >
          <div>Consulenza indipendente · Nessuna commissione da fornitori</div>
          <div style={{ color: "#ffffff", fontWeight: "bold" }}>
            {site.domain}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
