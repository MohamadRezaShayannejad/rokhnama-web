const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** ارقام فارسی/عربی به لاتین، برای اعتبارسنجی و ارسال فرم */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

export function toPersianDigits(n: number | string): string {
  return n
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٬')
    .replace(/\d/g, (x) => PERSIAN_DIGITS[parseInt(x, 10)]);
}
