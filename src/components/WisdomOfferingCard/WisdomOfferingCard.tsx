import { WisdomOfferingContentfulSkeleton } from "@/lib/types/Contentful";
import { cn } from "@/lib/utils";
import { Entry } from "contentful";
import { Button } from "@/components/ui/button";
import { AppRouteId, ROUTER_CONFIG } from "@/config/routing/routerConfig";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const WisdomOfferingCard = ({
  id,
  title,
  description,
  isDisabled,
  routeId,
}: Entry<
  WisdomOfferingContentfulSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>["fields"]) => {
  const t = useTranslations("MENTORSHIP");

  return (
    <div className="w-full md:w-1/2 p-2">
      <Button
        variant="ghost"
        size="reset"
        disabled={isDisabled}
        className={cn("w-full border-2 border-card shadow-lg bg-secondary/80", {
          "border-dotted": isDisabled,
        })}
      >
        <Link
          className="relative w-full flex px-6 py-4 justify-center items-center flex-col gap-1"
          href={ROUTER_CONFIG[routeId as AppRouteId].urlPath}
        >
          <span
            className={cn(
              "absolute top-1 right-4 text-sm font-mono text-muted",
              {
                underline: !isDisabled,
              }
            )}
          >
            {isDisabled ? t("status.coming-soon") : t("status.available")}
          </span>
          <span className="text-center text-wrap text-2xl font-mono">
            {title}
          </span>
          <span className="text-center text-wrap text-md font-sans font-normal">
            {description}
          </span>
        </Link>
      </Button>
    </div>
  );
};
