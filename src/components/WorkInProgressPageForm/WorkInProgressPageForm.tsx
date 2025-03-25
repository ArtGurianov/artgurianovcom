"use client";

import {
  NOTIFICATION_TYPES,
  NotificationContainer,
} from "@/components/NotificationContainer/NotificationContainer";
import { useForm } from "react-hook-form";
import { emailSchema } from "@/lib/schemas/emailSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NotificationContainerDescription } from "@/components/NotificationContainer/NotificationContainerDescription";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { createEmailSubscription } from "@/actions/createEmailSubscription";
import { useCurrentRouteId } from "@/lib/hooks/useCurrentRouteId";
import { ReCaptchaPolicy } from "@/components/ReCaptcha/ReCaptchaPolicy";
import { Loader } from "@/components/Loader";
import { useState } from "react";
import { useTranslations } from "next-intl";

type FormStatus = "PENDING" | "LOADING" | "ERROR" | "SUCCESS";

export const WorkInProgressPageForm = () => {
  const routeId = useCurrentRouteId();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formStatus, setFormStatus] = useState<FormStatus>("PENDING");

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (formData: z.infer<typeof emailSchema>) => {
    setFormStatus("LOADING");

    if (!executeRecaptcha) {
      return;
    }

    const reCaptchaToken = await executeRecaptcha("create_email_subscription");

    const result = await createEmailSubscription({
      ...formData,
      reCaptchaToken,
      fromRouteId: routeId || "Not Provided",
    });

    if (!result.success) {
      form.setError("email", { type: "custom", message: result.errorMessage! });
    }
    setFormStatus(result.success ? "SUCCESS" : "ERROR");
  };

  const tNav = useTranslations("NAVBAR");
  const tForm = useTranslations("WIP_PAGE_FORM");

  return (
    <NotificationContainer title={tForm("title")}>
      <div className="flex flex-col">
        <NotificationContainerDescription className="self-stretch">
          {`${routeId ? "'" + tNav(`${routeId}.title`) + "'" : tForm("description-message-wip-fallback")} ${tForm("description-message-wip")}`}
        </NotificationContainerDescription>
        <NotificationContainerDescription className="self-stretch">
          {tForm("description-messgage-sub")}
        </NotificationContainerDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col sm:flex-row gap-4 self-stretch justify-center items-center mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grow self-stretch">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={formStatus === "LOADING"}
                      placeholder={tForm("form-placeholder")}
                      onChange={(ev) => {
                        setFormStatus("PENDING");
                        form.clearErrors();
                        field.onChange(ev);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-center text-danger" />
                </FormItem>
              )}
            />
            <div className="flex self-stretch sm:justify-start justify-center">
              {formStatus === "SUCCESS" ? (
                <span className="h-full text-2xl text-center text-primary">
                  {tForm("success")}
                </span>
              ) : (
                <Button
                  type="submit"
                  disabled={
                    formStatus === "LOADING" ||
                    !!Object.keys(form.formState.errors).length
                  }
                >
                  {formStatus === "LOADING" ? (
                    <Loader isInline isFullHeight isFullWidth />
                  ) : (
                    tForm("submit")
                  )}
                </Button>
              )}
            </div>
          </form>
          <ReCaptchaPolicy />
        </Form>
      </div>
    </NotificationContainer>
  );
};
