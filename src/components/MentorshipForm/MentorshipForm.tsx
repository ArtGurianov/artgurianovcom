"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const MentorshipForm = () => {
  const t = useTranslations("MENTORSHIP");

  return (
    <div className="w-full flex justify-center items-center my-6">
      <Button size="xl">{t("apply")}</Button>
    </div>
  );
};
