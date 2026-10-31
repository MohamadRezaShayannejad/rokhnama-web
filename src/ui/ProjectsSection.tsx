'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { IconArrowUpLeft } from '@tabler/icons-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PROJECTS, type ProjectCase } from './projects/projectsData';
import ProjectsSectionHeading from './projects/ProjectsSectionHeading';

/**
 * سکشن نمونه‌کارها (#projects)
 * سه کارت همسایز با بوردر نازک؛ عنوان و توضیح در بالا و موکاپ گوشی ۸۰٪ عرض وسطچین در پایین کارت.
 */
/**
 * رنگ گلو هاور هر پروژه — کلید همان شناسه است
 */
const GLOW_COLORS: Record<string, string> = {
  delband: '181, 197, 255', // B5C5FF
  kntu: '126, 156, 188', // 7E9CBC
  pancho: '255, 190, 179', // FFBEB3
};

/**
 * طراحی بوردر متحرک در هاور — ضخامت ۱px، رنگ primary-400 (همان رنگ هاور فعلی کارت)
 * هر ضلع با scale از ۰ به ۱ می‌رود؛ جهت رشد خطوط عمودی از میانه (بالا و پایین هم‌زمان)
 * و خطوط افقی از سمت شروعِ هر کارت.
 */
type FrameDelay = { right: number; left: number; top: number; bottom: number };

const FRAME_CONFIG: Record<string, { delay: FrameDelay; hOrigin: 'right' | 'center' | 'left' }> = {
  // دلبند (راست‌ترین کارت): خط راست از بالا و پایین، بعد افقی‌ها از راست، آخر چپ
  delband: { delay: { right: 0, top: 180, bottom: 180, left: 360 }, hOrigin: 'right' },
  // کارت وسط: هر دو خط عمودی هم‌زمان از میانه، بعد افقی‌ها از میانه
  kntu: { delay: { right: 0, left: 0, top: 220, bottom: 220 }, hOrigin: 'center' },
  // پانچو (چپ‌ترین کارت): آینهٔ دلبند — خط چپ اول، بعد افقی‌ها از چپ، آخر راست
  pancho: { delay: { left: 0, top: 180, bottom: 180, right: 360 }, hOrigin: 'left' },
};

function CardBorderFrame({ frame }: { frame: { delay: FrameDelay; hOrigin: 'right' | 'center' | 'left' } }) {
  const line =
    'pointer-events-none absolute bg-[var(--color-primary-400)] transition-transform duration-500 ease-out motion-reduce:transition-none';
  const vertical = 'top-0 bottom-0 w-px scale-y-0 group-hover/card:scale-y-100';
  const horizontal = 'left-0 right-0 h-px scale-x-0 group-hover/card:scale-x-100';
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className={`${line} ${vertical} right-0`} style={{ transformOrigin: 'center', transitionDelay: `${frame.delay.right}ms` }} />
      <div className={`${line} ${vertical} left-0`} style={{ transformOrigin: 'center', transitionDelay: `${frame.delay.left}ms` }} />
      <div className={`${line} ${horizontal} top-0`} style={{ transformOrigin: frame.hOrigin, transitionDelay: `${frame.delay.top}ms` }} />
      <div className={`${line} ${horizontal} bottom-0`} style={{ transformOrigin: frame.hOrigin, transitionDelay: `${frame.delay.bottom}ms` }} />
    </div>
  );
}

function ImageCard({ project }: { project: ProjectCase }) {
  // هاور ویژهٔ دلبند: خیزش ۸px موکاپ و بک‌گراند مرکزی B5C5FF
  const isDelband = project.id === 'delband';
  const glowRgb = GLOW_COLORS[project.id] ?? GLOW_COLORS.delband;
  const frame = FRAME_CONFIG[project.id] ?? FRAME_CONFIG.pancho;

  const card = (
    <>
      {/* نمای دسکتاپ — ۱۰۰٪ نسخهٔ اولیهٔ دست‌نخورده */}
      <div className="hidden sm:flex h-full flex-col bg-white">
        {/* کانتینر موکاپ: موکاپ از پایین ۲۰px بیرون‌زده؛ نقاط سکشن ۲ به‌صورت لایهٔ مجزا ۲۴px از لبه‌ها */}
        <div className="relative flex w-full flex-1 items-end justify-center overflow-hidden px-[60px] sm:px-16 pt-12">
          {/* نقاط سکشن ۲، ۲۴px فاصله از هر لبه */}
          <div
            className="pointer-events-none absolute inset-6"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='11' y='11' width='2.5' height='2.5' fill='%231f2b8f' fill-opacity='0.2'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
          {/* گلو هاور: رادیال از میان ضلع پایین، رنگ اختصاصی هر پروژه */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100"
            style={{
              background: `radial-gradient(ellipse 50% 100% at 50% 100%, rgba(${glowRgb}, 0.7) 0%, rgba(${glowRgb}, 0) 100%)`,
            }}
            aria-hidden="true"
          />
          <div
            className={`relative z-10 w-full translate-y-5 transition-transform duration-300 ease-out ${
              isDelband ? 'group-hover/card:translate-y-3' : ''
            }`}
          >
            <Image
              src={project.image}
              alt={`نمونهکار ${project.name}`}
              width={421}
              height={571}
              className="block h-auto w-full"
              draggable={false}
            />
          </div>
        </div>

        {/* بخش متن: پدینگی که روی کل کارت بود به این کانتینر منتقل شده */}
        <div className="px-[60px] sm:px-16 pt-10 pb-10 sm:pb-12">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black tracking-[-0.02em] text-[var(--color-neutral-900)] lg:text-2xl">
                {project.name}
              </h3>
              <p className="mt-2 text-sm font-normal text-[var(--color-neutral-500)]">{project.summary}</p>
            </div>
            <IconArrowUpLeft
              size={32}
              stroke={1.5}
              className="size-8 shrink-0 text-[var(--color-neutral-400)] transition-all duration-300 group-hover/card:size-9 group-hover/card:text-[var(--color-secondary-600)]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* نمای موبایل — اختصاصی موبایل؛ پدینگ بالا ۲۴px، راست ۲۸px، چپ ۲۴px، پایین ۰ */}
      <div className="relative flex sm:hidden flex-row bg-white overflow-hidden items-stretch pt-6 pr-[28px] pl-6">
        {/* گرادینت بیضی کج: در حالت عادی بی‌رنگ (opacity-0)، هنگام رسیدن اسکرول نمایان می‌شود */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
          <div
            className="absolute pointer-events-none opacity-0 transition-opacity duration-500 ease-out group-data-[active=true]/card:opacity-100"
            style={{
              left: 0,
              bottom: 0,
              width: '200%',
              height: '200%',
              transform: 'translate(-50%, 50%) rotate(-47deg)',
              background: `radial-gradient(ellipse 35% 32% at 50% 50%, rgba(${glowRgb}, 0.62) 0%, rgba(${glowRgb}, 0.28) 50%, rgba(${glowRgb}, 0) 95%)`,
            }}
          />
        </div>

        {/* بخش متن: سمت راست (پر کردن کل ارتفاع، متن بالا چسبیده، فلش با فاصلهٔ ۲۴px از پایین) */}
        <div className="relative z-10 flex flex-1 flex-col justify-between pt-0 pb-6 px-0 min-w-0">
          <div>
            <h3 className="text-base font-black tracking-[-0.02em] text-[var(--color-neutral-900)]">
              {project.name}
            </h3>
            <p className="mt-1.5 text-xs font-normal text-[var(--color-neutral-500)] leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>
          <div className="flex mt-auto">
            <IconArrowUpLeft
              size={24}
              stroke={1.5}
              style={{ '--arrow-glow-color': `rgb(${glowRgb})` } as React.CSSProperties}
              className="size-6 text-[var(--color-neutral-400)] origin-bottom-right transition-all duration-300 ease-out group-data-[active=true]/card:text-[var(--arrow-glow-color)] group-data-[active=true]/card:scale-[1.333]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* بخش موکاپ: ستون نسبی؛ هنگام رسیدن اسکرول ۸px بالا می‌آید */}
        <div className="relative z-10 flex w-2/5 shrink-0 items-end justify-center p-0">
          <Image
            src={project.image}
            alt={`نمونهکار ${project.name}`}
            width={421}
            height={571}
            className="block w-full h-auto object-contain object-bottom align-bottom translate-y-2 transition-transform duration-300 ease-out group-data-[active=true]/card:translate-y-0"
            draggable={false}
          />
        </div>
      </div>
    </>
  );

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-tile
        className="group/card relative flex h-full flex-col border-e border-[var(--color-neutral-200)] transition-colors duration-300 hover:border-[var(--color-primary-400)] max-sm:border-e-0 max-sm:border-b max-sm:first:border-t max-sm:border-[var(--color-neutral-200)] max-sm:data-[active=true]:border-b-[var(--color-primary-600)] max-lg:last:border-e-0 max-lg:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(3n)]:border-e-0"
      >
        {card}
        <CardBorderFrame frame={frame} />
      </a>
    );
  }

  return (
    <article
      data-tile
      className="group/card relative flex h-full flex-col border-e border-[var(--color-neutral-200)] transition-colors duration-300 hover:border-[var(--color-primary-400)] max-sm:border-e-0 max-sm:border-b max-sm:first:border-t max-sm:border-[var(--color-neutral-200)] max-sm:data-[active=true]:border-b-[var(--color-primary-600)] max-lg:last:border-e-0 max-lg:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(3n)]:border-e-0"
    >
      {card}
      <CardBorderFrame frame={frame} />
    </article>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const fillTargets = [frameFillRightRef.current, frameFillLeftRef.current].filter(
        Boolean
      ) as HTMLDivElement[];

      if (fillTargets.length) {
        if (isReduced) {
          gsap.set(fillTargets, { scaleY: 1 });
        } else {
          gsap.fromTo(
            fillTargets,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                end: 'bottom center',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      if (isReduced) return;

      // ریویل چشم‌نواز عنوان به سبک Framer Motion
      gsap.fromTo(
        '[data-projects-heading]',
        { opacity: 0, scale: 0.97, y: 32 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-projects-heading]', start: 'top 85%', once: true },
          clearProps: 'all',
        }
      );

      // ریویل ملموس کارت‌ها هنگام ورود به ویوپورت
      if (containerRef.current) {
        const tiles = Array.from(containerRef.current.querySelectorAll<HTMLElement>('[data-tile]'));
        tiles.forEach((tile) => {
          gsap.fromTo(
            tile,
            { opacity: 0, scale: 0.96, y: 36 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: { trigger: tile, start: 'top 88%', once: true },
              clearProps: 'all',
            }
          );
        });
      }
    },
    { scope: containerRef }
  );

  // فعال‌سازی و بازگشت به حالت عادی کارت‌ها در اسکرول موبایل — دقیقاً مشابه سکشن سناریوها
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const cardEls = Array.from(root.querySelectorAll<HTMLElement>('[data-tile]'));
    if (!cardEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          card.setAttribute('data-active', entry.isIntersecting ? 'true' : 'false');
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    cardEls.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative z-10 w-full overflow-hidden border-t max-sm:border-t-0 border-[var(--color-neutral-200)] bg-white pt-14 pb-0 tracking-[-0.02em] text-[var(--color-neutral-900)] sm:py-28"
      dir="rtl"
    >
      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲px — هماهنگ با سایر سکشنها */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] origin-top bg-[var(--color-primary-600)]"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] origin-top bg-[var(--color-primary-600)]"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      <div className="content-col relative z-10 max-sm:!w-[calc(100%-16px)] max-sm:!px-0">
        <ProjectsSectionHeading />

        <div data-tiles="true" className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ImageCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
