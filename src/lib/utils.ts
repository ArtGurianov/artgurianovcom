import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ActionResponse } from "./types/ActionResponse";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ActionResponseProps {
  success: boolean;
  data?: any;
  errorMessage?: string;
}
export const createActionResponse = ({
  success,
  data,
  errorMessage,
}: ActionResponseProps): ActionResponse => {
  return {
    success,
    data: typeof data === "undefined" ? null : data,
    errorMessage: errorMessage || null,
  };
};

export const getAppLocale = () => {
  const locale = process.env.NEXT_PUBLIC_APP_LOCALE;
  if (!locale?.length) {
    throw new Error("Locale not provided in Env vars");
  }
  return locale;
};

export interface ContentfulLinkedItem {
  title: string;
  previousLinkedItemTitle: string | null;
}
export const sortLinkedContentfulList = <T extends ContentfulLinkedItem>(
  objects: T[]
): T[] => {
  const firstItem = objects.find((obj) => obj.previousLinkedItemTitle === null);
  if (!firstItem) throw new Error("No first item in the linked list");

  const sortedList: T[] = [];
  let current: T | null = firstItem;
  while (!!current) {
    sortedList.push(current);
    current =
      objects.find((each) => each.previousLinkedItemTitle === current!.title) ||
      null;
  }

  return sortedList;
};

export function getTruncatedString(
  value: string,
  maxLen: number = 13,
  cutFrom: "middle" | "end" = "end"
) {
  if (value.length <= maxLen) return value;
  if (cutFrom === "middle") {
    const firstPart = Math.floor(maxLen - 3) / 2;
    return value.length <= maxLen
      ? value
      : `${value.slice(0, firstPart)}...${value.slice(value.length - firstPart, value.length)}`;
  }
  return `${value.slice(0, maxLen - 3)}...`;
}
