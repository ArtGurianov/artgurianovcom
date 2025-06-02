import { Heading } from "@/components/common/Heading/Heading";
import { MountedGuard } from "@/components/common/MountedGuard/MountedGuard";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Publications } from "@/components/Publications/Publications";
import { Socials } from "@/components/Socials/Socials";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function PublicityPage() {
  const locale = getAppLocale();
  const tPublications = await getTranslations({
    locale,
    namespace: "PUBLICATIONS",
  });
  const tSocials = await getTranslations({ locale, namespace: "SOCIALS" });

  return (
    <PageContent className="md:flex-row-reverse grow px-0 md:pl-4 gap-8">
      <MountedGuard className="flex flex-col justify-center w-full md:max-w-[320px] md:bg-muted/10 md:rounded-tl-4xl md:border-t-2 md:border-l-8 overflow-clip">
        <Heading
          tag="h2"
          className="px-4 md:px-0 md:py-4 bg-accent/60 border-b hidden md:block"
        >
          {tSocials("title")}
        </Heading>
        <Socials />
      </MountedGuard>
      <Publications title={tPublications("title")} />
    </PageContent>
  );
}
