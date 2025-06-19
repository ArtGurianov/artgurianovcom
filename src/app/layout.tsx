import type { Viewport } from "next";
import { Inter as FontSans, Fira_Mono as FontMono } from "next/font/google";
import localFont from "next/font/local";
import {
  InitialAnimation,
  InitialAnimationProvider,
} from "@/components/InitialAnimation";
import { BackgroundModel } from "@/components/BackgroundModel";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReCaptchaProvider } from "@/components/common/ReCaptcha/ReCaptchaProvider";
import { NextIntlClientProvider } from "next-intl";
import { LangSwitcher } from "@/components/LangSwitcher/LangSwitcher";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { SEO_KEYWORDS } from "@/config/seo/const";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin-ext", "cyrillic-ext"],
});

const fontMono = FontMono({
  variable: "--font-mono",
  subsets: ["latin-ext", "cyrillic-ext"],
  weight: "400",
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

export async function generateMetadata() {
  const t = await getTranslations({ locale, namespace: "METADATA" });

  return {
    metadataBase: new URL("https://artgurianov.com"),
    openGraph: { siteName: t("siteName"), type: "website", locale },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: "index, follow",
    },
    applicationName: t("siteName"),
    appleWebApp: {
      title: t("siteName"),
      statusBarStyle: "default",
      capable: true,
    },
    title: t("title"),
    description: t("description"),
    keywords: SEO_KEYWORDS[locale],
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          type: "image/x-icon",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
      shortcut: [
        {
          url: "/favicon.ico",
          type: "image/x-icon",
        },
      ],
      apple: [
        {
          url: "/apple-icon-57x57.png",
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: "/apple-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = locale === "ru-RU" ? "ru" : "en";

  return (
    <html lang={lang}>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${bluuNext.variable} antialiased`}
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
