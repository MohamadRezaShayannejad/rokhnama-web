import FeaturesA from '@/ui/etudes/FeaturesA';
import FeaturesB from '@/ui/etudes/FeaturesB';
import FeaturesC from '@/ui/etudes/FeaturesC';

/* جداکنندهٔ برچسب‌دار مهندسی بین اتودها */
function EtudeDivider({
  num,
  title,
  subTitle,
}: {
  num: string;
  title: string;
  subTitle: string;
}) {
  return (
    <div className="border-y-2 border-[var(--color-primary-600)] bg-[var(--color-primary-900)] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-xs font-mono font-black">
            {num}
          </span>
          <span className="text-sm font-bold text-white tracking-wide">
            {title}
          </span>
        </div>
        <span className="text-xs text-[var(--color-primary-200)] font-normal">
          {subTitle}
        </span>
      </div>
    </div>
  );
}

/* صفحهٔ پیش‌نمایش ۳ اتود سکشن ۰۲ («کاتالوگ تعاملی چه شکلی است؟») */
export default function FeaturesEtudesPage() {
  return (
    <main dir="rtl" className="bg-[var(--bg-neutral-base)] min-h-screen text-right">

      {/* سربرگ معرفی صفحه پیش‌نمایش */}
      <header className="bg-white border-b-2 border-[var(--border-neutral-base)] py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] text-xs font-bold border border-[var(--border-primary-soft)]">
            مستندات طراحی و توسعه رُخ‌نما · سکشن ۰۲
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-neutral-strong)]">
            ارزیابی ۳ اتود سکشن «کاتالوگ تعاملی چه شکلی است؟»
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-neutral-subtle)] max-w-2xl mx-auto leading-relaxed">
            پیاده‌سازی بر اساس ۴ قابلیت سند معماری اطلاعات (IA)، قواعد تصویرسازی هیرلاین مهندسی (Hairline monoline)، گوشه‌های تیز (rounded-none) و پالت رنگی رُخ‌نما.
          </p>
        </div>
      </header>

      {/* اتود ۱ */}
      <EtudeDivider
        num="اتود ۱"
        title="دیاگرام هیرلاین زنده با هات‌اسپات‌های تعاملی و پاپ‌آپ‌های مقیاس‌شونده"
        subTitle="بوم ارتوگرافیک مهندسی با خطوط اندازه، علائم + و پاپ‌آپ‌های شناور متصل به قطعات"
      />
      <FeaturesA />

      {/* اتود ۲ */}
      <EtudeDivider
        num="اتود ۲"
        title="دایرکتوری و آرشیو تعاملی لایه‌ای با پیش‌نمایش خطی هر قابلیت"
        subTitle="چیدمان دوتکه (دایرکتوری راست + میزکار آزمون زنده چپ) با فیلتر کدها و شبیه‌ساز چرخش"
      />
      <FeaturesB />

      {/* اتود ۳ */}
      <EtudeDivider
        num="اتود ۳"
        title="ماکت پشته‌ای کاتالوگ با ۴ لایهٔ سوییچ‌شونده و کنترل‌های مهندسی"
        subTitle="تجزیه کاتالوگ به پشته ۴ لایه (هندسه، رسانه، شبکه، آرشیو) با کلیدهای کنترل مهندسی"
      />
      <FeaturesC />

    </main>
  );
}
