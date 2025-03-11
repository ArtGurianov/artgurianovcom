"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { EyeSvgUrl } from "../svg";
import Link from "next/link";
import Image from "next/image";

interface NavbarButton {
  isActive: boolean;
  onMouseEnter: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  urlPath: string;
  title: string;
}

export const NavbarButton = ({
  isActive,
  onMouseEnter,
  onMouseLeave,
  urlPath,
  title,
}: NavbarButton) => {
  return (
    <Button
      variant="link"
      className="relative not-first:px-4 h-full hover:no-underline"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={urlPath} className="text-xl font-serif">
        {title}
      </Link>
      <AnimatePresence>
        {isActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
            className="absolute bottom-0 h-4 w-4"
          >
            <Image
              src={EyeSvgUrl}
              alt="intro"
              width="0"
              height="0"
              sizes="100vh"
              className="w-full h-full"
              priority
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Button>
  );
};
