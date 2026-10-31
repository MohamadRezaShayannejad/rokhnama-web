import PricingCardsA from '@/ui/pricing-cards/PricingCardsA';
import PricingCardsB from '@/ui/pricing-cards/PricingCardsB';

export const metadata = {
  title: 'اتودهای کارت‌های تعرفه — مسیر جایگزین',
};

/* صفحهٔ پیش‌نمایش ۲ اتود جدید سکشن قیمت (کارت سه‌تایی + معادل‌سنجی چاپی) — مستقل از دیزاین فعلی */
export default function PricingCardsPreviewPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans selection:bg-[var(--color-primary-100)] selection:text-[var(--color-primary-900)]">
      {/* هدر راهنمای صفحه */}
      <div className="bg-[var(--color-neutral-900)] text-white py-4 px-4 border-b border-[var(--border-neutral-base)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-xs font-black px-2 py-0.5">
              کارت‌های تعرفه
            </span>
            <h1 className="text-sm md:text-base font-bold">
              سه کارت، میانی به سبک ستون رُخ‌نما؛ ردیف‌ها معادل‌سنجی چاپی‌اند و سازمانی بدون قیمت
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-neutral-300)]">
            <span>۲ اتود در مسیر جدا — دیزاین فعلی دست‌نخورده</span>
            <span className="text-[var(--color-secondary-400)]">اَبَر · گوشه تیز · ارقام فارسی</span>
          </div>
        </div>
      </div>

      {/* نوار برچسب اتود ۱ */}
      <div className="flex items-center justify-center gap-4 bg-[var(--color-primary-800)] py-3 px-4 shadow-inner">
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
        <span className="text-xs md:text-sm font-black text-white tracking-wide">
          اتود ۱: پلکان قیمتی — سه کارت با ارتفاع پلکانی و سربرگ مرکزی
        </span>
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
      </div>

      <PricingCardsA />

      {/* نوار برچسب اتود ۲ */}
      <div className="flex items-center justify-center gap-4 bg-[var(--color-primary-900)] py-3 px-4 shadow-inner">
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
        <span className="text-xs md:text-sm font-black text-white tracking-wide">
          اتود ۲: قاب مهندسی — هر سه سطح در یک قاب خطی مشترک، میانی از قاب بیرون می‌زند
        </span>
        <span className="h-px w-12 bg-[var(--color-primary-400)]" />
      </div>

      <PricingCardsB />
    </div>
  );
}
