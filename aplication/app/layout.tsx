import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
      >
        <LanguageProvider>
          <Header />

          <SmoothScroll>
            {children}
          </SmoothScroll>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

