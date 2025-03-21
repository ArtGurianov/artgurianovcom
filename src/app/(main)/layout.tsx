import {
  InitialAnimation,
  InitialAnimationProvider,
} from "@/components/InitialAnimation";
import { BackgroundModel } from "@/components/BackgroundModel";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InitialAnimationProvider>
      <InitialAnimation />
      <div className="flex relative min-h-svh w-svw justify-center items-center">
        <BackgroundModel />
        <div className="flex flex-col absolute z-30 top-0 left-0 w-full min-h-full">
          <Navbar />
          {children}
        </div>
      </div>
      <Toaster />
    </InitialAnimationProvider>
  );
}
