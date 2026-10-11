'use client';

/**
 * فریم پس‌زمینه سایت:
 * - دو خط عمودی ممتد در تمام طول صفحه که از روی هدر عبور می‌کنند (z-50 با pointer-events-none)
 * - موقعیت ریل‌های کناری با مارجین ۱.۵ برابری (۱۴۴px در دسکتاپ بزرگ): right-24 xl:right-36 و left-24 xl:left-36
 * - خط افقی سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل (top-20)
 */
export default function BackgroundFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* خط افقی سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[var(--color-primary-500)]" />

      {/* دو خط عمودی ممتد در تمام طول صفحه - تا روی هدر با فاصله ۱۴۴px در xl (۱.۵ برابر ۹۶px) */}
      <div className="absolute inset-y-0 right-24 xl:right-36 w-[1px] bg-[var(--color-primary-500)]" />
      <div className="absolute inset-y-0 left-24 xl:left-36 w-[1px] bg-[var(--color-primary-500)]" />
    </div>
  );
}
