import { cn } from "@/lib/utils";

const baseInputStyles =
  "rounded-md border border-titanium-dark bg-void px-4 py-3 font-body text-[14px] text-white-pure placeholder:text-titanium outline-none transition-colors focus:border-titanium-light";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function FormInput({ className, ...props }: FormInputProps) {
  return <input className={cn(baseInputStyles, className)} {...props} />;
}

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function FormTextarea({ className, ...props }: FormTextareaProps) {
  return (
    <textarea
      className={cn(baseInputStyles, "resize-none", className)}
      {...props}
    />
  );
}
