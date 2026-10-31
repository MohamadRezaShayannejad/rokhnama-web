'use client';

import { useRef, useState } from 'react';
import {
  IconArrowLeft,
  IconBriefcase,
  IconBuilding,
  IconLink,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import { Select } from '@/ui/Select';
import { Textarea } from '@/ui/Textarea';
import { submitDemoLead } from '@/app/actions/demo';
import DemoSuccessModal from '@/ui/DemoSuccessModal';
import {
  DEMO_FIELD_ORDER,
  DEMO_MESSAGES,
  INDUSTRIES,
  emptyDemoForm,
  hasErrors,
  validateDemoField,
  validateDemoForm,
  type DemoFieldKey,
  type DemoFormErrors,
} from '@/lib/demo-form';

/**
 * فرم درخواست دمو (#demo) — اعتبارسنجی دولایه.
 * کلاینت برای بازخورد سریع، و Server Action برای اعتبارسنجی نهایی پیش از ثبت.
 */

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type Status = 'idle' | 'sending' | 'sent';

interface ControlA11y {
  id: string;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
}

/** سیم‌کشی دسترس‌پذیری از طریق render prop اجباری می‌شود تا در هیچ فیلدی جا نیفتد */
function DemoField({
  id,
  label,
  required,
  error,
  counter,
  renderControl,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  counter?: string;
  renderControl: (a11y: ControlA11y) => React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const counterId = `${id}-counter`;
  const describedBy =
    [error ? errorId : null, counter ? counterId : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className="flex flex-col gap-3">
      <Label
        htmlFor={id}
        intent={error ? 'error' : 'base'}
        required={required}
      >
        {label}
      </Label>
      {renderControl({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })}
      {error && (
        <p id={errorId} className="text-xs font-semibold text-[var(--color-error-600)]">
          {error}
        </p>
      )}
      {counter && (
        <span
          id={counterId}
          className="text-xs text-[var(--text-neutral-subtle)]"
        >
          {counter}
        </span>
      )}
    </div>
  );
}

export default function DemoRequestForm() {
  const refs = useRef<Partial<Record<DemoFieldKey, FieldElement | null>>>({});

  const [values, setValues] = useState(emptyDemoForm);
  const [errors, setErrors] = useState<DemoFormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const successOpen = status === 'sent';

  const bind =
    (key: DemoFieldKey) =>
    (el: FieldElement | null) => {
      refs.current[key] = el;
    };

  function handleChange(key: DemoFieldKey) {
    return (e: React.ChangeEvent<FieldElement>) => {
      const next = { ...values, [key]: e.target.value };
      setValues(next);
      /* پس از نمایش خطا، همان فیلد بازبینی می‌شود و در صورت معتبرشدن حذف می‌شود */
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: validateDemoField(key, next) }));
      }
    };
  }

  function handleBlur(key: DemoFieldKey) {
    return () => {
      setErrors((prev) => ({ ...prev, [key]: validateDemoField(key, values) }));
    };
  }

  function focusFirstInvalid(nextErrors: DemoFormErrors) {
    for (const key of DEMO_FIELD_ORDER) {
      if (nextErrors[key]) {
        refs.current[key]?.focus();
        return;
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const clientErrors = validateDemoForm(values);
    if (hasErrors(clientErrors)) {
      setErrors(clientErrors);
      setFormError(DEMO_MESSAGES.submitValidation);
      focusFirstInvalid(clientErrors);
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus('sending');

    try {
      const result = await submitDemoLead(values);

      if (result.status === 'sent') {
        setStatus('sent');
        /* فرم زیر مودال خالی میشود تا بستن مودال به فرم تازه برسد، نه پاسخ تکراری */
        setValues(emptyDemoForm());
        setErrors({});
        setFormError(null);
        return;
      }

      setStatus('idle');

      if (result.status === 'invalid') {
        setErrors(result.errors);
        setFormError(DEMO_MESSAGES.submitValidation);
        focusFirstInvalid(result.errors);
        return;
      }

      setFormError(
        result.reason === 'server'
          ? DEMO_MESSAGES.submitFallback
          : DEMO_MESSAGES.submitNetwork
      );
    } catch {
      setStatus('idle');
      setFormError(DEMO_MESSAGES.submitNetwork);
    }
  }

  function closeSuccess() {
    setStatus('idle');
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8 sm:gap-9">
        <div className="grid grid-cols-1 gap-8 sm:gap-9 sm:grid-cols-2">
          <DemoField
            id="demo-name"
            label="نام و نام خانوادگی"
            required
            error={errors.name}
            renderControl={(a11y) => (
              <Input
                {...a11y}
                ref={bind('name')}
                inputSize="md"
                intent={errors.name ? 'error' : 'default'}
                placeholder="مثلاً علی رضایی"
                autoComplete="name"
                startIcon={<IconUser size={18} stroke={2.2} />}
                desktopIconOnly
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
              />
            )}
          />

          <DemoField
            id="demo-mobile"
            label="شماره موبایل"
            required
            error={errors.mobile}
            renderControl={(a11y) => (
              <Input
                {...a11y}
                ref={bind('mobile')}
                inputSize="md"
                intent={errors.mobile ? 'error' : 'default'}
                type="tel"
                inputMode="tel"
                dir="ltr"
                textAlign="left"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                autoComplete="tel"
                startIcon={<IconPhone size={18} stroke={2.2} />}
                desktopIconOnly
                value={values.mobile}
                onChange={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
              />
            )}
          />

          <DemoField
            id="demo-company"
            label="شرکت یا برند"
            required
            error={errors.company}
            renderControl={(a11y) => (
              <Input
                {...a11y}
                ref={bind('company')}
                inputSize="md"
                intent={errors.company ? 'error' : 'default'}
                placeholder="مثلاً گروه صنعتی امید"
                autoComplete="organization"
                startIcon={<IconBuilding size={18} stroke={2.2} />}
                desktopIconOnly
                value={values.company}
                onChange={handleChange('company')}
                onBlur={handleBlur('company')}
              />
            )}
          />

          <DemoField
            id="demo-industry"
            label="حوزهٔ فعالیت"
            required
            error={errors.industry}
            renderControl={(a11y) => (
              <Select
                {...a11y}
                ref={bind('industry')}
                inputSize="md"
                intent={errors.industry ? 'error' : 'default'}
                placeholder="حوزهٔ فعالیت شرکت را انتخاب کنید"
                startIcon={<IconBriefcase size={18} stroke={2.2} />}
                desktopIconOnly
                value={values.industry}
                onChange={handleChange('industry')}
                onBlur={handleBlur('industry')}
              >
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </Select>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-9">
          <DemoField
            id="demo-site"
            label="آدرس سایت یا لینک کاتالوگ"
            error={errors.site}
            renderControl={(a11y) => (
              <Input
                {...a11y}
                ref={bind('site')}
                inputSize="md"
                intent={errors.site ? 'error' : 'default'}
                persianDigits={false}
                type="url"
                inputMode="url"
                startIcon={<IconLink size={18} stroke={2.2} />}
                desktopIconOnly
                placeholder="آدرس سایت یا لینک کاتالوگ"
                autoComplete="url"
                value={values.site}
                onChange={handleChange('site')}
                onBlur={handleBlur('site')}
              />
            )}
          />

          <DemoField
            id="demo-note"
            label="توضیحات یا اولویت‌ها"
            error={errors.note}
            renderControl={(a11y) => (
              <Textarea
                {...a11y}
                ref={bind('note')}
                inputSize="md"
                intent={errors.note ? 'error' : 'default'}
                rows={3}
                placeholder="نیازها، اولویت‌ها یا سناریوی فروش..."
                value={values.note}
                onChange={handleChange('note')}
                onBlur={handleBlur('note')}
              />
            )}
          />
        </div>

        <div className="pt-1">
          {/* در موبایل: استایل سالید دسکتاپ با سایز مدیوم (یک پله کمتر) */}
          <div className="sm:hidden">
            <Button
              color="primary"
              variant="solid"
              size="md"
              type="submit"
              fullWidth
              disabled={status === 'sending'}
              iconAfter={<IconArrowLeft size={18} stroke={2.2} />}
            >
              {status === 'sending' ? 'در حال ارسال...' : 'درخواست دمو'}
            </Button>
          </div>

          {/* در دسکتاپ و تبلت: دکمه سالید رسمی سایز بزرگ اولیه */}
          <div className="hidden sm:block">
            <Button
              color="primary"
              variant="solid"
              size="lg"
              type="submit"
              fullWidth
              disabled={status === 'sending'}
              iconAfter={<IconArrowLeft size={22} stroke={2.2} />}
            >
              {status === 'sending' ? 'در حال ارسال...' : 'درخواست دمو'}
            </Button>
          </div>

          {formError && (
            <p role="alert" className="mt-3 text-sm font-bold text-[var(--color-error-600)]">
              {formError}
            </p>
          )}
        </div>
      </form>

      <DemoSuccessModal open={successOpen} onClose={closeSuccess} />
    </>
  );
}
