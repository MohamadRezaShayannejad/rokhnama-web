import { toLatinDigits } from "@/lib/fa";

/* منبع یگانهٔ حقیقت فرم درخواست دمو — مشترک بین کلاینت و Server Action.
   هیچ directive نداشته باشد: نه "use client" و نه "use server". */

export const INDUSTRIES = [
  "قطعات یدکی خودرو",
  "برق، ابزار و اتوماسیون",
  "پوشاک، کیف و کفش",
  "تجهیزات پزشکی و آزمایشگاهی",
  "مصالح و تجهیزات ساختمانی",
  "لوازم خانگی و یراقآلات",
  "ماشینآلات و تجهیزات تولید",
  "شیرآلات و پایپینگ",
  "سایر صنایع",
] as const;

export const DEMO_LIMITS = {
  nameMin: 3,
  nameMax: 100,
  companyMin: 2,
  companyMax: 100,
  noteMax: 500,
  urlMax: 2048,
} as const;

export const MOBILE_RE = /^09\d{9}$/;

/* از رشته ساخته میشود چون هدف ES2017 اعلان regex با property escape را رد میکند. */
const LETTER_RE = new RegExp("\\p{L}", "u");
const NAME_PART_SPLIT_RE = /[\s\u200c\u2010-\u2015.\-]+/;
const MOBILE_SEPARATOR_RE = /[\s\u200c()\u2010-\u2015.\-]/g;
const NON_DIGIT_RE = /\D/;
const SCHEME_RE = /^[a-z][a-z0-9+.-]*:\/\//i;

export const DEMO_MESSAGES = {
  nameRequired: "نام و نام خانوادگی را وارد کنید",
  nameIncomplete: "نام و نام خانوادگی را کامل بنویسید",
  nameTooShort: "نام واردشده کوتاه است",
  nameTooLong: "نام نباید بیشتر از ۱۰۰ کاراکتر باشد",
  nameLetters: "نام را با حروف وارد کنید",
  companyRequired: "نام شرکت یا برند را وارد کنید",
  companyTooShort: "نام واردشده کوتاه است",
  companyTooLong: "نام شرکت نباید بیشتر از ۱۰۰ کاراکتر باشد",
  mobileRequired: "شماره موبایل را وارد کنید",
  mobileLength: "شماره موبایل باید ۱۱ رقم باشد",
  mobilePrefix: "شماره باید با ۰۹ شروع شود",
  mobileInvalid: "شماره موبایل را بهدرستی وارد کنید",
  industryRequired: "حوزهٔ فعالیت را انتخاب کنید",
  industryNotInList: "یکی از گزینههای فهرست را انتخاب کنید",
  urlInvalid: "آدرس یا لینک را بررسی کنید",
  urlProtocol: "لینک باید با آدرس وب معتبر وارد شود",
  urlTooLong: "لینک بیش از حد طولانی است",
  noteTooLong: "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
  submitValidation: "اطلاعات مشخصشده را بررسی کنید",
  submitNetwork: "ارسال درخواست انجام نشد، دوباره تلاش کنید",
  submitFallback:
    "ارسال درخواست انجام نشد، دوباره تلاش کنید یا از تلگرام با ما در ارتباط باشید",
} as const;

export type DemoFieldKey =
  | "name"
  | "company"
  | "mobile"
  | "industry"
  | "site"
  | "note";

/** ترتیب DOM فیلدها — مبنای انتقال فوکوس به اولین فیلد نامعتبر */
export const DEMO_FIELD_ORDER: readonly DemoFieldKey[] = [
  "name",
  "company",
  "mobile",
  "industry",
  "site",
  "note",
];

export interface DemoFormValues {
  name: string;
  company: string;
  mobile: string;
  industry: string;
  site: string;
  note: string;
}

export type DemoFormErrors = Partial<Record<DemoFieldKey, string>>;

export interface DemoLead {
  name: string;
  company: string;
  mobile: string;
  industry: string;
  site: string | null;
  note: string;
}

export type DemoSubmitState =
  | { status: "invalid"; errors: DemoFormErrors }
  | { status: "sent" }
  | { status: "failed"; reason: "network" | "server" };

export type UrlCheck =
  | { ok: true; value: string | null }
  | { ok: false; error: string };

export function emptyDemoForm(): DemoFormValues {
  return { name: "", company: "", mobile: "", industry: "", site: "", note: "" };
}

/** ارقام فارسی و عربی به لاتین، سپس حذف جداکنندههای مجاز. خروجی هنوز اعتبارسنجی نشده است. */
export function normalizeMobile(raw: string): string {
  return toLatinDigits(raw.trim()).replace(MOBILE_SEPARATOR_RE, "");
}

function countNameParts(value: string): number {
  return value.split(NAME_PART_SPLIT_RE).filter((part) => LETTER_RE.test(part))
    .length;
}

export function validateName(raw: string): string | undefined {
  const v = raw.trim();
  if (!v) return DEMO_MESSAGES.nameRequired;
  /* پیش از بررسی تکبخشی: «۱۲۳۴» باید پیام حروف بگیرد، نه پیام نام ناقص */
  if (!LETTER_RE.test(v)) return DEMO_MESSAGES.nameLetters;
  if (v.length > DEMO_LIMITS.nameMax) return DEMO_MESSAGES.nameTooLong;
  if (countNameParts(v) < 2) return DEMO_MESSAGES.nameIncomplete;
  if (v.length < DEMO_LIMITS.nameMin) return DEMO_MESSAGES.nameTooShort;
  return undefined;
}

export function validateCompany(raw: string): string | undefined {
  const v = raw.trim();
  if (!v) return DEMO_MESSAGES.companyRequired;
  if (v.length > DEMO_LIMITS.companyMax) return DEMO_MESSAGES.companyTooLong;
  if (v.length < DEMO_LIMITS.companyMin) return DEMO_MESSAGES.companyTooShort;
  return undefined;
}

export function validateMobile(raw: string): string | undefined {
  if (!raw.trim()) return DEMO_MESSAGES.mobileRequired;
  const clean = normalizeMobile(raw);
  /* نویسهٔ غیرمجاز پیش از طول بررسی میشود تا «ab123456789» پیام دقیقتری بگیرد */
  if (NON_DIGIT_RE.test(clean)) return DEMO_MESSAGES.mobileInvalid;
  if (clean.length !== 11) return DEMO_MESSAGES.mobileLength;
  if (!/^09/.test(clean)) return DEMO_MESSAGES.mobilePrefix;
  return undefined;
}

export function validateIndustry(raw: string): string | undefined {
  if (!raw) return DEMO_MESSAGES.industryRequired;
  if (!(INDUSTRIES as readonly string[]).includes(raw)) {
    return DEMO_MESSAGES.industryNotInList;
  }
  return undefined;
}

/** این تابع هیچوقت آدرس را باز یا دریافت نمیکند؛ اگر بعداً چنین شد، محافظت SSRF لازم است. */
export function checkUrl(raw: string): UrlCheck {
  const v = raw.trim();
  if (!v) return { ok: true, value: null };
  if (v.length > DEMO_LIMITS.urlMax) {
    return { ok: false, error: DEMO_MESSAGES.urlTooLong };
  }
  const candidate = SCHEME_RE.test(v) ? v : `https://${v}`;
  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return { ok: false, error: DEMO_MESSAGES.urlInvalid };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: DEMO_MESSAGES.urlProtocol };
  }
  if (!parsed.hostname.includes(".")) {
    return { ok: false, error: DEMO_MESSAGES.urlInvalid };
  }
  return { ok: true, value: parsed.toString() };
}

export function validateSite(raw: string): string | undefined {
  const result = checkUrl(raw);
  return result.ok ? undefined : result.error;
}

export function validateNote(raw: string): string | undefined {
  if (raw.length > DEMO_LIMITS.noteMax) return DEMO_MESSAGES.noteTooLong;
  return undefined;
}

export function validateDemoField(
  key: DemoFieldKey,
  values: DemoFormValues
): string | undefined {
  switch (key) {
    case "name":
      return validateName(values.name);
    case "company":
      return validateCompany(values.company);
    case "mobile":
      return validateMobile(values.mobile);
    case "industry":
      return validateIndustry(values.industry);
    case "site":
      return validateSite(values.site);
    case "note":
      return validateNote(values.note);
  }
}

export function validateDemoForm(values: DemoFormValues): DemoFormErrors {
  const errors: DemoFormErrors = {};
  for (const key of DEMO_FIELD_ORDER) {
    const error = validateDemoField(key, values);
    if (error) errors[key] = error;
  }
  return errors;
}

export function hasErrors(errors: DemoFormErrors): boolean {
  return DEMO_FIELD_ORDER.some((key) => Boolean(errors[key]));
}

export function toLead(values: DemoFormValues): DemoLead {
  const site = checkUrl(values.site);
  return {
    name: values.name.trim(),
    company: values.company.trim(),
    mobile: normalizeMobile(values.mobile),
    industry: values.industry,
    site: site.ok ? site.value : null,
    note: values.note.trim(),
  };
}
