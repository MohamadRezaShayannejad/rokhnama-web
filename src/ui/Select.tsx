"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { IconChevronDown } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const selectWrapperVariants = cva(
  "relative flex w-full items-center border-2 bg-transparent transition-colors duration-200 rounded-none",
  {
    variants: {
      intent: {
        default:
          "border-neutral-200 hover:border-neutral-300 focus-within:border-primary-600 focus-within:hover:border-primary-700",
        error:
          "border-error-600 hover:border-error-500 focus-within:border-error-600 focus-within:hover:border-error-700",
        success:
          "border-success-600 hover:border-success-500 focus-within:border-success-600 focus-within:hover:border-success-700",
      },
      inputSize: {
        sm: "h-[44px]",
        md: "h-[52px]",
        lg: "h-[60px]",
      },
      isDisabled: {
        true: "cursor-not-allowed opacity-50 bg-neutral-100 border-neutral-200 hover:border-neutral-200",
        false: "",
      },
    },
    defaultVariants: {
      intent: "default",
      inputSize: "md",
      isDisabled: false,
    },
  }
)

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectWrapperVariants> {
  /** گزینهٔ خالی و غیرقابل‌انتخاب که حالت «انتخاب‌نشده» را ممکن می‌کند */
  placeholder?: string;
  startIcon?: React.ReactNode;
  /** نمایش آیکون شروع فقط در دسکتاپ */
  desktopIconOnly?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      intent,
      inputSize,
      disabled,
      placeholder,
      startIcon,
      desktopIconOnly,
      children,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [uncontrolledVal, setUncontrolledVal] = React.useState(defaultValue ?? "");
    const currentVal = isControlled ? value : uncontrolledVal;
    const isPlaceholder = !currentVal || currentVal === "";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isControlled) {
        setUncontrolledVal(e.target.value);
      }
      onChange?.(e);
    };

    const getStartPadding = () => {
      if (startIcon) {
        if (desktopIconOnly) {
          if (inputSize === "sm") return "ps-4 sm:ps-[36px]";
          if (inputSize === "md") return "ps-4 sm:ps-[44px]";
          if (inputSize === "lg") return "ps-5 sm:ps-[52px]";
        }
        if (inputSize === "sm") return "ps-[36px]";
        if (inputSize === "md") return "ps-[44px]";
        if (inputSize === "lg") return "ps-[52px]";
      }
      return "ps-4";
    };

    return (
      <div
        className={cn(
          selectWrapperVariants({ intent, inputSize, isDisabled: !!disabled }),
          className
        )}
      >
        {startIcon && (
          <span
            className={cn(
              "pointer-events-none absolute start-4 items-center justify-center text-neutral-500 z-10",
              desktopIconOnly ? "hidden sm:flex" : "flex"
            )}
          >
            {startIcon}
          </span>
        )}
        <select
          ref={ref}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            "w-full h-full appearance-none bg-transparent pe-12 font-sans tracking-[-0.02em] outline-none rounded-none cursor-pointer",
            getStartPadding(),
            isPlaceholder ? "text-neutral-500 font-normal" : "text-neutral-900 font-semibold",
            inputSize === "sm" && "text-sm",
            inputSize === "md" && "text-base",
            inputSize === "lg" && "text-lg",
            disabled && "cursor-not-allowed"
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden className="text-neutral-500 font-normal">
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <span className="pointer-events-none absolute end-4 flex items-center justify-center text-neutral-500">
          <IconChevronDown size={20} stroke={2} />
        </span>
      </div>
    );
  }
);
Select.displayName = "Select"

export { Select, selectWrapperVariants }
