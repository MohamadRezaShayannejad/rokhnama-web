/** سرصفحهٔ بخش نمونه‌کارها — عنوان کوچک‌تر، دو سطری، وسط‌چین */
export default function ProjectsSectionHeading() {
  return (
    <div data-projects-heading className="mb-12 sm:mb-14 text-center mx-auto max-w-2xl px-6 sm:px-0">
      <h2 className="tracking-[-0.02em]">
        <span className="block text-xl sm:text-3xl lg:text-[38px] font-black leading-tight tracking-[-0.02em] text-[var(--color-neutral-900)]">
          تجربهٔ واقعی یک کاتالوگ تعاملی
        </span>
        <span className="mt-2.5 block text-lg sm:text-xl lg:text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-neutral-700)] leading-normal">
          سه نسخه از کاتالوگ رُخ‌نما
        </span>
      </h2>
    </div>
  );
}
