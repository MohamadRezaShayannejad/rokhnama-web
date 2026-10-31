'use client';

import Hero from './Hero';
import FeaturesShowcase from '@/ui/FeaturesShowcase';

/**
 * روت پیش‌نمایش سناریو/انیمیشن جدید هیرو:
 * کپیِ مستقل هیرو + سکشن زیرش، برای آزمایش جهت‌های تازه بدون دست‌زدن به لندینگ زنده.
 * همهٔ ویرایش‌های سناریو فقط در همین مسیر انجام می‌شود.
 */
export default function HeroPreviewPage() {
  return (
    <div
      className="bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans min-h-screen relative"
      dir="rtl"
    >
      <main className="flex flex-col relative z-10 w-full">
        <Hero />
        <FeaturesShowcase />
      </main>
    </div>
  );
}
