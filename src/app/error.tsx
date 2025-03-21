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
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      title={"💀 An error has occured! 💀"}
      type={NOTIFICATION_TYPES.ERROR}
    >
      <span className="flex gap-4 flex-col sm:flex-row items-center justify-center">
        {`Lets try again?`}
        <Button onClick={() => reset()}>{"Reload"}</Button>
      </span>
    </NotificationContainer>
  );
}
