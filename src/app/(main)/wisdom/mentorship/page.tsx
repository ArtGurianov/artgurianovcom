import { Heading } from "@/components/common/Heading/Heading";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Quote } from "@/components/common/Quote/Quote";
import { MentorshipApplicationForm } from "@/components/Forms/MentorshipApplicationForm/MentorshipApplicationForm";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function MentorshipPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "MENTORSHIP" });

  return (
    <PageContent className="items-center">
      <Heading className="mb-4">{t("heading")}</Heading>
      <Quote>
        {`${t("quote-start")} `}
        <span className="font-normal text-xl">{t("quote-highlight")}</span>
        {` ${t("quote-end")}`}
      </Quote>
      <Heading
        tag={"h4"}
        className="text-3xl text-card mt-4 mb-2 max-w-[720px]"
      >
        {t("ul-heading")}
      </Heading>
      <ul className="flex flex-col gap-4 justify-start items-stretch text-muted text-xl text-start max-w-[720px]">
        <li>
          <span className="font-semibold">{t("ul-first-start")}</span>
          <span>{t("ul-first-end")}</span>
        </li>
        <li>
          <span className="font-semibold">{t("ul-second-start")}</span>
          <span>{t("ul-second-end")}</span>
        </li>
        <li>
          <span className="font-semibold">{t("ul-third-start")}</span>
          <span>{t("ul-third-end")}</span>
        </li>
        <li>
          <span className="font-semibold">{t("ul-fourth-start")}</span>
          <span>{t("ul-fourth-end")}</span>
        </li>
      </ul>
      <MentorshipApplicationForm />
    </PageContent>
  );
}
