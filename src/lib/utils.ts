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
