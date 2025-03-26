import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import {
  InitialAnimation,
  InitialAnimationProvider,
} from "@/components/InitialAnimation";
import { BackgroundModel } from "@/components/BackgroundModel";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReCaptchaProvider } from "@/components/ReCaptcha/ReCaptchaProvider";
import { NextIntlClientProvider } from "next-intl";
import { LangSwitcher } from "@/components/LangSwitcher/LangSwitcher";
import { getAppLocale } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin"],
});

const bluuNext = localFont({
  src: "../fonts/Bluu.ttf",
  variable: "--font-bluu",
});

const locale = getAppLocale();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eaf2e3",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://artgurianov.com"),
  openGraph: {
    siteName: "Web3 | Art Gurianov",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  applicationName: "Web3 | Art Gurianov",
  appleWebApp: {
    title: "Web3 | Art Gurianov",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    yandex: ["caef9178f2adfea1"],
  },
  title: "Art Gurianov",
  description: "Full cycle WEB3 developer",
  keywords: ["web3", "saas", "pet project", "full stack", "develop"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = locale === "ru-RU" ? "ru" : "en";

  return (
    <html lang={lang}>
      <body
        className={`${inter.variable} ${geistMono.variable} ${bluuNext.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ReCaptchaProvider>
            <InitialAnimationProvider>
              <InitialAnimation />
              <div className="flex relative min-h-svh w-svw justify-center items-center">
                <BackgroundModel />
                <div className="flex flex-col absolute z-30 top-0 left-0 w-full min-h-full">
                  {children}
                  <Navbar />
                  <LangSwitcher />
                </div>
              </div>
              <Toaster />
            </InitialAnimationProvider>
          </ReCaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
