import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
  tag?: ElementType<object>;
}

export const Heading = ({ children, className, tag = "h1" }: HeadingProps) => {
  const Tag = tag;
  return (
    <Tag
      className={cn(
        "w-full text-center font-normal text-muted text-4xl font-mono px-2",
        className
      )}
    >
      {children}
    </Tag>
  );
};
