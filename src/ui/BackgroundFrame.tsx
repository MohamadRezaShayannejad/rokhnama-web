'use client';

/**
 * فریم پس‌زمینه سایت بر اساس مشخصات فیگما (Node 135:7):
 * - خطوط عمودی ممتد در دو طرف با فاصله ۹۶ پیکسل خارج از کانتینر گرید (عرض ۱۴۷۲ پیکسل)
 * - خط افقی زیر هدر (ارتفاع ۸۰ پیکسل) با رنگ پرایمری ۵۰۰
 */
export default function BackgroundFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {/* خط افقی سرتاسری زیر هدر */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[var(--color-primary-500)] opacity-70" />

      {/* دو خط عمودی کناری در تمام طول صفحه با فاصله ۹۶px از کانتینر گرید ۱۲۸۰px (عرض کل ۱۴۷۲px) */}
      <div className="relative mx-auto h-full w-full max-w-[1472px]">
        {/* خط عمودی راست */}
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[var(--color-primary-500)] opacity-70" />
        {/* خط عمودی چپ */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--color-primary-500)] opacity-70" />
      </div>
    </div>
  );
}
