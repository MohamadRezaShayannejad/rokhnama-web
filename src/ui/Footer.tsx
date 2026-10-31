'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconBrandTelegram,
  IconBrandInstagram,
  IconArrowUpLeft,
} from '@tabler/icons-react';
import { IconButton } from '@/ui/IconButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* نماد هندسی رُخ‌نما (فقط آیکون بدون تایپوگرافی) */
function RokhnamaSymbol({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="94 7 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="نماد رُخ‌نما"
    >
      <path
        d="M125.539 39.3847H118.347L118.35 22.4802L101.42 39.3847H96.0005V33.8857L112.855 17.0414H96.0005V9.84745L125.539 9.84619V39.3847Z"
        fill="var(--color-secondary-700)"
      />
    </svg>
  );
}

const TRUST_LOGOS = [
  { src: '/Enamad.png', alt: 'نماد اعتماد الکترونیکی (اینماد)' },
  { src: '/Daneshbonyan.png', alt: 'تأییدیه معاونت علمی و فناوری ریاست جمهوری - دانش بنیان' },
  { src: '/Khalagh.png', alt: 'برنامه ملی توسعه زیست بوم شرکت های خلاق' },
  { src: '/MCI-research.png', alt: 'مرکز تحقیق و توسعه همراه اول' },
];

/* دو دسته لینک رسمی استخراج‌شده از مستندات لندینگ رُخ‌نما */
const FOOTER_NAV_COLUMNS = [
  {
    title: 'ویترین و راهکارها',
    links: [
      { id: 'features', label: 'ویترین تعاملی محصول', href: '#features' },
      { id: 'compare', label: 'مقایسه روش‌های ارائه کاتالوگ', href: '#compare' },
      { id: 'scenarios', label: 'راهکارهای متناسب با صنایع', href: '#scenarios' },
      { id: 'pricing', label: 'پلن‌ها و تعرفه‌ها', href: '#pricing' },
    ],
  },
  {
    title: 'زیرساخت و ارتباط سازمانی',
    links: [
      { id: 'infra-stability', label: 'پایداری زیرساخت و امنیت داده‌ها', href: '#infrastructure' },
      { id: 'infra-beheshti', label: 'استقرار در برج فناوری بهشتی', href: '#infrastructure' },
      { id: 'infra-mci', label: 'مرکز نوآوری همراه اول', href: '#infrastructure' },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;
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
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              transformOrigin: 'top center',
              ease: 'none',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 80%',
                /* فوتر آخرین المان صفحه است؛ پایان در bottom bottom برای انطباق با انتهای اسکرول صفحه */
                end: 'bottom bottom',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      if (isReduced) return;

      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      return () => cancelAnimationFrame(rafId);
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="footer"
      dir="rtl"
      className="relative z-10 w-full bg-[var(--color-primary-800)] text-white tracking-[-0.02em] pt-8 lg:pt-14 overflow-hidden"
    >
      {/*
        ریل‌های عمودی فوتر:
        کانتینر مرکزی با عرض [calc(100%-48px)] lg:[calc(100%-64px)] max-w-[1472px]
        بستر ۱ پیکسلی (bg-white/15) در سراسر ارتفاع و لایهٔ پرشوندهٔ سفید با اسکرول (scaleY 0→1)
      */}
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden" aria-hidden="true">
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

      {/* کانتینر محتوای فوتر منطبق بر گرید ۱۴۷۲px — z-20 تا زیر وکتور تایپوگرافی نرود */}
      <div className="relative z-20 w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto flex flex-col items-center">

        {/* خط افقی بالای بخش بالایی فوتر در موبایل — متصل به ریل‌های عمودی طرفین (در دسکتاپ مخفی) */}
        <div className="w-full h-px bg-white/15 lg:hidden" aria-hidden="true" />

        {/* باکس محتوا: ۵ ستون درباره ما + ۷ ستون برای لینک‌ها و شبکه‌های اجتماعی */}
        <div className="relative w-full z-10">
          <div className="relative z-10 pt-8 pb-12 px-8 sm:px-10 lg:pt-10 lg:pb-0 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

              {/* ۵ ستون اول: بدنه درباره ما با ۴۸ پیکسل پدینگ سمت چپ در دسکتاپ (lg:pl-12) */}
              <div className="lg:col-span-5 flex flex-col items-start gap-8 lg:gap-6 lg:pl-12">
                <a
                  href="#"
                  className="inline-block shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <RokhnamaSymbol className="h-7 w-7 lg:h-9 lg:w-9 shrink-0" />
                </a>

                <p className="text-[15px] lg:text-[17px] leading-[1.85] text-[var(--color-primary-100)] font-normal">
                  رُخ‌نما کاتالوگ‌های سنتی و فایل‌های PDF را به ویترینی تعاملی برای فروش سازمانی تبدیل می‌کند، با اطلاعات متصل به انبار، قیمت‌های به‌روز و امکان تحلیل رفتار خریداران
                </p>

                {/* لوگوهای اینماد، دانش‌بنیان، شرکت‌های خلاق و مرکز تحقیق همراه اول */}
                <div className="flex flex-row items-center justify-start gap-6 lg:gap-8 w-auto mt-1 lg:mt-0 lg:pt-1">
                  {TRUST_LOGOS.map((item, index) => (
                    <div
                      key={index}
                      className="h-[30px] lg:h-12 flex items-center justify-start lg:justify-center w-auto shrink-0 opacity-64 lg:opacity-80 hover:opacity-100 transition-all duration-200 hover:brightness-125"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={72}
                        height={48}
                        draggable={false}
                        className="object-contain h-full w-auto max-w-full max-h-[30px] lg:max-h-12 brightness-200 contrast-125 grayscale select-none pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ۷ ستون باقی‌مانده: دو دسته لینک + ستون سوشال مدیا */}
              <div className="lg:col-span-7 flex flex-col lg:flex-row gap-0 lg:gap-16 pt-0 lg:pt-2">

                {/* دو دسته لینک: در موبایل محصور در خطوط بالا و پایین با فاصله صفر، در دسکتاپ ساختار تمیز اولیه بدون خطوط اضافی */}
                <div className="-mx-8 sm:-mx-10 lg:mx-0 px-8 sm:px-10 lg:px-0 border-y border-white/15 lg:border-y-0 py-6 lg:py-0 lg:flex-1 flex flex-col lg:flex-row gap-0 lg:gap-14 items-stretch">
                  {/* دسته لینک اول */}
                  <div className="lg:flex-1 flex flex-col gap-3">
                    <span className="text-[15px] lg:text-[17px] font-bold text-white tracking-tight lg:border-b lg:border-white/10 lg:pb-3 min-h-[44px] flex items-center">
                      {FOOTER_NAV_COLUMNS[0].title}
                    </span>
                    <ul className="flex flex-col">
                      {FOOTER_NAV_COLUMNS[0].links.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            data-cursor-button="true"
                            className="group flex items-center justify-between w-full min-h-[38px] lg:min-h-[44px] py-1 lg:py-2 text-[15px] text-[var(--color-primary-100)] opacity-80 hover:opacity-100 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                          >
                            <span className="leading-normal">{link.label}</span>
                            <IconArrowUpLeft
                              size={16}
                              stroke={2.2}
                              className="text-white/30 group-hover:text-[var(--color-secondary-400)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mr-2"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* خط جداکننده افقی میانی فقط در موبایل (در دسکتاپ مخفی است) */}
                  <div className="-mx-8 sm:-mx-10 h-px bg-white/15 my-6 lg:hidden" aria-hidden="true" />

                  {/* دسته لینک دوم */}
                  <div className="lg:flex-1 flex flex-col gap-3">
                    <span className="text-[15px] lg:text-[17px] font-bold text-white tracking-tight lg:border-b lg:border-white/10 lg:pb-3 min-h-[44px] flex items-center">
                      {FOOTER_NAV_COLUMNS[1].title}
                    </span>
                    <ul className="flex flex-col">
                      {FOOTER_NAV_COLUMNS[1].links.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            data-cursor-button="true"
                            className="group flex items-center justify-between w-full min-h-[38px] lg:min-h-[44px] py-1 lg:py-2 text-[15px] text-[var(--color-primary-100)] opacity-80 hover:opacity-100 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                          >
                            <span className="leading-normal">{link.label}</span>
                            <IconArrowUpLeft
                              size={16}
                              stroke={2.2}
                              className="text-white/30 group-hover:text-[var(--color-secondary-400)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mr-2"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* شبکه‌های اجتماعی موبایل: گرید ۲ ستونه افقی، سایز sm، پر کردن عرض */}
                <div className="w-full grid grid-cols-2 items-center gap-3 mt-8 sm:mt-10 lg:hidden">
                  <IconButton
                    asChild
                    color="white"
                    variant="outline"
                    size="sm"
                    className="w-full border-[1px] [&_svg]:stroke-[1px]"
                    aria-label="تلگرام پشتیبانی رُخ‌نما (@RokhnamaBot)"
                  >
                    <a href="https://t.me/RokhnamaBot" target="_blank" rel="noopener noreferrer">
                      <IconBrandTelegram />
                    </a>
                  </IconButton>

                  <IconButton
                    asChild
                    color="white"
                    variant="outline"
                    size="sm"
                    className="w-full border-[1px] [&_svg]:stroke-[1px]"
                    aria-label="اینستاگرام رُخ‌نما (@Rokhnama_ir)"
                  >
                    <a href="https://instagram.com/Rokhnama_ir" target="_blank" rel="noopener noreferrer">
                      <IconBrandInstagram />
                    </a>
                  </IconButton>
                </div>

                {/* شبکه‌های اجتماعی دسکتاپ: چیدمان اصلی عمودی با دکمه‌های سایز lg (۶۰px) */}
                <div className="hidden lg:flex lg:flex-col lg:items-end lg:shrink-0 lg:gap-3 lg:pt-2">
                  <IconButton
                    asChild
                    color="white"
                    variant="outline"
                    size="lg"
                    aria-label="تلگرام پشتیبانی رُخ‌نما (@RokhnamaBot)"
                  >
                    <a href="https://t.me/RokhnamaBot" target="_blank" rel="noopener noreferrer">
                      <IconBrandTelegram />
                    </a>
                  </IconButton>

                  <IconButton
                    asChild
                    color="white"
                    variant="outline"
                    size="lg"
                    aria-label="اینستاگرام رُخ‌نما (@Rokhnama_ir)"
                  >
                    <a href="https://instagram.com/Rokhnama_ir" target="_blank" rel="noopener noreferrer">
                      <IconBrandInstagram />
                    </a>
                  </IconButton>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/*
        ۲. تایپوگرافی رسمی و برداری «رُخ‌نما»:
        - به پهنای کانتینر ۱۴۷۲px (نه کل صفحه) با فاصلهٔ ۴۸ پیکسل از چپ و راست کانتینر (px-12)
        - فاصله با محتوا به نصف وضعیت قبلی رسید (pt-0 mt-0)
        - ۳۰ درصد از ارتفاعش از کف فوتر کات می‌شود (translate-y-[30%])
        - فاصله تا محتوای بالا با مارجین منفی (‎-mt-[12%]‎) به یک‌پنجم وضعیت اصلی رسیده، بدون تغییر میزان کات
        - در لایه z-10 قرار دارد تا افکت هاله نوری (z-20) مستقیماً روی حروف بتابد
      */}
      <div className="relative z-10 w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] mx-auto px-0 sm:px-12 select-none pointer-events-none flex justify-center items-center overflow-visible -mt-[12%] translate-y-[30%]">
        <svg
          viewBox="1 6 82 42"
          className="w-full h-auto block select-none pointer-events-none fill-[url(#rokhnamaFadeGradient)]"
        >
          <defs>
            <linearGradient id="rokhnamaFadeGradient" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--color-primary-800)" />
              <stop offset="30%" stopColor="var(--color-primary-800)" />
              <stop offset="60%" stopColor="var(--color-primary-600)" />
              <stop offset="100%" stopColor="var(--color-primary-600)" />
            </linearGradient>
          </defs>

          {/* ر */}
          <path d="M10.4936 38.0001C8.10428 38.0001 6.27782 37.3339 5.01423 36.0014C3.77362 34.6459 3.0729 32.5208 2.91208 29.626L2.60192 25.2494C2.18839 18.2422 1.85526 13.9805 1.60254 12.4641L7.461 10.4309V12.154C7.461 16.5421 7.40357 20.9532 7.28869 25.3872C7.26572 27.2022 7.58736 28.5002 8.25362 29.2814C8.91987 30.0395 10.0341 30.4186 11.5964 30.4186L10.4936 38.0001Z" />
          {/* خ */}
          <path d="M32.2736 38.0001C30.8492 38.0001 29.7119 37.6555 28.8619 36.9663C28.0348 36.2771 27.4605 35.1513 27.1388 33.5891C26.7712 35.0824 26.2313 36.2771 25.5191 37.1731C24.8299 38.0691 24.1407 38.5171 23.4514 38.5171C22.4865 38.5171 21.4756 38.3448 20.4188 38.0001C19.362 37.6326 18.4086 37.1386 17.5585 36.5183C16.7314 35.875 16.1456 35.1743 15.801 34.4161C15.0658 35.7027 14.2617 36.6217 13.3887 37.1731C12.5386 37.7245 11.5734 38.0001 10.4936 38.0001C10.3558 38.0001 10.2412 37.7704 10.1493 37.3109C10.0344 36.8285 9.97696 36.1852 9.97696 35.3811C9.97696 33.7499 10.1493 32.5208 10.4939 31.6937C10.8155 30.8436 11.1828 30.4186 11.5964 30.4186C12.4005 30.4186 13.0555 30.3382 13.561 30.1774C14.0664 29.9936 14.5144 29.6834 14.905 29.2469C15.3185 28.7874 15.7435 28.1097 16.18 27.2137C17.3517 24.8473 18.5809 23.1817 19.8674 22.2168C21.177 21.2518 22.8311 20.7694 24.8299 20.7694C25.8867 20.7694 26.7138 21.0566 27.3111 21.6309C27.9085 22.1823 28.322 23.0783 28.5517 24.3189C28.8734 26.042 29.218 27.3286 29.5856 28.1786C29.9532 29.0287 30.4127 29.6145 30.964 29.9361C31.5384 30.2578 32.3425 30.4186 33.3763 30.4186L32.2736 38.0001ZM18.2822 28.7645C18.8336 29.3158 19.81 29.8328 21.2114 30.3152C22.6129 30.7747 23.9339 31.0045 25.1745 31.0045C25.2894 30.9815 25.3583 30.8896 25.3813 30.7288C25.4272 30.5679 25.4502 30.3152 25.4502 29.9706C25.4042 28.8219 25.2664 28.0293 25.0367 27.5928C24.8299 27.1333 24.4393 26.9035 23.865 26.9035C22.3257 26.9035 21.1425 27.0529 20.3154 27.3515C19.4883 27.6272 18.8106 28.0982 18.2822 28.7645Z" />
          {/* ن */}
          <path d="M45.7424 38.0001C44.1801 38.0001 42.9051 37.6555 41.9172 36.9663C40.9293 36.2771 40.3204 35.3007 40.0907 34.0371C39.5163 35.3466 38.6318 36.3345 37.4372 37.0008C36.2425 37.667 34.6802 38.0001 32.7504 38.0001H32.2679C32.1301 38.0001 32.0152 37.7704 31.9233 37.3109C31.8084 36.8285 31.751 36.1852 31.751 35.3811C31.751 33.7499 31.9233 32.5208 32.2679 31.6937C32.5896 30.8436 32.9572 30.4186 33.3707 30.4186H33.8532C35.806 30.4186 37.173 30.1429 37.9541 29.5915C38.7352 29.0172 39.1487 28.1441 39.1947 26.9725L39.3325 24.3534L42.503 23.9398V26.3866C42.503 27.834 42.8591 28.8678 43.5713 29.4881C44.2835 30.1085 45.3748 30.4186 46.8452 30.4186L45.7424 38.0001ZM38.9535 21.9411C38.2642 21.5965 37.4831 21.091 36.6101 20.4248C35.7371 19.7585 35.0823 19.1727 34.6458 18.6672L37.575 14.8765C38.0115 15.3819 38.6663 15.9677 39.5393 16.634C40.4123 17.3002 41.1935 17.8057 41.8827 18.1503L38.9535 21.9411Z" />
          {/* م */}
          <path d="M53.7245 19.0463C54.3448 19.0463 55.0685 19.1841 55.8956 19.4598C56.7227 19.7126 57.837 20.1146 59.2384 20.666C61.3061 21.4701 63.213 22.1478 64.959 22.6992C66.728 23.2276 68.6579 23.6641 70.7485 24.0088L68.2328 29.626L65.8895 29.3158C65.2692 29.5915 64.6488 29.9361 64.0285 30.3497C63.4312 30.7632 62.6616 31.3261 61.7196 32.0383C60.1344 33.2559 58.6755 34.2668 57.343 35.0709C56.0335 35.875 54.4023 36.5642 52.4495 37.1386C50.4966 37.713 48.2566 38.0001 45.7295 38.0001C45.5916 38.0001 45.4767 37.7704 45.3848 37.3109C45.27 36.8285 45.2125 36.1852 45.2125 35.3811C45.2125 33.7499 45.3848 32.5208 45.7295 31.6937C46.0511 30.8436 46.4187 30.4186 46.8322 30.4186C50.0257 30.4186 52.6792 30.2578 54.7929 29.9361C56.9295 29.5915 59.3188 28.9253 61.9608 27.9374C60.5594 27.5928 58.6296 26.9954 56.1713 26.1454C55.2064 25.7778 54.4482 25.5136 53.8969 25.3528C53.3684 25.1919 52.9204 25.1115 52.5528 25.1115C52.1393 25.1115 51.7487 25.2838 51.3812 25.6285C51.0365 25.9731 50.6 26.6278 50.0716 27.5928L47.935 26.2832C48.7161 24.4223 49.4054 22.9864 50.0027 21.9755C50.6 20.9417 51.1859 20.195 51.7602 19.7355C52.3346 19.276 52.9894 19.0463 53.7245 19.0463ZM55.6544 16.1515C54.9652 15.8069 54.184 15.3015 53.311 14.6352C52.438 13.969 51.7832 13.3831 51.3467 12.8777L54.2759 9.08691C54.7124 9.59235 55.3672 10.1782 56.2402 10.8445C57.1133 11.5107 57.8944 12.0161 58.5836 12.3608L55.6544 16.1515Z" />
          {/* الف */}
          <path d="M78.8045 23.3195C79.7924 27.2252 80.2863 30.3612 80.2863 32.7275C80.2863 35.2317 79.7809 37.4717 78.77 39.4475C77.7821 41.4463 76.3347 43.02 74.4279 44.1688C73.1413 44.9729 71.602 45.6736 69.81 46.2709C68.041 46.8912 66.2375 47.3277 64.3995 47.5805C63.8482 46.9831 63.3198 46.2594 62.8143 45.4094C62.2859 44.5593 61.6082 43.3761 60.7811 41.8598C65.7665 41.1247 69.6032 40.2287 72.2912 39.1718C75.0022 38.115 76.553 37.0008 76.9436 35.8291C76.8746 35.2317 76.5415 34.06 75.9442 32.314C75.3698 30.545 74.6461 28.5347 73.7731 26.2832L78.8045 23.3195Z" />
          {/* نقطه / اکسنت */}
          <path d="M78.3504 6.14893C79.0626 6.14893 79.7173 6.39016 80.3147 6.87262C80.912 7.35508 81.383 8.03282 81.7276 8.90585C82.0722 9.77887 82.2445 10.7897 82.2445 11.9385C82.2445 13.0872 82.0033 14.167 81.5208 15.1778C81.0383 16.1657 80.3491 16.9584 79.4531 17.5557C78.0287 18.4517 75.5015 19.2788 71.8716 20.0369L72.2162 16.6252C75.3177 15.982 77.4543 15.4421 78.626 15.0055C79.8207 14.569 80.487 14.0866 80.6248 13.5582L80.5904 13.0757C80.1998 13.3744 79.7173 13.6156 79.143 13.7994C78.5686 13.9602 77.9713 14.0406 77.351 14.0406C76.5469 14.0406 75.9036 13.8224 75.4211 13.3858C74.9387 12.9493 74.6974 12.2831 74.6974 11.3871C74.6974 10.4681 74.8582 9.60657 75.1799 8.80246C75.5015 7.99836 75.9495 7.35508 76.5239 6.87262C77.0753 6.39016 77.6841 6.14893 78.3504 6.14893ZM76.1793 10.1465C76.1793 10.606 76.6617 10.8357 77.6267 10.8357C78.6605 10.8357 79.4876 10.7668 80.1079 10.6289C79.6025 9.50318 78.8213 8.94031 77.7645 8.94031C77.282 8.94031 76.903 9.06667 76.6273 9.31939C76.3286 9.5721 76.1793 9.8478 76.1793 10.1465Z" />
        </svg>
      </div>

      {/*
        افکت گلو محیطی بیضی‌شکل فیکس از پایین روی فوتر (برگرفته از سکشن زیرساخت)
        - لایه z-30 تا مستقیماً روی وکتور رُخ‌نما بتابد و جلوه نوری روی آن ایجاد کند (محدود به ارتفاع رُخ‌نما بدون تداخل با محتوای بالا)
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] lg:h-[45%] z-30"
        style={{
          background: 'radial-gradient(ellipse 85% 100% at 50% 100%, rgba(245, 158, 11, 0.22), transparent 75%)',
        }}
        aria-hidden="true"
      />

    </footer>
  );
}
