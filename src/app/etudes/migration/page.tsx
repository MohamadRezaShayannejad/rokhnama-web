import MigrationDelight from '@/ui/etudes/MigrationDelight';
import MigrationAdapt from '@/ui/etudes/MigrationAdapt';
import MigrationOverdrive from '@/ui/etudes/MigrationOverdrive';

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

export default function MigrationEtudesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] font-sans">
      <main className="flex flex-col">
        <EtudeBar label="Delight — پیشرفت لمسی" sub="نوار پیشرفت + تایید خاتمهٔ مرحله · تکرارپذیر و سبک" />
        <MigrationDelight />

        <EtudeBar label="Adapt — بازاندیشی موبایل" sub="sticky فقط دسکتاپ · هاور فقط fine-pointer · اعداد و لوگومارک واکنش‌گرا" />
        <MigrationAdapt />

        <EtudeBar label="Overdrive — مسیر سینمایی" sub="Rail اسکرول‌محور + wipe clip-path · progressive enhancement · 60fps" />
        <MigrationOverdrive />
      </main>
    </div>
  );
}
