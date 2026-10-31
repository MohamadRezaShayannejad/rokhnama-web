'use client';

import { useState, useEffect } from 'react';
import ScenariosLayout1 from '@/ui/scenarios/ScenariosLayout1';
import ScenariosLayout2 from '@/ui/scenarios/ScenariosLayout2';
import ScenariosLayout3 from '@/ui/scenarios/ScenariosLayout3';
import { Button } from '@/ui/Button';
import { IconCheck } from '@tabler/icons-react';

const LAYOUTS = [
  { key: 'layout1', label: 'اتود ۱: دفتر تطبیق', code: 'LAYOUT-01 / LEDGER' },
  { key: 'layout2', label: 'اتود ۲: نقشهٔ اتصال', code: 'LAYOUT-02 / WIRING' },
  { key: 'layout3', label: 'اتود ۳: شاخص تایپوگرافیک', code: 'LAYOUT-03 / INDEX' },
] as const;

type LayoutKey = (typeof LAYOUTS)[number]['key'];

export default function ScenariosPreviewPage() {
  const [activeTab, setActiveTab] = useState<'all' | LayoutKey>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ industry: string }>;
      if (customEvent.detail?.industry) {
        setSelectedIndustry(customEvent.detail.industry);
      }
    };
    window.addEventListener('rokhnama:select-industry', handleSelect);
    return () => window.removeEventListener('rokhnama:select-industry', handleSelect);
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--color-neutral-900)] font-sans tracking-[-0.02em]">
      {/* نوار انتخاب اتود */}
      <div className="sticky top-0 z-50 bg-white border-b border-[var(--color-neutral-200)] px-6 py-4">
        <div className="max-w-[1408px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-[-0.02em]">
              پیش‌نمایش ۳ اتود سکشن کاربردها (#scenarios)
            </h1>
            <p className="text-xs text-[var(--color-neutral-600)] mt-1 font-medium">
              هر سه اتود یک محتوا را با سه ساختار متفاوت نشان می‌دهند. روی هر صنعت کلیک کنید؛ فرم دمو برای همان صنعت پر می‌شود.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto bg-[var(--color-neutral-100)] p-1 border border-[var(--color-neutral-200)]">
            <Button
              size="sm"
              color={activeTab === 'all' ? 'primary' : 'white'}
              variant="solid"
              cursorEffect={false}
              onClick={() => setActiveTab('all')}
              className="text-xs font-bold h-8 px-3"
            >
              <span>هر ۳ اتود</span>
            </Button>
            {LAYOUTS.map((layout) => (
              <Button
                key={layout.key}
                size="sm"
                color={activeTab === layout.key ? 'primary' : 'white'}
                variant="solid"
                cursorEffect={false}
                onClick={() => setActiveTab(layout.key)}
                className="text-xs font-bold h-8 px-3"
              >
                <span>{layout.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* وضعیت انتخاب تعاملی */}
      {selectedIndustry && (
        <div className="sticky top-[73px] z-40 bg-[var(--color-primary-600)] text-white px-6 py-2.5 shadow-md">
          <div className="max-w-[1408px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <IconCheck size={18} stroke={2.5} />
              <span>صنعت انتخاب‌شده:</span>
              <span className="underline underline-offset-4">{selectedIndustry}</span>
              <span className="opacity-80 font-normal hidden sm:inline">(فرم دمو به‌طور خودکار با این صنعت تنظیم شد)</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedIndustry(null)}
              className="text-xs font-bold underline opacity-80 hover:opacity-100 cursor-pointer"
            >
              بستن
            </button>
          </div>
        </div>
      )}

      <div className="space-y-16 py-8">
        {(activeTab === 'all' || activeTab === 'layout1') && (
          <LayoutFrame
            title="اتود ۱ — دفتر تطبیق (Fit Ledger): جدول مویی هشت ردیفی؛ صنعت، کاری که کاتالوگ انجام می‌دهد، و نام قابلیت"
            code={LAYOUTS[0].code}
          >
            <ScenariosLayout1 />
          </LayoutFrame>
        )}

        {(activeTab === 'all' || activeTab === 'layout2') && (
          <LayoutFrame
            title="اتود ۲ — نقشهٔ اتصال (Wiring Map): صنعت در راست و قابلیت در چپ، با خط مویی که در هاور ضخیم و پررنگ می‌شود"
            code={LAYOUTS[1].code}
          >
            <ScenariosLayout2 />
          </LayoutFrame>
        )}

        {(activeTab === 'all' || activeTab === 'layout3') && (
          <LayoutFrame
            title="اتود ۳ — شاخص تایپوگرافیک (Type Index): سرصفحهٔ چسبان در راست و هشت نام صنعت درشت در دو ستون چهارتایی"
            code={LAYOUTS[2].code}
          >
            <ScenariosLayout3 />
          </LayoutFrame>
        )}
      </div>

      {/* بخش تست درخواست دمو */}
      <section
        id="demo"
        className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--color-neutral-300)] my-12"
      >
        <div className="bg-white border border-[var(--color-neutral-200)] p-8 max-w-xl mx-auto">
          <h3 className="text-xl font-black text-[var(--color-neutral-900)] mb-4">
            شبیه‌ساز فرم درخواست دمو (#demo)
          </h3>
          <p className="text-sm text-[var(--color-neutral-600)] mb-6 font-medium">
            هنگام کلیک روی هر صنعت در اتودهای بالا، این فیلد به‌طور خودکار پر شده و صفحه به اینجا اسکرول می‌کند.
          </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="demo-industry-field" className="text-xs font-bold text-[var(--color-neutral-700)]">
              صنعت انتخاب‌شده:
            </label>
            <input
              id="demo-industry-field"
              name="industry"
              type="text"
              readOnly
              placeholder="هنوز صنعتی انتخاب نشده..."
              className="h-12 px-4 bg-[var(--color-neutral-50)] border border-[var(--color-neutral-300)] text-sm font-bold text-[var(--color-primary-900)] focus:outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function LayoutFrame({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-x border-t border-[var(--color-neutral-300)] px-6 py-3 flex items-center justify-between gap-6">
          <span className="text-sm font-bold text-[var(--color-primary-900)]">{title}</span>
          <span className="hidden sm:block text-xs text-[var(--color-neutral-600)] font-mono shrink-0">
            {code}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
