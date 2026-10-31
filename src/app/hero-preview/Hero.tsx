'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/ui/Button';
import { Logo } from '@/ui/Logo';
import { IconArrowLeft } from '@tabler/icons-react';
import DotsPattern from '@/ui/DotsPattern';

gsap.registerPlugin(ScrollTrigger);

const REDUCE_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReduceMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_MOTION_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

const getReduceMotion = () => window.matchMedia(REDUCE_MOTION_QUERY).matches;

/**
 * هیروی «تبلور در محل» — نسخهٔ اسکرول‌محور:
 * سکشن هنگام رسیدن به بالای صفحه پین می‌شود و با اسکرول، محتوای هر برگه از کاغذ جدا شده،
 * به داخل دستگاه می‌نشیند و کاتالوگ را قدم‌به‌قدم کامل می‌کند؛ در پایانِ رنج، حالتِ
 * «کاتالوگ آماده» نمایش داده می‌شود و سپس سکشن باز می‌شود. کل روایت با اسکرول scrub
 * می‌شود، قابل بازگشت است و به reduce-motion احترام می‌گذارد.
 */

const CATALOG_ITEMS = [
  {
    short: 'پمپ',
    title: 'پمپ هیدرولیک فشار قوی',
    code: 'PX-3000',
    priceValue: 24000000,
    spec: [
      ['فشار کاری', '۴۰۰ بار'],
      ['دبی خروجی', '۱۲۰ لیتر/دقیقه'],
    ] as [string, string][],
  },
  {
    short: 'شیر',
    title: 'شیر برقی صنعتی',
    code: 'SV-210',
    priceValue: 8500000,
    spec: [
      ['قطر اتصال', '۲ اینچ'],
      ['ولتاژ', '۲۲۰ ولت'],
    ] as [string, string][],
  },
  {
    short: 'موتور',
    title: 'موتور گیربکس‌دار',
    code: 'GM-120',
    priceValue: 31200000,
    spec: [
      ['توان', '۲ کیلووات'],
      ['نسبت دور', '۱:۲۰'],
    ] as [string, string][],
  },
  {
    short: 'گیج',
    title: 'گیج فشار دقیق',
    code: 'PG-045',
    priceValue: 1980000,
    spec: [
      ['محدوده', '۰ تا ۶۰۰ بار'],
      ['دقت', '±۱ درصد'],
    ] as [string, string][],
  },
];

const faNum = (n: number) => n.toLocaleString('fa-IR');
const totalValue = CATALOG_ITEMS.reduce((s, it) => s + it.priceValue, 0);

/** خط‌تراشی ۲بعدی کالای صنعتی روی برگه: پمپ، شیر، موتور، گیج */
function PaperFigure({ kind }: { kind: number }) {
  const stroke = { stroke: 'currentColor' };
  const cls = 'text-[var(--color-primary-600)] w-8 h-8 shrink-0';
  if (kind === 0) {
    return (
      <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="22" width="22" height="13" strokeWidth="1.6" style={stroke} />
        <rect x="28" y="26" width="7" height="6" strokeWidth="1.6" style={stroke} />
        <line x1="28" y1="22" x2="28" y2="13" strokeWidth="1.6" style={stroke} />
        <circle cx="13" cy="19" r="3" strokeWidth="1.4" strokeDasharray="2 1.5" style={stroke} />
        <line x1="8" y1="35" x2="26" y2="35" strokeWidth="1.6" style={stroke} />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="8" width="28" height="10" strokeWidth="1.6" style={stroke} />
        <line x1="20" y1="18" x2="20" y2="32" strokeWidth="1.6" style={stroke} />
        <rect x="10" y="28" width="20" height="6" strokeWidth="1.6" style={stroke} />
        <circle cx="20" cy="24" r="2" strokeWidth="1.4" style={stroke} />
      </svg>
    );
  }
  if (kind === 2) {
    return (
      <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="10" width="20" height="16" strokeWidth="1.6" style={stroke} />
        <circle cx="20" cy="18" r="5" strokeWidth="1.4" style={stroke} />
        <line x1="20" y1="26" x2="20" y2="34" strokeWidth="1.6" style={stroke} />
        <rect x="16" y="30" width="8" height="4" strokeWidth="1.6" style={stroke} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="18" r="10" strokeWidth="1.6" style={stroke} />
      <line x1="20" y1="18" x2="20" y2="9" strokeWidth="1.6" style={stroke} />
      <line x1="20" y1="18" x2="27" y2="14" strokeWidth="1.6" style={stroke} />
      <line x1="20" y1="28" x2="20" y2="34" strokeWidth="1.6" style={stroke} />
      <circle cx="20" cy="18" r="1.6" fill="currentColor" />
    </svg>
  );
}

const PAPER_POSITIONS: { top: string; side: 'left' | 'right'; rotate: number }[] = [
  { top: '4%', side: 'left', rotate: -6 },
  { top: '16%', side: 'right', rotate: 5 },
  { top: '54%', side: 'left', rotate: 4 },
  { top: '66%', side: 'right', rotate: -5 },
];

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(0);
  const reduceMotion = useSyncExternalStore(subscribeReduceMotion, getReduceMotion, () => false);

  useEffect(() => {
    const section = container.current;
    const scene = sceneRef.current;
    if (!section || !scene) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(scene.querySelectorAll('.paper-element'), { opacity: 0 });
      return;
    }

    // ورود یک‌بارهٔ متن و برگه‌ها (بدون scrub)
    const fadeEls = Array.from(section.querySelectorAll('.hero-fade-in'));
    gsap.fromTo(fadeEls, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, delay: 0.1, ease: 'power2.out' });
    const paperEls = Array.from(scene.querySelectorAll('.paper-element'));
    gsap.fromTo(paperEls, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.15, ease: 'power2.out' });

    const deviceEl = scene.querySelector('.digital-device') as HTMLElement;
    const papers = Array.from(scene.querySelectorAll('.paper-element')) as HTMLElement[];

    const computeOffsets = () => {
      const sr = scene.getBoundingClientRect();
      const dr = deviceEl.getBoundingClientRect();
      const ex = dr.left + dr.width / 2 - sr.left;
      const ey = dr.top + dr.height * 0.4 - sr.top;
      return papers.map((p) => {
        const pr = p.getBoundingClientRect();
        const sx = pr.left + pr.width / 2 - sr.left;
        const sy = pr.top + pr.height / 2 - sr.top;
        return { x: ex - sx, y: ey - sy };
      });
    };

    const tl = gsap.timeline();
    const flyTweens: gsap.core.Tween[] = [];

    const FIRST = 0.5;
    const STEP = 2.6;
    const DURATION = 11.6;

    papers.forEach((paper, i) => {
      const content = paper.querySelector('.paper-content') as HTMLElement;
      const at = FIRST + i * STEP;
      const fly = tl.to(
        content,
        { x: 0, y: 0, scale: 0.08, opacity: 0, rotation: 10, duration: 1.35, ease: 'power2.in' },
        at
      ) as unknown as gsap.core.Tween;
      flyTweens.push(fly);
      tl.to(paper, { opacity: 0, scale: 0.9, duration: 0.9, ease: 'power1.in' }, at + 0.45);
      tl.call(() => setAdded(i + 1), [], at + 1.25);
    });
    tl.duration(DURATION);

    const applyOffsets = () => {
      const offsets = computeOffsets();
      flyTweens.forEach((tw, i) => {
        tw.vars.x = offsets[i].x;
        tw.vars.y = offsets[i].y;
        tw.invalidate();
      });
    };
    applyOffsets();

    // همگام‌سازی وضعیت صفحه با پیشرفت اسکرول (در شروع و تغییر سایز)
    const syncFromProgress = (p: number) => {
      const n = p >= 0.82 ? 4 : p >= 0.6 ? 3 : p >= 0.37 ? 2 : p >= 0.15 ? 1 : 0;
      setAdded((prev) => (prev !== n ? n : prev));
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => '+=' + Math.round(scene.offsetHeight * 3.2 + 700),
      pin: true,
      scrub: 1.1,
      anticipatePin: 1,
      animation: tl,
      onRefresh: () => {
        applyOffsets();
        syncFromProgress(st.progress);
      },
    });
    syncFromProgress(st.progress);

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  const shownAdded = reduceMotion ? CATALOG_ITEMS.length : added;
  const isComplete = shownAdded >= CATALOG_ITEMS.length;
  const current = shownAdded > 0 && !isComplete ? CATALOG_ITEMS[shownAdded - 1] : null;

  return (
    <section ref={container} className="relative bg-[var(--color-primary-600)] overflow-hidden">
      <div className="relative min-h-screen w-full flex items-center overflow-hidden">
        {/* خطوط عمودی ممتد طرفین هیرو */}
        <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
          <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
            <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-500)]" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-500)]" />
          </div>
        </div>

        {/* پترن مستطیل‌های تیز */}
        <DotsPattern />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 items-center z-10 pt-24 lg:pt-28 pb-16 lg:pb-20">
          {/* ستون متن — راست در RTL */}
          <div className="lg:col-span-5 lg:col-start-1 flex flex-col space-y-9 lg:space-y-11 order-2 lg:order-1 pr-2 lg:pr-6 xl:pr-10">
            <h1 className="hero-fade-in text-2xl sm:text-3xl lg:text-5xl leading-[1.3] text-white tracking-tight">
              <span className="font-black">رُخ‌نما، </span>
              <span className="font-bold">
                کاتالوگ‌تان همین الان <span className="text-[var(--color-secondary-400)]">دیجیتال می‌شود</span>
              </span>
            </h1>

            <p className="hero-fade-in text-base text-[var(--color-primary-100)] leading-loose font-medium w-full">
              قیمت به‌روز، دسترسی نقش‌محور، باز شدن بدون اینترنت و داده‌ای از مسیر هر خریدار — بدون هزینه‌های چاپ و انبار.
            </p>

            <div className="hero-fade-in w-full pt-3">
              <Button
                color="secondary"
                variant="solid"
                size="lg"
                fullWidth
                iconAfter={<IconArrowLeft size={20} stroke={2.5} />}
                className="text-[var(--text-neutral-strong)]"
              >
                همین الان شروع کنید
              </Button>
            </div>

            <div className="hero-fade-in mt-8 sm:mt-10">
              <p className="text-xs font-bold text-[var(--color-primary-200)] mb-[24px]">
                مورد اعتماد رهبران صنعت و دانشگاه‌ها
              </p>

              <div className="w-full h-px bg-[var(--color-primary-500)] mb-6 sm:mb-8" aria-hidden="true" />

              <div className="flex items-center gap-10 sm:gap-12 flex-wrap">
                <div className="h-[44px] sm:h-[48px] flex items-center justify-center">
                  <img
                    src="/MCI-logo.svg"
                    alt="همراه اول (تحقیق و نوآوری)"
                    className="h-full w-auto object-contain select-none"
                    loading="eager"
                  />
                </div>
                <div className="h-[44px] sm:h-[48px] flex items-center justify-center">
                  <img
                    src="/KNDIN-logo.svg"
                    alt="دانشگاه صنعتی خواجه‌نصیرالدین طوسی"
                    className="h-full w-auto object-contain select-none"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* صحنهٔ تبلور */}
          <div
            ref={sceneRef}
            className="lg:col-span-7 lg:col-start-6 relative h-[600px] sm:h-[620px] lg:h-[680px] w-full order-1 lg:order-2"
            style={{ perspective: '1200px' }}
          >
            {/* برگه‌های کاغذ در اطراف دستگاه */}
            {CATALOG_ITEMS.map((it, i) => {
              const pos = PAPER_POSITIONS[i];
              return (
                <div
                  key={it.code}
                  className="paper-element absolute z-10 pointer-events-none will-change-transform"
                  style={{
                    [pos.side]: '12%',
                    top: pos.top,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="relative w-[96px] h-[132px] bg-white border border-[var(--color-primary-400)]/30 flex flex-col items-center justify-center overflow-hidden rounded-none"
                    style={{ transform: `rotate(${pos.rotate}deg)`, boxShadow: '6px 6px 0 var(--color-primary-950)' }}
                  >
                    <div className="absolute top-0 right-0 w-[4px] h-full bg-[var(--color-primary-600)]" />
                    <div className="paper-content absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-3 will-change-transform">
                      <PaperFigure kind={i} />
                      <div className="w-full" style={{ direction: 'rtl' }}>
                        <div className="w-3/4 h-1.5 bg-gray-300 mb-1" />
                        <div className="w-1/2 h-1.5 bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* دستگاه دیجیتال */}
            <div
              className="digital-device absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[320px] h-[560px] sm:h-[600px] bg-white p-[3px] border border-[var(--color-primary-800)] will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full bg-[var(--color-primary-950)] relative overflow-hidden flex flex-col border border-[var(--color-primary-800)] p-[7px]">
                <div className="absolute top-[85px] -left-[3px] w-[5px] h-[6px] bg-[var(--color-primary-800)]" />
                <div className="absolute top-[85px] -right-[3px] w-[5px] h-[6px] bg-[var(--color-primary-800)]" />
                <div className="absolute top-[130px] -left-[2px] w-[2px] h-[32px] bg-[var(--color-primary-800)]" />
                <div className="absolute top-[180px] -left-[2px] w-[2px] h-[62px] bg-[var(--color-primary-800)]" />
                <div className="absolute top-[200px] -right-[2px] w-[2px] h-[95px] bg-[var(--color-primary-800)]" />

                <div className="flex-1 px-5 py-3 flex flex-col gap-4 overflow-y-auto bg-[var(--bg-neutral-base)]">
                  <div className="flex justify-between items-center border-b border-[var(--border-neutral-subtle)] pb-2.5">
                    <span className="font-semibold text-sm text-[var(--text-neutral-strong)]">برگ سفارش زنده</span>
                    <Logo iconOnly={true} variant="colored" className="w-6 h-6" />
                  </div>

                  {/* نوار پیشرفت کاتالوگ */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-1.5">
                      {CATALOG_ITEMS.map((it, k) => (
                        <span
                          key={it.code}
                          className={`flex-1 rounded-none border px-1 py-1.5 text-center text-[9px] font-bold transition-colors duration-200 ${
                            k < shownAdded
                              ? 'bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-white'
                              : 'bg-white border-[var(--border-neutral-subtle)] text-[var(--text-neutral-subtle)]'
                          }`}
                        >
                          {it.short}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* کارت محتوا: خالی → محصول → کاتالوگ کامل */}
                  {isComplete ? (
                    <div className="border border-[var(--border-neutral-subtle)] divide-y divide-[var(--border-neutral-subtle)] bg-white text-xs">
                      <div className="flex items-center justify-between p-3 bg-[var(--color-primary-600)] text-white">
                        <span className="font-black">کاتالوگ شما آماده شد</span>
                        <span className="text-[10px] font-bold">آمادهٔ باز شدن</span>
                      </div>
                      {CATALOG_ITEMS.map((it, k) => (
                        <div className="flex justify-between p-2.5" key={it.code}>
                          <span className="flex items-center gap-2 font-bold text-[var(--text-neutral-strong)]">
                            <span className="w-3.5 h-3.5 bg-[var(--color-primary-600)] relative flex items-center justify-center">
                              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" aria-hidden="true">
                                <path d="M2 6.5 5 9.5 10 3" stroke="white" strokeWidth="1.8" strokeLinecap="square" />
                              </svg>
                            </span>
                            {it.short}
                          </span>
                          <span className="font-bold text-[var(--text-neutral-strong)]">{faNum(it.priceValue)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between p-3 bg-white font-black text-[var(--text-neutral-strong)]">
                        <span>جمع برگ سفارش</span>
                        <span>{faNum(totalValue)} تومان</span>
                      </div>
                    </div>
                  ) : current ? (
                    <div className="flex flex-col gap-3">
                      <div className="w-full aspect-[4/3] bg-white border border-[var(--border-neutral-subtle)] flex items-center justify-center relative rounded-none">
                        <div className="w-16 h-16 border-2 border-[var(--color-primary-600)] flex items-center justify-center opacity-25">
                          <span className="text-[var(--color-primary-600)] text-[10px] font-bold">۳۶۰°</span>
                        </div>
                        <div className="screen-hotspot absolute top-3 right-3 w-4 h-4 flex items-center justify-center">
                          <div className="absolute inset-0 bg-[var(--color-primary-500)] rounded-full animate-ping opacity-40" />
                          <div className="w-2.5 h-2.5 bg-[var(--color-primary-600)] rounded-full border border-white" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[var(--text-neutral-subtle)] font-bold">{current.code}</span>
                        <h2 className="text-base font-black text-[var(--text-neutral-strong)] leading-snug">{current.title}</h2>
                        <div className="text-lg font-black text-[var(--color-primary-600)] mt-1">
                          {faNum(current.priceValue)} <span className="text-xs font-normal">تومان</span>
                          <span
                            key={`tick-${shownAdded}`}
                            className="animate-price-tick inline-block text-[10px] font-bold text-[var(--color-secondary-700)] mr-2 align-middle"
                          >
                            به‌روزرسانی شد
                          </span>
                        </div>
                      </div>

                      <div className="border border-[var(--border-neutral-subtle)] divide-y divide-[var(--border-neutral-subtle)] bg-white text-[10px]">
                        {current.spec.map(([label, value]) => (
                          <div className="flex justify-between p-2.5" key={label}>
                            <span className="text-[var(--text-neutral-subtle)] font-medium">{label}</span>
                            <span className="font-bold text-[var(--text-neutral-strong)]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] bg-white border border-dashed border-[var(--border-neutral-base)] flex flex-col items-center justify-center gap-3 relative rounded-none">
                      <div className="screen-hotspot w-4 h-4 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[var(--color-primary-500)] rounded-full animate-ping opacity-40" />
                        <div className="w-2.5 h-2.5 bg-[var(--color-primary-600)] rounded-full border border-white" />
                      </div>
                      <div className="w-full px-5 flex flex-col gap-1.5">
                        <div className="w-3/4 h-2 bg-[var(--color-primary-200)] mb-0.5" />
                        <div className="w-1/2 h-2 bg-[var(--color-primary-100)]" />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--text-neutral-subtle)]">
                        با اسکرول، برگه‌ها به اینجا می‌نشینند
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-1 left-px right-px bg-[var(--bg-neutral-base)] border-t border-[var(--border-neutral-subtle)] p-3">
                  <button className="w-full h-11 bg-[var(--color-primary-600)] text-white text-xs font-bold flex items-center justify-center gap-2 rounded-none">
                    {isComplete ? 'مشاهده کاتالوگ تعاملی' : 'افزودن به برگ سفارش'}
                    <IconArrowLeft size={16} stroke={2.5} />
                  </button>
                  <div className="w-28 h-1 bg-[var(--border-neutral-base)] mx-auto mt-1" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
