'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';

const emptySubscribe = () => () => {};

export default function CustomCursor() {
  const [isHoveredButton, setIsHoveredButton] = useState(false);
  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const [isPrimaryBg, setIsPrimaryBg] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const isHoveredButtonRef = useRef(false);
  const isHoveredLinkRef = useRef(false);
  const lastTargetRef = useRef<HTMLElement | null>(null);
  const isAnimatingClickRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const hasPointerFine = useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false),
    () => false
  );

  useEffect(() => {
    if (!hasPointerFine) return;

    document.documentElement.classList.add('has-custom-cursor');

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;

    let dotX = -100;
    let dotY = -100;
    let boxX = -100;
    let boxY = -100;

    /**
     * هدف پر شدن کرسر: دکمههای واقعی و هر عنصری که با data-cursor-button="true" علامت خورده است.
     * با data-cursor-effect="false" یا کلاس no-cursor-effect از این حالت مستثنا میشود.
     */
    const findCursorFillTarget = (target: HTMLElement | null): HTMLElement | null => {
      if (!target) return null;
      const btn = target.closest(
        'button, a[href], [data-cursor-button="true"], [role="button"], .group\\/btn'
      ) as HTMLElement | null;

      if (!btn) return null;

      if (btn.dataset.cursorEffect === 'false' || btn.classList.contains('no-cursor-effect')) {
        return null;
      }

      return btn;
    };

    /**
     * هدف تأخیر کلیک: همان هدف پر شدن، مگر آنکه با data-cursor-click="false" یا کلاس no-cursor-click
     * تأخیر برایش خاموش شده باشد. جدا بودن این دو یعنی یک کارت میتواند کرسر را پر کند
     * بدون آنکه کلیکش با تأخیر انجام شود.
     */
    const findCursorClickTarget = (target: HTMLElement | null): HTMLElement | null => {
      if (!target) return null;
      const btn = target.closest(
        'button, [data-cursor-button="true"], [role="button"], .group\\/btn'
      ) as HTMLElement | null;
      if (!btn) return null;

      if (btn.dataset.cursorClick === 'false' || btn.classList.contains('no-cursor-click')) {
        return null;
      }

      return btn;
    };

    const findGeneralLink = (target: HTMLElement | null): HTMLElement | null => {
      if (!target) return null;
      return target.closest('a') as HTMLElement | null;
    };

    /**
     * تشخیص هوشمند رنگ پس‌زمینه دقیقاً زیر ماوس
     */
    const detectIsPrimaryBg = (target: HTMLElement | null): boolean => {
      let curr = target;
      while (curr && curr !== document.documentElement) {
        try {
          const bg = window.getComputedStyle(curr).backgroundColor;
          if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
            const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (match) {
              const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
              if (alpha > 0.15) {
                const r = parseInt(match[1], 10);
                const g = parseInt(match[2], 10);
                const b = parseInt(match[3], 10);

                if (r > 200 && g > 200 && b > 200) {
                  return false;
                }

                /* آستانهٔ روشنایی تنها ملاک است: زمینهٔ سرمهای برند (primary-600 تا 950) زیر آستانه
                   میافتد و سفیدها بالای آن. اشباع آبی بهتنهایی نشانهٔ تیرگی نیست، وگرنه سطوح
                   روشنِ پرایمری (primary-200/300) هم تیره شمرده میشدند. */
                const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
                return luminance < 0.55;
              }
            }
          }
        } catch {
          // نادیده گرفتن
        }
        curr = curr.parentElement;
      }
      return false;
    };

    /**
     * بازخوانی سطحِ زیر نشانگر بدون حرکت ماوس.
     * هنگام اسکرول، سکشن تیره/روشن زیر نشانگر عوض میشود و هدر ثابت هم رنگش را تغییر میدهد،
     * بدون آنکه mousemove یا mouseover شلیک شود؛ پس سطح باید از روی موقعیت آخرِ نشانگر خوانده شود.
     */
    const refreshSurfaceUnderPointer = () => {
      if (targetX < 0 || targetY < 0) return;
      const el = document.elementFromPoint(targetX, targetY) as HTMLElement | null;
      if (!el) return;
      lastTargetRef.current = el;
      const isPrimary = detectIsPrimaryBg(el);
      setIsPrimaryBg((prev) => (prev !== isPrimary ? isPrimary : prev));
    };

    /* بازخوانیها با یک قاب مرورگر ادغام میشوند تا اسکرول به کوئری چیدمان در هر رویداد تبدیل نشود.
       خوانش دومی هم پس از پایان ترنزیشن رنگ (هدر ۲۰۰ms) انجام میشود تا رنگ نهاییِ سطح مرجع باشد،
       نه رنگ میانیِ حین ترنزیشن. */
    let surfaceRefreshId = 0;
    let surfaceSettleId: ReturnType<typeof setTimeout> | null = null;
    const scheduleSurfaceRefresh = () => {
      if (!surfaceRefreshId) {
        surfaceRefreshId = requestAnimationFrame(() => {
          surfaceRefreshId = 0;
          refreshSurfaceUnderPointer();
        });
      }
      if (surfaceSettleId) clearTimeout(surfaceSettleId);
      surfaceSettleId = setTimeout(refreshSurfaceUnderPointer, 260);
    };

    let isVisibleFlag = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisibleFlag) {
        isVisibleFlag = true;
        setIsVisible(true);
      }

      const el = e.target as HTMLElement | null;
      if (el !== lastTargetRef.current) {
        lastTargetRef.current = el;
        const isPrimary = detectIsPrimaryBg(el);
        setIsPrimaryBg((prev) => (prev !== isPrimary ? isPrimary : prev));
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const btn = findCursorFillTarget(el);
      const isBtn = Boolean(btn);
      const isLnk = !isBtn && Boolean(findGeneralLink(el));

      isHoveredButtonRef.current = isBtn;
      isHoveredLinkRef.current = isLnk;
      setIsHoveredButton(isBtn);
      setIsHoveredLink(isLnk);

      const isPrimary = detectIsPrimaryBg(el);
      setIsPrimaryBg((prev) => (prev !== isPrimary ? isPrimary : prev));
    };

    /**
     * انیمیشن کلیک با GSAP:
     * ۱. نقطه متحرک آزاد از بالا سمت چپ خارج و محو می‌شود
     * ۲. پیکان nav-arrow از پایین سمت راست وارد و در مرکز کادر می‌نشیند
     * ۳. پس از ۱ ثانیه عملکرد اصلی دکمه فایر می‌شود
     */
    const handleClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const buttonEl = findCursorClickTarget(target);

      if (!buttonEl) return;

      if (buttonEl.dataset.cursorDelayed === 'true') {
        delete buttonEl.dataset.cursorDelayed;
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (isAnimatingClickRef.current) return;
      isAnimatingClickRef.current = true;

      if (tlRef.current) {
        tlRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingClickRef.current = false;
          buttonEl.dataset.cursorDelayed = 'true';

          if (buttonEl.tagName === 'A') {
            const anchor = buttonEl as HTMLAnchorElement;
            const href = anchor.getAttribute('href');
            if (href && href.startsWith('#')) {
              const targetEl = document.getElementById(href.replace('#', ''));
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
            } else if (href) {
              window.location.href = anchor.href;
            } else {
              buttonEl.click();
            }
          } else {
            buttonEl.click();
          }

          if (dotRef.current) {
            gsap.set(dotRef.current, { x: 0, y: 0, opacity: 1 });
          }
          if (arrowRef.current) {
            gsap.set(arrowRef.current, { x: 42, y: 42, opacity: 0 });
          }
        },
      });

      tlRef.current = tl;

      // فاز ۱: نقطه آزاد به سمت بالا سمت چپ خارج شده و غیب می‌شود
      if (dotRef.current) {
        tl.to(dotRef.current, {
          x: '-=42',
          y: '-=42',
          opacity: 0,
          duration: 0.32,
          ease: 'power2.in',
        });
      }

      // فاز ۲: پیکان nav-arrow از پایین سمت راست وارد کادر شده و در مرکز می‌نشیند
      if (arrowRef.current) {
        gsap.set(arrowRef.current, {
          x: 42,
          y: 42,
          opacity: 0,
        });

        tl.to(
          arrowRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.58,
            ease: 'power3.out',
          },
          '>-0.05'
        );
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (tlRef.current) {
        tlRef.current.kill();
        isAnimatingClickRef.current = false;
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const loop = () => {
      dotX += (targetX - dotX) * 0.85;
      dotY += (targetY - dotY) * 0.85;

      boxX += (targetX - boxX) * 0.18;
      boxY += (targetY - boxY) * 0.18;

      const size = isHoveredButtonRef.current ? 72 : isHoveredLinkRef.current ? 64 : 56;
      const half = size / 2;

      if (boxRef.current) {
        boxRef.current.style.transform = `translate3d(${boxX - half}px, ${boxY - half}px, 0)`;
      }
      if (dotRef.current && !isAnimatingClickRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('click', handleClickCapture, { capture: true });
    window.addEventListener('scroll', scheduleSurfaceRefresh, { passive: true });
    window.addEventListener('resize', scheduleSurfaceRefresh, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClickCapture, { capture: true });
      window.removeEventListener('scroll', scheduleSurfaceRefresh);
      window.removeEventListener('resize', scheduleSurfaceRefresh);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (tlRef.current) tlRef.current.kill();
      cancelAnimationFrame(animationFrameId);
      if (surfaceRefreshId) cancelAnimationFrame(surfaceRefreshId);
      if (surfaceSettleId) clearTimeout(surfaceSettleId);
    };
  }, [hasPointerFine]);

  if (!mounted || !hasPointerFine) return null;

  const currentSize = isHoveredButton ? 72 : isHoveredLink ? 64 : 56;

  // حالت توپر روی دکمه، لینک و متنِ قابلکلیک: کادر و نقطهٔ رنگی نشانهٔ این حالتاند و
  // لایهٔ پرکننده با تُنی شفاف از پالت مینشیند تا محتوای زیرش خوانا و بانتراست بماند.
  const filled = isHoveredButton || isHoveredLink;

  // رنگ کادر و المانها با استفاده از توکنهای رسمی طراحی رُخنما:
  const borderColor = isPrimaryBg ? 'border-[var(--color-neutral-50)]' : 'border-[var(--color-primary-600)]';
  const dotColorClass = isPrimaryBg ? 'bg-[var(--color-neutral-50)]' : 'bg-[var(--color-primary-600)]';
  const fillBackground = isPrimaryBg ? 'var(--color-neutral-50)' : 'color-mix(in srgb, var(--color-primary-600) 42%, transparent)';
  const arrowColor = isPrimaryBg ? 'var(--color-primary-600)' : 'var(--color-neutral-50)';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] select-none transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* کادر مربعی بیرونی: سایز در هاور دکمه ۷۲px و در حالت عادی ۵۶px (با تاخیر و اینرسی دنبال نقطه می‌آید) */}
      <div
        ref={boxRef}
        className={`fixed top-0 left-0 rounded-none border-[1.5px] ${borderColor} pointer-events-none transition-[width,height,border-color] duration-200 ease-out will-change-transform overflow-hidden`}
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          transform: `translate3d(-100px, -100px, 0)`,
        }}
      >
        {/* ۱. لایهٔ پرکننده با هاور کارت از پایین به بالا باز میشود: روی زمینهٔ روشن با توکن
            primary-600 و روی زمینهٔ تیرهٔ پرایمری با neutral-50 پر میشود تا کنتراست کادر حفظ شود. */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: fillBackground,
            clipPath: filled ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
            transition: filled
              ? 'clip-path 260ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'clip-path 200ms ease-out',
          }}
        />

        {/* ۲. پیکان nav-arrow.svg در مرکز کادر: در کلیک از پایین سمت راست وارد کادر شده و در مرکز قرار می‌گیرد */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            ref={arrowRef}
            className="w-8 h-8 opacity-0 will-change-transform absolute"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: 'translate3d(42px, 42px, 0)',
            }}
          >
            <path
              d="M0 0V14H1.74953L1.74739 3.1844L12.5786 14H14V12.5363L3.2089 1.7512H14V0H0Z"
              fill={arrowColor}
            />
          </svg>
        </div>
      </div>

      {/* نقطهٔ مرکزی کرسر: کاملاً آزاد و همگام با نوک ماوس حرکت می‌کند؛ در کلیک از بالا چپ خارج می‌شود */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-none pointer-events-none ${dotColorClass} transition-colors duration-150 will-change-transform z-10`}
        style={{
          transform: `translate3d(-100px, -100px, 0)`,
        }}
      />
    </div>
  );
}
