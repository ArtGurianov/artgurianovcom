import { CreationProjectData } from "@/app/(main)/creation/page";
import Image from "next/image";

export const CreationProjectsItem = ({
  title,
  description,
  externalLink,
  status,
  bgUrl,
}: CreationProjectData) => {
  return (
    <div className={"relative w-full h-full"}>
      <div className="absolute w-full h-full">
        {bgUrl ? (
          <Image
            alt={`background image for ${title} project`}
            className="h-full w-full object-cover"
            src={`https:${bgUrl}`}
            width={0}
            height={0}
            sizes="100vw"
            fill
            priority
          />
        ) : (
          <div className="w-full h-full bg-cyan-300/30" />
        )}
      </div>
      <span className="absolute text-4xl w-full text-center top-1/2 -translate-y-1/2 text-card font-serif">
        {title}
      </span>
    </div>
  );
};
