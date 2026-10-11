'use client';

/**
 * پترن نقطه‌های هیرو مطابق مشخصات فیگما (Node 135:7):
 * - دایو با عرض ۱۴۷۲ پیکسل (۱۹۲ پیکسل بزرگتر از کانتینر گرید ۱۲۸۰ پیکسل، ۹۶ پیکسل از هر طرف)
 * - پدینگ ۴۸ پیکسلی از هر طرف (p-12)
 * - پترن از مستطیل‌های تیز ۴ پیکسلی (۴×۴ پیکسل بدون گردی) با فاصله منظم
 */
export default function DotsPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex justify-center"
    >
      <div className="relative h-full w-full max-w-[1472px] px-12 pt-28 pb-12">
        {/* کانتینر داخلی با پترن مستطیل‌های تیز ۴ پیکسلی */}
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%237689c4' fill-opacity='0.45'/%3E%3C/svg%3E")`,
            backgroundSize: '64px 64px',
            backgroundPosition: '0 0',
          }}
        />
      </div>
    </div>
  );
}
