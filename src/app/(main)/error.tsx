"use client";

import {
  NOTIFICATION_TYPES,
  NotificationContainer,
} from "@/components/NotificationContainer/NotificationContainer";
import { Button } from "@/components/ui/button";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <NotificationContainer
      title={"💀 An error occured! 💀"}
      type={NOTIFICATION_TYPES.ERROR}
    >
      <span className="flex gap-4 flex-col sm:flex-row items-center justify-center text-center">
        {`Let\`s try again?`}
        <Button onClick={() => reset()}>{"Reload"}</Button>
      </span>
    </NotificationContainer>
  );
}
