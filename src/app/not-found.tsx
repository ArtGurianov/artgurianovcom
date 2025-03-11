import {
  NOTIFICATION_TYPES,
  NotificationContainer,
} from "@/components/NotificationContainer/NotificationContainer";

export default function NotFoundPage() {
  return (
    <NotificationContainer
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      title={"💀 404 💀"}
      type={NOTIFICATION_TYPES.ERROR}
    />
  );
}
