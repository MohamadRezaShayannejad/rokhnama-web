"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * اسپینر مکعب غلطان با شبیه‌سازی فیزیک جاذبه و سطح فرضی
 * کاملاً توپر (Solid)، همرنگ متن و بدون افت وضوح یا شفافیت
 */
export function TumblingCubeLoader({ className = "" }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center justify-center relative w-6 h-6 select-none", className)} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gravityTumble {
          0%, 15% {
            transform: translateX(0) rotate(0deg);
            transform-origin: 100% 100%;
            animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
          }
          45% {
            /* تقلا خلاف جاذبه و بالا آمدن روی نوک گوشه تا زاویه ۴۵ درجه */
            transform: translateX(0) rotate(45deg);
            transform-origin: 100% 100%;
            animation-timing-function: cubic-bezier(0.7, 0, 0.9, 0.2);
          }
          52% {
            /* درنگ موقت در نقطه اوج تعادل */
            transform: translateX(0) rotate(47deg);
            transform-origin: 100% 100%;
            animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
          }
          66% {
            /* سقوط آزاد با شتاب جاذبه، کوبیده شدن روی سطح فرضی و دفرمه شدن ناشی از ضربه */
            transform: translateX(-10px) rotate(90deg) scaleY(0.78) scaleX(1.18);
            transform-origin: 100% 100%;
            animation-timing-function: cubic-bezier(0.2, 0.8, 0.3, 1);
          }
          74% {
            /* بازگشت فرم الاستیک مکعب */
            transform: translateX(-10px) rotate(90deg) scale(1);
            transform-origin: 100% 100%;
          }
          100% {
            /* استراحت و سکون کامل روی زمین قبل از غلتش بعدی */
            transform: translateX(-10px) rotate(90deg) scale(1);
            transform-origin: 100% 100%;
          }
        }
      `}} />
      {/* محفظه چرخش با گوشه لولایی (Pivot Corner) متصل به سطح */}
      <div className="relative w-[10px] h-[10px] mb-[3px]">
        <span
          className="absolute inset-0 bg-current"
          style={{ animation: 'gravityTumble 1.8s infinite' }}
        />
      </div>
      {/* سطح افقی فرضی (زمین) که مکعب رویش می‌غلتد و ضربه می‌زند */}
      <span className="w-5 h-[1.5px] bg-current opacity-40" />
    </span>
  )
}

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-none font-bold transition-all duration-200 active:duration-75 active:ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.995] active:translate-y-[2px] disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:block [&_svg]:stroke-[2.2px] z-10 overflow-hidden leading-none",
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
        outline: "border-2 bg-transparent relative before:absolute before:top-[var(--y,50%)] before:left-[var(--x,50%)] before:w-0 before:h-0 before:bg-[var(--fill-color)] before:-translate-x-1/2 before:-translate-y-1/2 before:transition-[width,height] before:duration-[650ms] before:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:before:w-[320%] hover:before:h-[320%] before:-z-10",
        text: "bg-transparent shadow-none underline underline-offset-[6px] decoration-[3.5px]",
      },
      size: {
        sm: "h-[44px] px-5 text-sm [&_svg]:size-4",
        md: "h-[52px] px-6 text-base [&_svg]:size-5",
        lg: "h-[60px] px-8 text-lg [&_svg]:size-6",
      },
    },
    compoundVariants: [
      /* Primary */
      {
        color: "primary",
        variant: "solid",
        className: "bg-[var(--color-primary-600)] text-[var(--color-neutral-50)] [--fold-hover:var(--color-primary-700)] hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-400)] active:bg-[var(--color-primary-800)]"
      },
      {
        color: "primary",
        variant: "outline",
        className: "border-[var(--color-primary-600)] text-[var(--color-primary-600)] [--fill-color:var(--color-primary-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-primary-400)] active:border-[var(--color-primary-800)] active:[--fill-color:var(--color-primary-800)]"
      },
      {
        color: "primary",
        variant: "text",
        className: "text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)] focus-visible:ring-[var(--color-primary-400)]"
      },

      /* Secondary */
      {
        color: "secondary",
        variant: "solid",
        className: "bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] [--fold-hover:var(--color-secondary-600)] hover:bg-[var(--color-secondary-600)] focus-visible:ring-[var(--color-secondary-400)] active:bg-[var(--color-secondary-700)]"
      },
      {
        color: "secondary",
        variant: "outline",
        className: "border-[var(--color-secondary-500)] text-[var(--color-secondary-700)] [--fill-color:var(--color-secondary-500)] hover:text-[var(--color-secondary-950)] focus-visible:ring-[var(--color-secondary-400)] active:border-[var(--color-secondary-600)] active:[--fill-color:var(--color-secondary-600)]"
      },
      {
        color: "secondary",
        variant: "text",
        className: "text-[var(--color-secondary-700)] hover:text-[var(--color-secondary-800)] focus-visible:ring-[var(--color-secondary-400)]"
      },

      /* White (اصلاح کامل رنگ هاور و مثلث) */
      {
        color: "white",
        variant: "solid",
        className: "bg-white text-[var(--color-neutral-900)] [--fold-hover:#e5e7eb] hover:bg-neutral-100 hover:text-[var(--color-neutral-950)] focus-visible:ring-gray-300 active:bg-gray-200"
      },
      {
        color: "white",
        variant: "outline",
        className: "border-white text-white [--fill-color:white] hover:text-[var(--color-neutral-900)] focus-visible:ring-white active:border-gray-200 active:[--fill-color:var(--color-neutral-200)]"
      },
      {
        color: "white",
        variant: "text",
        className: "text-neutral-200 hover:text-white focus-visible:ring-white"
      },

      /* Error */
      {
        color: "error",
        variant: "solid",
        className: "bg-[var(--color-error-600)] text-[var(--color-neutral-50)] [--fold-hover:var(--color-error-700)] hover:bg-[var(--color-error-700)] focus-visible:ring-[var(--color-error-400)] active:bg-[var(--color-error-800)]"
      },
      {
        color: "error",
        variant: "outline",
        className: "border-[var(--color-error-600)] text-[var(--color-error-600)] [--fill-color:var(--color-error-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-error-400)] active:border-[var(--color-error-800)] active:[--fill-color:var(--color-error-800)]"
      },
      {
        color: "error",
        variant: "text",
        className: "text-[var(--color-error-700)] hover:text-[var(--color-error-800)] focus-visible:ring-[var(--color-error-400)]"
      },

      /* Success */
      {
        color: "success",
        variant: "solid",
        className: "bg-[var(--color-success-600)] text-[var(--color-neutral-50)] [--fold-hover:var(--color-success-700)] hover:bg-[var(--color-success-700)] focus-visible:ring-[var(--color-success-400)] active:bg-[var(--color-success-800)]"
      },
      {
        color: "success",
        variant: "outline",
        className: "border-[var(--color-success-600)] text-[var(--color-success-600)] [--fill-color:var(--color-success-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-success-400)] active:border-[var(--color-success-800)] active:[--fill-color:var(--color-success-800)]"
      },
      {
        color: "success",
        variant: "text",
        className: "text-[var(--color-success-700)] hover:text-[var(--color-success-800)] focus-visible:ring-[var(--color-success-400)]"
      },

      /* Warning */
      {
        color: "warning",
        variant: "solid",
        className: "bg-[var(--color-warning-600)] text-[var(--color-neutral-50)] [--fold-hover:var(--color-warning-700)] hover:bg-[var(--color-warning-700)] focus-visible:ring-[var(--color-warning-400)] active:bg-[var(--color-warning-800)]"
      },
      {
        color: "warning",
        variant: "outline",
        className: "border-[var(--color-warning-600)] text-[var(--color-warning-600)] [--fill-color:var(--color-warning-600)] hover:text-[var(--color-neutral-50)] focus-visible:ring-[var(--color-warning-400)] active:border-[var(--color-warning-800)] active:[--fill-color:var(--color-warning-800)]"
      },
      {
        color: "warning",
        variant: "text",
        className: "text-[var(--color-warning-700)] hover:text-[var(--color-warning-800)] focus-visible:ring-[var(--color-warning-400)]"
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  paperFold?: boolean
  iconBefore?: React.ReactNode
  iconAfter?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = "primary",
      variant = "solid",
      size = "md",
      asChild = false,
      loading = false,
      paperFold = true,
      iconBefore,
      iconAfter,
      disabled = false,
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const innerRef = React.useRef<HTMLButtonElement>(null)

    const mergedRef = React.useCallback(
      (node: HTMLButtonElement) => {
        innerRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    // حالت پر کردن جهتی ماوس (Directional Mouse-Aware Fill)
    // برای حالت outline و همچنین حالت solid وقتی که paperFold خاموش است
    const isDirectional = variant === "outline" || (variant === "solid" && !paperFold)

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDirectional && innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect()
        innerRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`)
        innerRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`)
      }
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDirectional && innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect()
        innerRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`)
        innerRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`)
      }
      onMouseLeave?.(e)
    }

    // لودینگ روی دکمه‌های متنی (لینک) غیرفعال است
    const canLoad = Boolean(loading && variant !== "text")
    const isSolidFold = Boolean(variant === "solid" && paperFold)
    const isSolidPlain = Boolean(variant === "solid" && !paperFold)

    return (
      <Comp
        className={cn(
          buttonVariants({ color, variant, size, className }),
          /* دکمه با گوشه کج: مثلث پایینی کلاً با clip-path بریده شده تا پس‌زمینه دیده شود و گوشه کج به نظر بیاید */
          isSolidFold && "[clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]",
          /* دکمه در حالت لودینگ استایل غیرفعال (opacity-50) نمی‌گیرد */
          canLoad && "pointer-events-none cursor-wait"
        )}
        ref={mergedRef}
        disabled={disabled}
        aria-busy={canLoad}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* محتوای متنی و آیکون دکمه: تراز نوری دقیق در مرکز هندسی کادر دکمه همراه با پدینگ بالای متن */}
        <span
          className={cn(
            "relative z-10 inline-flex items-center justify-center gap-2.5 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] leading-none",
            canLoad ? "translate-x-14 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
          )}
        >
          {iconBefore && (
            <span className="inline-flex items-center justify-center shrink-0">
              {iconBefore}
            </span>
          )}
          {children && (
            <span className="inline-flex items-center justify-center leading-none select-none pt-[2px]">
              {children}
            </span>
          )}
          {iconAfter && (
            <span className="inline-flex items-center justify-center shrink-0">
              {iconAfter}
            </span>
          )}
        </span>

        {/* اسپینر لودینگ مکعب غلطان: در مرکز دقیق دکمه و همزمان با آرامش از سمت چپ وارد می‌شود */}
        {variant !== "text" && (
          <span
            className={cn(
              "absolute inset-0 z-20 flex items-center justify-center transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] pointer-events-none",
              canLoad ? "translate-x-0 opacity-100" : "-translate-x-14 opacity-0"
            )}
            aria-hidden={!canLoad}
          >
            <TumblingCubeLoader />
          </span>
        )}

        {/* ۱. حالت solid بدون تاخوردگی (paperFold={false}): هاور دقیقاً مشابه اوتلاین با گسترش نقطه‌ای از محل ورود ماوس */}
        {isSolidPlain && (
          <span
            className="absolute top-[var(--y,50%)] left-[var(--x,50%)] w-0 h-0 bg-[var(--fold-hover)] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-[650ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/btn:w-[320%] group-hover/btn:h-[320%] pointer-events-none z-[1]"
            aria-hidden="true"
          />
        )}

        {/* ۲. حالت solid با گوشه کج کاغذی (paperFold={true}): لایه هاور از مثلث بالای خط کج کل دکمه را پر می‌کند */}
        {isSolidFold && (
          <>
            {/* لایه گسترش رنگ هاور: در حالت هاور از همان مثلث بالای خط کج، کل دکمه را می‌پوشاند */}
            <span
              className="absolute inset-0 bg-[var(--fold-hover)] [clip-path:polygon(100%_calc(100%-10px),100%_calc(100%-10px),calc(100%-10px)_100%,calc(100%-10px)_100%)] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/btn:[clip-path:polygon(-20%_-20%,120%_-20%,120%_120%,-20%_120%)] pointer-events-none z-[1]"
              aria-hidden="true"
            />

            {/* مثلث بالایی در حالت سکون: همرنگ هاور که دقیقاً مماس بر خط برش کج دکمه نشسته است */}
            <span
              className="absolute bottom-0 right-0 w-[10px] h-[10px] pointer-events-none z-[2]"
              aria-hidden="true"
            >
              <span className="absolute inset-0 bg-[var(--fold-hover)] [clip-path:polygon(0_0,100%_0,0_100%)]" />
            </span>
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
