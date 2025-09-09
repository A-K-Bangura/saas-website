import * as React from "react";

type SimpleThemeProviderProps = {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: "light" | "dark" | "system";
  enableSystem?: boolean;
};

export function ThemeProvider({ children }: SimpleThemeProviderProps) {
  return <>{children}</>;
}
