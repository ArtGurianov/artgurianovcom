import { WisdomOfferingContentfulSkeleton } from "@/lib/types/Contentful";
import { cn } from "@/lib/utils";
import { Entry } from "contentful";
import { Button } from "@/components/ui/button";
import { AppRouteId, ROUTER_CONFIG } from "@/config/routing/routerConfig";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const WisdomOfferingCard = ({
  title,
  description,
  isDisabled,
  routeId,
}: Entry<
  WisdomOfferingContentfulSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>["fields"]) => {
  const t = useTranslations("WISDOM");

  return (
    <div className="w-full md:w-1/2 p-2">
      <Button
        variant="ghost"
        size="reset"
        disabled={isDisabled}
        className={cn(
          "w-full h-full border-2 border-primary shadow-lg bg-secondary/80",
          {
            "border-dotted": isDisabled,
          }
        )}
      >
        <Link
          className="relative w-full flex px-4 pt-2 pb-4 justify-center items-center flex-col"
          href={ROUTER_CONFIG[routeId as AppRouteId].urlPath}
        >
          <span
            className={cn(
              "self-end pl-12 pr-1 text-end text-sm font-mono text-muted bg-linear-to-r from-primary/0 via-primary/20 to-primary/20 0 border-r-2 border-primary/50 rounded-r",
              {
                underline: !isDisabled,
              }
            )}
          >
            {isDisabled ? t("status.coming-soon") : t("status.available")}
          </span>
          <span className="text-center text-wrap text-2xl font-mono mb-1">
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
