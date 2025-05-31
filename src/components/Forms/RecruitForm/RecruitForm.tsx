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
import { APPLICATION_TYPE, CONTACT_BY } from "@prisma/client";
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
import {
  createRecruitSchema,
  RecruitSchema,
} from "@/lib/schemas/recruitSchema";
import { createApplication } from "@/actions/createApplication";

export const RecruitForm = () => {
  const tFormShared = useTranslations("APPLICATION_FORM");
  const tFormRecruit = useTranslations("RECRUIT_FORM");
  const tFormErrors = useTranslations("FORM_ERRORS");
  const contactDetailsPlaceholders = {
    DEFAULT: tFormShared("contact-details-placeholders.DEFAULT"),
    [CONTACT_BY.EMAIL]: tFormShared("contact-details-placeholders.EMAIL"),
    [CONTACT_BY.PHONE]: tFormShared("contact-details-placeholders.PHONE"),
    [CONTACT_BY.TG]: tFormShared("contact-details-placeholders.TELEGRAM"),
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formStatus, setFormStatus] = useState<FormStatus>("PENDING");

  const recruitSchema = createRecruitSchema(tFormErrors);
  const form = useForm<z.infer<RecruitSchema>>({
    resolver: zodResolver(recruitSchema),
    defaultValues: {
      name: "",
      contact: "",
    },
  });

  const handleSubmit = async (formData: z.infer<typeof recruitSchema>) => {
    setFormStatus("LOADING");

    if (!executeRecaptcha) {
      return;
    }

    const reCaptchaToken = await executeRecaptcha("create_email_subscription");

    const result = await createApplication({
      ...formData,
      applicationType: APPLICATION_TYPE.RECRUIT,
      reCaptchaToken,
    });

    setFormStatus(result.success ? "SUCCESS" : "ERROR");
  };

  return (
    <DialogSheet
      title={tFormRecruit("form-title")}
      trigger={
        <Button size="xl" className="grow max-w-[540px]">
          {tFormRecruit("open")}
        </Button>
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
                <FormLabel htmlFor={field.name}>
                  {tFormShared("name-label")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formStatus === "LOADING"}
                    placeholder={tFormShared("name-placeholder")}
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
            name="contactBy"
            render={({ field }) => (
              <FormItem className="grow self-stretch min-w-[120px]">
                <FormLabel htmlFor={field.name}>
                  {tFormShared("contact-by-label")}
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
                      <SelectValue
                        placeholder={tFormShared("contact-by-placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value={CONTACT_BY.EMAIL}>
                        {tFormShared("contact-by-email")}
                      </SelectItem>
                      <SelectItem value={CONTACT_BY.PHONE}>
                        {tFormShared("contact-by-phone")}
                      </SelectItem>
                      <SelectItem value={CONTACT_BY.TG}>
                        {tFormShared("contact-by-tg")}
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
                    {tFormShared("contact-details-label")}
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
              <span className="text-2xl text-center text-primary">
                {tFormShared("success")}
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
                  <Loader className="py-1" isInline isFullHeight isFullWidth />
                ) : (
                  tFormShared("submit")
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
