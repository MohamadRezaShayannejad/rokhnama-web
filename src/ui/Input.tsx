import * as React from "react"
import { useState, useRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputWrapperVariants = cva(
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
      }
    },
    defaultVariants: {
      intent: "default",
      inputSize: "md",
      isDisabled: false,
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputWrapperVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  textAlign?: "left" | "right" | "start" | "end";
}

const convertToPersianDigits = (value: string | number | readonly string[] | undefined) => {
  if (value === undefined || value === null) return value;
  const str = value.toString();
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str
    .replace(/[0-9]/g, (w) => persianDigits[parseInt(w)])
    .replace(/[٠-٩]/g, (w) => persianDigits[w.charCodeAt(0) - 1632]);
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, intent, inputSize, startIcon, endIcon, textAlign, disabled, type, value, defaultValue, onChange, onSelect, onFocus, onBlur, onScroll, ...props }, ref) => {
    
    // State for the fake custom caret
    const [selectionStart, setSelectionStart] = useState(0);
    const [selectionEnd, setSelectionEnd] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    
    const internalInputRef = useRef<HTMLInputElement>(null);
    const mirrorContainerRef = useRef<HTMLDivElement>(null);

    const mergedRef = React.useCallback(
      (node: HTMLInputElement) => {
        internalInputRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    let alignmentClass = ""
    if (textAlign) {
      alignmentClass = `text-${textAlign}`
    } else if (type === "password") {
      alignmentClass = "text-right"
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const original = target.value;
      const converted = convertToPersianDigits(original) as string;
      
      if (original !== converted) {
        const selStart = target.selectionStart;
        const selEnd = target.selectionEnd;
        
        target.value = converted;
        
        if (type !== "number" && type !== "email" && type !== "date" && selStart !== null) {
          try {
            target.setSelectionRange(selStart, selEnd);
          } catch {}
        }
      }
      
      setSelectionStart(target.selectionStart || 0);
      setSelectionEnd(target.selectionEnd || 0);
      syncScroll();
      
      onChange?.(e);
    };

    const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
      setSelectionStart(e.currentTarget.selectionStart || 0);
      setSelectionEnd(e.currentTarget.selectionEnd || 0);
      syncScroll();
      onSelect?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      syncScroll();
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const syncScroll = () => {
      if (internalInputRef.current && mirrorContainerRef.current) {
        mirrorContainerRef.current.scrollLeft = internalInputRef.current.scrollLeft;
      }
    };

    const handleScroll = (e: React.UIEvent<HTMLInputElement>) => {
      syncScroll();
      onScroll?.(e);
    };

    const displayValue = convertToPersianDigits(value) as string | number | readonly string[] | undefined;
    const displayDefaultValue = convertToPersianDigits(defaultValue) as string | number | readonly string[] | undefined;
    
    // We must read the actual uncontrolled value if 'value' is undefined
    const actualDisplayValue = (displayValue !== undefined ? displayValue : (internalInputRef.current?.value || displayDefaultValue || ""));
    const mirrorText = String(actualDisplayValue).substring(0, selectionStart);

    const getStartPadding = () => {
      if (startIcon) {
        if (inputSize === "sm") return "ps-10";
        if (inputSize === "md") return "ps-12";
        if (inputSize === "lg") return "ps-14";
      }
      return inputSize === "lg" ? "ps-5" : "ps-4";
    };

    const getEndPadding = () => {
      if (endIcon) {
        if (inputSize === "sm") return "pe-10";
        if (inputSize === "md") return "pe-12";
        if (inputSize === "lg") return "pe-14";
      }
      return inputSize === "lg" ? "pe-5" : "pe-4";
    };

    const paddingClasses = cn(getStartPadding(), getEndPadding());

    const startIconPos = cn(
      "absolute flex items-center justify-center text-neutral-500 pointer-events-none z-10",
      inputSize === "sm" && "start-4",
      inputSize === "md" && "start-4",
      inputSize === "lg" && "start-5"
    );

    const endIconPos = cn(
      "absolute flex items-center justify-center text-neutral-500 pointer-events-none z-10",
      inputSize === "sm" && "end-4",
      inputSize === "md" && "end-4",
      inputSize === "lg" && "end-5"
    );

    const textClasses = cn(
      "font-sans font-semibold leading-none tracking-[-0.02em]",
      inputSize === "sm" && "text-sm",
      inputSize === "md" && "text-base",
      inputSize === "lg" && "text-lg",
      alignmentClass
    );

    return (
      <div 
        className={cn(
          inputWrapperVariants({ intent, inputSize, isDisabled: !!disabled }), 
          className
        )}
      >
        <style>{`
          @keyframes retro-caret-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-retro-caret {
            animation: retro-caret-blink 1.1s step-end infinite;
          }
        `}</style>

        {startIcon && (
          <div className={startIconPos}>
            {startIcon}
          </div>
        )}
        
        <input
          type={type}
          disabled={disabled}
          value={displayValue}
          defaultValue={displayDefaultValue}
          onChange={handleChange}
          onSelect={handleSelect}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onScroll={handleScroll}
          onKeyUp={handleSelect} // Update on arrow keys
          onMouseUp={handleSelect} // Update on click
          className={cn(
            "w-full h-full bg-transparent outline-none text-neutral-900 placeholder:text-neutral-500 focus:placeholder-transparent caret-transparent z-10",
            textClasses,
            paddingClasses
          )}
          ref={mergedRef}
          {...props}
        />

        {/* FAKE CARET OVERLAY */}
        {isFocused && selectionStart === selectionEnd && !disabled && (
          <div className="absolute inset-0 pointer-events-none z-0 border-2 border-transparent">
            <div 
              ref={mirrorContainerRef}
              className={cn("w-full h-full flex items-center overflow-hidden", paddingClasses)}
              style={{ direction: 'inherit' }}
            >
              <div className={cn("whitespace-nowrap", alignmentClass)} style={{ minWidth: "100%", lineHeight: 1 }}>
                <span className={cn("invisible whitespace-pre", textClasses)} style={{ verticalAlign: 'middle' }}>{mirrorText || '\u200B'}</span>
                <span className="inline-flex flex-col items-center justify-between w-[5px] mx-[1px] animate-retro-caret" style={{ height: '1.1em', verticalAlign: 'middle' }}>
                  <span className="w-full h-[1.5px] bg-primary-600 rounded-full"></span>
                  <span className="w-[1.5px] flex-1 bg-primary-600"></span>
                  <span className="w-full h-[1.5px] bg-primary-600 rounded-full"></span>
                </span>
              </div>
            </div>
          </div>
        )}

        {endIcon && (
          <div className={endIconPos}>
            {endIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputWrapperVariants as inputVariants }
