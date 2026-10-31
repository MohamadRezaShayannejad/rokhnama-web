export const SITE_NAME = "رُخنما";

export const SITE_TITLE = "رُخنما | ویترین دیجیتال کسب‌وکار فیزیکی‌تان";

export const SITE_DESCRIPTION =
  "رُخنما کاتالوگ دیجیتال تعاملی کسب‌وکار شماست؛ محصولات، قیمت‌ها و موجودی همیشه به‌روز، در یک لینک قابل اشتراک با مشتری.";

function normalize(url: string) {
  const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  return withProtocol.replace(/\/+$/, "");
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return normalize(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return normalize(vercel);

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
