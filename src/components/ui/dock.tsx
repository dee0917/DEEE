"use client";

import React, { PropsWithChildren, useRef, useEffect, useState } from "react";
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
          "fixed z-20 transition-all duration-300 flex gap-2",
          "bottom-2 left-1/2 -translate-x-1/2 flex-row !h-12 !w-auto",
          "md:left-8 md:top-1/2 md:-translate-y-1/2 md:flex-col md:!h-auto md:!w-[52px]",
          "px-3 py-0.5"
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
  
  const [isHovered, setIsHovered] = useState(false);
  const rect = useRef<DOMRect>();

  useEffect(() => {
    if (ref.current) {
      rect.current = ref.current.getBoundingClientRect();
    }
  }, []);

  const scale = useSpring(1, {
    stiffness: 400,
    damping: 30
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rect.current) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const iconCenterX = rect.current.x + rect.current.width / 2;
    const iconCenterY = rect.current.y + rect.current.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - iconCenterX, 2) + 
      Math.pow(mouseY - iconCenterY, 2)
    );

    const maxDistance = 100;
    const maxScale = 1.5;

    if (distance < maxDistance) {
      const scaleValue = 1 + (maxScale - 1) * (1 - distance / maxDistance);
      scale.set(scaleValue);
    } else {
      scale.set(1);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full relative group w-[32px]",
        "p-0.5",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => scale.set(1)}
      {...props}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/0 via-fuchsia-500/0 to-indigo-500/0
                   group-hover:from-rose-500/10 group-hover:via-fuchsia-500/10 group-hover:to-indigo-500/10"
        style={{ scale }}
      />

      <motion.div 
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{ scale }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute -bottom-3 left-0 right-0 h-4 opacity-0 group-hover:opacity-30
                   bg-gradient-to-b from-gray-900/20 to-transparent blur-sm"
        style={{ scale }}
      />

      <motion.div
        className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100"
        style={{ scale }}
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
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
