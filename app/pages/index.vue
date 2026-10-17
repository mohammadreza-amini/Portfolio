<script setup lang="ts">
// ============================================================
// pages/index.vue — صفحه نمایش دیزاین‌سیستم (مرحله ۲)
// هدف: دیدن همه کلاس‌های آماده در یک نگاه
// از مرحله ۵ با محتوای واقعی «صفحه خانه» جایگزین می‌شود.
// ------------------------------------------------------------
// نکته: siteConfig از پوشه shared/data می‌آید — یک بار تعریف،
// هر جا لازم است import می‌کنیم (منبع واحد حقیقت)
// ============================================================
import { siteConfig } from '#shared/data/site'

// متادیتای صفحه (در مرحله ۱۰ کامل‌تر می‌شود)
useSeoMeta({
  title: `${siteConfig.name} — دیزاین‌سیستم`,
  description: 'نمایش کلاس‌های آماده پروژه',
})

// دکمه‌های نمونه برای حلقه رندر
const btnVariants = [
  { cls: 'btn btn-primary', label: 'اصلی' },
  { cls: 'btn btn-secondary', label: 'ثانویه' },
  { cls: 'btn btn-outline', label: 'خطی' },
  { cls: 'btn btn-ghost', label: 'شفاف' },
  { cls: 'btn btn-primary', label: 'غیرفعال', disabled: true },
]
const btnSizes = [
  { cls: 'btn btn-primary btn-sm', label: 'کوچک' },
  { cls: 'btn btn-primary', label: 'متوسط' },
  { cls: 'btn btn-primary btn-lg', label: 'بزرگ' },
]
</script>

<template>
  <div class="container-app section space-y-16">
    <!-- ── سربرگ ── -->
    <header class="space-y-4 text-center">
      <span class="badge mx-auto">مرحله ۲ — دیزاین‌سیستم</span>
      <h1 class="heading-1">
        کلاس‌های آماده <span class="text-gradient">{{ siteConfig.name }}</span>
      </h1>
      <p class="text-lead mx-auto max-w-xl">
        همه بخش‌های سایت از همین کلاس‌ها ساخته می‌شوند؛ یک‌بار تعریف، همه‌جا استفاده.
        اگر یک کلاس را عوض کنیم، کل سایت هماهنگ به‌روز می‌شود.
      </p>
    </header>

    <!-- ── دکمه‌ها ── -->
    <section class="card space-y-6">
      <div class="space-y-2">
        <h2 class="heading-2">دکمه‌ها</h2>
        <p class="text-sm text-muted">ترکیب‌پذیر: btn + واریانت + اندازه</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button
          v-for="b in btnVariants"
          :key="b.label"
          :class="b.cls"
          :disabled="b.disabled"
        >
          {{ b.label }}
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <button v-for="b in btnSizes" :key="b.label" :class="b.cls">{{ b.label }}</button>
      </div>
    </section>

    <!-- ── تایپوگرافی ── -->
    <section class="card space-y-5">
      <h2 class="heading-2">تایپوگرافی</h2>
      <p class="heading-1">تیتر یک — heading-1</p>
      <p class="heading-2">تیتر دو — heading-2</p>
      <p class="heading-3">تیتر سه — heading-3</p>
      <p class="text-lead">
        متن معرفی — text-lead: پاراگراف بزرگ و خوانا برای توضیح‌های اصلی صفحه.
      </p>
      <p>
        متن معمولی بدنه با فونت وزیرمتن و <span class="text-gradient font-bold">متن گرادیانی</span>
        که در هر دو تم خودکار هماهنگ است.
      </p>
    </section>

    <!-- ── کارت‌ها و بج‌ها ── -->
    <section class="space-y-6">
      <h2 class="heading-2">کارت‌ها</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="card card-hover space-y-3">
          <span class="badge">بج نمونه</span>
          <h3 class="heading-3">کارت تعاملی</h3>
          <p class="text-sm leading-7 text-muted">
            با کلاس card-hover هنگام هاور کمی بالا می‌آید و مرزش رنگ برند می‌گیرد.
          </p>
          <button class="btn btn-outline btn-sm">بیشتر بدانید</button>
        </div>
        <div class="card space-y-3">
          <h3 class="heading-3">کارت ساده</h3>
          <p class="text-sm leading-7 text-muted">
            بدون حالت تعاملی — مناسب محتوای استاتیک.
          </p>
        </div>
      </div>
    </section>

    <!-- ── فرم‌ها ── -->
    <section class="card space-y-6">
      <h2 class="heading-2">فرم‌ها</h2>
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label for="demo-name" class="label">نام</label>
          <input id="demo-name" type="text" class="input" placeholder="مثلاً علی رضایی" />
        </div>
        <div>
          <label for="demo-email" class="label">ایمیل</label>
          <input id="demo-email" type="email" class="input" placeholder="you@example.com" dir="ltr" />
        </div>
        <div class="md:col-span-2">
          <label for="demo-msg" class="label">پیام</label>
          <textarea id="demo-msg" class="textarea" placeholder="متن پیام..." />
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
        <button class="btn btn-primary">ارسال</button>
        <button class="btn btn-secondary">پاک کردن</button>
      </div>
    </section>
  </div>
</template>
