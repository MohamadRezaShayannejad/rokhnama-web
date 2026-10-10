'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Header from '@/ui/Header';
import { Button } from '@/ui/Button';

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans min-h-screen relative overflow-x-hidden" dir="rtl">

      {/*
        گرید خطی معماری سرتاسری (Global Architectural Linear Grid Guides)
        این گرید خطوط راهنمای مویرگی و متلاقی را در کل ارتفاع صفحه رسم می‌کند.
      */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center" aria-hidden="true">
        <div className="w-full max-w-7xl h-full border-x border-[var(--border-neutral-subtle)] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x divide-x-reverse divide-[var(--border-neutral-subtle)]/30 opacity-60" />
      </div>

      {/* هدر نهایی با استایل معماری مینیمال، دکمه سایز MD کاغذی و فونت بزرگتر */}
      <Header />

      <main className="flex flex-col relative z-10">

        {/* Layout 1: Split (دوستونه) */}
        <section id="features" className="relative overflow-hidden min-h-screen flex items-center py-20 border-b border-[var(--border-neutral-subtle)]">
          <div className="max-w-7xl mx-auto border-x border-[var(--border-neutral-subtle)] px-6 lg:px-16 w-full py-12 relative">

            {/* نشانه فنی گرید */}
            <div className="absolute top-4 right-6 text-[10px] font-mono text-[var(--text-neutral-subtle)] tracking-widest">
              GRID // 01 · FEATURES
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center pt-6">

              <div className="flex flex-col space-y-8">
                <div className="gsap-reveal inline-flex self-start px-4 py-1.5 rounded-none bg-[var(--bg-primary-subtle)] text-[var(--text-primary-strong)] text-xs font-bold border border-[var(--border-primary-soft)] tracking-wide">
                  رُخ‌نما — کاتالوگ تعاملی
                </div>

                <h1 className="gsap-reveal text-5xl lg:text-6xl font-black leading-[1.2] text-[var(--text-neutral-strong)]">
                  تجربهٔ دیجیتال <br />
                  <span className="text-[var(--text-primary-base)]">برای فروش</span>
                </h1>

                <p className="gsap-reveal text-lg text-[var(--text-neutral-base)] leading-relaxed max-w-lg">
                  کاتالوگ محصولات شما را به یک تجربهٔ دیجیتال برای فروش تبدیل می‌کنیم: قیمت به‌روز، دسترسی نقش‌محور، باز شدن بدون اینترنت و داده‌ای که نشان می‌دهد هر خریدار چه دیده و مسیرش کجا متوقف شده است.
                </p>

                <div className="gsap-reveal flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    color="primary"
                    variant="solid"
                    size="md"
                    paperFold={true}
                    onClick={() => {
                      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    درخواست دمو
                  </Button>

                  <Button
                    color="primary"
                    variant="outline"
                    size="md"
                    onClick={() => {
                      document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    مقایسه با کاتالوگ فیزیکی
                  </Button>
                </div>
              </div>

              <div className="gsap-reveal relative">
                <div className="w-full aspect-[4/3] rounded-none bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-subtle)] p-6 shadow-xl shadow-[var(--bg-primary-soft)]/20">
                  <div className="w-full h-full rounded-none bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] flex flex-col overflow-hidden">
                    <div className="h-14 bg-[var(--bg-neutral-subtle)] border-b border-[var(--border-neutral-subtle)] flex items-center px-4 justify-between">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 bg-[var(--border-neutral-base)]"></div>
                        <div className="w-2.5 h-2.5 bg-[var(--border-neutral-base)]"></div>
                        <div className="w-2.5 h-2.5 bg-[var(--border-neutral-base)]"></div>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-neutral-subtle)]">ROKHNAMA // INTERACTIVE</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-[var(--text-neutral-subtle)] font-medium text-lg">تجربه تعاملی دیجیتال</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Layout 2: Centered (مرکزچین) */}
        <section id="platform" className="relative overflow-hidden min-h-screen flex items-center justify-center py-24 border-b border-[var(--border-neutral-subtle)] bg-[var(--bg-primary-subtle)]/40">
          <div className="max-w-7xl mx-auto border-x border-[var(--border-neutral-subtle)] px-6 lg:px-16 w-full flex flex-col items-center py-12 relative">

            <div className="absolute top-4 right-6 text-[10px] font-mono text-[var(--text-neutral-subtle)] tracking-widest">
              GRID // 02 · PLATFORM
            </div>

            <div className="text-center max-w-3xl space-y-8 mb-16 pt-6">
              <h2 className="gsap-reveal text-6xl lg:text-7xl font-black leading-tight text-[var(--text-neutral-strong)]">
                قواعد فروش کاتالوگ <br /> تغییر کرده‌اند
              </h2>
              <p className="gsap-reveal text-xl text-[var(--text-neutral-strong)] font-medium leading-relaxed max-w-2xl mx-auto opacity-80">
                یک تغییر کوچک در سبد محصول می‌تواند کل تیراژ چاپ‌شده را بی‌اعتبار کند. این‌بار در یک تجربهٔ دیجیتال: انتشار نسخهٔ جدید فقط به یک کلیک نیاز دارد.
              </p>

              <div className="gsap-reveal flex justify-center pt-6">
                <Button
                  color="secondary"
                  variant="solid"
                  size="md"
                  paperFold={true}
                  onClick={() => {
                    document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  کاتالوگ فعلی‌تان را بفرستید
                </Button>
              </div>
            </div>

            <div className="gsap-reveal w-full max-w-5xl aspect-[16/9] bg-[var(--bg-neutral-base)] border border-[var(--border-primary-soft)] shadow-2xl flex flex-col overflow-hidden">
              <div className="h-16 bg-[var(--bg-neutral-subtle)] border-b border-[var(--border-neutral-subtle)] flex items-center px-6">
                 <div className="w-1/4 h-2.5 bg-[var(--border-neutral-subtle)]"></div>
              </div>
              <div className="flex-1 flex items-center justify-center bg-[var(--bg-neutral-base)]">
                <span className="text-[var(--text-neutral-subtle)] font-medium text-xl">پلتفرم مدیریت کاتالوگ رُخ‌نما</span>
              </div>
            </div>

          </div>
        </section>

        {/* Layout 3: Comparative (مقایسه‌ای) */}
        <section id="comparison" className="relative overflow-hidden min-h-screen py-32 border-b border-[var(--border-neutral-subtle)]">
          <div className="max-w-7xl mx-auto border-x border-[var(--border-neutral-subtle)] px-6 lg:px-16 w-full relative">

            <div className="absolute top-4 right-6 text-[10px] font-mono text-[var(--text-neutral-subtle)] tracking-widest">
              GRID // 03 · BENCHMARK
            </div>

            <div className="text-center max-w-3xl mx-auto space-y-6 mb-24 pt-6">
              <h2 className="gsap-reveal text-5xl font-black text-[var(--text-neutral-strong)]">
                پایان عصر کاتالوگ‌های باطل‌شده
              </h2>
              <p className="gsap-reveal text-xl text-[var(--text-neutral-base)] leading-relaxed">
                نسخهٔ چاپی با یک تغییر بی‌اعتبار می‌شود. اطلاعات خود را در یک تجربهٔ تعاملی و همیشه‌به‌روز به مشتریان ارائه دهید.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Problem */}
              <div className="gsap-reveal group p-10 border border-[var(--border-neutral-subtle)] bg-[var(--bg-neutral-subtle)]/50 flex flex-col h-[480px] transition-all hover:border-[var(--bg-error-solid)]">
                <div className="mb-auto">
                  <div className="text-[var(--bg-error-solid)] font-bold mb-4 text-xs tracking-widest bg-[var(--bg-error-subtle)] inline-block px-3 py-1 border border-[var(--bg-error-solid)]/20">روش گذشته</div>
                  <h3 className="text-3xl font-black mb-4 text-[var(--text-neutral-strong)]">کاتالوگ کاغذی و PDF</h3>
                  <p className="text-[var(--text-neutral-base)] text-lg leading-relaxed">با یک تغییر کوچک در سبد محصول یا قیمت‌ها، کل تیراژ بی‌اعتبار می‌شود و نیاز به طراحی و چاپ مجدد دارد.</p>
                </div>
                <div className="h-48 mt-8 bg-[var(--bg-neutral-soft)] border border-[var(--border-neutral-base)] flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--bg-neutral-base)]/80 backdrop-blur-sm">
                      <span className="text-[var(--bg-error-solid)] font-black text-2xl border-4 border-[var(--bg-error-solid)] px-6 py-3 transform -rotate-12">باطل شد</span>
                   </div>
                   <span className="text-[var(--text-neutral-subtle)] font-medium">محدودیت‌های چاپ سنتی</span>
                </div>
              </div>

              {/* Solution */}
              <div className="gsap-reveal relative p-10 border-2 border-[var(--bg-primary-solid)] bg-[var(--bg-neutral-base)] shadow-xl flex flex-col h-[480px]">
                <div className="mb-auto">
                  <div className="text-[var(--bg-primary-solid)] font-bold mb-4 text-xs tracking-widest bg-[var(--bg-primary-subtle)] inline-block px-3 py-1 border border-[var(--bg-primary-solid)]/30">تجربهٔ دیجیتال</div>
                  <h3 className="text-3xl font-black mb-4 text-[var(--text-neutral-strong)]">پلتفرم رُخ‌نما</h3>
                  <p className="text-[var(--text-neutral-base)] text-lg leading-relaxed">قیمت از منبع شما خوانده می‌شود، بازدیدها ثبت می‌شوند و انتشار نسخهٔ جدید فقط به یک کلیک نیاز دارد.</p>
                </div>
                <div className="h-48 mt-8 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute bottom-0 w-full h-1 bg-[var(--bg-primary-solid)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                  <span className="text-[var(--text-primary-strong)] font-bold text-lg">تجربهٔ تعاملی همیشه‌سبز</span>
                </div>
              </div>
            </div>

            <div className="mt-20 flex justify-center pb-12 gsap-reveal">
               <Button
                 color="primary"
                 variant="solid"
                 size="lg"
                 paperFold={true}
                 onClick={() => alert("درخواست شما ثبت شد.")}
               >
                 کاتالوگ فعلی‌تان را بفرستید
               </Button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
