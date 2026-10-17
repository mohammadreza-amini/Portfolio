<script setup lang="ts">
// ============================================================
// AppLogo — لوگوی هدر و فوتر (جایگاه رزروشده برای لوگوی شخصی)
// ------------------------------------------------------------
// منطق دوحالته:
//   ۱) تا وقتی siteConfig.logo.src خالی است → «طرح موقت متنی»:
//      کاشی گرادیانی با حرف «م» + نام کامل که نام‌خانوادگی‌اش
//      با رنگ گرادیان برند هایلایت شده (محمدرضا «امینی»)
//   ۲) بعد از آمدن لوگوی واقعی (public/logo.svg + مقدار src
//      در shared/data/site.ts) → تصویر به‌جای مونوگرام می‌نشیند.
//      یعنی سوییچ لوگو = فقط یک خط در فایل داده، بدون دست زدن
//      به هیچ کامپوننتی.
// ------------------------------------------------------------
// نام از siteConfig می‌آید و به‌صورت داینامیک دو تکه می‌شود:
// کلمات قبل از آخرین کلمه = متن ساده، آخرین کلمه = گرادیان.
// اگر فردا نام عوض شود، لوگو خودکار هماهنگ می‌ماند.
// ============================================================
import { siteConfig } from '#shared/data/site'

const props = withDefaults(
  defineProps<{
    /** نمایش شغل زیر نام — برای فوتر */
    tagline?: boolean
    /** اندازه فشرده — برای فوتر */
    compact?: boolean
  }>(),
  { tagline: false, compact: false },
)

const nameParts = siteConfig.name.trim().split(/\s+/)
const headWords = nameParts.slice(0, -1).join(' ')
const lastWord = nameParts[nameParts.length - 1] ?? ''
</script>

<template>
  <NuxtLink
    to="/"
    class="group inline-flex items-center gap-2.5"
    :aria-label="`صفحه اصلی — ${siteConfig.name}`"
  >
    <!-- حالت ۱: لوگوی واقعی (بعد از آماده شدن) -->
    <img
      v-if="siteConfig.logo.src"
      :src="siteConfig.logo.src"
      :alt="siteConfig.logo.alt"
      :class="compact ? 'size-8' : 'size-9'"
      class="rounded-xl object-contain"
    />

    <!-- حالت ۲: مونوگرام موقت — حرف اول نام روی کاشی برند -->
    <span
      v-else
      aria-hidden="true"
      :class="compact ? 'size-8 text-sm' : 'size-9 text-base'"
      class="grid place-items-center rounded-xl bg-primary font-black text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105"
    >
      {{ nameParts[0]?.[0] }}
    </span>

    <!-- نام: کلمات اول ساده + کلمه آخر گرادیانی -->
    <span class="flex flex-col leading-tight">
      <span :class="compact ? 'text-sm' : 'text-base'" class="font-extrabold text-foreground">
        {{ headWords }}
        <span class="text-gradient">{{ lastWord }}</span>
      </span>
      <span v-if="tagline" class="text-xs text-muted">{{ siteConfig.jobTitle }}</span>
    </span>
  </NuxtLink>
</template>
