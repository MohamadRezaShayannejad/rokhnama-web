'use client';

import Header from '@/ui/Header';
import Hero from '@/ui/Hero';
import CustomCursor from '@/ui/CustomCursor';
import BackgroundFrame from '@/ui/BackgroundFrame';

export default function Home() {
  return (
    <div className="bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans min-h-screen relative" dir="rtl">
      <CustomCursor />
      <Header />

      {/* خطوط عمودی ممتد در سراسر صفحه و خط افقی زیر هدر بر اساس فیگما */}
      <BackgroundFrame />

      <main className="flex flex-col relative z-10 w-full">
        <Hero />

        {/* سکشن‌های لنگری هدر (Sections & Anchors) */}
        <section id="features" className="min-h-screen bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] flex items-center justify-center p-8">
          <h2 className="text-3xl font-black text-[var(--text-neutral-subtle)]">ویژگی‌های تعاملی (#features)</h2>
        </section>

        <section id="compare" className="min-h-screen bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] flex items-center justify-center p-8">
          <h2 className="text-3xl font-black text-[var(--text-neutral-subtle)]">مقایسه با کاتالوگ کاغذی و PDF (#compare)</h2>
        </section>

        <section id="scenarios" className="min-h-screen bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] flex items-center justify-center p-8">
          <h2 className="text-3xl font-black text-[var(--text-neutral-subtle)]">کاربردها و سناریوها (#scenarios)</h2>
        </section>

        <section id="pricing" className="min-h-screen bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] flex items-center justify-center p-8">
          <h2 className="text-3xl font-black text-[var(--text-neutral-subtle)]">تعرفه‌ها و بسته‌ها (#pricing)</h2>
        </section>

        <section id="demo" className="min-h-screen bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] flex items-center justify-center p-8">
          <h2 className="text-3xl font-black text-[var(--text-neutral-subtle)]">درخواست دمو (#demo)</h2>
        </section>
      </main>

    </div>
  );
}
