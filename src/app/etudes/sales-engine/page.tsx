import SalesA from '@/ui/etudes/SalesA';
import SalesB from '@/ui/etudes/SalesB';
import SalesC from '@/ui/etudes/SalesC';

// نوار جداکنندهٔ برچسب‌دار مهندسی بین اتودها
function EtudeBar({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="w-full bg-[var(--color-primary-950)] border-y border-[var(--color-primary-800)] py-4 px-6 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-xs font-black font-mono">
            {number}
          </span>
          <span className="text-sm font-bold tracking-tight">{title}</span>
        </div>
        <span className="text-xs text-[var(--color-primary-200)] font-medium">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

// صفحهٔ پیش‌نمایش سه اتود سکشن ۰۵ — «موتور فروش و تحلیل رفتار / کاتالوگی که می‌فروشد؛ داده‌ای که سازمان را تغذیه می‌کند»
export default function SalesEngineEtudesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] font-sans antialiased">
      {/* هدر بالایی صفحه پیش‌نمایش اتودها */}
      <header className="bg-white border-b border-[var(--border-neutral-base)] py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary-600)] uppercase block mb-1">
              پیش‌نمایش اتودهای طراحی رُخ‌نما
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--color-primary-950)]">
              سکشن ۰۵: کاتالوگی که می‌فروشد؛ داده‌ای که سازمان را تغذیه می‌کند
            </h1>
          </div>
          <div className="text-xs text-[var(--text-neutral-subtle)] font-medium">
            رویکرد کاملاً بازطراحی‌شده · خطوط مهندسی هیرلاین · ارقام فارسی
          </div>
        </div>
      </header>

      <main className="flex flex-col">
        {/* اتود ۱ */}
        <EtudeBar
          number="اتود ۱"
          title="کنسول ۳ نقشی همکار / نماینده / خریدار با سوییچ قیمت و زنجیرهٔ احراز پیامکی"
          subtitle="سوییچ نقش، قفل مشروط قیمت همکاری و تأیید پیامک در ۳۰ ثانیه"
        />
        <SalesA />

        {/* اتود ۲ */}
        <EtudeBar
          number="اتود ۲"
          title="شبیه‌ساز زندهٔ صدور برگ سفارش رسمی A4 با انیمیشن پر شدن خطوط و مُهر شرکتی"
          subtitle="پیش‌فاکتور رسمی با خطوط هیرلاین، محاسبات مالی، بارکد انبار و استامپ شرکتی"
        />
        <SalesB />

        {/* اتود ۳ */}
        <EtudeBar
          number="اتود ۳"
          title="تایم‌لاین رویدادهای زنده خریدار با پایشگر مدت مکث و اتصال سرنخ به CRM"
          subtitle="پایشگر نقاط توقف، تشخیص کالای پرتوجه و توصیه مکالمه برای تیم فروش"
        />
        <SalesC />
      </main>
    </div>
  );
}
