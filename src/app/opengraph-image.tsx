import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = SITE_DESCRIPTION;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#f9fafb";
const MUTED = "#ccd4eb";
const ACCENT = "#455aa9";
const CANVAS = "#101828";

// Satori over-measures RTL runs, so a box centered by width leaves its ink
// sitting left of centre; paddingLeft nudges each line back onto the axis.
export default async function OpengraphImage() {
  const [black, regular] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/Abar-Black.ttf")),
    readFile(join(process.cwd(), "src/fonts/Abar-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: size.width,
          height: size.height,
          boxSizing: "border-box",
          background: CANVAS,
          padding: "80px 96px",
          fontFamily: "Abar",
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 168,
            fontWeight: 900,
            color: INK,
            lineHeight: 1.1,
            paddingLeft: 80,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", width: 120, height: 4, background: ACCENT, margin: "36px 0" }} />
        <div style={{ display: "flex", fontSize: 38, color: MUTED, paddingLeft: 95 }}>
          ویترین دیجیتال کسب‌وکار فیزیکی‌تان
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Abar", data: black, weight: 900, style: "normal" },
        { name: "Abar", data: regular, weight: 400, style: "normal" },
      ],
    }
  );
}