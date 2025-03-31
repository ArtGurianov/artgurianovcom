import { CreationProjectData } from "@/app/(main)/creation/page";
import { InlineInfo } from "@/components/InlineInfo/InlineInfo";
import { Button } from "@/components/ui/button";
import { QuoteIcon } from "lucide-react";
import { TruncatedStringMobile } from "@/components/TruncatedString/TruncatedString";
import { CreationProjectsItemTechStack } from "./CreationProjectsItemTechStack";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export const CreationProjectsItem = ({
  id,
  title,
  description,
  externalLink,
  statusId,
  type,
  techStack,
  bgUrl,
}: CreationProjectData) => {
  const t = useTranslations("INLINE_INFO");

  return (
    <div className={"relative w-full h-full"}>
      <div className="absolute w-full h-full">
        {bgUrl ? (
          <Image
            alt={`background image for ${title} project`}
            className="h-full w-full object-cover opacity-70"
            src={`https:${bgUrl}`}
            width={0}
            height={0}
            sizes="100vw"
            fill
            priority
          />
        ) : (
          <div
            className={`w-full h-full opacity-70`}
            style={{
              backgroundColor: `var(--${id}-background)`,
            }}
          />
        )}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-8 w-full px-4 justify-center items-center">
        <span
          className="text-4xl w-full text-center text-card font-serif"
          style={{
            color: `var(--${id}-accent-foreground)`,
          }}
        >
          {title}
        </span>
        <div
          className="w-full sm:max-w-[340px] md:max-w-[420px] lg:max-w-[720px] flex flex-col gap-6 pt-8 pb-4 shadow-muted/40 shadow-xl"
          style={{
            backgroundColor: `var(--${id}-card)`,
          }}
        >
          <div className="flex flex-wrap gap-4 md:gap-6 flex-row justify-center items-stretch md:items-center px-1">
            <InlineInfo
              label={t(`labels.type`)}
              description={
                t.has(`types.descriptions.${type}`)
                  ? t(`types.descriptions.${type}`)
                  : undefined
              }
            >
              {t(`types.titles.${type}`)}
            </InlineInfo>
            <InlineInfo
              label={t(`labels.status`)}
              description={
                t.has(`statuses.descriptions.${statusId}`)
                  ? t(`statuses.descriptions.${statusId}`)
                  : undefined
              }
            >
              {t(`statuses.titles.${statusId}`)}
            </InlineInfo>
            <InlineInfo label={t(`labels.site`)}>
              {externalLink ? (
                <Button variant="link" size="reset">
                  <Link href={externalLink}>{"link"}</Link>
                </Button>
              ) : (
                <span>{"Coming soon"}</span>
              )}
            </InlineInfo>
          </div>
          <h2 className="w-full inline-flex gap-2 justify-center items-center px-6 text-foreground/90 font-semibold">
            <span className="h-4 w-4 shrink-0 self-start">
              <QuoteIcon
                width={24}
                height={24}
                className="rotate-180 h-full w-full"
              />
            </span>
            <span className="text-center font-mono">
              <TruncatedStringMobile title={title} maxLen={64}>
                {description}
              </TruncatedStringMobile>
            </span>
            <span className="h-4 w-4 shrink-0 self-end">
              <QuoteIcon width={24} height={24} className="h-full w-full" />
            </span>
          </h2>
          {techStack?.length > 0 ? (
            <CreationProjectsItemTechStack data={techStack} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
