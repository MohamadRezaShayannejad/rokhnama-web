'use client';

import { Logo } from '@/ui/Logo';
import { Button } from '@/ui/Button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[var(--color-primary-600)]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="w-full mx-auto px-12 lg:px-16 xl:px-20 h-20 flex items-center justify-between">

        {/* Official Logo from history/Figma */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <Logo variant="light" className="h-8 md:h-9 w-auto" />
        </div>

        {/* Navigation items: sharp editorial hover — underline sweeps in from the right, text lifts to pure white */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-bold text-white/90">
          <a href="#demo" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            درخواست دمو
            <span className="nav-underline" />
          </a>
          <a href="#compare" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            مقایسه با کاتالوگ کاغذی
            <span className="nav-underline" />
          </a>
          <a href="#features" className="nav-link group relative py-2 transition-colors duration-200 hover:text-white">
            ویژگی‌های تعاملی
            <span className="nav-underline" />
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Button
            color="white"
            variant="solid"
            size="md"
            className="bg-white text-[var(--color-primary-700)] hover:bg-[var(--color-neutral-100)]"
          >
            ورود به پنل
          </Button>
        </div>

      </div>
    </header>
  );
}
