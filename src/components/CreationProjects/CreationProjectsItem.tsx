import { cn } from "@/lib/utils";

interface CreationProjectsItemProps {
  index: number;
  title: string;
  description: string;
  externalLink: string;
  status: string;
  bgUrl: string;
}

export const CreationProjectsItem = ({
  index,
  title,
  description,
  externalLink,
  status,
  bgUrl,
}: CreationProjectsItemProps) => {
  return (
    <div
      className={cn("bg-black/30 flex w-full h-full", {
        "bg-white/30": index % 2 === 0,
      })}
    >
      {index}
    </div>
  );
};
