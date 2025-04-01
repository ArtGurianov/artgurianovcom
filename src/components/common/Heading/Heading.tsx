import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

export const Heading = ({ children }: HeadingProps) => {
  return (
    <h1 className="w-full text-center font-semibold text-muted text-4xl">
      {children}
    </h1>
  );
};
