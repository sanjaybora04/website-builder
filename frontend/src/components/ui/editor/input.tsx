import { cn } from "@/lib/utils";
import { useEffect, useState, forwardRef } from "react";
import { useDebounce } from "use-debounce";

const DebouncedInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [localValue, setLocalValue] = useState<any>(props.value);
    const [debouncedValue] = useDebounce(localValue, Number(process.env.NEXT_PUBLIC_DEBOUNCE_DELAY) || 300);

    useEffect(() => {
      if (props.value !== debouncedValue) {
        props.onChange?.({ target: { value: debouncedValue } } as any);
      }
    }, [debouncedValue]);

    useEffect(() => {
      if (props.value !== localValue) {
        setLocalValue(props.value);
      }
    }, [props.value]);

    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-background px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    );
  }
);

DebouncedInput.displayName = "DebouncedInput";
export default DebouncedInput;
