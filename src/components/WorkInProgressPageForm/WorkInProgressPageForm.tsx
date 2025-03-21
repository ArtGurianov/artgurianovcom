"use client";

import { usePathname } from "next/navigation";
import {
  NOTIFICATION_TYPES,
  NotificationContainer,
} from "@/components/NotificationContainer/NotificationContainer";

export const WorkInProgressPageForm = () => {
  const pathname = usePathname();

  return (
    <NotificationContainer
      type={NOTIFICATION_TYPES.INFO}
      title="Whoops! I wasn't ready for this 😵‍💫"
    >
      <span className="font-mono text-xl text-center text-wrap whitespace-pre-line">
        {
          "This page is still work in progress ^^\nWanna get notified when it`s out?"
        }
      </span>
    </NotificationContainer>
  );
};
