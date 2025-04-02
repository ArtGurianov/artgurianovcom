"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { DialogDrawer } from "@/components/common/DialogDrawer/DialogDrawer";

export const MentorshipApplicationForm = () => {
  const t = useTranslations("MENTORSHIP");

  return (
    <DialogDrawer
      title={t("form-title")}
      trigger={
        <div className="w-full flex justify-center items-center my-6">
          <Button size="xl">{t("apply")}</Button>
        </div>
      }
    >
      {"hi"}
    </DialogDrawer>
  );
};
