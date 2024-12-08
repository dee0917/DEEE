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
          "fixed z-20 p-3 transition-all duration-300 flex gap-2",
          "bottom-5 left-1/2 -translate-x-1/2 flex-row !h-16 !w-auto",
          "md:left-8 md:top-1/2 md:-translate-y-1/2 md:flex-col md:!h-auto md:!w-[58px]"
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
        "flex aspect-square cursor-pointer items-center justify-center rounded-full relative group w-[40px]",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-[13px] -ml-1.5 rounded-full bg-gray-300/0 
        group-hover:bg-gray-300/50 transition-all duration-300
        group-hover:animate-[pulse_1.5s_ease-in-out_infinite]" 
      />
      <div className="relative z-10 -ml-2">
        {children}
      </div>
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
