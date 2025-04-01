import { Heading } from "@/components/common/Heading/Heading";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Quote } from "@/components/common/Quote/Quote";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function MentorshipPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "MENTORSHIP" });

  return (
    <PageContent>
      <Heading>{t("heading")}</Heading>
      <Quote>
        {`${t("quote-start")} `}
        <span className="font-normal text-xl">{t("quote-highlight")}</span>
        {` ${t("quote-end")}`}
      </Quote>
    </PageContent>
  );
}
