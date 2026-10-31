import CompareSectionV1 from '@/ui/compare/CompareSectionV1';
import CompareSectionV2 from '@/ui/compare/CompareSectionV2';
import CompareSectionV3 from '@/ui/compare/CompareSectionV3';
import CompareSectionV4 from '@/ui/compare/CompareSectionV4';

// صفحه پیش‌نمایش ۴ ورژن اوردرایو سکشن مقایسه برای انتخاب نسخه نهایی
export default function ComparePreviewPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-10 space-y-10">
        {/* سرخط صفحه پیش‌نمایش */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[var(--text-neutral-strong)]">پیش‌نمایش ۴ ورژن اوردرایو سکشن مقایسه</h1>
          <p className="text-base text-[var(--text-neutral-base)]">
            هر ورژن یک دوپلیکیت کامل از سکشن مقایسه با ایدهٔ متفاوت اسکرول/هاور/سینمایی؛ اسکرول کنید و نسخه نهایی را انتخاب کنید.
          </p>
        </div>

        {/* ورژن ۱ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">ورژن ۱ — اجرای دقیق</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">بوردرها با اسکرول ترسیم می‌شوند و آیکون‌ها با فنر سر جای خود می‌نشینند؛ ستون رُخ‌نما اسکن‌لاین عمودی باریک می‌گیرد.</p>
          </div>
          <CompareSectionV1 />
        </section>

        {/* ورژن ۲ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">ورژن ۲ — نورپردازی سطری</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">هاور روی هر سطر یک نوار هایلایت را جابه‌جا می‌کند و سطرهای دیگر کم‌رنگ می‌شوند تا تمرکز روی سطر فعال بماند.</p>
          </div>
          <CompareSectionV2 />
        </section>

        {/* ورژن ۳ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">ورژن ۳ — ستون فرمانده</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">ستون رُخ‌نما با اسکرول بالا می‌آید و می‌نشیند، تیک‌ها یکی‌یکی ترسیم می‌شوند و دکمهٔ دریافت مشاوره به‌عنوان پرده آخر ظاهر می‌شود.</p>
          </div>
          <CompareSectionV3 />
        </section>

        {/* ورژن ۴ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">ورژن ۴ — ترکیب نهایی</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">بهترین ایده‌های سه ورژن قبل: ترسیم بوردر + هایلایت سطری هاور + ورود سینمایی ستون فرمانده با تیک‌های متوالی.</p>
          </div>
          <CompareSectionV4 />
        </section>
      </div>
    </div>
  );
}