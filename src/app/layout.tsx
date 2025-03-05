import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { InitialAnimation } from "@/components/InitialAnimation";
import { BackgroundModel } from "@/components/BackgroundModel";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin"],
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
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <InitialAnimation />
        <div className="flex relative min-h-screen w-screen justify-center items-center">
          <BackgroundModel />
          <div className="flex flex-col absolute z-40 top-0 left-0 w-full min-h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
