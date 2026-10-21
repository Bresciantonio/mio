import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Root layout for the bare `/`.
 *
 * The site itself lives under the locale segment, and that segment owns the
 * real root layout (`src/app/[lang]/layout.tsx`), which sets `<html lang>`
 * per request. This second root layout exists only so that `/` is a real
 * route and not a hole: with it, a deployment where the locale proxy is not
 * applied still answers with the site instead of a 404.
 *
 * The page it hosts immediately redirects, so nothing else is needed here.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-ink-900">
        {children}
      </body>
    </html>
  );
}
