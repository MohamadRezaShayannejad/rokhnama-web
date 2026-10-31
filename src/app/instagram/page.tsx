import { IconBrandInstagram } from '@tabler/icons-react';

/* نماد هندسی رُخ‌نما (فقط آیکون بدون تایپوگرافی) */
function RokhnamaSymbol({ className }: { className?: string }) {
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
        fill="var(--color-primary-500)"
      />
    </svg>
  );
}

const MENU_ITEMS = [
  'ویترین', 'مقایسه', 'سناریوها', 'تعرفه', 'زیرساخت', 'درباره ما',
];

export default function InstagramPage() {
  return (
    <main className="min-h-screen bg-[var(--color-neutral-50)] px-4 py-10 tracking-[-0.02em] text-[var(--color-neutral-900)] sm:px-6 lg:px-8">
      {/* هویت بولدتر — سربرگ با نماد، نام و شناسه */}
      <header className="mx-auto mb-10 flex max-w-7xl items-center justify-between gap-11">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-none bg-[var(--color-primary-800)]">
            <RokhnamaSymbol className="h-9 w-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black leading-none tracking-[-0.02em] text-[var(--color-primary-950)]">
              رُخ‌نما
            </h1>
            <p className="mt-1 text-sm text-[var(--color-neutral-500)]">@Rokhnama_ir</p>
          </div>
        </div>

        {/* منو — آیتم‌ها یک سایز کوچک‌تر */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {MENU_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-semibold text-[var(--color-neutral-700)] hover:text-[var(--color-primary-800)] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="inline-flex items-center gap-1.5 border border-[var(--color-neutral-300)] bg-white px-3 py-1.5 text-sm font-bold text-[var(--color-neutral-900)] transition-colors duration-200 hover:border-[var(--color-neutral-400)]"
          >
            <IconBrandInstagram size={16} />
            پست بگذارید
          </a>
        </nav>
      </header>

      {/* پروفایل */}
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 border border-[var(--border-neutral-base)] bg-white p-8 sm:p-10 lg:grid-cols-[220px_1fr]">
          {/* ستون سمت راست: آواتار و آمار */}
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[var(--color-primary-200)] bg-[var(--color-primary-50)]">
              <RokhnamaSymbol className="h-14 w-14 text-[var(--color-primary-800)]" />
            </div>

            <ul className="flex w-full justify-between border-t border-[var(--border-neutral-base)] pt-5 sm:w-auto sm:flex-col sm:items-start sm:border-0 sm:pt-0">
              <li className="text-center sm:text-right">
                <span className="block text-xl font-bold text-[var(--color-neutral-900)]">۸</span>
                <span className="text-xs text-[var(--color-neutral-500)]">پست</span>
              </li>
              <li className="text-center sm:text-right">
                <span className="block text-xl font-bold text-[var(--color-neutral-900)]">۲۴ هزار</span>
                <span className="text-xs text-[var(--color-neutral-500)]">دنبال‌کننده</span>
              </li>
              <li className="text-center sm:text-right">
                <span className="block text-xl font-bold text-[var(--color-neutral-900)]">۱۴۲</span>
                <span className="text-xs text-[var(--color-neutral-500)]">دنبال‌شونده</span>
              </li>
            </ul>
          </div>

          {/* ستون سمت چپ: اطلاعات */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-black leading-none text-[var(--color-primary-950)]">
                رُخ‌نما
              </h2>
              <p className="text-sm text-[var(--color-neutral-500)]">@Rokhnama_ir · رُخ‌نما زیرساخت دیجیتال</p>
            </div>

            <p className="text-base leading-6 text-[var(--color-neutral-800)]">
              <span className="font-bold text-[var(--color-neutral-900)]">تحت حمایت و همکاری</span>{' '}
              مرکز تحقیق و نوآوری همراه اول
            </p>

            <p className="text-base leading-6 font-semibold text-[var(--color-neutral-900)]">
              کاتالوگ‌تان را به ویترین دیجیتال تعاملی تبدیل می‌کنیم؛ متصل به انبار، هم‌گام با قیمت
              روز و مجهز به تحلیل رفتار خریدار.
            </p>

            <p className="text-base leading-6 text-[var(--color-neutral-800)]">
              داخل همان اکوسیستمی کار می‌کنیم که برایش محصول می‌سازیم.
            </p>

            <address className="flex flex-col gap-0.5 not-italic text-base text-[var(--color-neutral-700)]">
              <span>تهران، ولنجک</span>
              <span>دانشگاه شهید بهشتی</span>
              <span>برج فناوری</span>
              <strong className="text-lg font-extrabold text-[var(--color-primary-800)]">
                طبقهٔ ششم
              </strong>
            </address>
          </div>
        </div>

        {/* خط جداکننده */}
        <div className="mt-8 h-[1px] w-full bg-[var(--color-neutral-200)]" />

        {/* منو — آیتم‌ها یک سایز کوچک‌تر */}
        <nav aria-label="منوی پروفایل" className="mt-4 flex flex-wrap gap-2">
          {MENU_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center gap-2 rounded-none border border-[var(--color-neutral-200)] bg-white px-3.5 py-2 text-sm font-semibold text-[var(--color-neutral-700)] transition-colors duration-200 hover:border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-50)]"
            >
              {item}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
