"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { TumblingCubeLoader } from "@/ui/Button"

const iconButtonVariants = cva(
  "group/icon-btn relative inline-flex items-center justify-center whitespace-nowrap rounded-none font-bold transition-all duration-200 active:duration-75 active:ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.995] active:translate-y-[2px] disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block z-10 overflow-hidden leading-none p-0 cursor-pointer",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        white: "",
        error: "",
        success: "",
        warning: "",
      },
      variant: {
        solid: "relative",
        outline:
          "bg-transparent relative before:absolute before:top-[var(--y,50%)] before:left-[var(--x,50%)] before:w-0 before:h-0 before:bg-[var(--fill-color)] before:-translate-x-1/2 before:-translate-y-1/2 before:transition-[width,height] before:duration-[650ms] before:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:before:w-[320%] hover:before:h-[320%] before:-z-10",
      },
      size: {
        sm: "w-[44px] h-[44px] [&_svg]:w-[20px] [&_svg]:h-[20px]",
        md: "w-[52px] h-[52px] [&_svg]:w-[24px] [&_svg]:h-[24px]",
        lg: "w-[60px] h-[60px] [&_svg]:w-[28px] [&_svg]:h-[28px]",
      },
    },
    compoundVariants: [
      /* تطبیق دقیق ضخامت بوردر دکمه اوتلاین با ضخامت استروک آیکون بر مبنای هر سایز */
      {
        variant: "outline",
        size: "sm",
        className: "border-[1.5px] [&_svg]:stroke-[1.5px]",
      },
      {
        variant: "outline",
        size: "md",
        className: "border-2 [&_svg]:stroke-[2px]",
      },
      {
        variant: "outline",
        size: "lg",
        className: "border-[2.5px] [&_svg]:stroke-[2.5px]",
      },
      /* ضخامت استروک آیکون در حالت سالید */
      {
        variant: "solid",
        size: "sm",
        className: "[&_svg]:stroke-[1.5px]",
      },
      {
        variant: "solid",
        size: "md",
        className: "[&_svg]:stroke-[2px]",
      },
      {
        variant: "solid",
        size: "lg",
        className: "[&_svg]:stroke-[2.5px]",
      },
      /* Primary */
      {
        color: "primary",
        variant: "solid",
        className:
          "bg-[var(--color-primary-600)] text-[var(--color-neutral-50)] [--fill-hover:var(--color-primary-700)] hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-400)] active:bg-[var(--color-primary-800)]",
      },
      {
        color: "primary",
        variant: "outline",
        className:
          "border-[var(--color-primary-600)] text-[var(--color-primary-600)] [--fill-color:var(--color-primary-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-primary-400)] active:border-[var(--color-primary-800)] active:[--fill-color:var(--color-primary-800)]",
      },

      /* Secondary */
      {
        color: "secondary",
        variant: "solid",
        className:
          "bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] [--fill-hover:var(--color-secondary-600)] hover:bg-[var(--color-secondary-600)] focus-visible:ring-[var(--color-secondary-400)] active:bg-[var(--color-secondary-700)]",
      },
      {
        color: "secondary",
        variant: "outline",
        className:
          "border-[var(--color-secondary-500)] text-[var(--color-secondary-700)] [--fill-color:var(--color-secondary-500)] hover:text-[var(--color-secondary-950)] focus-visible:ring-[var(--color-secondary-400)] active:border-[var(--color-secondary-600)] active:[--fill-color:var(--color-secondary-600)]",
      },

      /* White */
      {
        color: "white",
        variant: "solid",
        className:
          "bg-white text-[var(--color-neutral-900)] [--fill-hover:#e5e7eb] hover:bg-neutral-100 hover:text-[var(--color-neutral-950)] focus-visible:ring-gray-300 active:bg-gray-200",
      },
      {
        color: "white",
        variant: "outline",
        className:
          "border-white text-white [--fill-color:white] hover:text-[var(--color-neutral-900)] focus-visible:ring-white active:border-gray-200 active:[--fill-color:var(--color-neutral-200)]",
      },

      /* Error */
      {
        color: "error",
        variant: "solid",
        className:
          "bg-[var(--color-error-600)] text-[var(--color-neutral-50)] [--fill-hover:var(--color-error-700)] hover:bg-[var(--color-error-700)] focus-visible:ring-[var(--color-error-400)] active:bg-[var(--color-error-800)]",
      },
      {
        color: "error",
        variant: "outline",
        className:
          "border-[var(--color-error-600)] text-[var(--color-error-600)] [--fill-color:var(--color-error-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-error-400)] active:border-[var(--color-error-800)] active:[--fill-color:var(--color-error-800)]",
      },

      /* Success */
      {
        color: "success",
        variant: "solid",
        className:
          "bg-[var(--color-success-600)] text-[var(--color-neutral-50)] [--fill-hover:var(--color-success-700)] hover:bg-[var(--color-success-700)] focus-visible:ring-[var(--color-success-400)] active:bg-[var(--color-success-800)]",
      },
      {
        color: "success",
        variant: "outline",
        className:
          "border-[var(--color-success-600)] text-[var(--color-success-600)] [--fill-color:var(--color-success-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-success-400)] active:border-[var(--color-success-800)] active:[--fill-color:var(--color-success-800)]",
      },

      /* Warning */
      {
        color: "warning",
        variant: "solid",
        className:
          "bg-[var(--color-warning-600)] text-[var(--color-neutral-50)] [--fill-hover:var(--color-warning-700)] hover:bg-[var(--color-warning-700)] focus-visible:ring-[var(--color-warning-400)] active:bg-[var(--color-warning-800)]",
      },
      {
        color: "warning",
        variant: "outline",
        className:
          "border-[var(--color-warning-600)] text-[var(--color-warning-600)] [--fill-color:var(--color-warning-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-warning-400)] active:border-[var(--color-warning-800)] active:[--fill-color:var(--color-warning-800)]",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
      size: "md",
    },
  }
)

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  loading?: boolean
  cursorEffect?: boolean
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      color = "primary",
      variant = "solid",
      size = "md",
      asChild = false,
      loading = false,
      cursorEffect = true,
      disabled = false,
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLButtonElement | HTMLElement | null>(null)

    const mergedRef = React.useCallback(
      (node: HTMLButtonElement | HTMLElement | null) => {
        innerRef.current = node
        if (typeof ref === "function") {
          ref(node as HTMLButtonElement)
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | HTMLElement | null>).current = node
        }
      },
      [ref]
    )

    // پرشدن نقطه‌ای جهت‌دار ماوس (Directional Mouse-Aware Fill) برای هر دو حالت سالید و اوتلاین
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect()
        innerRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`)
        innerRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`)
      }
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect()
        innerRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`)
        innerRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`)
      }
      onMouseLeave?.(e)
    }

    const canLoad = Boolean(loading)

    const sharedClassName = cn(
      iconButtonVariants({ color, variant, size, className }),
      canLoad && "pointer-events-none cursor-wait"
    )

    const renderInnerContent = (content: React.ReactNode) => (
      <>
        {/* آیکون در مرکز دقیق هندسی بدون اثر جاافتادگی تایپوگرافی */}
        <span
          className={cn(
            "relative z-10 inline-flex items-center justify-center transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] leading-none",
            canLoad ? "translate-x-14 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
          )}
        >
          {content}
        </span>

        {/* لودر مکعب غلطان اختصاصی با ورود آرام از سمت چپ به مرکز */}
        <span
          className={cn(
            "absolute inset-0 z-20 flex items-center justify-center transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] pointer-events-none",
            canLoad ? "translate-x-0 opacity-100" : "-translate-x-14 opacity-0"
          )}
          aria-hidden={!canLoad}
        >
          <TumblingCubeLoader />
        </span>

        {/* انیمیشن گسترش رنگ هاور از محل ورود ماوس برای حالت solid (بدون تاخوردگی کاغذ) */}
        {variant === "solid" && (
          <span
            className="absolute top-[var(--y,50%)] left-[var(--x,50%)] w-0 h-0 bg-[var(--fill-hover)] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-[650ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/icon-btn:w-[320%] group-hover/icon-btn:h-[320%] pointer-events-none z-[1]"
            aria-hidden="true"
          />
        )}
      </>
    )

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<
        { className?: string; children?: React.ReactNode } & Record<string, unknown>
      >
      return React.cloneElement(
        child,
        {
          className: cn(sharedClassName, child.props.className),
          ref: mergedRef,
          "aria-busy": canLoad,
          "data-cursor-button": "true",
          "data-cursor-effect": cursorEffect ? "true" : "false",
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          ...props,
          children: renderInnerContent(child.props.children),
        }
      )
    }

    return (
      <button
        className={sharedClassName}
        ref={mergedRef}
        disabled={disabled}
        aria-busy={canLoad}
        data-cursor-button="true"
        data-cursor-effect={cursorEffect ? "true" : "false"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {renderInnerContent(children)}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"
