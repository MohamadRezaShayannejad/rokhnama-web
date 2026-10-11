'use client';

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

// واریانت ۳: تای گوشه کاغذی — مثلث طلایی ۱۰ پیکسلی هم‌اندازه برش دکمه، در گوشه شروع لینک
export default function HeaderV3({ fixed = true }: { fixed?: boolean }) {
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

        {/* ناوبری مدل ۳ */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-white/90">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-v3-link group relative px-1 py-2 transition-colors duration-200 hover:text-white"
            >
              {item.label}
              <span aria-hidden="true" className="nav-v3-corner" />
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
