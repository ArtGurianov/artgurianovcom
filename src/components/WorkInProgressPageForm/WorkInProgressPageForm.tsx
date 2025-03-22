"use client";

import { usePathname } from "next/navigation";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NotificationContainerDescription } from "../NotificationContainer/NotificationContainerDescription";

export const WorkInProgressPageForm = () => {
  const pathname = usePathname();
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  function handleSubmit(values: z.infer<typeof emailSchema>) {
    console.log(values);
  }

  return (
    <NotificationContainer
      type={NOTIFICATION_TYPES.INFO}
      title="Whoops! I wasn't ready for this 😵‍💫"
    >
      <div className="flex flex-col">
        <NotificationContainerDescription className="self-stretch">
          {"This page is still work in progress ^^"}
        </NotificationContainerDescription>
        <NotificationContainerDescription className="self-stretch">
          {"Wanna get notified when it`s out?"}
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
                    <Input
                      placeholder="Then kindly share your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-center text-danger" />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </NotificationContainer>
  );
};
