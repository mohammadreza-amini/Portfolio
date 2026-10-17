<script setup lang="ts">
// ============================================================
// BaseButton — دکمه پایه پروژه؛ تنها نقطه تعریف استایل دکمه
// ------------------------------------------------------------
// منطق «هوشمندی»: به‌جای سه کامپوننت جدا (دکمه، لینک داخلی،
// لینک خارجی)، یک کامپوننت بسته به prop `to` تگ درست را رندر
// می‌کند:
//   • to ندی          → <button> واقعی (مثلاً برای submit فرم)
//   • to مسیر داخلی   → <NuxtLink> (روتینگ سمت کلاینت، بدون رفرش)
//   • to آدرس http    → <a target="_blank"> + rel امن برای SEO/امنیت
// سود اصلی: استایل و رفتار یک‌جا تعریف شده و همه‌جا یکدست می‌ماند.
// ============================================================

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** مسیر داخلی (مثل /about) یا آدرس کامل (http...) — خالی = دکمه معمولی */
    to?: string
    /** تایپ دکمه HTML — فقط در حالت button معنا دارد */
    type?: 'button' | 'submit' | 'reset'
    variant?: Variant
    size?: Size
    /** عرض کامل والد (برای دکمه‌های تمام‌عرض در فرم‌های موبایل) */
    block?: boolean
    disabled?: boolean
  }>(),
  {
    to: undefined,
    type: 'button',
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
  },
)

// رزولو خودکار Nuxt — بدون import دستی
const NuxtLink = resolveComponent('NuxtLink')

const isExternal = computed(() => !!props.to && /^https?:\/\//.test(props.to))
const isLink = computed(() => !!props.to)

/* کلاس‌ها از دیزاین‌سیستم مرحله ۲ می‌آیند (btn btn-primary و...)
   — یعنی اگر یک روز استایل دکمه را در main.css عوض کنیم،
   این کامپوننت هم بدون تغییر به‌روز می‌شود */
const classes = computed(() => [
  'btn',
  `btn-${props.variant}`,
  props.size !== 'md' && `btn-${props.size}`, // اندازه md = پیش‌فرض کلاس btn
  props.block && 'w-full',
])

/* روی <a> اتریبیوت disabled وجود ندارد؛ حالت غیرفعال لینک با
   کلاس + aria-disabled پیاده می‌شود تا اسکرین‌ریدر هم بفهمد */
const linkAttrs = computed(() =>
  isExternal.value
    ? { href: props.to, target: '_blank', rel: 'noopener noreferrer' }
    : { to: props.to, 'aria-disabled': props.disabled || undefined },
)
</script>

<template>
  <!-- سه حالت رندر با یک <component :is> — بدون تکرار تمپلیت -->
  <component
    :is="isLink ? (isExternal ? 'a' : NuxtLink) : 'button'"
    :class="[classes, { 'pointer-events-none opacity-50': isLink && disabled }]"
    :type="isLink ? undefined : type"
    :disabled="isLink ? undefined : disabled"
    v-bind="isLink ? linkAttrs : undefined"
  >
    <slot />
  </component>
</template>
