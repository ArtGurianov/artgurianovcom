import { CreationProjectData } from "@/app/(main)/creation/page";
import { cn } from "@/lib/utils";

export const CreationProjectsItem = ({
  index,
  title,
  description,
  externalLink,
  status,
  bgUrl,
}: CreationProjectData) => {
  return (
    <div
      className={cn("relative bg-black/30 w-full h-full", {
        "bg-white/30": index % 2 === 0,
      })}
    >
      <span className="absolute text-4xl w-full text-center top-1/2 -translate-y-1/2 text-primary font-serif">
        {title}
      </span>
    </div>
  );
};
