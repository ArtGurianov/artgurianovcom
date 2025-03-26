import { useTranslations } from "next-intl";

export const CreationProjectsIntro = () => {
  const t = useTranslations("CREATION");
  return (
    <div className="relative w-full h-full">
      <h1 className="absolute top-1/2 -translate-y-1/2 w-full text-4xl md:text-6xl px-6 md:px-12 font-mono text-muted/80 py-8 bg-linear-to-r from-primary/40 via-primary/10 to-primary/0">
        {t("heading")}
      </h1>
    </div>
  );
};
