# Worklog — پروژه پورتفولیوی شخصی

> حافظه پایدار پروژه: هر ایجنت/جلسه قبل از شروع کار این فایل را می‌خواند
> و در پایان کار، رکورد خود را به انتهای آن اضافه می‌کند.

---

## مشخصات پروژه (Design Contract — تصمیم‌های قطعی کاربر)

| مورد | تصمیم |
|------|-------|
| نوع پروژه | وب‌سایت پورتفولیوی شخصی (فارسی، RTL) |
| فریم‌ورک | Nuxt 4 (SSR) — نصب‌شده: **4.6.1** |
| استایل | Tailwind CSS v4 (CSS-First با @theme) — هنوز نصب نشده (مرحله ۱) |
| پالت رنگ | «کهکشانی»: پس‌زمینه `#0B0B12`، سطح `#14141F`، اصلی بنفش `#7C3AED`، متن `#F4F4F8` |
| سبک طراحی | مینیمال (سبک Linear/Vercel) |
| انیمیشن | متوسط (fade/slide هنگام اسکرول + hover نرم) |
| زبان/جهت | فارسی — RTL — فونت وزیرمتن (مرحله ۱) |
| تم تیره/روشن | با @nuxtjs/color-mode؛ پیش‌فرض تیره (تصمیم نهایی مرحله ۱ با کاربر) |
| صفحات | خانه، درباره من، پروژه‌ها (+[slug])، تماس، بلاگ (لیست + [slug])، 404 |
| محتوا | نمونه/placeholder — ساختار data-driven از shared/data برای ادیت آسان |
| همکاری | مرحله‌به‌مرحله؛ توضیح قبل از اعمال؛ تایید کاربر قبل از رفتن به مرحله بعد |

### نقشه راه (۱۲ مرحله)
- [x] مرحله ۰: نصب Nuxt 4 + اسکلت پایه + گیت + تست SSR ✅
- [ ] مرحله ۱: Tailwind v4 + پالت + وزیرمتن + RTL + color-mode
- [ ] مرحله ۲: اسکلت پوشه‌ها + کلاس‌های آماده (btn, heading, card…)
- [ ] مرحله ۳: کامپوننت‌های Base (Button, Modal, Card, Input, Badge)
- [ ] مرحله ۴: Header + Footer + MobileMenu + ThemeToggle
- [ ] مرحله ۵: صفحه خانه (Hero, مهارت‌ها, پروژه‌های شاخص, CTA)
- [ ] مرحله ۶: صفحه درباره من
- [ ] مرحله ۷: پروژه‌ها (گرید + فیلتر + [slug])
- [ ] مرحله ۸: تماس (فرم)
- [ ] مرحله ۹: بلاگ
- [ ] مرحله ۱۰: SEO + 404 + دسترسی‌پذیری
- [ ] مرحله ۱۱: بهینه‌سازی و دیپلوی

---

---
Task ID: stage-0
Agent: Super Z (main agent)
Task: راه‌اندازی از صفر — نصب Nuxt 4، اسکلت پایه، گیت، تست SSR

Work Log:
- بررسی محیط: Node v24.21.0، npm 11.19، bun 1.3.14، git 2.47.3 — همگی مناسب
- پوشه /home/z/my-project خالی بود؛ خودِ این پوشه را روت پروژه Nuxt کردیم تا پورت 3000 (مسیر پیش‌نمایش محیط) مستقیم سرو شود
- ساخت فایل‌های پایه: package.json (اسکریپت‌های استاندارد Nuxt)، nuxt.config.ts (حداقلی)، app/app.vue (صفحه تست فارسی RTL)، tsconfig.json (extends از .nuxt)، .gitignore
- npm install nuxt vue vue-router → Nuxt **4.6.1**، Vue **3.5.43**، vue-router **5.4.0**
- نکته npm 11: اسکریپت postinstall بسته esbuild با allow-scripts بلاک بود → با `npm install-scripts approve esbuild` مجاز شد
- `npx nuxt prepare` → تایپ‌ها در .nuxt ساخته شد
- کشف مهم محیط: پروسه‌های پس‌زمینه دستی (حتی با setsid/nohup) بعد از پایان هر دستور bash کشته می‌شوند؛ سرور ماندگار باید توسط سرویس سیستمی محیط (`bun run dev`) بالا برود
- راه‌حل تست: اسکریپت `scripts/verify-dev.sh` — سرور موقت داخل یک دستور، curl صفحه، چک محتوا، بستن سرور. این ابزار استاندارد تست همه مراحل است
- تست SSR موفق: HTTP 200 و متن فارسی «پروژه پورتفولیو نصب شد» در HTML سمت سرور ✅
- گیت: init روی main، دو کامیت (مرحله ۰ + پاک‌سازی)، خروج .env و download/ از track؛ ریپو فقط شامل فایل‌های پروژه

Stage Summary:
- پروژه Nuxt 4.6.1 نصب و صحت‌سنجی شد؛ SSR فارسی کار می‌کند
- فایل‌های tracked: .gitignore, app/app.vue, nuxt.config.ts, package.json, package-lock.json, scripts/verify-dev.sh, tsconfig.json
- ساختار پوشه‌ای فعلی: app/, scripts/, download/ (سندباکس)، skills/ (سندباکس)
- مرحله بعد (۱): نصب @tailwindcss/vite، تعریف پالت کهکشانی در @theme، فونت وزیرمتن با @nuxt/fonts، dir=rtl سراسری، @nuxtjs/color-mode — قبل از اعمال، طرح کامل برای کاربر توضیح داده شود
- نکته برای ایجنت بعدی: کاربر می‌خواهد در هر مرحله اول توضیح و تایید، بعد کد با شرح کامل منطق

---
Task ID: stage-1a
Agent: Super Z (main agent)
Task: مهاجرت پکیج‌منیجر از npm به pnpm + پاسخ به سوالات عملیاتی کاربر

Work Log:
- درخواست کاربر: پروژه باید با pnpm جلو برود نه npm؛ دستورها هم به او داده شود تا محلی خودش وارد کند
- pnpm در سندباکس نبود؛ corepack enable به‌خاطر نبود دسترسی symlink روی /usr/bin شکست خورد
- نصب pnpm از پیشوند گلوبال قابل‌نوشتن: `npm install -g pnpm@latest` → **pnpm 12.11.2**
- package.json: افزودن `"packageManager": "pnpm@12.11.2"`
- حذف package-lock.json و node_modules و نصب تمیز با pnpm
- نکته مهم pnpm 12: فیلد `pnpm` داخل package.json دیگر خوانده نمی‌شود (deprecate)؛ تنظیمات باید در pnpm-workspace.yaml باشد
- اسکریپت build بسته esbuild توسط pnpm بلاک شد → با `pnpm approve-builds esbuild` مجاز شد → در pnpm-workspace.yaml به‌صورت `allowBuilds: {esbuild: true}` ثبت شد
- scripts/verify-dev.sh به‌روزرسانی شد: اگر pnpm موجود باشد از `pnpm exec nuxt dev` استفاده می‌کند وگرنه npx
- تست سلامت کامل زیر pnpm: HTTP 200 + محتوای فارسی در SSR HTML ✅
- bun.lock (ساخته‌شده توسط رانر سندباکس) حذف و لاک‌فایل‌های پکیج‌منیجرهای دیگر در .gitignore بلاک شدند
- اسکریپت `scripts/make_snapshot.py` ساخته شد: بعد از هر مرحله zip قابل دانلود در download/ می‌سازد (بدون node_modules/.git/.env)
- اسنپ‌شات فعلی: download/portfolio-stage1a-pnpm.zip (10 فایل)

Stage Summary:
- پکیج‌منیجر رسمی پروژه: **pnpm 12.11.2** — لاک‌فایل مرجع: pnpm-lock.yaml
- فایل‌های tracked: .gitignore, app/app.vue, nuxt.config.ts, package.json, pnpm-lock.yaml, pnpm-workspace.yaml, scripts/make_snapshot.py, scripts/verify-dev.sh, tsconfig.json
- کاربر تم پیش‌فرض تیره و پالت روشن (#FAFAFC / #1E1B2E / #7C3AED) را تایید کرد
- ⚠️ نکته فرآیندی مهم کاربر: او حس کرد پالت کهکشانی بدون انتخاب صریح او اعمال شده — پالت تیره باید دوباره صریحاً از او پرسیده شود؛ از این به بعد هیچ تصمیم طراحی بدون تایید صریح متنی او اعمال نشود
- مرحله بعد (۱ب): Tailwind v4 + پالت (منتظر انتخاب صریح پالت تیره) + فونت فارسی (پیشنهاد: وزیرمتن — تایید کاربر لازم) + RTL + color-mode
- برای ایجنت بعدی: بعد از هر مرحله → کامیت + `python3 scripts/make_snapshot.py <stage>` + آپدیت این فایل

---
Task ID: stage-1b
Agent: Super Z (main agent)
Task: Tailwind v4 + پالت «آبی اقیانوسی» + وزیرمتن + RTL + تم تیره/روشن

Work Log:
- انتخاب صریح کاربر: پالت تیره = گزینه ۳ «آبی اقیانوسی» (#0B1120/#162136/#3B82F6/#F1F5F9)، فونت = وزیرمتن
- نکته محیطی: پکیج‌های گلوبال بین جلسات پاک می‌شوند → pnpm دوباره با `npm i -g pnpm@latest` نصب شد (node_modules پروژه ماندگار است)
- نصب: tailwindcss 4.3.3 + @tailwindcss/vite 4.3.3 + @nuxtjs/color-mode 4.0.1 + @fontsource-variable/vazirmatn 5.3.0
- تصمیم فونت: به‌جای @nuxt/fonts از fontsource (self-host از npm) استفاده شد — دلیل: گوگل‌فونت برای کاربران ایرانی فیلتر است؛ فونت داخل پروژه پایدارتر و سریع‌تر است
- nuxt.config.ts کامل شد: vite.plugins=[tailwindcss()]، modules=[@nuxtjs/color-mode] با preference/fallback=dark و classSuffix=''، css=[fontsource, main.css]، htmlAttrs lang=fa dir=rtl
- app/assets/css/main.css: الگوی رسمی Tailwind v4 برای تم‌پذیری — توکن‌های معنایی روی :root/.light/.dark + @theme inline نگاشت به bg-background و امثالهم + @custom-variant dark کلاس‌محور + رنگ‌های مشتق muted/border با color-mix (پالت ۴ رنگی می‌ماند)
- app/app.vue: صفحه تست جدید — سواچ‌های پالت + پیش‌نمایش دو تم کنار هم (کلاس .light داخل تم تیره کار می‌کند چون توکن‌ها class-scoped هستند)
- یافته color-mode v4: کلاس را در SSR ست نمی‌کند؛ اسکریپت inline در head قبل از اولین paint کلاس dark را می‌گذارد → بدون فلش تم
- verify-dev.sh ارتقا یافت: چک اختیاری CSS کامپایل‌شده (پارامتر سوم)
- تست نهایی: HTTP 200 + محتوای فارسی + dir=rtl + توکن #0B1120 در CSS کامپایل‌شده ✅
- کامیت + اسنپ‌شات download/portfolio-stage1b-tailwind-theme.zip (12 فایل)

Stage Summary:
- سیستم تم کاملاً فعال: پیش‌فرض تیره (آبی اقیانوسی)، حالت روشن با پالت تاییدشده
- ⚠️ سوال باز برای کاربر: پالت روشن الان بنفش #7C3AED دارد (تایید قبلی) ولی تم تیره آبی #3B82F6 — پیشنهاد: یکسان‌سازی روی آبی #2563EB در حالت روشن؛ منتظر جواب
- مرحله بعد (۲): اسکلت پوشه‌ها (layouts, components/layout|ui, composables, pages, shared/data|types|utils) + کلاس‌های آماده (btn, heading, card, badge, container) — نیازمند تایید کاربر
- برای ایجنت بعدی: pnpm ممکن است در شروع جلسه جدید غایب باشد؛ با `npm i -g pnpm@latest` برگردان؛ سپس اگر node_modules سالم بود نیازی به install مجدد نیست

---
Task ID: stage-1c
Agent: Super Z (main agent)
Task: یکپارچه‌سازی رنگ برند (انتخاب گزینه الف توسط کاربر)

Work Log:
- کاربر گزینه الف را انتخاب کرد: رنگ اصلی حالت روشن از بنفش #7C3AED به آبی #2563EB تغییر کرد
- main.css: مقدار --primary در بلوک :root/.light و کامنت سربرگ به‌روزرسانی شد
- کامیت جداگانه برای تاریخچه تمیز

Stage Summary:
- رنگ برند در هر دو تم آبی است: تیره #3B82F6 / روشن #2563EB — هویت یکپارچه
- نکته فرآیندی جدید کاربر: دستورهای محلی کاربر اختیاری‌اند — من در سندباکس همه را اجرا می‌کنم؛ کاربر فقط پیش‌نمایش می‌بیند یا zip دانلود می‌کند؛ کامیت من: پایان هر مرحله بعد از تست سبز

---
Task ID: stage-2
Agent: Super Z (main agent)
Task: اسکلت پوشه‌ها + سیستم روتینگ + shared + دیزاین‌سیستم (کلاس‌های آماده)

Work Log:
- ساخت اسکلت: app/components/{layout,ui,home,about,projects,contact} (.gitkeep)، app/composables، app/layouts، app/pages، shared/{types,data}
- app/app.vue → پوسته نهایی: <NuxtLayout><NuxtPage/></NuxtLayout> — از این به بعد تغییر نمی‌کند
- app/layouts/default.vue → الگوی فوتر چسبان (min-h-screen flex flex-col + main flex-1)؛ Header/Footer در مرحله ۴
- سیستم روتینگ فایل‌محور فعال شد (وجود app/pages) — vue-router از قبل dependency بود
- shared/types/index.ts → تایپ‌های NavItem، SocialLink، Skill، Project، BlogPost
- shared/data/site.ts → siteConfig (نام، شغل، ایمیل)، navItems (۵ آیتم منو)، socialLinks (۴ لینک) — محتوا فقط همین‌جا ویرایش می‌شود
- import با alias علامت #shared/data/site تست شد و کار می‌کند ✅
- main.css → بلوک @layer components با کلاس‌های آماده: container-app، section، heading-1/2/3، text-lead، text-gradient، btn + ۴ واریانت + ۲ اندازه، card + card-hover، badge، label/input/textarea
- app/pages/index.vue → صفحه نمایش دیزاین‌سیستم (دکمه‌ها، تایپوگرافی، کارت، بج، فرم) + useSeoMeta اولیه
- نکته محیطی: pnpm گلوبال بین پیام‌ها پاک شده بود → مجدداً نصب شد؛ verify با fallback npx هم کار می‌کند
- تست: HTTP 200 + «دیزاین‌سیستم» در SSR + کلاس btn-primary در CSS کامپایل‌شده ✅
- کامیت + اسنپ‌شات download/portfolio-stage2-design-system.zip (23 فایل)

Stage Summary:
- معماری پایه کامل: routing فعال، layout اسکلت، shared آماده، دیزاین‌سیستم قابل استفاده
- کلاس‌های دیزاین‌سیستم: ترکیب‌پذیر (btn btn-primary btn-lg) و تم‌پذیر (همه با توکن‌ها)
- مرحله بعد (۳): کامپوننت‌های Base در components/ui — BaseButton (با props واریانت/اندازه)، BaseModal (teleport + focus trap)، BaseCard، BaseInput/BaseTextarea، BaseBadge — نیازمند تایید کاربر
- برای ایجنت بعدی: هر پیام جدید ممکن است pnpm گلوبال را پاک کرده باشد؛ چک و در صورت نیاز `npm i -g pnpm@latest`
