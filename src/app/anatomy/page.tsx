import * as React from "react";
import { ScrewPressFigure } from "@/ui/anatomy/figure";

export const metadata = {
  title: "آناتومی رخنما | پیش‌نمایش مکانیسم تعاملی",
  description: "آناتومی ایزومتریک تبدیل کاتالوگ سنتی و اسناد کاغذی به کاتالوگ دیجیتال و تعاملی رخنما",
};

export default function AnatomyPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0b0b0b] text-[#e6e6e6] flex flex-col items-center py-12 px-4 selection:bg-neutral-800"
      style={{
        fontFamily: "var(--font-abar, sans-serif)",
        letterSpacing: "-0.02em",
      }}
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <header className="w-full mb-8 pb-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-1">
              ROKHNAMA · ISOMETRIC HERO MECHANISM
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-100">
              آناتومی و مکانیک کاتالوگ سازمانی رخنما
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 border border-neutral-800 px-3 py-1.5 rounded-none bg-neutral-900/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>خروجی زنده · نسخه پیش‌نمایش</span>
          </div>
        </header>

        {/* The Anatomy Plate Figure */}
        <div className="w-full">
          <ScrewPressFigure />
        </div>

        {/* 4 Stages Explanatory Cards */}
        <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 border border-neutral-800 bg-neutral-950/60 rounded-none flex flex-col gap-1.5">
            <div className="font-mono text-neutral-400">مرحله ۱ (۰.۰۰ - ۰.۲۸)</div>
            <div className="font-bold text-neutral-200 text-sm">تغذیه و انباشت اسناد</div>
            <p className="text-neutral-400 leading-relaxed">
              ۴ برگه مجزا (اکسل محصولات، مشخصات فنی، پیش‌فاکتور سنتی، کاتالوگ چاپی) از مخزن انباشت به میز هدایت می‌شوند.
            </p>
          </div>

          <div className="p-4 border border-neutral-800 bg-neutral-950/60 rounded-none flex flex-col gap-1.5">
            <div className="font-mono text-neutral-400">مرحله ۲ (۰.۲۸ - ۰.۴۵)</div>
            <div className="font-bold text-neutral-200 text-sm">فرود اهرم و ضربه مهر</div>
            <p className="text-neutral-400 leading-relaxed">
              چرخ‌دستی و پیچ پرس دوران کرده، سنبه پایین آمده و مهر زرشکی با بافت گرانج «باطل شد» روی اسناد می‌نشیند.
            </p>
          </div>

          <div className="p-4 border border-neutral-800 bg-neutral-950/60 rounded-none flex flex-col gap-1.5">
            <div className="font-mono text-neutral-400">مرحله ۳ (۰.۴۵ - ۰.۷۲)</div>
            <div className="font-bold text-neutral-200 text-sm">سقوط کاغذها و تفکیک داده</div>
            <p className="text-neutral-400 leading-relaxed">
              تیغه اخراج کاغذها را به جلو هل داده، اسناد سنتی به پایین سقوط می‌کنند و ۴ ماژول داده در فضا معلق می‌مانند.
            </p>
          </div>

          <div className="p-4 border border-neutral-800 bg-neutral-950/60 rounded-none flex flex-col gap-1.5">
            <div className="font-mono text-neutral-400">مرحله ۴ (۰.۷۲ - ۱.۰۰)</div>
            <div className="font-bold text-neutral-200 text-sm">صعود شاسی و اتصال ماژول‌ها</div>
            <p className="text-neutral-400 leading-relaxed">
              شاسی کاتالوگ تعاملی رخنما از چاهک بالا آمده و ۴ ماژول داده درون درگاه‌های اختصاصی آن مستقر می‌شوند.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
