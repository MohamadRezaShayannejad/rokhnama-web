'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/ui/Button';
import { Logo } from '@/ui/Logo';
import { IconArrowLeft } from '@tabler/icons-react';
import DotsPattern from '@/ui/DotsPattern';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !stickyRef.current) return;

    // 1. Initial Page Load Entry Animation for Hero Text Content
    gsap.from('.hero-fade-in', {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.09,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // 2. Direct 3D perspective setup compatible with Safari and Chrome
    const sceneEl = container.current.querySelector('.scene-3d');
    if (sceneEl) {
      gsap.set(sceneEl, {
        perspective: 2000,
        transformStyle: 'preserve-3d',
      });
    }

    // 3. Grid setup for 9 papers
    const papers = document.querySelectorAll('.paper-element');
    papers.forEach((paper, i) => {
      const col = (i % 3) - 1; // -1, 0, 1
      const row = Math.floor(i / 3) - 1; // -1, 0, 1
      const gapX = 114;
      const gapY = 150;
      gsap.set(paper, {
        x: col * gapX,
        y: row * gapY,
        z: -10,
        rotationZ: 0,
        transformStyle: 'preserve-3d',
      });
    });

    // 4. One-by-one tactile drop animation on page load (کاغذها یکی یکی گذاشته بشن روی صفحه)
    gsap.fromTo(papers,
      {
        opacity: 0,
        scale: 1.25,
        z: 140, // Drops down from air
        rotationX: -18,
        rotationY: (i) => ((i % 3) - 1) * 6,
      },
      {
        opacity: 1,
        scale: 1,
        z: -10,
        rotationX: 0,
        rotationY: 0,
        duration: 0.45,
        stagger: 0.07, // Staggered drop one by one
        ease: 'power2.out',
        delay: 0.15,
      }
    );

    // Logo is initially HIDDEN (not visible at the start)
    gsap.set('.logo-mark', { scale: 0.8, opacity: 0, z: 0 });
    gsap.set('.scan-line', { top: -4, opacity: 0 });

    // Realistic iPhone setup: Dark primary body, z: 80 in front
    gsap.set('.realistic-device', {
      y: 550,
      z: 80, // In front of logo plane
      scale: 0.65,
      opacity: 0,
      rotationX: 0,
      transformStyle: 'preserve-3d'
    });

    // SCROLL-DRIVEN TIMELINE WITH DELIBERATE HOLDS (مکث بین حالت‌ها)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=3400',
        pin: true,
        scrub: 1.2,
      }
    });

    // Step 1: Papers gather from 3x3 grid onto each other in center (0.05 -> 0.25)
    papers.forEach((paper, i) => {
      tl.to(paper, {
        x: (i - 4) * 1.5,
        y: (i - 4) * 1.5,
        rotationZ: (i - 4) * 1.5,
        ease: 'power2.inOut',
      }, 0.05);
    });

    // --- HOLD 1 (مکث ۱): 0.25 -> 0.35 (Stacked papers rest in center) ---

    // Step 2: Papers fade out and Logo rises up in center (0.35 -> 0.46)
    tl.to('.paper-element', {
      opacity: 0,
      scale: 0.88,
      ease: 'power1.inOut',
    }, 0.35);

    tl.fromTo('.logo-mark',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'power2.out' },
      0.38
    );

    // --- HOLD 2 (مکث ۲): 0.46 -> 0.56 (Logo sits proudly in center) ---

    // Step 3: Scan line (4px flat, NO glow) sweeps top to bottom (0.56 -> 0.70)
    tl.to('.scan-line', { opacity: 1, duration: 0.02 }, 0.56);
    tl.fromTo('.scan-line',
      { top: -4 },
      { top: 116, ease: 'power1.inOut' },
      0.58
    );
    tl.to('.scan-line', { opacity: 0, duration: 0.02 }, 0.70);

    // --- HOLD 3 (مکث ۳): 0.68 -> 0.80 (Full scan completed, deliberate pause) ---

    // Step 4: Logo fades out and dark primary iPhone emerges directly OVER it (higher layer) (0.80 -> 0.90)
    tl.to('.logo-mark', {
      opacity: 0,
      scale: 0.92,
      ease: 'power1.inOut',
    }, 0.80);

    tl.to('.realistic-device', {
      y: 0,
      z: 80,
      scale: 1,
      opacity: 1,
      rotationX: 0,
      ease: 'power2.out',
    }, 0.80);

    // Step 5: Screen interactive hotspot and elements trigger (0.90 -> 0.96)
    tl.fromTo('.screen-hotspot',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'back.out(2)' },
      0.90
    );

    // --- HOLD 4 (مکث نهایی): 0.96 -> 1.00 (Phone and catalog UI held in focus) ---

  }, { scope: container });

  return (
    <section ref={container} className="relative h-[340vh] bg-[var(--color-primary-600)]">

      {/* Sticky viewport frame */}
      <div ref={stickyRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Subtle geometric grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(var(--color-primary-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-400) 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}
        />

        {/* 12-column grid: text spans cols 1-5 (right in RTL), scene spans cols 6-12 */}
        <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16 items-center z-10 pt-20 lg:pt-24">

          {/* Right Column (RTL first): copy — lg:col-span-5 */}
          <div className="lg:col-span-5 lg:col-start-1 flex flex-col space-y-9 lg:space-y-11 order-2 lg:order-1 pr-2 lg:pr-6 xl:pr-10">

            {/* Badge: text-only, no background, sharp top border */}
            <div className="hero-fade-in self-start px-4 py-1 text-xs font-bold text-[var(--color-secondary-400)] tracking-widest uppercase rounded-none">
              رُخ‌نما — کاتالوگ تعاملی
            </div>

            {/* Headline: رُخ‌نما leads with a comma, heaviest weight; rest one level lighter */}
            <h1 className="hero-fade-in text-3xl sm:text-4xl lg:text-6xl leading-[1.2] text-white tracking-tight">
              <span className="font-black">رُخ‌نما،</span>
              <br />
              <span className="font-extrabold">
                تجربهٔ دیجیتال <span className="text-[var(--color-secondary-400)]">برای فروش</span>
              </span>
            </h1>

            {/* Body: 14px, shortened copy */}
            <p className="hero-fade-in text-sm text-[var(--color-primary-100)] leading-loose font-medium max-w-lg">
              کاتالوگ شما را به تجربهٔ دیجیتال فروش تبدیل می‌کنیم: قیمت به‌روز، دسترسی نقش‌محور، باز شدن بدون اینترنت و داده‌ای از مسیر هر خریدار.
            </p>

            {/* CTA Buttons */}
            <div className="hero-fade-in flex flex-col sm:flex-row gap-5 pt-3">
              <Button color="secondary" variant="solid" size="lg" className="text-[var(--text-neutral-strong)]">
                درخواست دمو
                <IconArrowLeft size={20} stroke={2.5} />
              </Button>
              <Button color="white" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-[var(--color-primary-600)]">
                مقایسه با کاتالوگ فیزیکی
              </Button>
            </div>

            {/* Client logos: Vector SVG, monochrome with infinite marquee motion */}
            <div className="hero-fade-in pt-8 border-t border-[var(--color-primary-500)] mt-6">
              <p className="text-[11px] font-bold text-[var(--color-primary-200)] mb-4">مورد اعتماد رهبران صنعت و دانشگاه‌ها:</p>

              <div className="overflow-hidden w-full relative py-1 mask-[linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
                <div className="animate-marquee-scroll flex items-center gap-8">

                  {/* Track items (Set 1) */}
                  <div className="flex items-center gap-8 shrink-0 text-white/60">

                    {/* همراه اول (مرکز تحقیق و نوآوری) */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                        <circle cx="9" cy="12" r="6" fillOpacity="0.4" />
                        <circle cx="15" cy="12" r="6" fillOpacity="0.8" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">همراه اول (تحقیق و نوآوری)</span>
                    </div>

                    {/* دانشگاه صنعتی خواجه‌نصیر */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" aria-hidden="true">
                        <polygon points="12 2 15 8 21 9 17 14 18 20 12 17 6 20 7 14 3 9 9 8 12 2" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">دانشگاه صنعتی خواجه‌نصیر</span>
                    </div>

                    {/* دلبند سلامت */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" aria-hidden="true">
                        <path d="M3 12h4l3 8 4-16 3 8h4" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">دلبند سلامت</span>
                    </div>

                    {/* بنکداری پانچو */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">بنکداری پانچو</span>
                    </div>

                  </div>

                  {/* Track items (Set 2 - Duplicate for seamless loop) */}
                  <div className="flex items-center gap-8 shrink-0 text-white/60">

                    {/* همراه اول (مرکز تحقیق و نوآوری) */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                        <circle cx="9" cy="12" r="6" fillOpacity="0.4" />
                        <circle cx="15" cy="12" r="6" fillOpacity="0.8" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">همراه اول (تحقیق و نوآوری)</span>
                    </div>

                    {/* دانشگاه صنعتی خواجه‌نصیر */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" aria-hidden="true">
                        <polygon points="12 2 15 8 21 9 17 14 18 20 12 17 6 20 7 14 3 9 9 8 12 2" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">دانشگاه صنعتی خواجه‌نصیر</span>
                    </div>

                    {/* دلبند سلامت */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" aria-hidden="true">
                        <path d="M3 12h4l3 8 4-16 3 8h4" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">دلبند سلامت</span>
                    </div>

                    {/* بنکداری پانچو */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-none hover:text-white hover:border-white/40 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      <span className="text-xs font-bold tracking-tight">بنکداری پانچو</span>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Left Column (RTL second): 3D scene — lg:col-span-7, starts at column 6 */}
          <div
            className="lg:col-span-7 lg:col-start-6 scene-3d relative h-[520px] sm:h-[600px] lg:h-[680px] w-full flex items-center justify-center order-1 lg:order-2"
            style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
          >

            {/* 9 Catalogs (Papers) - With Zero-Blur Dark Primary Shadow, Laid down one by one on load */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
            >
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="paper-element absolute w-[96px] h-[132px] bg-white border border-[var(--color-primary-400)]/30 flex flex-col p-2.5 overflow-hidden rounded-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    boxShadow: '6px 6px 0px var(--color-primary-950, #040629)',
                  }}
                >
                  <div className="absolute top-0 right-0 w-[4px] h-full bg-[var(--color-primary-600)]" />
                  <div className="w-full h-1/2 bg-gray-100 mb-2 border border-gray-200" />
                  <div className="w-3/4 h-1.5 bg-gray-300 mb-1" />
                  <div className="w-1/2 h-1.5 bg-gray-200" />
                </div>
              ))}
            </div>

            {/* 112px Logo Container (88 + 24 = 112) - Sharp 0-blur primary shadow */}
            <div
              className="logo-mark absolute z-20 w-[112px] h-[112px] bg-white border border-white/30 flex items-center justify-center rounded-none"
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                boxShadow: '6px 6px 0px var(--color-primary-950, #040629)',
              }}
            >
              {/* Official Logo merged into hero background (primary-600 body + primary-800 arrow) */}
              <Logo iconOnly={true} variant="hero" className="w-[52px] h-[52px] relative z-10" />

              {/* Horizontal Scanline: 4px flat, 6px wider on each side (124px), NO glow */}
              <div
                className="scan-line absolute -left-[6px] w-[124px] h-[4px] bg-[var(--color-secondary-400)] z-30 pointer-events-none shadow-none opacity-0"
              />
            </div>

            {/* Realistic iPhone Device - Dark Primary Finish, z: 80 (Emerges directly OVER the logo) */}
            <div
              className="realistic-device absolute z-40 w-[300px] sm:w-[320px] h-[600px] sm:h-[640px] bg-[var(--color-primary-950,#040629)] rounded-[3.5rem] p-[3px] shadow-[0_45px_100px_-20px_rgba(0,0,0,0.8),inset_0_0_2px_rgba(118,137,196,0.35)] border border-[var(--color-primary-800,#11195e)]"
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                willChange: 'transform, opacity'
              }}
            >

              {/* Hardware buttons & antennas in dark primary metallic shades */}
              <div className="absolute top-[85px] -left-[3px] w-[5px] h-[6px] bg-[var(--color-primary-700)] rounded-l-md" />
              <div className="absolute top-[85px] -right-[3px] w-[5px] h-[6px] bg-[var(--color-primary-700)] rounded-r-md" />
              <div className="absolute top-[130px] -left-[2px] w-[2px] h-[32px] bg-[var(--color-primary-700)]" />
              <div className="absolute top-[180px] -left-[2px] w-[2px] h-[62px] bg-[var(--color-primary-700)]" />
              <div className="absolute top-[260px] -left-[2px] w-[2px] h-[62px] bg-[var(--color-primary-700)]" />
              <div className="absolute top-[200px] -right-[2px] w-[2px] h-[95px] bg-[var(--color-primary-700)]" />

              {/* Dark inner bezel */}
              <div className="w-full h-full bg-[#05081c] rounded-[3.35rem] p-[9px] relative overflow-hidden border border-[var(--color-primary-900)]">

                {/* Dynamic island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-full z-50 flex items-center justify-end px-3 border border-white/5">
                   <div className="w-3 h-3 rounded-full bg-[#0a0f2c] border border-white/10 relative overflow-hidden">
                      <div className="absolute top-[1px] right-[1px] w-1 h-1 bg-[#455aa9]/70 rounded-full" />
                   </div>
                </div>

                {/* Screen UI: Rokhnama Interactive Catalog */}
                <div className="w-full h-full bg-[var(--bg-neutral-base)] rounded-[2.8rem] overflow-hidden relative flex flex-col border border-[var(--border-neutral-subtle)]">

                  <div className="h-12 w-full bg-[var(--bg-neutral-base)]" />

                  <div className="flex-1 px-5 py-3 flex flex-col gap-5 overflow-y-auto">

                    {/* Header with official logo mark */}
                    <div className="flex justify-between items-center border-b border-[var(--border-neutral-subtle)] pb-2.5">
                      <span className="font-black text-sm text-[var(--text-neutral-strong)]">تجهیزات صنعتی</span>
                      <Logo iconOnly={true} variant="colored" className="w-6 h-6" />
                    </div>

                    {/* Product Card with Pulsing Hotspot */}
                    <div className="w-full aspect-[4/3] bg-white border border-[var(--border-neutral-subtle)] flex items-center justify-center relative shadow-sm rounded-none">
                       <div className="w-20 h-20 border-2 border-[var(--color-primary-600)] flex items-center justify-center opacity-25">
                         <span className="text-[var(--color-primary-600)] text-xs font-bold">۳۶۰°</span>
                       </div>

                       {/* Interactive Hotspot */}
                       <div className="screen-hotspot absolute top-4 right-4 w-4 h-4 flex items-center justify-center">
                         <div className="absolute inset-0 bg-[var(--color-primary-500)] rounded-full animate-ping opacity-40" />
                         <div className="w-2.5 h-2.5 bg-[var(--color-primary-600)] rounded-full border border-white" />
                       </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-[var(--text-neutral-subtle)] font-bold">کد: PX-3000</span>
                      <h2 className="text-lg font-black text-[var(--text-neutral-strong)] leading-snug">پمپ هیدرولیک فشار قوی</h2>
                      <div className="text-xl font-black text-[var(--color-primary-600)] mt-1">
                        ۲۴,۰۰۰,۰۰۰ <span className="text-xs font-normal">تومان</span>
                      </div>
                    </div>

                    {/* Technical Specs Table */}
                    <div className="border border-[var(--border-neutral-subtle)] divide-y divide-[var(--border-neutral-subtle)] bg-white text-xs">
                       <div className="flex justify-between p-2.5">
                         <span className="text-[var(--text-neutral-subtle)] font-medium">فشار کاری</span>
                         <span className="font-bold text-[var(--text-neutral-strong)]">۴۰۰ بار</span>
                       </div>
                       <div className="flex justify-between p-2.5">
                         <span className="text-[var(--text-neutral-subtle)] font-medium">دبی خروجی</span>
                         <span className="font-bold text-[var(--text-neutral-strong)]">۱۲۰ لیتر/دقیقه</span>
                       </div>
                    </div>

                  </div>

                  {/* Sticky CTA Button */}
                  <div className="absolute bottom-0 left-0 w-full bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] p-4 pb-6 z-40">
                    <button className="w-full h-11 bg-[var(--color-primary-600)] text-white text-xs font-bold flex items-center justify-center gap-2 rounded-none">
                      افزودن به برگ سفارش
                      <IconArrowLeft size={16} stroke={2.5} />
                    </button>
                    <div className="w-28 h-1 bg-[var(--border-neutral-base)] rounded-full mx-auto mt-2" />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
