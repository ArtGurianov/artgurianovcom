import { ValueOf } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

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
    <div className="absolute bottom-8 w-full px-8 md:px-32">
      <motion.div
        initial={{ opacity: 0, y: "-10%" }}
        animate={{ opacity: 100, y: "0%" }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 0.5,
        }}
        className={cn(
          "border flex flex-col gap-4 justify-center items-center sm:px-16 px-8 sm:py-8 py-4",
          NotificationClassnames[type],
          className
        )}
      >
        <h4 className="text-2xl sm:text-4xl text-wrap text-center font-sans">
          {title}
        </h4>
        {children}
      </motion.div>
    </div>
  );
};
