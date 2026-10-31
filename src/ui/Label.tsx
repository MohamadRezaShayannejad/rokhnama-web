"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-bold leading-none tracking-[-0.02em] peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      intent: {
        default: "text-neutral-900",
        base: "text-neutral-700",
        error: "text-error-700",
        success: "text-success-700",
        subtle: "text-neutral-500",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, intent, required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ intent, className }))}
      {...props}
    >
      {children}
      {required && <span className="text-error-500 ms-1">*</span>}
      {optional && (
        <span className="text-neutral-400 font-normal ms-1">(اختیاری)</span>
      )}
    </label>
  )
)
Label.displayName = "Label"

export { Label, labelVariants }
