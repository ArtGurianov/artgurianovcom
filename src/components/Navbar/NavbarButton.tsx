"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

interface NavbarButton {
  isActive: boolean;
  onMouseEnter: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  urlPath: string;
  title: string;
  icon: string;
}

export const NavbarButton = ({
  isActive,
  onMouseEnter,
  onMouseLeave,
  urlPath,
  title,
  icon,
}: NavbarButton) => {
  return (
    <Button
      variant="link"
      className="relative h-full hover:no-underline"
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
            className="absolute -z-20 h-full"
          >
            <Image
              src={icon}
              alt="nav-icon"
              width="0"
              height="0"
              sizes="100vh"
              className="h-full p-1 opacity-40"
              priority
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Button>
  );
};
