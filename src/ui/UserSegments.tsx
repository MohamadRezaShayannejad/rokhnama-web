'use client';

import { useRef } from 'react';
import {
  IconArrowLeft,
  IconBolt,
  IconBuildingWarehouse,
  IconCar,
  IconEngine,
  IconPipeline,
  IconShirt,
  IconStethoscope,
  IconWashMachine,
} from '@tabler/icons-react';
import { INDUSTRIES, selectIndustry } from '@/ui/scenarios/scenariosData';
import { Button } from '@/ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** نشانهٔ هر صنعت در ابتدای ردیف؛ کلیدها همان شناسههای INDUSTRIES هستند */
const INDUSTRY_ICONS: Record<string, typeof IconCar> = {
  'auto-parts': IconCar,
  electrical: IconBolt,
  apparel: IconShirt,
  medical: IconStethoscope,
  building: IconBuildingWarehouse,
  'home-appliance': IconWashMachine,
  machinery: IconEngine,
  valves: IconPipeline,
};

/**
 * سکشن کاربردها و سناریوها (#scenarios)
 * اتود مصوب: دفتر تطبیق (Fit Ledger)
 * جدول مویی هشت ردیفی: هر صنعت و کاری که کاتالوگ برایش انجام می‌دهد؛ خود ردیف کلیک‌پذیر نیست و «درخواست دمو» تنها هدف کلیک است.
 */
export default function UserSegments() {
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

      // انیمیشن ورود چشم‌نواز و ملموس تک‌تک ردیف‌ها به سبک Framer Motion
      const rows = Array.from(container.querySelectorAll<HTMLElement>('[data-ledger-row]'));
      if (rows.length) {
        rows.forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 32, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                once: true,
              },
              clearProps: 'all',
            }
          );
        });
      }

      // خطوط پیشرونده و فعال‌سازی مرحله‌ای ردیف‌ها منطبق با نوک ریل عمودی طرفین (منحصراً در نمای موبایل)
      const mm = gsap.matchMedia();
      mm.add('(max-width: 639px)', () => {
        rows.forEach((row, i) => {
          // ۱. فعال‌سازی بدنه کارت و تغییرات ظاهری (به جز بوردر پایین) به محض ورود ریل از بالای کارت
          ScrollTrigger.create({
            trigger: row,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => row.setAttribute('data-active', 'true'),
            onLeave: () => row.setAttribute('data-active', 'false'),
            onEnterBack: () => row.setAttribute('data-active', 'true'),
            onLeaveBack: () => row.setAttribute('data-active', 'false'),
            onRefresh: (self) => {
              row.setAttribute('data-active', self.isActive ? 'true' : 'false');
            },
          });

          // ۲. انیمیشن پر شدن بوردر پایین هنگام رسیدن ریل به ۵۰٪ و ماندگاری آن تا ۳۰٪ کارت بعدی
          ScrollTrigger.create({
            trigger: row,
            start: 'center center',
            end: () => {
              const next = rows[i + 1];
              const h = next ? next.offsetHeight : row.offsetHeight;
              return `bottom+=${Math.round(h * 0.3)} center`;
            },
            onEnter: () => row.setAttribute('data-border-active', 'true'),
            onLeave: () => row.setAttribute('data-border-active', 'false'),
            onEnterBack: () => row.setAttribute('data-border-active', 'true'),
            onLeaveBack: () => row.setAttribute('data-border-active', 'false'),
            onRefresh: (self) => {
              row.setAttribute('data-border-active', self.isActive ? 'true' : 'false');
            },
          });
        });
      });

      // ریویل سرصفحه به سبک Framer Motion
      gsap.fromTo(
        '[data-scenarios-heading]',
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-scenarios-heading]', start: 'top 85%', once: true },
          clearProps: 'all',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="scenarios"
      className="relative z-10 w-full bg-white text-[var(--color-neutral-900)] pt-14 pb-0 sm:pt-[124px] sm:pb-[132px] tracking-[-0.02em] overflow-hidden border-t border-[var(--color-neutral-200)] scroll-mt-28"
      dir="rtl"
    >
      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲px با رنگ اختصاصی neutral-200 و خطوط پرشونده با primary-600 */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      <div className="content-col relative z-10 max-sm:!w-[calc(100%-16px)] max-sm:!px-0">
        {/* سرصفحه همساخت با ویترین محصول: عنوان دو سطری در راست و متن بدنه هم‌تراز با خط اول عنوان در چپ */}
        <div data-scenarios-heading className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-start mb-10 sm:mb-[72px] lg:mb-[88px] px-8 sm:px-0">
          <div className="lg:col-span-7">
            <h2 className="tracking-[-0.02em]">
              <span className="block text-2xl sm:text-3xl lg:text-[38px] font-black leading-[1.25] tracking-[-0.025em]">
                رُخ‌نما در صنعت شما
              </span>
              <span className="block text-xl sm:text-2xl lg:text-[28px] font-bold text-[var(--color-neutral-800)] mt-2 sm:mt-[14px] leading-[1.35]">
                یک کاتالوگ، هشت صنعت تولیدی
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 pt-1 sm:pt-3">
            <p className="text-sm sm:text-base lg:text-lg text-[var(--color-neutral-700)] font-medium leading-relaxed">
              تطبیق نیاز فنی صنایع و خطوط تولید با یک استاندارد واحد ارائهٔ دیجیتال.
            </p>
          </div>
        </div>

        {/* دفتر تطبیق: هشت ردیف همارز با جداکنندهٔ مویی */}
        {/* ردیف در سه مرحله بازچینش می‌شود: موبایل سه باند انباشته، تبلت نام و اقدام در یک خط با شرح زیر آن، دسکتاپ دوعنصری با ستون نام ثابت تا شرح‌ها روی یک خط عمودی تراز شوند */}
        <ul data-ledger-list className="border-t border-[var(--color-neutral-200)]">
          {INDUSTRIES.map((industry) => {
            const IndustryIcon = INDUSTRY_ICONS[industry.id];

            return (
              <li key={industry.id}>
                <div
                  data-ledger-row="true"
                  className="ledger-row group relative flex w-full flex-wrap items-center gap-x-5 gap-y-3 px-8 py-8 text-right sm:gap-y-4 lg:flex-nowrap lg:gap-x-11 lg:py-9 lg:px-8 transition-colors duration-300"
                >
                  {/* افکت گلو محیطی: در هاور دسکتاپ و در اسکرول فعال موبایل */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full opacity-0 group-hover:opacity-100 max-sm:group-data-[active=true]:opacity-100 transition-opacity duration-500 ease-out z-0"
                    style={{
                      background:
                        'radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--color-primary-100) 80%, transparent), transparent 70%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* خط بستر مویی neutral-200 */}
                  <span
                    data-ledger-rule="true"
                    className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-full origin-right bg-[var(--color-neutral-200)] z-10"
                    aria-hidden="true"
                  />

                  {/* خطوط پیشرونده primary-600: پر شدن از بغل‌ها به سمت وسط؛ منحصراً در موبایل با رد شدن ریل از ۵۰٪ ارتفاع کارت فعال می‌شوند */}
                  <span
                    data-line-right="true"
                    className="sm:hidden pointer-events-none absolute bottom-0 right-0 h-[1px] w-[calc(50%+1px)] origin-right scale-x-0 bg-[var(--color-primary-600)] z-20 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                    aria-hidden="true"
                  />
                  <span
                    data-line-left="true"
                    className="sm:hidden pointer-events-none absolute bottom-0 left-0 h-[1px] w-[calc(50%+1px)] origin-left scale-x-0 bg-[var(--color-primary-600)] z-20 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                    aria-hidden="true"
                  />

                  {/* نشان ۳۶×۳۶ صنعت بدون قاب؛ در هاور و اسکرول اکتیو سکندری می‌شود و بعد به خاکستری برمی‌گردد */}
                  <span
                    data-ledger-cell="true"
                    className="order-1 relative z-10 flex w-full items-center gap-3 sm:gap-4 sm:w-auto lg:w-[21.25rem] lg:shrink-0"
                  >
                    <span className="shrink-0 text-[var(--color-neutral-500)] group-hover:text-[var(--color-secondary-600)] max-sm:group-data-[active=true]:text-[var(--color-secondary-600)] transition-colors duration-300">
                      <IndustryIcon
                        size={36}
                        stroke={1.7}
                        className="w-7 h-7 sm:w-9 sm:h-9"
                        aria-hidden="true"
                      />
                    </span>

                    <span className="text-base sm:text-lg lg:text-xl font-bold text-[var(--color-neutral-900)] leading-[1.3] tracking-[-0.02em] transition-colors duration-300 group-hover:text-[var(--color-primary-800)] max-sm:group-data-[active=true]:text-[var(--color-primary-800)]">
                      {industry.name}
                    </span>
                  </span>

                  {/* سلول ۲: کاربرد و تطبیق کاتالوگ با صنعت */}
                  <span
                    data-ledger-cell="true"
                    className="order-2 relative z-10 basis-full max-w-[62ch] text-sm text-[var(--color-neutral-600)] transition-colors duration-300 font-normal leading-relaxed lg:basis-auto group-hover:text-[var(--color-neutral-900)] max-sm:group-data-[active=true]:text-[var(--color-neutral-900)]"
                  >
                    {industry.fit}
                  </span>

                  {/* سلول ۳: اقدام و اررو — منحصراً در دسکتاپ (دیفالت: فقط اررو، هاور: ظاهر شدن متن دکمه متنی) */}
                  <span
                    data-ledger-cell="true"
                    className="order-3 relative z-10 hidden lg:flex items-center justify-end ms-auto shrink-0"
                  >
                    <Button
                      asChild
                      color="primary"
                      variant="text"
                      size="sm"
                      className="[&>span>span:first-child]:opacity-0 group-hover:[&>span>span:first-child]:opacity-100 group-focus-visible:[&>span>span:first-child]:opacity-100 focus-visible:[&>span>span:first-child]:opacity-100 [&>span>span:first-child]:transition-opacity [&>span>span:first-child]:duration-300"
                      iconAfter={
                        <IconArrowLeft
                          size={18}
                          stroke={2.2}
                          className="shrink-0 text-[var(--color-neutral-400)] group-hover:text-[var(--color-primary-600)] group-focus-visible:text-[var(--color-primary-600)] transition-all duration-300 group-hover:-translate-x-1"
                          aria-hidden="true"
                        />
                      }
                    >
                      <a
                        href="#demo"
                        onClick={() => selectIndustry(industry.name, industry.id)}
                      >
                        درخواست دمو
                      </a>
                    </Button>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
