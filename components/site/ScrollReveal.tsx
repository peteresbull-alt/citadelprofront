"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  /**
   * Direction of the animation
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right" | "none";
  /**
   * Delay in seconds before animation starts
   */
  delay?: number;
  /**
   * Distance of motion in pixels
   * @default 50
   */
  distance?: number;
  /**
   * Animation duration
   * @default 0.6
   */
  duration?: number;
  /**
   * Should the animation trigger only once?
   * @default true
   */
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 50,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          ...getInitialOffset(),
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1], // smooth cubic-bezier
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
