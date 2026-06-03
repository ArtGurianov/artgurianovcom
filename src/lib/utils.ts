import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppLocale } from "@/config/seo/const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAppLocale = () => {
  const locale = process.env.NEXT_PUBLIC_APP_LOCALE;
  if (!locale?.length) {
    throw new Error("Locale not provided in Env vars");
  }
  if (!["en-US", "ru-RU"].includes(locale)) {
    throw new Error("Unsupported locale");
  }

  return locale as AppLocale;
};

export interface TruncateStringProps {
  value: string;
  maxLen?: number;
  cutFrom?: "middle" | "end";
}
export function truncateString({
  value,
  maxLen = 13,
  cutFrom = "end",
}: TruncateStringProps) {
  if (value.length <= maxLen) return value;
  if (cutFrom === "middle") {
    const firstPart = Math.floor(maxLen - 3) / 2;
    return value.length <= maxLen
      ? value
      : `${value.slice(0, firstPart)}...${value.slice(value.length - firstPart, value.length)}`;
  }
  return `${value.slice(0, maxLen - 3)}...`;
}
