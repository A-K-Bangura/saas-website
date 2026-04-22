import type React from "react";
import { cn } from "@/src/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-semibold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-2xl lg:text-5xl font-semibold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-xl lg:text-2xl font-semibold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "text-lg lg:text-xl font-semibold tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p className={cn("leading-relaxed text-pretty", className)}>{children}</p>
  );
}

export function TypographyLead({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-lg text-muted-foreground leading-relaxed text-pretty",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function TypographySmall({ children, className }: TypographyProps) {
  return (
    <small className={cn("text-xs text-caption", className)}>{children}</small>
  );
}
