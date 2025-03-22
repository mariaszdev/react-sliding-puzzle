"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css";

export default function WinIndicator({ active }: { active: boolean }) {
  return (
    <motion.div
      className={styles.checkmarkOverlay}
      initial={{ opacity: 0, scale: 0.5, y: -20 }}
      animate={
        active
        ? { opacity: [0, 0.6, 0.4], scale: [0.5, 2.1, 1.7], y: [-20, 10, 0] }
        : { opacity: 0, scale: 0.5, y: -20 }
      }
      transition={
        active
          ? {
              duration: 0.8,
              ease: "easeOut",
              delay: 0.5,
            }
          : {
              duration: 0.3, // faster fade-out
              ease: "easeInOut",
            }
      }
    >
      <Image
        src="/checkmark.svg"
        alt="Win checkmark"
        width={140}
        height={140}
        priority
      />
    </motion.div>
  );
}
