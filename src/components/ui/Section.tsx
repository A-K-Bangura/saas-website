import type React from "react";
import { cn } from "@/src/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "xl";
}

export function Section({ children, className, padding = "lg" }: SectionProps) {
  const paddingClasses = {
    sm: "py-8 md:py-12",
    md: "py-8 md:py-12",
    lg: "py-8 md:py-12",
    xl: "py-8 md:py-12",
  };

  return (
    <section className={cn(paddingClasses[padding], className)}>
      {children}
    </section>
  );
}
