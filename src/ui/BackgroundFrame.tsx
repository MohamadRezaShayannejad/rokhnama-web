'use client';

/**
 * فریم پس‌زمینه سایت:
 * - دو خط عمودی ممتد در تمام طول صفحه که از روی هدر عبور می‌کنند (z-50 با pointer-events-none)
 * - موقعیت ریل‌های کناری: right-8 xl:right-12 و left-8 xl:left-12
 * - خط افقی سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل (top-20)
 */
export default function BackgroundFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* خط افقی سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[var(--color-primary-500)]" />

      {/* دو خط عمودی ممتد در تمام طول صفحه - تا روی هدر */}
      <div className="absolute inset-y-0 right-8 xl:right-12 w-[1px] bg-[var(--color-primary-500)]" />
      <div className="absolute inset-y-0 left-8 xl:left-12 w-[1px] bg-[var(--color-primary-500)]" />
    </div>
  );
}
