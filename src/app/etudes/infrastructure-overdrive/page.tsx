import InfrastructureOverdriveA from '@/ui/etudes/InfrastructureOverdriveA';
import InfrastructureOverdriveB from '@/ui/etudes/InfrastructureOverdriveB';
import InfrastructureOverdriveC from '@/ui/etudes/InfrastructureOverdriveC';

function EtudeBar({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="w-full bg-[var(--color-primary-900)] border-y-2 border-[var(--color-primary-600)] py-4 px-6 lg:px-14 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-sm font-black text-white tracking-[-0.02em]">{label}</span>
        <span className="text-xs font-normal text-[var(--color-secondary-300)]">{sub}</span>
      </div>
    </div>
  );
}

export default function InfrastructureOverdriveGalleryPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] font-sans">
      <main className="flex flex-col">
        {/* هدر صفحه */}
        <div className="w-full bg-[var(--color-primary-900)] py-16 px-6 lg:px-14 text-center border-b border-white/10">
          <div className="max-w-3xl mx-auto">
            <span className="px-3 py-1 bg-[var(--color-secondary-500)] text-[var(--color-primary-900)] text-xs font-black tracking-widest mb-4 inline-block">
              ⚡ OVERDRIVE GALLERY
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em] mb-4">
              سه رویکرد فوق‌العاده برای زیرساخت بومی
            </h1>
            <p className="text-base text-white/70">
              مقایسه و بررسی سه اتود اوردرایو تخصصی زیرساخت رُخ‌نما با بالاترین سطح کیفیت مهندسی و بصری.
            </p>
          </div>
        </div>

        <EtudeBar
          label="اتود A — تله‌متری و شبکه زنده"
          sub="پایش آنی هاب‌ها، اتصالات متحرک و پنل جزئیات زنده"
        />
        <InfrastructureOverdriveA />

        <EtudeBar
          label="اتود B — طراحی سینمایی و بازتاب نوری"
          sub="افکت سه‌بعدی Tilt با حرکت ماوس، کارت‌های شیشه‌ای مدرن و گرادیان نوری پویا"
        />
        <InfrastructureOverdriveB />

        <EtudeBar
          label="اتود C — مانیتورینگ و تیکر زنده مهندسی"
          sub="داشبورد تخصصی زیرساخت، لاگ‌های ترمینال و پینگ آنلاین"
        />
        <InfrastructureOverdriveC />
      </main>
    </div>
  );
}
