import InfrastructureA from '@/ui/etudes/InfrastructureA';
import InfrastructureB from '@/ui/etudes/InfrastructureB';
import InfrastructureC from '@/ui/etudes/InfrastructureC';

function EtudeBar({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="w-full bg-[var(--color-primary-900)] border-y-2 border-[var(--color-primary-600)] py-4 px-6 lg:px-14 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-sm font-black text-white tracking-[-0.02em]">{label}</span>
        <span className="text-xs font-normal text-[var(--color-primary-200)]">{sub}</span>
      </div>
    </div>
  );
}

export default function InfrastructureEtudesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] font-sans">
      <main className="flex flex-col">
        <EtudeBar
          label="اتود A — Network/توپولوژی · ۵ هاب + خطوط"
          sub="۴ کارت ۲×۲ · بستر primary-900"
        />
        <InfrastructureA />

        <EtudeBar
          label="اتود B — Minimal · تک‌هاب طلایی"
          sub="۳ کارت ستونی + نوار اعتباری سازمانی"
        />
        <InfrastructureB />

        <EtudeBar
          label="اتود C — Territory · نقشه بافت کل سکشن"
          sub="کارت‌های شیشه‌ای + گرادیان محوکننده"
        />
        <InfrastructureC />
      </main>
    </div>
  );
}
