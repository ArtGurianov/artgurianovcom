import { WorkerEnv } from "../env";

interface ReCaptchaResponse {
  success: boolean;
  score?: number;
}

export const verifyReCaptcha = async (
  env: WorkerEnv,
  token: string
): Promise<boolean> => {
  if (!token.length) {
    return false;
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const payload = (await response.json()) as ReCaptchaResponse;
  if (!payload.success) {
    return false;
  }

  if (typeof payload.score === "number" && payload.score < 0.5) {
    return false;
  }

  return true;
};
