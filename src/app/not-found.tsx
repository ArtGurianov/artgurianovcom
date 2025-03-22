"use client";

import {
  NOTIFICATION_TYPES,
  NotificationContainer,
} from "@/components/NotificationContainer/NotificationContainer";

export default function NotFoundPage() {
  return (
    <NotificationContainer
      title={"💀 404 💀"}
      type={NOTIFICATION_TYPES.ERROR}
    />
  );
}
