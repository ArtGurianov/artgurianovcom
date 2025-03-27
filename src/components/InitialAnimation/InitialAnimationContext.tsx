"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  INITIAL_ANIMATION_DURATION_MS,
  INITIAL_ANIMATION_COOKIE_KEY,
  INITIAL_ANIMATION_TIMEOUT_MS,
} from "./constants";
import Cookies from "js-cookie";

interface InitialAnimationProviderProps {
  children: ReactNode;
}

type InitialAnimationStatus = "pending" | "showing" | "ended";

export const InitialAnimationContext =
  createContext<InitialAnimationStatus | null>(null);

export const InitialAnimationProvider = ({
  children,
}: InitialAnimationProviderProps) => {
  const [initialAnimationStatus, setInitialAnimationStatus] =
    useState<InitialAnimationStatus>("pending");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const nowTimestampMs = new Date().getTime();
    const lastShownTimestampMsFromCookies = Cookies.get(
      INITIAL_ANIMATION_COOKIE_KEY
    );

    if (
      !lastShownTimestampMsFromCookies ||
      Number(lastShownTimestampMsFromCookies) + INITIAL_ANIMATION_TIMEOUT_MS <
        nowTimestampMs
    ) {
      const newTimeoutId = setTimeout(() => {
        setInitialAnimationStatus("ended");
      }, INITIAL_ANIMATION_DURATION_MS);
      setInitialAnimationStatus("showing");
      setTimeoutId(newTimeoutId);
      Cookies.set(INITIAL_ANIMATION_COOKIE_KEY, nowTimestampMs.toString());
    } else {
      setInitialAnimationStatus("ended");
    }

    return clearTimeout(timeoutId);
  }, []);

  return (
    <InitialAnimationContext.Provider value={initialAnimationStatus}>
      {children}
    </InitialAnimationContext.Provider>
  );
};

export const useInitialAnimation = () => {
  const value = useContext(InitialAnimationContext);
  if (!value) {
    throw new Error("InitialAnimationContext used outside of its provider.");
  }
  return value;
};
