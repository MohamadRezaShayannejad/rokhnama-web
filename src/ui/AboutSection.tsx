'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toPersianDigits } from '@/lib/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ثابت‌های هندسی نمای برج در دسکتاپ — بازگشت ۱۰۰٪ به مقادیر اولیه و اصیل دسکتاپ */
const DESK_FLOORS = 7;
const DESK_BAND = 42;
const DESK_GROUND = 320;
const DESK_X0 = 55;
const DESK_W = 130;
const DESK_VIEW_X = 10;
const DESK_VIEW_W = 425;
const DESK_ADDR_X = 415;

/* ثابت‌های هندسی نمای برج منحصراً برای موبایل (<640px)
 * ۱. ساختمان ۴۰ درصد کانتینر ویوباکس را اشغال می‌کند (۱۴۴ از ۳۶۰ = ۴۰.۰٪)
 * ۲. لوگوی همراه‌اول ۸ پیکسل در ارتفاع بزرگتر شده (از ۳۴ به ۴۲)
 * ۳. نشانی استقرار در نزدیکی امن بدون همپوشانی و با خوانایی و کنتراست بالا
 */
const MOB_FLOORS = 7;
const MOB_BAND = 42;
const MOB_GROUND = 320;
const MOB_VIEW_X = 0;
const MOB_VIEW_W = 360;
const MOB_W = 144; // دقیقا ۴۰ درصد از ۳۶۰ کانتینر
const MOB_X0 = 192; // ساختمان در سمت راست کانتینر (از ۱۹۲ تا ۳۳۶)
const MOB_ADDR_X = 128; // نشانی در سمت چپ چسبیده به حاشیه چپ با راست‌چین بودن خطوط

const CONTENT = {
  title: 'درباره ما',
  supporter: 'مرکز تحقیق و نوآوری همراه اول',
  note: 'رُخ‌نما در مرکز تحقیق و نوآوری همراه اول شکل گرفته تا کاتالوگ‌های سنتی را به ویترینی تعاملی برای معرفی محصولات و ارتباط با خریداران تبدیل کند',
  boxTitle1: 'تحت‌حمایت همراه اول',
  boxCaptionMob: 'ساخته‌شده در مرکز همراه اول',
  boxCaptionDesk: 'ساخته‌شده در مرکز تحقیق و نوآوری همراه اول',
  here: 'محل استقرار ما',
};

const NUM = 'rgba(255, 255, 255, 0.45)';
const NUM_ACTIVE = 'var(--color-secondary-400)';
const ACCENT = 'var(--color-secondary-400)';
const ACCENT_INK = 'var(--color-secondary-950)';

/**
 * نمای مسطح برج برای دسکتاپ — عیناً مقادیر و کدهای اولیه بدون هیچ تغییری
 */
function DesktopElevation() {
  const badgeRef = useRef<SVGGElement>(null);
  const logosRef = useRef<SVGGElement>(null);
  const addressRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const badgeXTo = gsap.quickTo(badgeRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
      const badgeYTo = gsap.quickTo(badgeRef.current, 'y', { duration: 0.45, ease: 'power2.out' });
      const logosXTo = gsap.quickTo(logosRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
      const logosYTo = gsap.quickTo(logosRef.current, 'y', { duration: 0.45, ease: 'power2.out' });
      const addrXTo = gsap.quickTo(addressRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
      const addrYTo = gsap.quickTo(addressRef.current, 'y', { duration: 0.45, ease: 'power2.out' });

      const handleViewportMouseMove = (e: MouseEvent) => {
        const normX = Math.max(-1, Math.min(1, (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)));
        const normY = Math.max(-1, Math.min(1, (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)));

        badgeXTo(-normX * 4);
        badgeYTo(-normY * 4);
        logosXTo(-normX * 4);
        logosYTo(-normY * 4);
        addrXTo(-normX * 6);
        addrYTo(-normY * 6);
      };

      window.addEventListener('mousemove', handleViewportMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleViewportMouseMove);
      };
    },
    { scope: badgeRef }
  );

  return (
    <svg
      viewBox={`${DESK_VIEW_X} 0 ${DESK_VIEW_W} 350`}
      className="block h-auto w-full overflow-hidden"
      role="img"
      aria-label="نمای ارتفاعی برج فناوری؛ استقرار تیم رُخ‌نما در طبقهٔ ششم"
    >
      {Array.from({ length: DESK_FLOORS }, (_, i) => {
        const f = i + 1;
        const y = DESK_GROUND - f * DESK_BAND;
        const isDivar = f === 2;

        const fill = f === 1
          ? 'rgba(255, 255, 255, 0.07)'
          : f === 2 || f === 3
            ? 'rgba(255, 138, 138, 0.16)'
            : 'rgba(255, 255, 255, 0.1)';

        return (
          <g key={`b${f}`}>
            <rect
              x={DESK_X0}
              y={y}
              width={DESK_W}
              height={DESK_BAND}
              fill={fill}
              stroke={f <= 3 && f > 1 ? 'rgba(255, 255, 255, 0.04)' : 'none'}
              strokeWidth={0.75}
            />
            {isDivar && <rect x={DESK_X0} y={y} width={DESK_W} height={DESK_BAND} fill="#fff" opacity={0.06} />}
          </g>
        );
      })}

      {/* لوگوی همراه‌اول و برندها — دسکتاپ اصیل */}
      <g ref={logosRef}>
        <image
          href="/MCI-logo.svg"
          x={DESK_X0 + (DESK_W - 52) / 2}
          y={DESK_GROUND - 5 * DESK_BAND - 34 / 2}
          width={52}
          height={34}
          preserveAspectRatio="xMidYMid meet"
        />
        {Array.from({ length: DESK_FLOORS }, (_, i) => {
          const f = i + 1;
          const y = DESK_GROUND - f * DESK_BAND;
          return (
            <g key={`l${f}`}>
              {f === 3 && (
                <image
                  href="/brand/digikala.svg"
                  x={DESK_X0 + (DESK_W - 48) / 2}
                  y={y + (DESK_BAND - 18) / 2}
                  width={48}
                  height={18}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
              {f === 2 && (
                <image
                  href="/brand/divar.svg"
                  x={DESK_X0 + (DESK_W - 36) / 2}
                  y={y + (DESK_BAND - 36) / 2}
                  width={36}
                  height={36}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
            </g>
          );
        })}
      </g>

      {/* برچسب‌های عددی ترازها */}
      {Array.from({ length: DESK_FLOORS }, (_, i) => {
        const f = i + 1;
        const y = DESK_GROUND - f * DESK_BAND;
        const number = toPersianDigits(String(f).padStart(2, '0'));
        const isOurs = f === 6;
        return (
          <text
            key={`n${f}`}
            x={DESK_X0 - 8}
            y={y + DESK_BAND / 2 + 4}
            textAnchor="end"
            direction="ltr"
            style={{
              fill: isOurs ? NUM_ACTIVE : NUM,
              fontFamily: 'var(--font-abar)',
              fontSize: 10,
              fontWeight: isOurs ? 800 : 600,
            }}
          >
            {number}
          </text>
        );
      })}

      {/* کروشه و برچسب «ما اینجا هستیم» — دسکتاپ اصیل */}
      <g ref={badgeRef}>
        <path
          d={`M ${DESK_X0 + DESK_W + 4} ${DESK_GROUND - 7 * DESK_BAND + 4} H ${DESK_X0 + DESK_W + 12} V ${DESK_GROUND - 5.5 * DESK_BAND - 5} L ${DESK_X0 + DESK_W + 17} ${DESK_GROUND - 5.5 * DESK_BAND} L ${DESK_X0 + DESK_W + 12} ${DESK_GROUND - 5.5 * DESK_BAND + 5} V ${DESK_GROUND - 3 * DESK_BAND - 4} H ${DESK_X0 + DESK_W + 4}`}
          fill="none"
          stroke="var(--color-secondary-400)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x={DESK_X0 + DESK_W + 24}
          y={DESK_GROUND - 5.5 * DESK_BAND - 14}
          width={96}
          height={28}
          fill={ACCENT}
        />
        <text
          x={DESK_X0 + DESK_W + 24 + 48}
          y={DESK_GROUND - 5.5 * DESK_BAND + 4}
          textAnchor="middle"
          direction="rtl"
          style={{
            fill: ACCENT_INK,
            fontFamily: 'var(--font-abar)',
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          {CONTENT.here}
        </text>
      </g>

      {/* نشانی استقرار در سمت راست ایلستریشن — دسکتاپ اصیل با لتر اسپیسینگ منفی ۲ */}
      <g ref={addressRef} direction="rtl" style={{ letterSpacing: '-0.02em' }}>
        <text
          x={DESK_ADDR_X}
          y={194}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-primary-200)',
            fontFamily: 'var(--font-abar)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          تهران، ولنجک
        </text>
        <text
          x={DESK_ADDR_X}
          y={226}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-primary-200)',
            fontFamily: 'var(--font-abar)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          دانشگاه شهید بهشتی
        </text>
        <text
          x={DESK_ADDR_X}
          y={258}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-primary-200)',
            fontFamily: 'var(--font-abar)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          برج فناوری
        </text>
        <text
          x={DESK_ADDR_X}
          y={290}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-secondary-400)',
            fontFamily: 'var(--font-abar)',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          طبقهٔ ششم
        </text>
      </g>

      {/* خط زمین دسکتاپ */}
      <g>
        <line
          x1={DESK_VIEW_X}
          y1={DESK_GROUND}
          x2={DESK_VIEW_X + DESK_VIEW_W}
          y2={DESK_GROUND}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={1}
        />
        {Array.from({ length: Math.floor(DESK_VIEW_W / 15) }, (_, i) => {
          const x = DESK_VIEW_X + i * 15;
          return (
            <line
              key={i}
              x1={x}
              y1={DESK_GROUND + 12}
              x2={x + 10}
              y2={DESK_GROUND}
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth={1}
            />
          );
        })}
      </g>
    </svg>
  );
}

/**
 * نمای مسطح برج اختصاصی موبایل (<640px)
 * - انیمیشن پارالاکس نرم متصل به اسکرول صفحه روی سه لایه (بدج، لوگوها، نشانی)
 * - ساختمان ۴۰ درصد کانتینر ویوباکس را اشغال می‌کند (۱۴۴ از ۳۶۰)
 * - ارتفاع لوگوی همراه اول ۸ پیکسل بزرگتر (۴۲px)
 * - رفع باگ آدرس و کروشه با هماهنگی دقیق برداری و خوانایی عالی
 */
function MobileElevation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const badgeRef = useRef<SVGGElement>(null);
  const logosRef = useRef<SVGGElement>(null);
  const addressRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      /* انیمیشن پارالاکس اسکرول محور در موبایل — متناظر با انیمیشن ماوس دسکتاپ با مکانیزم scrub نرم */
      gsap.fromTo(
        badgeRef.current,
        { y: 7 },
        {
          y: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        logosRef.current,
        { y: 5 },
        {
          y: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        addressRef.current,
        { y: -9 },
        {
          y: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox={`${MOB_VIEW_X} 0 ${MOB_VIEW_W} 350`}
      className="block h-auto w-full overflow-hidden"
      role="img"
      aria-label="نمای ارتفاعی برج فناوری؛ استقرار تیم رُخ‌نما در طبقهٔ ششم"
    >
      {/* طبقات ساختمان برج در موبایل — حذف لایه و خط سکندری جهت تطابق کامل با دسکتاپ */}
      {Array.from({ length: MOB_FLOORS }, (_, i) => {
        const f = i + 1;
        const y = MOB_GROUND - f * MOB_BAND;
        const isDivar = f === 2;

        const fill = f === 1
          ? 'rgba(255, 255, 255, 0.07)'
          : f === 2 || f === 3
            ? 'rgba(255, 138, 138, 0.16)'
            : 'rgba(255, 255, 255, 0.1)';

        return (
          <g key={`mb${f}`}>
            <rect
              x={MOB_X0}
              y={y}
              width={MOB_W}
              height={MOB_BAND}
              fill={fill}
              stroke={f <= 3 && f > 1 ? 'rgba(255, 255, 255, 0.04)' : 'none'}
              strokeWidth={0.75}
            />
            {isDivar && <rect x={MOB_X0} y={y} width={MOB_W} height={MOB_BAND} fill="#fff" opacity={0.06} />}
          </g>
        );
      })}

      {/* لوگوی همراه اول (۸ پیکسل بزرگتر در ارتفاع: ۴۲px) و سایر برندها — متصل به پارالاکس اسکرول */}
      <g ref={logosRef}>
        <image
          href="/MCI-logo.svg"
          x={MOB_X0 + (MOB_W - 64) / 2}
          y={MOB_GROUND - 5 * MOB_BAND - 42 / 2}
          width={64}
          height={42}
          preserveAspectRatio="xMidYMid meet"
        />
        {Array.from({ length: MOB_FLOORS }, (_, i) => {
          const f = i + 1;
          const y = MOB_GROUND - f * MOB_BAND;
          return (
            <g key={`ml${f}`}>
              {f === 3 && (
                <image
                  href="/brand/digikala.svg"
                  x={MOB_X0 + (MOB_W - 48) / 2}
                  y={y + (MOB_BAND - 18) / 2}
                  width={48}
                  height={18}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
              {f === 2 && (
                <image
                  href="/brand/divar.svg"
                  x={MOB_X0 + (MOB_W - 36) / 2}
                  y={y + (MOB_BAND - 36) / 2}
                  width={36}
                  height={36}
                  preserveAspectRatio="xMidYMid meet"
                />
              )}
            </g>
          );
        })}
      </g>

      {/* برچسب‌های عددی ترازها در موبایل — سمت راست ساختمان */}
      {Array.from({ length: MOB_FLOORS }, (_, i) => {
        const f = i + 1;
        const y = MOB_GROUND - f * MOB_BAND;
        const number = toPersianDigits(String(f).padStart(2, '0'));
        const isOurs = f === 6;
        return (
          <text
            key={`mn${f}`}
            x={MOB_X0 + MOB_W + 6}
            y={y + MOB_BAND / 2 + 4}
            textAnchor="start"
            direction="ltr"
            style={{
              fill: isOurs ? NUM_ACTIVE : NUM,
              fontFamily: 'var(--font-abar)',
              fontSize: 10,
              fontWeight: isOurs ? 800 : 600,
            }}
          >
            {number}
          </text>
        );
      })}

      {/* کروشه و نشان «ما اینجا هستیم» در موبایل — سمت چپ ساختمان با نوک رو به چپ */}
      <g ref={badgeRef}>
        <path
          d={`M ${MOB_X0 - 3} ${MOB_GROUND - 7 * MOB_BAND + 4} H ${MOB_X0 - 10} V ${MOB_GROUND - 5.5 * MOB_BAND - 5} L ${MOB_X0 - 15} ${MOB_GROUND - 5.5 * MOB_BAND} L ${MOB_X0 - 10} ${MOB_GROUND - 5.5 * MOB_BAND + 5} V ${MOB_GROUND - 3 * MOB_BAND - 4} H ${MOB_X0 - 3}`}
          fill="none"
          stroke="var(--color-secondary-400)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x={MOB_X0 - 18 - 88}
          y={MOB_GROUND - 5.5 * MOB_BAND - 14}
          width={88}
          height={28}
          fill={ACCENT}
        />
        <text
          x={MOB_X0 - 18 - 44}
          y={MOB_GROUND - 5.5 * MOB_BAND + 4}
          textAnchor="middle"
          direction="rtl"
          style={{
            fill: ACCENT_INK,
            fontFamily: 'var(--font-abar)',
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          {CONTENT.here}
        </text>
      </g>

      {/* نشانی استقرار در موبایل — سمت چپ چسبیده به حاشیه، ۸ پیکسل بالاتر از خط زمین */}
      <g ref={addressRef} direction="rtl" style={{ letterSpacing: '-0.02em' }}>
        <text
          x={MOB_ADDR_X}
          y={186}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-primary-200)',
            fontFamily: 'var(--font-abar)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          تهران، ولنجک
        </text>
        <text
          x={MOB_ADDR_X}
          y={218}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-primary-200)',
            fontFamily: 'var(--font-abar)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          دانشگاه شهید بهشتی
        </text>
        <text
          x={MOB_ADDR_X}
          y={250}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-primary-200)',
            fontFamily: 'var(--font-abar)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          برج فناوری
        </text>
        <text
          x={MOB_ADDR_X}
          y={282}
          textAnchor="start"
          direction="rtl"
          style={{
            fill: 'var(--color-secondary-400)',
            fontFamily: 'var(--font-abar)',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          طبقهٔ ششم
        </text>
      </g>

      {/* خط زمین موبایل */}
      <g>
        <line
          x1={MOB_VIEW_X}
          y1={MOB_GROUND}
          x2={MOB_VIEW_X + MOB_VIEW_W}
          y2={MOB_GROUND}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={1}
        />
        {Array.from({ length: Math.floor(MOB_VIEW_W / 15) }, (_, i) => {
          const x = MOB_VIEW_X + i * 15;
          return (
            <line
              key={i}
              x1={x}
              y1={MOB_GROUND + 12}
              x2={x + 10}
              y2={MOB_GROUND}
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth={1}
            />
          );
        })}
      </g>
    </svg>
  );
}

/**
 * سکشن «درباره ما»
 * - ساختار ریل کانتینر: w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto
 * - در موبایل (<640px): خط‌کش ۲۴ پیکسل با px-6، برج ۴۰٪ کانتینر، لوگوی همراه ۴۲px
 * - در دسکتاپ: حفظ ۱۰۰٪ ساختار و چیدمان اصیل دسکتاپ
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
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
                trigger: sectionRef.current,
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

      // انیمیشن ورود ملموس و چشم‌نواز موبایل به سبک Framer Motion
      const mm = gsap.matchMedia();
      mm.add('(max-width: 639px)', () => {
        gsap.fromTo(
          '.about-entrance',
          { opacity: 0, scale: 0.97, y: 36 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
            clearProps: 'all',
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      dir="rtl"
      className="relative w-full scroll-mt-28 bg-[var(--color-primary-600)] pt-10 pb-14 tracking-[-0.02em] text-white sm:pt-36 sm:pb-20"
    >
      {/* افکت گلو محیطی — ۱۵۰ درصد طول طبق دستور برای پوشش نرم و یکدست */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] z-30"
        style={{
          background: 'radial-gradient(ellipse 150% 100% at 50% 0%, rgba(245, 158, 11, 0.154), transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* ریل‌های عمودی طرفین در کانتینر یکپارچه ۱۴۷۲px — ریل پایه + لایه پرشونده با اسکرول */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-white/15" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-white origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-white/15" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-white origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      {/* خط افقی بالایی هم‌رنگ ریل‌های پرنشده — در موبایل دقیقا به اندازه فاصله ریل با حاشیه تصویر (۸px) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[8px] sm:top-24 z-20 h-px bg-white/15"
      />

      {/* خط افقی پایانی هم‌رنگ ریل‌های پرنشده — در موبایل با فاصله ۸ پیکسلی مانند خط بالایی */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[8px] sm:bottom-0 z-20 h-px bg-white/15"
      />

      <div className="relative z-10 w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto">
        {/* گرید دوستونه:
            در موبایل: افزایش ۸ پیکسل فاصله از ریل (از ۲۴ به ۳۲ پیکسل) با px-8
            در تبلت و دسکتاپ: همان چیدمان و پدینگ‌های اولیه (sm:p-9 lg:p-14) */}
        <div className="grid gap-10 px-8 py-6 sm:p-9 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
          {/* راست: نمای مسطح برج و نشانی استقرار در شش ستون */}
          <div className="about-entrance w-full lg:col-span-6 lg:pr-8">
            <address className="sr-only">
              تهران، ولنجک، دانشگاه شهید بهشتی، برج فناوری، طبقهٔ ششم
            </address>

            {/* در دسکتاپ: رندر نسخه اولیه با ابعاد ۴۲۵ و چیدمان دست‌نخورده دسکتاپ */}
            <div className="hidden lg:block">
              <DesktopElevation />
            </div>

            {/* در موبایل و تبلت کوچک: رندر نسخه ویژه موبایل با ساختمون ۴۰ درصدی و لوگوی ۴۲px — ۸ پیکسل فاصله بیشتر از پایین */}
            <div className="block lg:hidden pb-2">
              <MobileElevation />
            </div>
          </div>

          {/* چپ: معرفی و باکس اعتماد */}
          <div className="about-entrance flex flex-col items-start gap-4 lg:col-span-6 lg:pl-8">
            <h2 className="text-3xl font-extrabold leading-[1.25] text-white sm:text-4xl">
              {CONTENT.title}
            </h2>

            <p className="-mt-2 max-w-[52ch] text-lg font-semibold leading-[1.4] text-[var(--color-secondary-400)] sm:text-2xl">
              {CONTENT.supporter}
            </p>

            <p className="mt-4 sm:mt-7 max-w-[52ch] text-sm sm:text-base leading-[1.85] text-[var(--color-primary-200)]">
              {CONTENT.note}
            </p>

            {/* باکس اعتماد / نوآوری همراه اول — کپی بروز شده طبق دستور کاربر */}
            <div className="mt-5 sm:mt-7 w-full">
              <div className="flex min-h-[4.75rem] sm:min-h-[5.5rem] min-w-0 items-center gap-5 sm:gap-7 bg-white/10 py-1.5 pr-1.5 pl-4 sm:py-2 sm:pr-2 sm:pl-5">
                <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center bg-white/15 sm:h-[72px] sm:w-[72px]">
                  <svg
                    viewBox="0 0 29 19"
                    className="block h-[16px] w-auto max-w-[25px] sm:h-auto sm:max-h-8 sm:max-w-[2.5rem]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="مرکز تحقیق و نوآوری همراه اول"
                  >
                    <path
                      d="M0 13.76V0.420013C2 0.140013 4.04999 0 6.10999 0C11.88 0 17.83 1.09001 23.58 3.26001C26.32 4.27001 28.04 6.86 28.04 9.75V18.53C18.91 14.12 9.13 12.49 0 13.76Z"
                      fill="var(--color-primary-300)"
                    />
                  </svg>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center sm:pt-[2px]">
                  <span className="block pt-2 sm:pt-0 text-sm sm:text-base font-bold leading-none text-white">
                    {CONTENT.boxTitle1}
                  </span>
                  <p className="mt-2 sm:mt-3 text-sm font-normal leading-snug text-[var(--color-primary-200)]">
                    <span className="sm:hidden">{CONTENT.boxCaptionMob}</span>
                    <span className="hidden sm:inline">{CONTENT.boxCaptionDesk}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
