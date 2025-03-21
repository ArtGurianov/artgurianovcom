import { ValueOf } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const NOTIFICATION_TYPES = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
  SYSTEM: "SYSTEM",
} as const;
export type NotificationType = ValueOf<typeof NOTIFICATION_TYPES>;

export const NotificationClassnames: Record<NotificationType, string> = {
  [NOTIFICATION_TYPES.ERROR]: "bg-danger/40 border-danger text-danger",
  [NOTIFICATION_TYPES.SUCCESS]: "bg-success/40 border-success text-success",
  [NOTIFICATION_TYPES.INFO]: "bg-info/40 border-info text-info",
  [NOTIFICATION_TYPES.WARNING]: "bg-warning/40 border-warning text-warning",
  [NOTIFICATION_TYPES.SYSTEM]: "bg-system/40 border-system text-system",
};

interface NotificationContainerProps {
  className?: string;
  title: string;
  type: NotificationType;
  children?: ReactNode;
}

export const NotificationContainer = ({
  className,
  title,
  type,
  children,
}: NotificationContainerProps) => {
  return (
    <div
      className={cn(
        "border flex flex-col gap-4 justify-center items-center rounded-xl px-16 py-8 absolute bottom-8 left-1/2 -translate-x-1/2",
        NotificationClassnames[type],
        className
      )}
    >
      <h4 className="text-3xl sm:text-4xl text-nowrap text-center">{title}</h4>
      {children}
    </div>
  );
};
