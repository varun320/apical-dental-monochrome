import { cn } from "@/lib/utils";

const lightStyles =
  "rounded-md border border-light-border bg-light-card px-4 py-3 font-body text-[14px] text-light-text placeholder:text-light-muted/60 outline-none transition-colors focus:border-cyan-muted shadow-sm";

const darkStyles =
  "rounded-md border border-titanium-dark bg-deep-void px-4 py-3 font-body text-[14px] text-white-pure placeholder:text-titanium outline-none transition-colors focus:border-cyan-muted";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "light" | "dark";
}

export function FormInput({ className, variant = "light", ...props }: FormInputProps) {
  return <input className={cn(variant === "dark" ? darkStyles : lightStyles, className)} {...props} />;
}

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  variant?: "light" | "dark";
}

export function FormTextarea({ className, variant = "light", ...props }: FormTextareaProps) {
  return (
    <textarea
      className={cn(variant === "dark" ? darkStyles : lightStyles, "resize-none", className)}
      {...props}
    />
  );
}
