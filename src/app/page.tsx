'use client';

import Header from '@/ui/Header';
import Hero from '@/ui/Hero';
import CustomCursor from '@/ui/CustomCursor';

export default function Home() {
  return (
    <div className="bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans min-h-screen" dir="rtl">
      <CustomCursor />
      <Header />

      <main className="flex flex-col relative z-10 w-full">
        <Hero />
        {/* Placeholder for scroll space */}
        <div className="h-screen bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] flex items-center justify-center">
          <h2 className="text-3xl font-black text-[var(--text-neutral-subtle)]">ادامه صفحه (Grid 02)</h2>
        </div>
      </main>

    </div>
  );
}