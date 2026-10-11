import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const abar = localFont({
  src: [
    {
      path: "../fonts/Abar-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Abar-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Abar-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Abar-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Abar-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-abar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "رُخ‌نما | ویترین دیجیتال کسب‌وکار فیزیکی‌تان",
  description: "خدمات ایجاد کاتالوگ‌های دیجیتال تعاملی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${abar.variable} ${abar.className} antialiased bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)]`}>
        {children}
      </body>
    </html>
  );
}
