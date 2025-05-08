import type { Metadata } from "next";
import { Funnel_Display, Permanent_Marker } from "next/font/google";
import "./globals.css";

const custom = Permanent_Marker({
  variable: "--font-custom",
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

const text = Funnel_Display({
  variable: "--font-text",
  weight: ["500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Léa Weibel - Frontend Developer",
  description: "Léa Weibel's Interactive Digital Business Card",
  openGraph: {
    title: "Léa Weibel's Business Card",
    description:
      "Interactive business card built with Next.js and Tailwind CSS.",
    url: "https://lea-weibel.vercel.app/",
    siteName: "Léa Weibel",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${custom.variable} ${text.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
