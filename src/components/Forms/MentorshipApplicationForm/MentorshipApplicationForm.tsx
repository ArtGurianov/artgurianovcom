"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { DialogSheet } from "@/components/common/DialogSheet/DialogSheet";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStatus } from "../types";
import {
  createMentorshipSchema,
  MentorshipSchema,
} from "@/lib/schemas/mentorshipSchema";
import { CONTACT_BY, EXPERIENCE_LEVEL } from "@prisma/client";
import { createMentorshipApplication } from "@/actions/createMentorshipApplication";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { ReCaptchaPolicy } from "@/components/common/ReCaptcha/ReCaptchaPolicy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const MentorshipApplicationForm = () => {
  const t = useTranslations("MENTORSHIP_APPLICATION_FORM");
  const tFormErrors = useTranslations("FORM_ERRORS");
  const contactDetailsPlaceholders = {
    DEFAULT: t("contact-details-placeholders.DEFAULT"),
    [CONTACT_BY.EMAIL]: t("contact-details-placeholders.EMAIL"),
    [CONTACT_BY.PHONE]: t("contact-details-placeholders.PHONE"),
    [CONTACT_BY.TG]: t("contact-details-placeholders.TELEGRAM"),
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formStatus, setFormStatus] = useState<FormStatus>("PENDING");

  const mentorshipSchema = createMentorshipSchema(tFormErrors);
  const form = useForm<z.infer<MentorshipSchema>>({
    resolver: zodResolver(mentorshipSchema),
    defaultValues: {
      name: "",
      contact: "",
      codingLevel: EXPERIENCE_LEVEL.SOME,
      entrepreneurLevel: EXPERIENCE_LEVEL.SOME,
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

    setFormStatus(result.success ? "SUCCESS" : "ERROR");
  };

  return (
    <DialogSheet
      title={t("form-title")}
      trigger={
        <div className="w-full flex justify-center items-center my-6">
          <Button size="xl">{t("apply")}</Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6 self-stretch justify-center items-center mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow self-stretch">
                <FormLabel htmlFor={field.name}>{t("name-label")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formStatus === "LOADING"}
                    placeholder={t("name-placeholder")}
                    onChange={(ev) => {
                      setFormStatus("PENDING");
                      form.clearErrors("name");
                      field.onChange(ev);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-center text-danger" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codingLevel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>
                  {t("coding-level-label")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-center items-center"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value={EXPERIENCE_LEVEL.NONE}
                            id={`codingLevel-${EXPERIENCE_LEVEL.NONE}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal text-lg px-0"
                          htmlFor={`codingLevel-${EXPERIENCE_LEVEL.NONE}`}
                        >
                          {t("level-none")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value={EXPERIENCE_LEVEL.SOME}
                            id={`codingLevel-${EXPERIENCE_LEVEL.SOME}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal text-lg px-0"
                          htmlFor={`codingLevel-${EXPERIENCE_LEVEL.SOME}`}
                        >
                          {t("level-some")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value={EXPERIENCE_LEVEL.GURU}
                            id={`codingLevel-${EXPERIENCE_LEVEL.GURU}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal text-lg px-0"
                          htmlFor={`codingLevel-${EXPERIENCE_LEVEL.GURU}`}
                        >
                          {t("level-guru")}
                        </FormLabel>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entrepreneurLevel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>
                  {t("enterpreneur-level-label")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-center items-center"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value={EXPERIENCE_LEVEL.NONE}
                            id={`entrepreneurLevel-${EXPERIENCE_LEVEL.NONE}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal text-lg px-0"
                          htmlFor={`entrepreneurLevel-${EXPERIENCE_LEVEL.NONE}`}
                        >
                          {t("level-none")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value={EXPERIENCE_LEVEL.SOME}
                            id={`entrepreneurLevel-${EXPERIENCE_LEVEL.SOME}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal text-lg px-0"
                          htmlFor={`entrepreneurLevel-${EXPERIENCE_LEVEL.SOME}`}
                        >
                          {t("level-some")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value={EXPERIENCE_LEVEL.GURU}
                            id={`entrepreneurLevel-${EXPERIENCE_LEVEL.GURU}`}
                          />
                        </FormControl>
                        <FormLabel
                          className="font-normal text-lg px-0"
                          htmlFor={`entrepreneurLevel-${EXPERIENCE_LEVEL.GURU}`}
                        >
                          {t("level-guru")}
                        </FormLabel>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactBy"
            render={({ field }) => (
              <FormItem className="grow self-stretch min-w-[120px]">
                <FormLabel htmlFor={field.name}>
                  {t("contact-by-label")}
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    disabled={formStatus === "LOADING"}
                    onValueChange={(value: CONTACT_BY) => {
                      setFormStatus("PENDING");
                      form.setValue("contactBy", value);
                      form.clearErrors("contactBy");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("contact-by-placeholder")} />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value={CONTACT_BY.EMAIL}>
                        {t("contact-by-email")}
                      </SelectItem>
                      <SelectItem value={CONTACT_BY.PHONE}>
                        {t("contact-by-phone")}
                      </SelectItem>
                      <SelectItem value={CONTACT_BY.TG}>
                        {t("contact-by-tg")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => {
              const contactBy = form.getValues("contactBy");
              const placeholder = contactBy?.length
                ? contactDetailsPlaceholders[contactBy as CONTACT_BY]
                : contactDetailsPlaceholders.DEFAULT;
              return (
                <FormItem className="grow self-stretch">
                  <FormLabel htmlFor={field.name}>
                    {t("contact-details-label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={
                        formStatus === "LOADING" || !form.getValues("contactBy")
                      }
                      placeholder={placeholder}
                      onChange={(ev) => {
                        setFormStatus("PENDING");
                        form.clearErrors("contact");
                        field.onChange(ev);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-center text-danger" />
                </FormItem>
              );
            }}
          />
          <div className="flex self-stretch justify-center">
            {formStatus === "SUCCESS" ? (
              <span className="h-full text-2xl text-center text-primary">
                {t("success")}
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
                  t("submit")
                )}
              </Button>
            )}
          </div>
        </form>
        <ReCaptchaPolicy />
      </Form>
    </DialogSheet>
  );
};
