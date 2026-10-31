'use client';

import Hero from '@/ui/Hero';
import FeaturesShowcase from '@/ui/FeaturesShowcase';
import CompareSection from '@/ui/CompareSection';
import MigrationProcess from '@/ui/MigrationProcess';
import InfrastructureA from '@/ui/InfrastructureA';
import ProjectsSection from '@/ui/ProjectsSection';
import UserSegments from '@/ui/UserSegments';
import PricingSection from '@/ui/PricingSection';
import BackgroundFrame from '@/ui/BackgroundFrame';
import BackingSection from '@/ui/BackingSection';
import AboutSection from '@/ui/AboutSection';
import Footer from '@/ui/Footer';

export default function Home() {
  return (
    <div className="bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans min-h-screen relative" dir="rtl">
      {/* خطوط عمودی ممتد در سراسر صفحه بر اساس فیگما */}
      <BackgroundFrame />

      <main className="flex flex-col relative z-10 w-full">
        <Hero />

        {/* ویترین تعاملی محصول */}
        <FeaturesShowcase />

        {/* مقایسه با کاتالوگ کاغذی و PDF (ماتریس مهندسی ۴ ستونه) */}
        <CompareSection />

        {/* کاتالوگ — مسیر مهاجرت و انتقال از کاتالوگ قدیمی به رُخ‌نما */}
        <MigrationProcess />

        {/* زیرساخت بومی و امنیت داده‌ها */}
        <InfrastructureA />

        {/* کاربردها و سناریوها: کاربر سگمنت‌ها (#scenarios) */}
        <UserSegments />

        {/* نمونه‌کارها (#projects) */}
        <ProjectsSection />

        {/* ماشین‌حساب چاپ و پلن‌های تعرفه (#pricing) */}
        <PricingSection />
      </main>

      {/* درباره ما — نسخهٔ متن، بالای سکشن اصلی */}
      <AboutSection />

      {/* درخواست دمو و ثبت سفارش (#demo) — بالای فوتر */}
      <BackingSection />

      <Footer />
    </div>
  );
}
