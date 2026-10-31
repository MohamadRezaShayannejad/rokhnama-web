"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaWrapperVariants = cva(
  "relative flex w-full border-2 bg-transparent transition-colors duration-200 rounded-none",
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
        sm: "min-h-[88px]",
        md: "min-h-[104px]",
        lg: "min-h-[128px]",
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

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaWrapperVariants> {
  resize?: "none" | "vertical"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, intent, inputSize, disabled, resize = "none", ...props }, ref) => (
    <div
      className={cn(
        textareaWrapperVariants({ intent, inputSize, isDisabled: !!disabled }),
        className
      )}
    >
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full min-h-full resize-none bg-transparent px-4 py-3 font-sans font-semibold leading-[1.6] tracking-[-0.02em] text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-500 rounded-none",
          inputSize === "sm" && "text-sm",
          inputSize === "md" && "text-base",
          inputSize === "lg" && "text-lg",
          resize === "vertical" && "resize-y",
          disabled && "cursor-not-allowed"
        )}
        {...props}
      />
    </div>
  )
)
Textarea.displayName = "Textarea"

export { Textarea, textareaWrapperVariants }
