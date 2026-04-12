import { cn } from "@/lib/utils";

const lightStyles =
  "w-full rounded-md border border-light-border bg-light-card px-4 py-3 font-body text-[14px] text-light-text placeholder:text-light-muted/60 outline-none transition-colors focus:border-cyan-muted shadow-sm";

const darkStyles =
  "w-full rounded-md border border-titanium-dark bg-deep-void px-4 py-3 font-body text-[14px] text-white-pure placeholder:text-titanium outline-none transition-colors focus:border-cyan-muted";

const errorStyles = "border-red-400 focus:border-red-400";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "light" | "dark";
  error?: string;
}

export function FormInput({ className, variant = "light", error, ...props }: FormInputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          variant === "dark" ? darkStyles : lightStyles,
          error && errorStyles,
          className
        )}
        {...props}
      />
      {error && (
        <p className={`mt-1.5 font-body text-[12px] ${variant === "dark" ? "text-red-400" : "text-red-500"}`}>
          {error}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  variant?: "light" | "dark";
  error?: string;
}

export function FormTextarea({ className, variant = "light", error, ...props }: FormTextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          variant === "dark" ? darkStyles : lightStyles,
          "resize-none",
          error && errorStyles,
          className
        )}
        {...props}
      />
      {error && (
        <p className={`mt-1.5 font-body text-[12px] ${variant === "dark" ? "text-red-400" : "text-red-500"}`}>
          {error}
        </p>
      )}
    </div>
  );
}
