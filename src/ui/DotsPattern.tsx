'use client';

/**
 * پترن نقطه‌های هیرو (مدل ۱: قاب ثابت مرکزی):
 * - قرارگیری دقیق داخل کانتینر مرکزی ۱۴۷۲ پیکسل (mx-auto)
 * - تایل با نقطه متمرکز (x=30 y=30) و چیدمان متقارن با backgroundPosition: center top
 * - پدینگ از هدر: pt-[144px] (۸۰px هدر + ۶۴px فاصله)
 */
export default function DotsPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden"
    >
      <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] pt-[144px] pb-16">
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
