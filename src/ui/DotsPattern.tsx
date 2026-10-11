'use client';

/**
 * پترن نقطه‌های هیرو مطابق مشخصات فیگما (Node 135:7) و پلن اجرایی:
 * - قرارگیری در قاب تعریف‌شده با خطوط کناری:
 *   - خطوط کناری در right-12 xl:right-24 و left-12 xl:left-24
 *   - پدینگ ۶۴ پیکسلی از خطوط کناری (px-16)
 *   - پدینگ ۶۴ پیکسلی از خط افقی هدر (pt-[144px] شامل ۸۰px هدر + ۶۴px پدینگ)
 *   - پدینگ ۶۴ پیکسلی از پایین (pb-16)
 * - استایل پترن: مستطیل‌های تیز ۴×۴ پیکسلی با فواصل ۶۴×۶۴ پیکسل و رنگ ملایم پرایمری بدون خطوط متقاطع شطرنجی
 */
export default function DotsPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-12 xl:right-24 left-12 xl:left-24 z-0 overflow-hidden"
    >
      <div className="h-full w-full px-16 pt-[144px] pb-16">
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
