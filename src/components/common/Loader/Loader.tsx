import Image from "next/image";
import { LoaderHorizontalSvgUrl, LoaderVerticalSvgUrl } from "@/components/svg";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  hasBackground?: boolean;
  isInline?: boolean;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
}

export const Loader = ({
  className,
  hasBackground = false,
  isInline = false,
  isFullHeight = false,
  isFullWidth = false,
}: LoaderProps) => {
  return (
    <div
      className={cn("flex justify-center items-center", className, {
        "bg-muted/70": hasBackground,
        "w-full": isFullHeight,
        "h-full": isFullWidth,
      })}
    >
      <Image
        src={isInline ? LoaderHorizontalSvgUrl : LoaderVerticalSvgUrl}
        alt="loader"
        width="0"
        height="0"
        sizes="100vh"
        className="h-full w-full"
        priority
      />
    </div>
  );
};
