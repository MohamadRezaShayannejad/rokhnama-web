import DemoA from '@/ui/etudes/DemoA';
import DemoB from '@/ui/etudes/DemoB';
import DemoC from '@/ui/etudes/DemoC';

// نوار جداکنندهٔ برچسب‌دار بین اتودها
function EtudeBar({ label, description }: { label: string; description: string }) {
  return (
    <div className="w-full bg-[var(--color-primary-900)] border-y-2 border-[var(--color-secondary-400)] py-4 px-6 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <span className="text-sm font-black text-white font-mono">{label}</span>
      <span className="text-xs text-[var(--color-neutral-300)] font-sans">{description}</span>
    </div>
  );
}

// صفحهٔ پیش‌نمایش سه اتود سکشن ۰۸ — «استقرار فیزیکی ما اینجا هستیم + فرم درخواست دمو و فوتر رسمی»
export default function DemoEtudesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] font-sans">
      <header className="w-full bg-[var(--color-neutral-900)] text-white py-8 px-6 lg:px-14 border-b-4 border-[var(--color-secondary-500)]">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="inline-block px-2.5 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-xs font-black">
            سکشن ۰۸ · اتودهای طراحی
          </div>
          <h1 className="text-2xl lg:text-3xl font-black">
            پیش‌نمایش اتودهای سکشن ۰۸ — استقرار فیزیکی همراه اول (ما اینجا هستیم) + فرم درخواست دمو و فوتر رسمی
          </h1>
          <p className="text-sm text-[var(--color-neutral-300)]">
            پیاده‌سازی مبتنی بر بلوپرینت معماری ۳ ستونهٔ برج فناوری دانشگاه شهید بهشتی (Floor ۰۶)، هویت بصری اَبَر و مرزهای قطعی طراحی رُخ‌نما.
          </p>
        </div>
      </header>

      <main className="flex flex-col">
        <EtudeBar
          label="اتود ۱ · بلوپرینت ۳ ستونه در بالا و فرم کنسول سازمانی در پایین"
          description="چیدمان ساختاریافته عمودی بر اساس بلوپرینت معماری طبقه ششم و کنسول دریافت سرنخ B2B"
        />
        <DemoA />

        <EtudeBar
          label="اتود ۲ · چیدمان دو ستونه عریض متقارن"
          description="ستون راست فرم اعتبارسنجی سرنخ با تأیید پیامکی و ستون چپ کارت مهندسی استقرار همراه اول"
        />
        <DemoB />

        <EtudeBar
          label="اتود ۳ · مسیر سریع ۳ مرحله‌ای ارسال PDF و بلوپرینت تعاملی"
          description="پیپ‌لاین ۳ مرحله‌ای تبدیل با پیش‌نمایش درجا و استودیوی تعاملی طبقات برج فناوری"
        />
        <DemoC />
      </main>
    </div>
  );
}
