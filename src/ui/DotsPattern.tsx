'use client';

/**
 * پترن نقطه‌های هیرو (مدل ۱: قاب ثابت مرکزی):
 * - قرارگیری در کانتینر مرکزی ۱۴۷۲ پیکسل با پدینگ ۶۴ پیکسلی (px-16) از ریل‌های کناری
 * - عرض خالص پترن: ۱۳۴۴px (دقیقاً ۲۱ بازه ۶۴ پیکسلی)
 * - فاصله منظم ۶۴×۶۴ پیکسل بین نقطه‌ها و فاصله دقیق ۶۴px از هر دو ریل کناری و هدر
 */
export default function DotsPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden"
    >
      <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] px-16 pt-[144px] pb-16">
        {/* کانتینر داخلی با پترن مستطیل‌های تیز ۴×۴ پیکسلی */}
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%23455aa9' fill-opacity='0.65'/%3E%3C/svg%3E")`,
            backgroundSize: '64px 64px',
            backgroundPosition: '0 0',
          }}
        />
      </div>
    </div>
  );
}
