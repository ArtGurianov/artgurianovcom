import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import {
  InitialAnimation,
  InitialAnimationProvider,
} from "@/components/InitialAnimation";
import { BackgroundModel } from "@/components/BackgroundModel";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Art Gurianov",
  description: "Full cycle WEB3 dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${bluuNext.variable} antialiased`}
      >
        <InitialAnimationProvider>
          <InitialAnimation />
          <div className="flex relative min-h-svh w-svw justify-center items-center">
            <BackgroundModel />
            <div className="flex flex-col absolute z-30 top-0 left-0 w-full min-h-full">
              {children}
            </div>
          </div>
          <Toaster />
        </InitialAnimationProvider>
      </body>
    </html>
  );
}
