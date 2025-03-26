import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export const CreationProjectsIntro = () => {
  const t = useTranslations("CREATION");
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{
        ease: "easeOut",
        duration: 1,
        delay: 0.5,
      }}
      className="relative w-full h-full"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
        }}
        className="absolute top-1/2 -translate-y-1/2 w-full text-4xl md:text-6xl px-6 md:px-12 font-mono text-muted/80 py-8 bg-linear-to-r from-primary/40 via-primary/10 to-primary/0"
      >
        {t("heading")}
      </motion.h1>
    </motion.div>
  );
};
