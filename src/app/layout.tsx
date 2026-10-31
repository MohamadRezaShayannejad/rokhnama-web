import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/ui/CustomCursor";
import Header from "@/ui/Header";
import SmoothScrollProvider from "@/ui/SmoothScrollProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" style={{ colorScheme: 'light' }} data-theme="light">
      <body className={`${abar.variable} ${abar.className} antialiased bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)]`}>
        <SmoothScrollProvider>
          <CustomCursor />
          <Header />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
