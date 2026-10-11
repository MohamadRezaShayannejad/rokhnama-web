'use client';

import { Logo } from '@/ui/Logo';
import { buttonVariants } from '@/ui/Button';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-primary-600)]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 h-20 flex items-center justify-between">

        {/* Official Logo from history/Figma */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <Logo variant="light" className="h-8 md:h-9 w-auto" />
        </div>

        {/* Navigation items: 5 short anchor links based on landing content */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-white/90">
          <a href="#features" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            ویژگی‌ها
            <span className="nav-underline" />
          </a>
          <a href="#compare" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            مقایسه
            <span className="nav-underline" />
          </a>
          <a href="#scenarios" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            کاربردها
            <span className="nav-underline" />
          </a>
          <a href="#pricing" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            تعرفه‌ها
            <span className="nav-underline" />
          </a>
          <a href="#demo" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            درخواست دمو
            <span className="nav-underline" />
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <a
            href="#demo"
            className={cn(
              buttonVariants({ color: "white", variant: "solid", size: "md" }),
              "bg-white text-[var(--color-primary-700)] hover:bg-[var(--color-neutral-100)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]"
            )}
          >
            درخواست دمو
          </a>
        </div>

      </div>
    </header>
  );
}
