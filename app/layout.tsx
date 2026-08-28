import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aquarium Clock",
  description:
    "A relaxing underwater aquarium clock that shows your local time and date with gentle fish, bubbles, and seaweed.",
  keywords: ["aquarium", "clock", "relaxing", "underwater", "time"],
  authors: [{ name: "Aquarium Clock" }],
  openGraph: {
    title: "Aquarium Clock",
    description:
      "A calming aquarium clock with animated fish, bubbles, and time-of-day lighting.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
