"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { DialogDrawer } from "@/components/common/DialogDrawer/DialogDrawer";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStatus } from "../types";
import { mentorshipSchema } from "@/lib/schemas/mentorshipSchema";
import { CONTACT_BY, EXPERIENCE_LEVEL } from "@prisma/client";
import { createMentorshipApplication } from "@/actions/createMentorshipApplication";

export const MentorshipApplicationForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formStatus, setFormStatus] = useState<FormStatus>("PENDING");

  const form = useForm<z.infer<typeof mentorshipSchema>>({
    resolver: zodResolver(mentorshipSchema),
    defaultValues: {
      name: "",
      codingLevel: EXPERIENCE_LEVEL.NONE,
      entrepreneurLevel: EXPERIENCE_LEVEL.NONE,
      contactBy: CONTACT_BY.EMAIL,
      contact: "",
    },
  });

  const handleSubmit = async (formData: z.infer<typeof mentorshipSchema>) => {
    setFormStatus("LOADING");

    if (!executeRecaptcha) {
      return;
    }

    const reCaptchaToken = await executeRecaptcha("create_email_subscription");

    const result = await createMentorshipApplication({
      ...formData,
      reCaptchaToken,
    });

    if (!result.success) {
      form.setError("root", { type: "custom", message: result.errorMessage! });
    }
    setFormStatus(result.success ? "SUCCESS" : "ERROR");
  };

  const t = useTranslations("MENTORSHIP");
  const tForm = useTranslations("MENTORSHIP_APPLICATION_FORM");

  return (
    <DialogDrawer
      title={t("form-title")}
      trigger={
        <div className="w-full flex justify-center items-center my-6">
          <Button size="xl">{t("apply")}</Button>
        </div>
      }
    >
      {"form here"}
    </DialogDrawer>
  );
};
