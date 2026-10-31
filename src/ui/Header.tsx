'use client';

import { useState, useEffect, useRef } from 'react';
import { IconArrowUpLeft } from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { HeaderLogo } from '@/ui/HeaderLogo';
import { cn } from '@/lib/utils';

/** آیکون همبرگری/کبابی متحرک با انیمیشن تغییر حالت هندسی به ضربدر */
function AnimatedMenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className="relative w-7 h-7 flex items-center justify-center shrink-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* خط بالایی */}
      <span
        className={cn(
          'absolute h-[2px] w-6 bg-current transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'top-[13px] rotate-45' : 'top-[7px] rotate-0'
        )}
      />
      {/* خط میانی */}
      <span
        className={cn(
          'absolute top-[13px] h-[2px] w-6 bg-current transition-all duration-200 ease-out',
          isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
        )}
      />
      {/* خط پایینی */}
      <span
        className={cn(
          'absolute h-[2px] w-6 bg-current transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'top-[13px] -rotate-45' : 'top-[19px] rotate-0'
        )}
      />
    </span>
  );
}

/* نگاشت هر سکشن به تنظیمات رنگی و تم هدر — رنگها بر اساس ریل پایه (پرنشده) همان سکشن */
interface SectionConfig {
  theme: 'dark' | 'light';
  bgClass: string;
  borderColorClass: string;
  railColorClass: string;
  railBaseClass: string;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  hero: {
    theme: 'dark',
    bgClass: 'bg-[var(--color-primary-600)]',
    borderColorClass: 'border-[var(--color-primary-500)]',
    railColorClass: 'bg-[var(--color-primary-500)]',
    railBaseClass: 'bg-[var(--color-primary-500)]',
  },
  features: {
    theme: 'light',
    bgClass: 'bg-white',
    borderColorClass: 'border-[var(--color-neutral-200)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-neutral-200)]',
  },
  compare: {
    theme: 'light',
    bgClass: 'bg-white',
    borderColorClass: 'border-[var(--color-neutral-200)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-neutral-200)]',
  },
  migration: {
    theme: 'light',
    bgClass: 'bg-white',
    borderColorClass: 'border-[var(--color-neutral-200)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-neutral-200)]',
  },
  infrastructure: {
    theme: 'dark',
    bgClass: 'bg-[var(--color-primary-900)]',
    borderColorClass: 'border-white/15',
    railColorClass: 'bg-[var(--color-primary-400)]',
    railBaseClass: 'bg-white/15',
  },
  scenarios: {
    theme: 'light',
    bgClass: 'bg-white',
    borderColorClass: 'border-[var(--color-neutral-200)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-neutral-200)]',
  },
  projects: {
    theme: 'light',
    bgClass: 'bg-white',
    borderColorClass: 'border-[var(--color-neutral-200)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-neutral-200)]',
  },
  pricing: {
    theme: 'light',
    bgClass: 'bg-white',
    borderColorClass: 'border-[var(--color-neutral-200)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-neutral-200)]',
  },
  about: {
    /* ظاهر هدر مثل هیرو، اما ریلها رنگ ریل پرشدهٔ سکشن دربارهما (primary-600) */
    theme: 'dark',
    bgClass: 'bg-[var(--color-primary-600)]',
    borderColorClass: 'border-[var(--color-primary-500)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-primary-500)]',
  },
  demo: {
    /* سکشن درخواست دمو (BackingSection) دارای زمینهٔ سفید است */
    theme: 'light',
    bgClass: 'bg-white',
    borderColorClass: 'border-[var(--color-neutral-200)]',
    railColorClass: 'bg-[var(--color-primary-600)]',
    railBaseClass: 'bg-[var(--color-neutral-200)]',
  },
  footer: {
    theme: 'dark',
    bgClass: 'bg-[var(--color-primary-800)]',
    borderColorClass: 'border-white/15',
    railColorClass: 'bg-white',
    railBaseClass: 'bg-white/15',
  },
};

/* ۴ آیتم ناوبری بدون شکست خط */
const NAV_ITEMS = [
  { label: 'ویژگی‌ها', href: '#features' },
  { label: 'پروژه‌ها', href: '#projects' },
  { label: 'تعرفه‌ها', href: '#pricing' },
  { label: 'درباره‌ما', href: '#about' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    /* شناسایی سکشن‌ها بر اساس id */
    const sectionIds = Object.keys(SECTION_CONFIGS);

    let ticking = false;
    let cachedHeaderHeight = 88;

    const updateHeaderHeight = () => {
      cachedHeaderHeight = headerRef.current?.offsetHeight ?? 88;
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight, { passive: true });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const featuresEl = document.getElementById('features');
          const featuresTop = featuresEl ? featuresEl.getBoundingClientRect().top : Infinity;

          /* تا زمانی که بخش ویژگی‌ها (سکشن دوم) به هدر نرسیده باشد، کاربر در بخش هیرو است */
          if (featuresTop > cachedHeaderHeight) {
            setActiveSection((prev) => (prev !== 'hero' ? 'hero' : prev));
            ticking = false;
            return;
          }

          let currentSection = 'features';
          for (let i = sectionIds.length - 1; i >= 1; i--) {
            const id = sectionIds[i];
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= cachedHeaderHeight) {
                currentSection = id;
                break;
              }
            }
          }

          setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let lenisInstance: { off: (event: string, cb: () => void) => void } | null = null;
    const connectLenis = () => {
      const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).__lenis;
      if (lenis && !lenisInstance) {
        lenis.on('scroll', handleScroll);
        lenisInstance = lenis;
      }
    };
    connectLenis();
    const intervalId = setInterval(() => {
      if (!lenisInstance) {
        connectLenis();
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeaderHeight);
      clearInterval(intervalId);
      if (lenisInstance) {
        lenisInstance.off('scroll', handleScroll);
      }
    };
  }, []);

  /* پنل منو: قفل اسکرول پس‌زمینه، بستن با Escape، حبس فوکوس داخل پنل و بازگشت آن به دکمهٔ منو */
  useEffect(() => {
    if (!menuOpen) return;

    const trigger = menuButtonRef.current;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const insidePanel = active instanceof HTMLElement && panel?.contains(active);

      if (event.shiftKey && (!insidePanel || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!insidePanel || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(focusFrame);
      trigger?.focus();
    };
  }, [menuOpen]);

  const config = SECTION_CONFIGS[activeSection] || SECTION_CONFIGS.hero;
  const isDark = config.theme === 'dark';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 h-16 xl:h-[88px] border-b transition-colors duration-200',
          config.bgClass,
          config.borderColorClass
        )}
        ref={headerRef}
      >
        {/* کانتینر اصلی هدر منطبق بر گرید ۱۴۷۲ پیکسلی صفحه — دسکتاپ: ناوبری راست، لوگو در مرکز با خطوط بغل، اکشن‌ها چپ | موبایل: لوگو راست، منو چپ */}
        <div className="relative w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto h-full flex justify-between items-center xl:grid xl:grid-cols-[1fr_auto_1fr] px-0 xl:px-16">

          {/* خطوط عمودی گرید در دو لبه راست و چپ کانتینر ۱۴۷۲px هم‌راستا با ریل‌های صفحه */}
          <div
            className={cn(
              'absolute inset-y-0 right-0 w-[1px] transition-colors duration-200',
              config.railColorClass
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              'absolute inset-y-0 left-0 w-[1px] transition-colors duration-200',
              config.railColorClass
            )}
            aria-hidden="true"
          />

          {/* ستون راست (موبایل و تبلت): لوگو — در لبهٔ راست با فاصله ۲۴px مطابق خط‌کش موبایل */}
          <div className="flex xl:hidden items-center self-stretch justify-self-start pr-6 sm:pr-8">
            <a href="#" aria-label="صفحه اصلی رُخنما" className="flex items-center">
              <HeaderLogo
                variant={isDark ? 'light' : 'dark'}
                className="w-auto h-7 md:h-8"
              />
            </a>
          </div>

          {/* ستون راست (دسکتاپ): ناوبری — ۴ آیتم، بدون شکست متن */}
          <nav
            className={cn(
              'hidden xl:flex items-center justify-self-start col-start-1 gap-7 xl:gap-9 pb-1 text-base font-bold transition-colors duration-200 min-w-0 whitespace-nowrap',
              isDark ? 'text-white/75' : 'text-[var(--text-neutral-base)]'
            )}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-1.5 pt-1 text-[16px] transition-colors duration-200 shrink-0 whitespace-nowrap',
                  isDark ? 'hover:text-white' : 'hover:text-[var(--color-primary-600)]'
                )}
              >
                <span className="pt-[2px]">{item.label}</span>
                <IconArrowUpLeft
                  size={24}
                  stroke={2.2}
                  className={cn(
                    'shrink-0 pb-[2px] opacity-90 transition-all duration-200 group-hover:opacity-100 group-hover:text-[var(--color-secondary-400)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5',
                    isDark ? 'text-[var(--color-primary-400)]' : 'text-[var(--color-neutral-400)]'
                  )}
                />
              </a>
            ))}
          </nav>

          {/* ستون میانی (دسکتاپ): لوگو کاملاً در مرکز با دو خط عمودی تمام‌ارتفاع در دو طرف */}
          <div className="hidden xl:flex items-center justify-center shrink-0 self-stretch col-start-2 justify-self-center">
            <span
              className={cn(
                'block w-[1px] h-full mx-6 xl:mx-8 transition-colors duration-200',
                config.railBaseClass
              )}
              aria-hidden="true"
            />
            <a href="#" aria-label="صفحه اصلی رُخنما" className="flex items-center">
              <HeaderLogo
                variant={isDark ? 'light' : 'dark'}
                className="w-auto h-7 md:h-8"
              />
            </a>
            <span
              className={cn(
                'block w-[1px] h-full mx-6 xl:mx-8 transition-colors duration-200',
                config.railBaseClass
              )}
              aria-hidden="true"
            />
          </div>

          {/* ستون چپ: اکشن‌ها — اینستاگرام و دمو، و دکمهٔ منو در کامل‌ترین لبهٔ چپ */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 justify-self-end self-stretch col-start-3 min-w-0">

            {/* اینستاگرام — فقط دسکتاپ پهن تا ناوبری و دکمه فضای کافی داشته باشند */}
            <a
              href="https://instagram.com/Rokhnama_ir"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-button="true"
              className="hidden 2xl:flex flex-col items-start gap-0 pt-[6px] shrink-0 transition-colors duration-200"
            >
              <span className={cn(
                'text-sm font-normal transition-colors duration-200',
                isDark ? 'text-[var(--color-primary-300)]' : 'text-[var(--color-primary-600)]'
              )}>
                اینستــــاگرام رُخنما
              </span>
              <span
                dir="ltr"
                className={cn(
                  'text-lg font-semibold -mt-1 tracking-[0.02em] transition-colors duration-200',
                  isDark ? 'text-white' : 'text-[var(--color-neutral-900)]'
                )}
              >
                @Rokhnama_ir
              </span>
            </a>

            {/* دکمهٔ اصلی — از تبلت به بالا در نوار می‌ماند؛ در موبایل داخل پنل منو */}
            <div className="hidden sm:block shrink-0">
              <Button
                asChild
                color={isDark ? 'white' : 'primary'}
                variant="solid"
                size="md"
                paperFold
              >
                <a href="#demo">
                  <span className="px-2">درخواست دمو</span>
                </a>
              </Button>
            </div>

            {/* دکمهٔ منو — باکس مربعی به ارتفاع کل هدر، در کامل‌ترین لبهٔ چپ */}
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              aria-controls="site-menu"
              aria-expanded={menuOpen}
              data-cursor-button="true"
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                'relative xl:hidden self-stretch aspect-square flex items-center justify-center shrink-0 transition-colors duration-200',
                isDark ? 'text-white/80 hover:text-white' : 'text-[var(--text-neutral-base)] hover:text-[var(--color-primary-600)]'
              )}
            >
              <span
                className={cn(
                  'absolute inset-y-0 right-0 w-[1px] transition-colors duration-200',
                  config.railBaseClass
                )}
                aria-hidden="true"
              />
              <AnimatedMenuIcon isOpen={menuOpen} />
            </button>
          </div>

        </div>
      </header>

      {/* پنل ناوبری تمام‌صفحهٔ موبایل و تبلت — افکت پرده‌ای معماری از بالا به پایین با ترنزیشن فیزیکال */}
      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="منوی ناوبری"
        inert={!menuOpen}
        className={cn(
          'fixed inset-x-0 top-0 h-[100dvh] z-[60] flex xl:hidden flex-col transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
          config.bgClass,
          menuOpen
            ? '[clip-path:inset(0_0_0_0)] opacity-100'
            : 'pointer-events-none [clip-path:inset(0_0_100%_0)] opacity-0'
        )}
      >
        {/* نوار بالای پنل — هم‌چیدمان دقیق نوار اصلی: لوگو کامل راست، دکمهٔ بستن کامل چپ */}
        <div className="relative w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto h-16 shrink-0 flex justify-between items-center">
          <div
            className={cn('absolute inset-y-0 right-0 w-[1px]', config.railColorClass)}
            aria-hidden="true"
          />
          <div
            className={cn('absolute inset-y-0 left-0 w-[1px]', config.railColorClass)}
            aria-hidden="true"
          />
          <div className="flex items-center self-stretch pr-6 sm:pr-8">
            <HeaderLogo variant={isDark ? 'light' : 'dark'} className="w-auto h-7 md:h-8" />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="بستن منو"
            data-cursor-button="true"
            onClick={() => setMenuOpen(false)}
            className={cn(
              'relative self-stretch aspect-square flex items-center justify-center transition-colors duration-200',
              isDark ? 'text-white/80 hover:text-white' : 'text-[var(--text-neutral-base)] hover:text-[var(--color-primary-600)]'
            )}
          >
            <span
              className={cn('absolute inset-y-0 right-0 w-[1px]', config.railBaseClass)}
              aria-hidden="true"
            />
            <AnimatedMenuIcon isOpen={menuOpen} />
          </button>
        </div>

        <div className={cn('border-t shrink-0', config.borderColorClass)} />

        {/* فهرست ناوبری — هر آیتم با افکت آبشاری (stagger) وارد می‌شود */}
        <nav className="w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                style={{
                  transitionDelay: menuOpen ? `${idx * 35 + 80}ms` : '0ms',
                }}
                className={cn(
                  'group relative flex items-center justify-between gap-3 min-h-[56px] border-b transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                  menuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3 pointer-events-none',
                  config.borderColorClass,
                  isDark
                    ? 'text-white/85 hover:text-white'
                    : 'text-[var(--text-neutral-base)] hover:text-[var(--color-primary-600)]'
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg font-bold">{item.label}</span>
                  <IconArrowUpLeft
                    size={22}
                    stroke={2.2}
                    className={cn(
                      'shrink-0 pb-[2px] transition-colors duration-200',
                      isActive
                        ? 'text-[var(--color-secondary-400)]'
                        : isDark
                          ? 'text-[var(--color-primary-400)]'
                          : 'text-[var(--color-neutral-400)]'
                    )}
                  />
                </span>
                {isActive && (
                  <span
                    className="absolute right-0 inset-y-3 w-[2px] bg-[var(--color-secondary-400)]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* پای پنل — اینستاگرام و دکمهٔ اصلی، هر دو با ارتفاع لمسی یکسان */}
        <div
          style={{
            transitionDelay: menuOpen ? '280ms' : '0ms',
          }}
          className={cn(
            'w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto shrink-0 pb-[max(2rem,env(safe-area-inset-bottom))] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
        >
          <div className={cn('border-t', config.borderColorClass)}>
            <a
              href="https://instagram.com/Rokhnama_ir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 min-h-[56px] transition-colors duration-200"
            >
              <span className={cn(
                'text-base',
                isDark ? 'text-[var(--color-primary-300)]' : 'text-[var(--color-primary-600)]'
              )}>
                اینستاگرام رُخنما
              </span>
              <span
                dir="ltr"
                className={cn(
                  'text-base font-semibold',
                  isDark ? 'text-white' : 'text-[var(--color-neutral-900)]'
                )}
              >
                @Rokhnama_ir
              </span>
            </a>
            <div className={cn('border-t pt-6', config.borderColorClass)}>
              <Button
                asChild
                color={isDark ? 'white' : 'primary'}
                variant="solid"
                size="md"
                paperFold
                fullWidth
              >
                <a href="#demo" onClick={() => setMenuOpen(false)}>
                  <span className="px-2">درخواست دمو</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
