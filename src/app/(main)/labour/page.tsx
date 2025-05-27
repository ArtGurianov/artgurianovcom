import { PageContent } from "@/components/common/PageContent/PageContent";
import { Button } from "@/components/ui/button";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function LabourPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "LABOUR" });

  return (
    <PageContent className="flex flex-col md:flex-row grow px-8 pb-8 md:px-32 gap-8 md:gap-12">
      <Button
        variant="ghost"
        size="reset"
        className="relative w-full md:w-1/2 grow border-2 border-primary shadow-lg"
      >
        <Link className="absolute w-full h-full" href="/labour/recruit">
          <Image
            alt="background image for recruit page"
            className="h-full w-full object-cover"
            src="/recruit.png"
            width={0}
            height={0}
            sizes="100vw"
            fill
            priority
          />
          <div
            className="absolute z-10 w-full h-full bg-secondary/30 hover:bg-secondary/50"
            style={{ boxShadow: "0 0 100px rgba(0,0,0,0.9) inset" }}
          />
          <span className="absolute top-1/2 -translate-y-1/2 left-0 z-20 w-full text-border/80 font-mono text-center text-wrap text-6xl">
            {t("recruit-label")}
          </span>
          <span className="absolute bottom-4 md:bottom-8 left-0 z-20 text-border/80 bg-gradient-to-r from-background/10 via-background/50 to-background/10 w-full font-semibold font-mono text-center text-wrap text-xl py-2 px-4">
            {t("recruit-description")}
          </span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="reset"
        className="relative w-full md:w-1/2 grow border-2 border-primary shadow-lg"
      >
        <Link className="absolute w-full h-full" href="/labour/studio">
          <Image
            alt="background image for studio page"
            className="h-full w-full object-cover"
            src="/studio.png"
            width={0}
            height={0}
            sizes="100vw"
            fill
            priority
          />
          <div
            className="absolute z-10 w-full h-full bg-secondary/30 hover:bg-secondary/50"
            style={{ boxShadow: "0 0 100px rgba(0,0,0,0.9) inset" }}
          />
          <span className="absolute top-1/2 -translate-y-1/2 left-0 z-20 w-full text-border/80 font-mono text-center text-wrap text-6xl">
            {t("studio-label")}
          </span>
          <span className="absolute bottom-4 md:bottom-8 left-0 z-20 text-border/80 bg-gradient-to-r from-background/10 via-background/50 to-background/10 w-full font-semibold font-mono text-center text-wrap text-xl py-2 px-4">
            {t("studio-description")}
          </span>
        </Link>
      </Button>
    </PageContent>
  );
}
