"use server";

import {
  hasErrors,
  toLead,
  validateDemoForm,
  type DemoFormValues,
  type DemoSubmitState,
} from "@/lib/demo-form";
import { DEMO_LEADS_TABLE, supabaseAdmin } from "@/lib/supabase";
import { notifyLead } from "@/lib/telegram";

/* بدنهٔ درخواست از بیرون میآید، پس شکل مقادیر قابل اعتماد نیست */
function readValues(input: DemoFormValues): DemoFormValues {
  const text = (value: unknown) => (typeof value === "string" ? value : "");
  return {
    name: text(input?.name),
    company: text(input?.company),
    mobile: text(input?.mobile),
    industry: text(input?.industry),
    site: text(input?.site),
    note: text(input?.note),
  };
}

/**
 * اعتبارسنجی نهایی، ثبت سرنخ در دیتابیس و اطلاعرسانی در تلگرام.
 *
 * ترتیب عمدی است: اول ثبت، بعد اطلاعرسانی. اگر ثبت موفق شود ولی تلگرام
 * خطا بدهد پاسخ همچنان «sent» است تا کاربر دوباره نفرستد و سرنخ تکراری
 * ساخته نشود — سرنخ همین حالا ذخیره شده است.
 */
export async function submitDemoLead(
  values: DemoFormValues
): Promise<DemoSubmitState> {
  const safeValues = readValues(values);
  const errors = validateDemoForm(safeValues);
  if (hasErrors(errors)) {
    return { status: "invalid", errors };
  }

  const lead = toLead(safeValues);

  try {
    const { error } = await supabaseAdmin()
      .from(DEMO_LEADS_TABLE)
      .insert(lead);
    if (error) throw error;
  } catch (error) {
    console.error("[demo-lead] insert failed", error);
    return { status: "failed", reason: "server" };
  }

  try {
    await notifyLead(lead);
  } catch (error) {
    console.error("[demo-lead] notify failed", error);
  }

  return { status: "sent" };
}