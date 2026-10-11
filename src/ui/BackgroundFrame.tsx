'use client';

/**
 * فریم پس‌زمینه سایت بر اساس مشخصات فیگما (Node 135:7) و پلن اجرایی:
 * - دو خط عمودی ممتد در تمام طول صفحه با ساختار منعطف (Fluid Container):
 *   موقعیت: right-12 xl:right-24 و left-12 xl:left-24 (فاصله ۹۶px در دسکتاپ بزرگ و ۴۸px در صفحات کوچکتر)
 *   ارتفاع: ۱۰۰٪ در سراسر صفحه (inset-y-0)
 *   رنگ: var(--color-primary-500)
 * - خط افقی ممتد سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل (top-20)
 */
export default function BackgroundFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {/* خط افقی سرتاسری زیر هدر در ارتفاع ۸۰ پیکسل */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[var(--color-primary-500)]" />

      {/* دو خط عمودی ممتد در تمام طول صفحه با فاصله ۹۶px در دسکتاپ (xl) و ۴۸px در سایزهای کوچکتر */}
      <div className="absolute inset-y-0 right-12 xl:right-24 w-[1px] bg-[var(--color-primary-500)]" />
      <div className="absolute inset-y-0 left-12 xl:left-24 w-[1px] bg-[var(--color-primary-500)]" />
    </div>
  );
}
