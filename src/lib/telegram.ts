import "server-only";
import type { DemoLead } from "@/lib/demo-form";

/** TELEGRAM_CHAT_ID میتواند چند شناسه باشد که با کاما جدا شدهاند. */
function recipients(): string[] {
  return (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/**
 * اطلاعرسانی سرنخ جدید در تلگرام.
 * اگر متغیرهای محیطی ست نشده باشند بیصدا رد میشود تا نبود این قابلیت
 * جلوی ذخیرهٔ سرنخ را نگیرد.
 */
export async function notifyLead(lead: DemoLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = recipients();
  if (!token || chatIds.length === 0) return;

  /* متن خام است و parse_mode ست نمیشود: مقادیر از ورودی کاربر میآیند و
     با HTML یا Markdown هر کسی میتوانست قالب پیام را بهم بریزد. */
  const text = [
    "سرنخ دموی جدید",
    `نام: ${lead.name}`,
    `شرکت: ${lead.company}`,
    `موبایل: ${lead.mobile}`,
    `حوزه: ${lead.industry}`,
    lead.site ? `سایت: ${lead.site}` : null,
    lead.note ? `یادداشت: ${lead.note}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await Promise.all(
    chatIds.map(async (chatId) => {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
          signal: AbortSignal.timeout(5000),
        }
      );
      if (!response.ok) {
        throw new Error(
          `telegram ${chatId} failed: ${response.status} ${await response.text()}`
        );
      }
    })
  );
}
