import React from 'react';
import { cn } from '@/lib/utils';

type NavArrowProps = React.SVGProps<SVGSVGElement>;

/**
 * آیکون فلش اختصاصی کنار آیتم‌های ناوبری هدر استخراج‌شده از Intersect.svg
 */
export function NavArrow({ className, ...props }: NavArrowProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-3.5 h-3.5 shrink-0', className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 0V14H1.74953L1.74739 3.1844L12.5786 14H14V12.5363L3.2089 1.7512H14V0H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
