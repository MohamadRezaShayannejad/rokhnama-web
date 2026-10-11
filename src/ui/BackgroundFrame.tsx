'use client';

/**
 * فریم پس‌زمینه سایت (مدل ۱: قاب ثابت مرکزی با عرض مشخص - Fixed Max-Width Container):
 * - کانتینر متمرکز مرکزی با عرض مشخص ۱۴۷۲ پیکسل (mx-auto)
 * - خطوط عمودی ممتد روی لبه‌های کانتینر مرکزی با z-50 که از روی هدر عبور می‌کنند
 * - خط افقی سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل (top-20)
 */
export default function BackgroundFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* خط افقی سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[var(--color-primary-500)]" />

      {/* دو خط عمودی در لبه‌های کانتینر متمرکز مرکزی (مدل ۱) */}
      <div className="relative mx-auto h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
        {/* خط عمودی راست */}
        <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-500)]" />
        {/* خط عمودی چپ */}
        <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-500)]" />
      </div>
    </div>
  );
}
