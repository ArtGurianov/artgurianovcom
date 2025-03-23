export const ReCaptchaPolicy = () => {
  return (
    <span className="font-sans text-xs mt-2 text-muted opacity-70 text-center">
      {"This site is protected by reCAPTCHA and the Google "}
      <a href="https://policies.google.com/privacy" className="underline">
        {"Privacy Policy"}
      </a>
      {" and "}
      <a href="https://policies.google.com/terms" className="underline">
        {"Terms of Service"}
      </a>
      {" apply."}
    </span>
  );
};
