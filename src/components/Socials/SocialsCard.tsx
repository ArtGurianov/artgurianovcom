import { cn } from "@/lib/utils";
import { SocialsDataItem, SocialsId } from "./Socials";
import Image from "next/image";

interface SocialsCardProps extends SocialsDataItem {
  id: SocialsId;
  activeId: SocialsId | null;
  onChangeActiveId: (_: SocialsId | null) => void;
  description: string;
}

export const SocialsCard = ({
  imagePath,
  url,
  language,
  id,
  activeId,
  onChangeActiveId,
  description,
}: SocialsCardProps) => {
  return (
    <div
      className="h-full w-full relative border-2 rounded-2xl border-dashed bg-gradient-to-br from-primary/30 via-primary-10 to-primary/60 overflow-clip"
      onMouseOver={() => {
        onChangeActiveId(id);
      }}
      onMouseOut={() => {
        onChangeActiveId(null);
      }}
      onClick={() => {
        onChangeActiveId(id);
      }}
    >
      <Image
        src={imagePath}
        alt={`Image for ${id}`}
        width="0"
        height="0"
        sizes="100vh"
        className={cn(
          "h-full w-full object-contain shrink-0 transition-all ease-in-out duration-300",
          {
            "-translate-y-full": id === activeId,
            "translate-y-0": id !== activeId,
          }
        )}
        priority
      />
      <div
        className={cn(
          "text-sm md:text-normal w-full h-full shrink-0 flex flex-col justify-center items-center transition-all ease-in-out duration-300",
          {
            "-translate-y-full": id === activeId,
            "translate-y-0": id !== activeId,
          }
        )}
      >
        <span className="text-center">{description}</span>
        <span className="text-center">{language}</span>
        <span className="text-center">{url}</span>
      </div>
    </div>
  );
};
