import { CreationProjectData } from "@/app/(main)/creation/page";

export const CreationProjectsItem = ({
  title,
  description,
  externalLink,
  status,
  bgUrl,
}: CreationProjectData) => {
  return (
    <div className={"relative bg-black/30 w-full h-full"}>
      <span className="absolute text-4xl w-full text-center top-1/2 -translate-y-1/2 text-primary font-serif">
        {title}
      </span>
    </div>
  );
};
