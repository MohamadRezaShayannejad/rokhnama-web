import PricingA from '@/ui/etudes/PricingA';
import PricingB from '@/ui/etudes/PricingB';
import PricingC from '@/ui/etudes/PricingC';

export const metadata = {
  title: 'اتودهای سکشن ۰۷ — ماشین‌حساب چاپ و تعرفهٔ رُخ‌نما',
};

/* صفحهٔ پیش‌نمایش ۳ اتود سکشن ۰۷ — ماشین‌حساب مقایسه هزینه چاپ در برابر تعرفه رُخ‌نما + زیرساخت بومی و امنیت داده‌ها */
export default function PricingEtudesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans selection:bg-[var(--color-primary-100)] selection:text-[var(--color-primary-900)]">
      {/* هدر راهنمای بالای صفحه */}
      <div className="bg-[var(--color-neutral-900)] text-white py-4 px-4 border-b border-[var(--border-neutral-base)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-xs font-black px-2 py-0.5">
              سکشن ۰۷
            </span>
            <h1 className="text-sm md:text-base font-bold">
              ماشین‌حساب مقایسه هزینه چاپ در برابر تعرفه رُخ‌نما + زیرساخت بومی و امنیت داده‌ها
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-neutral-300)]">
            <span>۳ اتود کاملاً متمایز و تعاملی</span>
            <span className="text-[var(--color-secondary-400)]">دیزاین سیستم اَبَر · گوشه‌های تیز · ارقام فارسی</span>
          </div>
        </div>
      </div>

      {/* نوار جداکنندهٔ برچسب‌دار ۱ */}
      <div className="flex items-center justify-center gap-4 bg-[var(--color-primary-800)] py-3 px-4 shadow-inner">
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
        <span className="text-xs md:text-sm font-black text-white tracking-wide">
          اتود ۱: ماشین‌حساب تعاملی مقایسه هزینه چاپ سالانه در برابر تعرفه رُخ‌نما با شاخص محیط‌زیست
        </span>
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
      </div>

      {/* اتود ۱ */}
      <PricingA />

      {/* نوار جداکنندهٔ برچسب‌دار ۲ */}
      <div className="flex items-center justify-center gap-4 bg-[var(--color-secondary-800)] py-3 px-4 shadow-inner">
        <span className="h-px w-12 bg-[var(--color-secondary-400)]" />
        <span className="text-xs md:text-sm font-black text-white tracking-wide">
          اتود ۲: فاکتور ترازنامه‌ای چاپخانه در برابر پکیج‌های راه‌اندازی رُخ‌نما با قاب طلایی
        </span>
        <span className="h-px w-12 bg-[var(--color-secondary-400)]" />
      </div>

      {/* اتود ۲ */}
      <PricingB />

      {/* نوار جداکنندهٔ برچسب‌دار ۳ */}
      <div className="flex items-center justify-center gap-4 bg-[var(--color-primary-900)] py-3 px-4 shadow-inner">
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
        <span className="text-xs md:text-sm font-black text-white tracking-wide">
          اتود ۳: نردبان تعرفهٔ اقتصادی همراه با ماژول ۴ گانه زیرساخت بومی و گواهی محرمانگی NDA
        </span>
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
      </div>

      {/* اتود ۳ */}
      <PricingC />
    </div>
  );
}
