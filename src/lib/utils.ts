import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ActionResponseProps {
  success: boolean;
  data?: any;
  errorMessage?: string;
}
export class ActionResponse {
  constructor({ success, data, errorMessage }: ActionResponseProps) {
    return {
      success,
      data: typeof data === "undefined" ? null : data,
      errorMessage: errorMessage || null,
    };
  }
}
