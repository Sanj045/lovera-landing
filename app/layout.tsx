import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

// Cấu hình font
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "LOVERA — Ứng dụng đếm ngày yêu cho các cặp đôi",
  description:
    "LOVERA giúp các cặp đôi đếm ngày yêu nhau, chăm sóc khu vườn tình yêu và nhận gợi ý hẹn hò thông minh từ AI. Đăng ký dùng thử miễn phí",
  keywords: [
    "đếm ngày yêu", "app cặp đôi", "ứng dụng tình yêu", "khu vườn tình yêu",
    "lovera", "couple app", "love counter", "dating app", "app cho cặp đôi",
  ],
  metadataBase: new URL("https://lovera.app"),
  openGraph: {
    title: "LOVERA — Ứng dụng đếm ngày yêu cho các cặp đôi",
    description: "Đếm ngày yêu, chăm sóc khu vườn tình yêu, nhận gợi ý hẹn hò từ AI",
    url: "https://lovera.app",
    siteName: "LOVERA",
    locale: "vi_VN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "LOVERA", description: "Ứng dụng dành cho các cặp đôi GenZ" },
  alternates: {
    canonical: "/",
    languages: { "vi-VN": "/", "en-US": "/?lang=en" },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className={`${beVietnamPro.className} bg-cream antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        {/* Chỉ render GA4 nếu có biến môi trường */}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}