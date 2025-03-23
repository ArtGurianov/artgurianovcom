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

export const WorkInProgressPageForm = () => {
  const routeId = useCurrentRouteId();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (formData: z.infer<typeof emailSchema>) => {
    if (!executeRecaptcha) {
      return;
    }

    const reCaptchaToken = await executeRecaptcha("create_email_subscription");

    const created = await createEmailSubscription({
      ...formData,
      reCaptchaToken,
      fromRouteId: routeId,
    });
    console.log(created);
  };

  return (
    <NotificationContainer
      type={NOTIFICATION_TYPES.INFO}
      title="Whoops! I wasn't ready for this 😵‍💫"
    >
      <div className="flex flex-col">
        <NotificationContainerDescription className="self-stretch">
          {"This page is still work in progress"}
        </NotificationContainerDescription>
        <NotificationContainerDescription className="self-stretch">
          {"Get notified when it`s released:"}
        </NotificationContainerDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-4 self-stretch justify-center items-center mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input placeholder="Kindly share your email" {...field} />
                  </FormControl>
                  <FormMessage className="text-center text-danger" />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start">
              {"Count me in!"}
            </Button>
          </form>
        </Form>
      </div>
    </NotificationContainer>
  );
};
