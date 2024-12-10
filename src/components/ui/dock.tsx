"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

export const DEFAULT_MAGNIFICATION = 60;
export const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md rounded-2xl border",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref,
  ) => {
    const mouseY = useMotionValue(Infinity);

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseY.set(e.pageY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        {...props}
        className={cn(
          dockVariants({ className }),
          "fixed z-20 transition-all duration-300 flex gap-0.5",
          "bottom-2 left-1/2 -translate-x-1/2 flex-row !h-12 !w-auto",
          "md:left-8 md:top-1/2 md:-translate-y-1/2 md:flex-col md:!h-auto md:!w-[52px]",
          "p-0.5"
        )}
      >
        {children}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseY?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size = 40,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseY,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full relative group w-[32px]",
        "p-0.5",
        className,
      )}
      {...props}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/0 via-fuchsia-500/0 to-indigo-500/0
                   group-hover:from-rose-500/10 group-hover:via-fuchsia-500/10 group-hover:to-indigo-500/10"
        whileHover={{
          scale: 1.2,
          rotate: 180,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10
        }}
      />

      <motion.div
        className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{
          boxShadow: [
            "0 0 0 0px rgba(255, 255, 255, 0)",
            "0 0 0 4px rgba(255, 255, 255, 0.1)",
            "0 0 0 0px rgba(255, 255, 255, 0)"
          ]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute inset-[4px] rounded-full bg-gray-300/0 
                   group-hover:bg-gray-300/50 transition-all duration-300"
        whileTap={{
          scale: 1.5,
          opacity: 0,
          transition: { duration: 0.5 }
        }}
      />

      <motion.div 
        className="relative z-10"
        whileHover={{
          scale: 1.1,
          rotate: [0, -10, 10, -10, 10, 0],
        }}
        transition={{
          rotate: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
      >
        {children}
      </motion.div>

      <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.cos(i * Math.PI / 3) * 15,
              y: Math.sin(i * Math.PI / 3) * 15,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              repeatDelay: 1
            }}
          />
        ))}
      </div>
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
