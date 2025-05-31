import { Heading } from "@/components/common/Heading/Heading";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Quote } from "@/components/common/Quote/Quote";
import { StudioForm } from "@/components/Forms/StudioForm/StudioForm";
import { Button } from "@/components/ui/button";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function StudioPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "STUDIO" });

  return (
    <PageContent>
      <Heading className="mb-4">{t("heading")}</Heading>
      <Quote>{t("quote")}</Quote>
      <Heading tag={"h4"} className="text-3xl text-card mt-4 mb-2">
        {t("heading-phases")}
      </Heading>
      <ul className="flex flex-col gap-4 justify-center items-center text-muted text-xl text-center">
        <li>
          <span className="font-semibold">{t("discuss-start")}</span>
          <span>{t("discuss-end")}</span>
        </li>
        <li>
          <span className="font-semibold">{t("mockup-start")}</span>
          <span>{t("mockup-end")}</span>
        </li>
        <li>
          <span className="font-semibold">{t("progress-start")}</span>
          <span>{t("progress-end")}</span>
        </li>
        <li>
          <span className="font-semibold">{t("support-start")}</span>
          <span>{t("support-end")}</span>
        </li>
      </ul>
      <div className="flex gap-4 py-4 w-full items-center justify-center flex-wrap">
        <Button
          asChild
          size="xl"
          className="bg-transparent border-4 border-primary text-primary text-3xl hover:bg-primary/10 w-full max-w-[540px]"
        >
          <Link href="/creation">{t("showcase")}</Link>
        </Button>
        <StudioForm />
      </div>
    </PageContent>
  );
}
