import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "text-accent-foreground placeholder:text-primary-foreground/70 placeholder:underline flex h-9 w-full min-w-0 rounded-full bg-input/20 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
        "focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[2px]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
