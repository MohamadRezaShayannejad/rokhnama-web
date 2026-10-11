# Project: Rokhnama

## Standard Operating Procedure

**CRITICAL INSTRUCTION FOR CLAUDE:**
Before starting ANY work or answering any request in this project, you MUST first read the file:
`docs/01-instruction.md`

This file contains the core roles, input methods, workflow rules, outputs, and boundaries for the Rokhnama project.
Also, review `docs/voice.md` for tone and voice guidelines before writing any user-facing text.

### Handling Discrepancies & Updates
If you notice any discrepancy between the instructions in `docs` and the user's specific request, or if you believe the instructions need to be updated (e.g., adding a new term to the glossary or defining a boundary):
1. **Report the discrepancy first:** Point out exactly what contradicts the rules (e.g., "The request asks to use the word 'بهترین', which is forbidden in 04-glossary.md").
2. **Request an update:** Ask the user explicitly if they want you to update the relevant instruction file (like the glossary or boundaries) before proceeding.
3. **Do not ignore the rules:** Never bypass the established boundaries or rubric without explicit permission to update the rules first.
**8. Code Health & Error Checking**
همواره پیش از اتمام کار و ارائه خروجی نهایی به کاربر، موظف هستی از سلامت کدهایی که ویرایش یا ایجاد کرده‌ای (با ابزارهایی مثل `npx tsc --noEmit` و `npm run lint` یا لاگ‌های بیلد) اطمینان حاصل کنی تا هیچ‌گونه ارور، پرش، یا توقفی در اجرای پروژه (مانند خطای کامپایل یا سینتکس در Next.js) وجود نداشته باشد.
