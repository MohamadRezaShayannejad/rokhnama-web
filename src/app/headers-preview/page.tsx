import HeaderV1 from '@/ui/headers/HeaderV1';
import HeaderV2 from '@/ui/headers/HeaderV2';
import HeaderV3 from '@/ui/headers/HeaderV3';
import HeaderV4 from '@/ui/headers/HeaderV4';

// صفحه پیش‌نمایش ۴ واریانت هاور هدر برای انتخاب مدل نهایی
export default function HeadersPreviewPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-10 space-y-10">
        {/* سرخط صفحه پیش‌نمایش */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[var(--text-neutral-strong)]">پیش‌نمایش ۴ مدل هاور هدر</h1>
          <p className="text-base text-[var(--text-neutral-base)]">
            هر مدل یک دوپلیکیت کامل از هدر است؛ ماوس را روی آیتم‌ها ببرید و مدل نهایی را انتخاب کنید.
          </p>
        </div>

        {/* مدل ۱ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">مدل ۱ — زیرخط دوقلوی تحریری</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">خط موی سفید ثابت + خط طلایی دوم که از راست پر می‌شود.</p>
          </div>
          <HeaderV1 fixed={false} />
        </section>

        {/* مدل ۲ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">مدل ۲ — پرشدن جهت‌دار از نقطه ماوس</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">زمینه طلایی از محل ورود ماوس گسترش می‌یابد؛ متن تیره می‌شود.</p>
          </div>
          <HeaderV2 fixed={false} />
        </section>

        {/* مدل ۳ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">مدل ۳ — تای گوشه کاغذی</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">مثلث طلایی ۱۰ پیکسلی هم‌اندازه برش دکمه در گوشه لینک باز می‌شود.</p>
          </div>
          <HeaderV3 fixed={false} />
        </section>

        {/* مدل ۴ */}
        <section className="border border-[var(--border-neutral-subtle)]">
          <div className="px-4 py-3 border-b border-[var(--border-neutral-subtle)]">
            <h2 className="text-base font-black text-[var(--text-neutral-strong)]">مدل ۴ — خیزش تایپوگرافیک با لوزی طلایی</h2>
            <p className="text-sm text-[var(--text-neutral-subtle)]">واژه ۳ پیکسل بالا می‌رود و لوزی طلایی بالای آن ظاهر می‌شود.</p>
          </div>
          <HeaderV4 fixed={false} />
        </section>
      </div>
    </div>
  );
}
