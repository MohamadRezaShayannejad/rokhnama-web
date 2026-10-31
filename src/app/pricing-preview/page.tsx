'use client';

import React, { useState } from 'react';
import PricingLayout1 from '@/ui/pricing/PricingLayout1';
import PricingLayout2 from '@/ui/pricing/PricingLayout2';
import PricingLayout3 from '@/ui/pricing/PricingLayout3';
import { Button } from '@/ui/Button';

export default function PricingPreviewPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'layout1' | 'layout2' | 'layout3'>('all');

  return (
    <div dir="rtl" className="min-h-screen bg-[var(--color-neutral-base)] text-[var(--color-neutral-900)] font-sans">
      {/* هدر صفحه مقایسه و انتخاب اتودها */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--color-neutral-200)] px-6 py-4">
        <div className="max-w-[1408px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--color-neutral-900)] tracking-[-0.02em]">
              پیش‌نمایش ۳ اتود سکشن تعرفه‌ها و ماشین‌حساب (#pricing)
            </h1>
            <p className="text-xs text-[var(--color-neutral-500)] mt-0.5 font-medium">
              سه چیدمان (Layout) متفاوت برای انتخاب نسخه نهایی؛ تعامل با اسلایدرها در هر سه اتود فعال و زنده است.
            </p>
          </div>

          {/* تب‌های جابه‌جایی سریع */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[var(--color-neutral-100)] p-1 rounded-none border border-[var(--color-neutral-200)]">
            <Button
              size="sm"
              color={activeTab === 'all' ? 'primary' : 'white'}
              variant="solid"
              cursorEffect={false}
              onClick={() => setActiveTab('all')}
              className="text-xs font-bold h-8 px-3 rounded-none"
            >
              <span>مشاهده هر ۳ اتود</span>
            </Button>
            <Button
              size="sm"
              color={activeTab === 'layout1' ? 'primary' : 'white'}
              variant="solid"
              cursorEffect={false}
              onClick={() => setActiveTab('layout1')}
              className="text-xs font-bold h-8 px-3 rounded-none"
            >
              <span>اتود ۱: ترازنامه دوتکه</span>
            </Button>
            <Button
              size="sm"
              color={activeTab === 'layout2' ? 'primary' : 'white'}
              variant="solid"
              cursorEffect={false}
              onClick={() => setActiveTab('layout2')}
              className="text-xs font-bold h-8 px-3 rounded-none"
            >
              <span>اتود ۲: ۳ ستون عمودی</span>
            </Button>
            <Button
              size="sm"
              color={activeTab === 'layout3' ? 'primary' : 'white'}
              variant="solid"
              cursorEffect={false}
              onClick={() => setActiveTab('layout3')}
              className="text-xs font-bold h-8 px-3 rounded-none"
            >
              <span>اتود ۳: بنتو فوکوس</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-16 py-8">
        {/* اتود ۱ */}
        {(activeTab === 'all' || activeTab === 'layout1') && (
          <div className="space-y-2">
            <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border-x border-t border-[var(--color-neutral-300)] px-6 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--color-primary-900)]">
                  اتود ۱ — ترازنامه دوتکه (Split Ledger): کنترلرها و فاکتور مهرخورده در راست + ۳ پلن افقی روی هم در چپ
                </span>
                <span className="text-xs text-[var(--color-neutral-500)] font-mono">LAYOUT-01 / SPLIT</span>
              </div>
            </div>
            <PricingLayout1 />
          </div>
        )}

        {/* اتود ۲ */}
        {(activeTab === 'all' || activeTab === 'layout2') && (
          <div className="space-y-2">
            <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border-x border-t border-[var(--color-neutral-300)] px-6 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--color-primary-900)]">
                  اتود ۲ — نوار کنترلر بالا + ۳ ستون عمودی: اسلایدرها و فاکتور در بالا + سه پلن عمودی کنار هم در میانه + ۳ باکس محیط‌زیستی تمام‌عرض در پایین
                </span>
                <span className="text-xs text-[var(--color-neutral-500)] font-mono">LAYOUT-02 / 3-COLUMNS</span>
              </div>
            </div>
            <PricingLayout2 />
          </div>
        )}

        {/* اتود ۳ */}
        {(activeTab === 'all' || activeTab === 'layout3') && (
          <div className="space-y-2">
            <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border-x border-t border-[var(--color-neutral-300)] px-6 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--color-primary-900)]">
                  اتود ۳ — بنتو گرید متمرکز بر ارزش (Bento Focus): پلن اختصاصی پرایمری در کانون + بال‌های کمکی در طرفین + داشبورد فاکتور و طبیعت در طبقه زیرین
                </span>
                <span className="text-xs text-[var(--color-neutral-500)] font-mono">LAYOUT-03 / BENTO</span>
              </div>
            </div>
            <PricingLayout3 />
          </div>
        )}
      </div>
    </div>
  );
}
