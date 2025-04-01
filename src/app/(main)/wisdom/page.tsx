import { PageContent } from "@/components/common/PageContent/PageContent";
import { Quote } from "@/components/common/Quote/Quote";
import { WisdomOfferingCard } from "@/components/WisdomOfferingCard/WisdomOfferingCard";
import { getContentfulEntriesByType } from "@/config/contentful/client";
import { WisdomOfferingContentfulSkeleton } from "@/lib/types/Contentful";
import { getAppLocale } from "@/lib/utils";
import { Entry } from "contentful";
import { getTranslations } from "next-intl/server";

export default async function WisdomPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "WISDOM" });

  let data: Array<
    Entry<
      WisdomOfferingContentfulSkeleton,
      "WITHOUT_UNRESOLVABLE_LINKS",
      string
    >
  > = [];

  try {
    data =
      await getContentfulEntriesByType<WisdomOfferingContentfulSkeleton>(
        "wisdomOffering"
      );
  } catch {
    throw new Error("Unable to get data from CMS");
  }

  const normalized = data.map((each) => each.fields);

  const sorted = normalized.sort(
    (prev, next) => Number(prev.isDisabled) - Number(next.isDisabled)
  );

  return (
    <PageContent className="w-full grow flex justify-center items-center mb-4">
      <div className="flex flex-wrap flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center items-center px-2 mb-4 md:mb-0">
          <Quote>
            <span className="text-center">{t("intro")}</span>
          </Quote>
        </div>
        {sorted.map((each) => (
          <WisdomOfferingCard key={each.id} {...each} />
        ))}
      </div>
    </PageContent>
  );
}
