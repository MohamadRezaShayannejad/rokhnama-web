import CompareA from '@/ui/etudes/CompareA';
import CompareB from '@/ui/etudes/CompareB';
import CompareC from '@/ui/etudes/CompareC';

/* نوار جداکنندهٔ برچسب‌دار بین اتودها مطابق دیزاین سیستم رُخ‌نما */
function EtudeDivider({ label, id }: { label: string; id?: string }) {
  return (
    <div id={id} className="w-full bg-[var(--color-primary-900)] border-y-2 border-[var(--color-secondary-500)] py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[var(--color-secondary-500)]" />
          <span className="text-xs sm:text-sm font-black text-white tracking-wide">{label}</span>
        </div>
        <span className="text-[11px] font-mono text-[var(--color-secondary-300)]">سکشن ۰۴ · ۴ ملاک قطعی</span>
      </div>
    </div>
  );
}

// صفحهٔ پیش‌نمایش اتودهای سکشن ۰۴: «مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ» — بدون Header سایت
export default function CompareEtudesPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans">
      {/* نوار ناوبری پرش سریع در بالای صفحه */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[var(--border-neutral-base)] px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-[var(--color-primary-600)] text-white px-2 py-0.5">۰۴</span>
            <span className="text-xs sm:text-sm font-black text-[var(--text-neutral-strong)]">
              پیش‌نمایش اتودهای سکشن مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ (۴ ملاک قطعی)
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <a
              href="#etude-1"
              className="px-3 py-1 bg-[var(--bg-neutral-subtle)] hover:bg-[var(--color-primary-50)] text-[var(--text-neutral-strong)] border border-[var(--border-neutral-base)] transition-colors"
            >
              اتود ۱: ماتریس مهندسی
            </a>
            <a
              href="#etude-2"
              className="px-3 py-1 bg-[var(--bg-neutral-subtle)] hover:bg-[var(--color-primary-50)] text-[var(--text-neutral-strong)] border border-[var(--border-neutral-base)] transition-colors"
            >
              اتود ۲: کارت‌های ملاک‌به‌ملاک
            </a>
            <a
              href="#etude-3"
              className="px-3 py-1 bg-[var(--bg-neutral-subtle)] hover:bg-[var(--color-primary-50)] text-[var(--text-neutral-strong)] border border-[var(--border-neutral-base)] transition-colors"
            >
              اتود ۳: خطوط موازی انشعابی
            </a>
          </div>
        </div>
      </nav>

      {/* اتود ۱: ماتریس مهندسی ۴ ستونه با هدر چسبان و قاب پیوستهٔ ستون رُخ‌نما */}
      <EtudeDivider id="etude-1" label="اتود ۱ — ماتریس مهندسی ۴ ستونه با هدر چسبان و قاب پیوستهٔ ستون رُخ‌نما" />
      <CompareA />

      {/* اتود ۲: کارت‌های مقایسه‌ای ملاک‌به‌ملاک با سوییچ حالت و نمادهای دقیق فنی */}
      <EtudeDivider id="etude-2" label="اتود ۲ — کارت‌های مقایسه‌ای ملاک‌به‌ملاک با سوییچ حالت و نمادهای دقیق فنی" />
      <CompareB />

      {/* اتود ۳: خطوط موازی انشعابی هیرلاین با انیمیشن فعال‌سازی مرحله‌ای برتری‌ها */}
      <EtudeDivider id="etude-3" label="اتود ۳ — خطوط موازی انشعابی هیرلاین با انیمیشن فعال‌سازی مرحله‌ای برتری‌ها" />
      <CompareC />
    </main>
  );
}
