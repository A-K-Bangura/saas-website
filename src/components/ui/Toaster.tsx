"use client";

import { useToast } from "@/src/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/src/components/ui/Toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast
            key={id}
            variant={variant}
            {...props}
            className="min-w-[300px] max-w-[420px]"
          >
            <div className="flex-1 pr-8 min-w-0">
              {title && (
                <ToastTitle
                  className={`block mb-1 ${
                    variant === "destructive" ? "!text-white" : ""
                  }`}
                >
                  {String(title)}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription
                  className={`block ${
                    variant === "destructive" ? "!text-white !opacity-100" : ""
                  }`}
                >
                  {String(description)}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
