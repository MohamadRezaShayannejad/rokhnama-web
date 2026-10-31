import type { Metadata } from 'next';
import CasesA from '@/ui/etudes/CasesA';
import CasesB from '@/ui/etudes/CasesB';
import CasesC from '@/ui/etudes/CasesC';

export const metadata: Metadata = {
  title: 'اتودهای سکشن ۰۳ — نمونه‌پروژه‌های پیاده‌سازی‌شده (اثبات زنده) | رُخ‌نما',
  description: 'پیش‌نمایش سه اتود متمایز سکشن ۰۳ بر پایه پرونده‌های واقعی دلبند، دانشگاه خواجه نصیر و بنکداری پانچو',
};

// نوار جداکنندهٔ برچسب‌دار بین اتودها
function EtudeBar({ label }: { label: string }) {
  return (
    <div className="w-full bg-[var(--color-primary-800)] py-4 px-6 lg:px-14 flex items-center justify-between border-y border-[var(--color-primary-900)]">
      <span className="text-xs font-bold text-white tracking-wide">{label}</span>
      <span className="text-[11px] font-mono text-[var(--color-primary-200)]">SECTION-03 · ETUDE</span>
    </div>
  );
}

// صفحهٔ پیش‌نمایش سه اتود سکشن ۰۳ — «نمونه‌پروژه‌های پیاده‌سازی‌شده / اثبات زنده»
export default function CasesEtudesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] font-sans">
      <main className="flex flex-col">
        <EtudeBar label="اتود ۱ — پرونده‌های بلوپرینت ۳ ستونه (دیاگرام چالش-راهکار-دستاورد و برچسب‌های صنعتی)" />
        <CasesA />

        <EtudeBar label="اتود ۲ — ناوبری تب‌محور صنایع ۳ گانه (پیش‌نمایش تعاملی کاتالوگ هر مشتری)" />
        <CasesB />

        <EtudeBar label="اتود ۳ — فلوی تطبیقی ۳ لایه (خطوط هدایت‌گر هیرلاین و استخراج آمار ملموس)" />
        <CasesC />
      </main>
    </div>
  );
}
