import type { Metadata, Viewport } from "next";
import { Vazirmatn, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "شقایق و نیما",
  description: "دعوت‌نامه‌ی عروسی شقایق و نیما",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#4a4e3c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${nastaliq.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory-200 text-ink-900 font-sans">{children}</body>
    </html>
  );
}
