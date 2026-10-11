'use client';

/**
 * پترن نقطه‌های هیرو:
 * - قرارگیری در مرز ریل‌های کناری با مارجین ۱.۵ برابری (right-24 xl:right-36 و left-24 xl:left-36)
 * - رفع مشکل هاید شدن ستون راست: تایل با نقطه متمرکز (x=30 y=30) و چیدمان متقارن با backgroundPosition: center top
 * - پدینگ از هدر: pt-[144px] (۸۰px هدر + ۶۴px فاصله)
 */
export default function DotsPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-24 xl:right-36 left-24 xl:left-36 z-0 overflow-hidden"
    >
      <div className="h-full w-full pt-[144px] pb-16">
        {/* کانتینر داخلی با پترن مستطیل‌های تیز ۴×۴ پیکسلی متقارن */}
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='30' y='30' width='4' height='4' fill='%23455aa9' fill-opacity='0.7'/%3E%3C/svg%3E")`,
            backgroundSize: '64px 64px',
            backgroundPosition: 'center top',
          }}
        />
      </div>
    </div>
  );
}
