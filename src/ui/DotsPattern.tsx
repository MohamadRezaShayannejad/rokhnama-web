'use client';

/**
 * پترن نقطه‌های هیرو:
 * - موبایل (<sm): نقطه‌های ۲×۲ با تایل ۱۶px (فاصله ۱۶px)، با فاصله دقیق ۱۶px از هدر (pt-[80px]) و خطوط ریل (w-[calc(100%-48px)])
 * - دسکتاپ و تبلت (sm+): تایل متقارن ۴۸×۴۸ با نقطه ۴×۴، بدون تغییر طبق استانداردهای پروژه
 */
export default function DotsPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden"
    >
      {/* نمای موبایل (<640px): نقطه‌های ۲×۲ با تایل ۲۰px، فاصله ۱۲px از ریل‌ها (w-[calc(100%-40px)]) و ۳۲px از هدر (pt-[96px]) */}
      <div className="relative h-full w-[calc(100%-40px)] pt-[96px] pb-8 sm:hidden">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='9' y='9' width='2' height='2' fill='%23455aa9' fill-opacity='0.65'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
            backgroundPosition: 'center top',
          }}
        />
      </div>

      {/* نمای دسکتاپ و تبلت (sm+) — کاملاً دست‌نخورده */}
      <div className="relative hidden h-full w-[calc(100%-176px)] lg:w-[calc(100%-192px)] max-w-[1344px] pt-[144px] pb-16 sm:block">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='22' y='22' width='4' height='4' fill='%23455aa9' fill-opacity='0.65'/%3E%3C/svg%3E")`,
            backgroundSize: '48px 48px',
            backgroundPosition: 'center top',
          }}
        />
      </div>
    </div>
  );
}
