import ProblemsA from '@/ui/etudes/ProblemsA';
import ProblemsB from '@/ui/etudes/ProblemsB';
import ProblemsC from '@/ui/etudes/ProblemsC';

// نوار جداکنندهٔ برچسب‌دار بین اتودها
function EtudeBar({ label }: { label: string }) {
  return (
    <div className="w-full bg-[var(--color-primary-800)] py-4 px-6 lg:px-14">
      <span className="text-xs font-bold text-white">{label}</span>
    </div>
  );
}

// صفحهٔ پیش‌نمایش سه اتود سکشن ۲ — «چهار هزینهٔ پنهان کاتالوگ کاغذی و PDF»
export default function ProblemsEtudesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] font-sans">
      <main className="flex flex-col">
        <EtudeBar label="اتود ۱ — فیش هزینه" />
        <ProblemsA />

        <EtudeBar label="اتود ۲ — ترازنامهٔ دو ستونه" />
        <ProblemsB />

        <EtudeBar label="اتود ۳ — کاغذهایی که باطل می‌شوند" />
        <ProblemsC />
      </main>
    </div>
  );
}
