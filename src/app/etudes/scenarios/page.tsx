import ScenariosA from '@/ui/etudes/ScenariosA';
import ScenariosB from '@/ui/etudes/ScenariosB';
import ScenariosC from '@/ui/etudes/ScenariosC';

/* نوار جداکنندهٔ برچسب‌دار بین اتودها بر پایه دیزاین سیستم رُخ‌نما */
function EtudeDivider({ label, id }: { label: string; id?: string }) {
  return (
    <div id={id} className="w-full bg-[var(--color-primary-900)] border-y-2 border-[var(--color-secondary-500)] py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[var(--color-secondary-500)]" />
          <span className="text-xs sm:text-sm font-black text-white tracking-wide">{label}</span>
        </div>
        <span className="text-[11px] font-mono text-[var(--color-secondary-300)]">سکشن ۰۶ · سگمنت‌بندی صنایع و ۴ گام مهاجرت</span>
      </div>
    </div>
  );
}

// صفحهٔ پیش‌نمایش سه اتود سکشن ۰۶: «سگمنت‌بندی صنایع B2B و مسیر مهاجرت ۴ مرحله‌ای کاتالوگ قدیمی»
export default function ScenariosEtudesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans"
    >
      {/* نوار ناوبری پرش سریع در بالای صفحه */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[var(--border-neutral-base)] px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-[var(--color-primary-600)] text-white px-2 py-0.5">۰۶</span>
            <span className="text-xs sm:text-sm font-black text-[var(--text-neutral-strong)]">
              پیش‌نمایش اتودهای سکشن سگمنت‌بندی صنایع B2B و مسیر مهاجرت ۴ مرحله‌ای کاتالوگ قدیمی
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <a
              href="#etude-1"
              className="px-3 py-1 bg-[var(--bg-neutral-subtle)] hover:bg-[var(--color-primary-50)] text-[var(--text-neutral-strong)] border border-[var(--border-neutral-base)] transition-colors"
            >
              اتود ۱: ریل افقی و دیاگرام اتصالات
            </a>
            <a
              href="#etude-2"
              className="px-3 py-1 bg-[var(--bg-neutral-subtle)] hover:bg-[var(--color-primary-50)] text-[var(--text-neutral-strong)] border border-[var(--border-neutral-base)] transition-colors"
            >
              اتود ۲: ماتریس دو ستونه و آکاردئون
            </a>
            <a
              href="#etude-3"
              className="px-3 py-1 bg-[var(--bg-neutral-subtle)] hover:bg-[var(--color-primary-50)] text-[var(--text-neutral-strong)] border border-[var(--border-neutral-base)] transition-colors"
            >
              اتود ۳: نقشه اکوسیستم و خط انتقال
            </a>
          </div>
        </div>
      </nav>

      {/* اتود ۱: ریل افقی درگ‌شوندهٔ ۴ صنف با دیاگرام اتصالات ۴ گام مهاجرت */}
      <EtudeDivider
        id="etude-1"
        label="اتود ۱ — ریل افقی درگ‌شوندهٔ ۴ صنف با دیاگرام اتصالات ۴ گام مهاجرت"
      />
      <ScenariosA />

      {/* اتود ۲: ماتریس دو ستونهٔ تطبیق صنف و درد مشترک همراه با آکاردئون خطی مراحل آماده‌سازی */}
      <EtudeDivider
        id="etude-2"
        label="اتود ۲ — ماتریس دو ستونهٔ تطبیق صنف و درد مشترک همراه با آکاردئون خطی مراحل آماده‌سازی"
      />
      <ScenariosB />

      {/* اتود ۳: نقشهٔ محیطی اکوسیستم صنعتی و خط انتقال داده از فایل قدیمی به کاتالوگ زنده */}
      <EtudeDivider
        id="etude-3"
        label="اتود ۳ — نقشهٔ محیطی اکوسیستم صنعتی و خط انتقال داده از فایل قدیمی به کاتالوگ زنده"
      />
      <ScenariosC />
    </main>
  );
}
