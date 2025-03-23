"use client";

import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface ReCaptchaProviderProps {
  children: ReactNode;
}

export const ReCaptchaProvider = ({ children }: ReCaptchaProviderProps) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY!}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};
