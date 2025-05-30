import { PageContent } from "@/components/common/PageContent/PageContent";
import { LabourCard } from "@/components/LabourCard/LabourCard";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function LabourPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "LABOUR" });

  return (
    <PageContent className="flex flex-col md:flex-row grow px-8 pb-8 md:px-32 gap-8 md:gap-12">
      <LabourCard
        label={t("recruit-label")}
        description={t("recruit-description")}
        href="/labour/recruit"
        bgImagePath="/recruit.png"
      />
      <LabourCard
        label={t("studio-label")}
        description={t("studio-description")}
        href="/labour/studio"
        bgImagePath="/studio.png"
      />
    </PageContent>
  );
}
