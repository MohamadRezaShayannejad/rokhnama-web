'use client';

/**
 * پترن نقطه‌های هیرو:
 * - قرارگیری در قاب تعریف‌شده با خطوط کناری (right-8 xl:right-12 و left-8 xl:left-12)
 * - پدینگ داخلی از خطوط کناری و خط افقی هدر
 * - مستطیل‌های تیز ۴×۴ پیکسلی با فواصل منظم ۶۴×۶۴ پیکسل
 */
export default function DotsPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-8 xl:right-12 left-8 xl:left-12 z-0 overflow-hidden"
    >
      <div className="h-full w-full px-8 lg:px-10 pt-[144px] pb-16">
        {/* کانتینر داخلی با پترن مستطیل‌های تیز ۴×۴ پیکسلی */}
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%23455aa9' fill-opacity='0.7'/%3E%3C/svg%3E")`,
            backgroundSize: '64px 64px',
            backgroundPosition: '0 0',
          }}
        />
      </div>
    </div>
  );
}
