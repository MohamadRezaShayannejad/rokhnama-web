'use client';

import * as React from 'react';
import { Logo } from '@/ui/Logo';
import { buttonVariants } from '@/ui/Button';
import { cn } from '@/lib/utils';

// آیتم‌های ناوبری مشترک هر ۴ واریانت هدر
const NAV_ITEMS = [
  { href: '#features', label: 'ویژگی‌ها' },
  { href: '#compare', label: 'مقایسه' },
  { href: '#scenarios', label: 'کاربردها' },
  { href: '#pricing', label: 'تعرفه‌ها' },
  { href: '#demo', label: 'درخواست دمو' },
] as const;

// واریانت ۲: پرشدن جهت‌دار از نقطه ورود ماوس — همان الگوی دکمه اوتلاین، روی لینک ناوبری
export default function HeaderV2({ fixed = true }: { fixed?: boolean }) {
  // نقطه شروع پرشدن طلایی را روی محل ورود/خروج ماوس می‌گذارد
  const setFillPoint = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <header
      className={
        fixed
          ? 'fixed top-0 left-0 w-full z-50 bg-[var(--color-primary-600)]/90 backdrop-blur-md border-b border-white/10 transition-colors'
          : 'relative w-full z-10 bg-[var(--color-primary-600)]/90 backdrop-blur-md border-b border-white/10 transition-colors'
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 h-20 flex items-center justify-between">
        {/* لوگوی رسمی از فیگما */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <Logo variant="light" className="h-8 md:h-9 w-auto" />
        </div>

        {/* ناوبری مدل ۲ */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-sm font-bold text-white/90">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={setFillPoint}
              onMouseLeave={setFillPoint}
              className="nav-v2-link"
            >
              <span aria-hidden="true" className="nav-v2-layer" />
              <span className="nav-v2-text">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* دکمه درخواست دمو */}
        <div className="flex items-center gap-4">
          <a
            href="#demo"
            className={cn(
              buttonVariants({ color: 'white', variant: 'solid', size: 'md' }),
              'bg-white text-[var(--color-primary-700)] hover:bg-[var(--color-neutral-100)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]'
            )}
          >
            درخواست دمو
          </a>
        </div>
      </div>
    </header>
  );
}
