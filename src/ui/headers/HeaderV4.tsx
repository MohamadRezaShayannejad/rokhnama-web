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

// واریانت ۴: خیزش تایپوگرافیک با لوزی طلایی — بدون خط، بدون پرشدن، بدون برش
export default function HeaderV4({ fixed = true }: { fixed?: boolean }) {
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

        {/* ناوبری مدل ۴ */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-white/80">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-v4-link group relative inline-flex flex-col items-center gap-1.5 px-1 py-2 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              <span aria-hidden="true" className="nav-v4-marker" />
              <span className="nav-v4-text">{item.label}</span>
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
