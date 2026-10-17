<script setup lang="ts">
// ============================================================
// BaseCard — سطح پایه (Surface) پروژه
// ------------------------------------------------------------
// ساده و عامدانه مینیمال است: یک تگ با کلاس card دیزاین‌سیستم.
// چرا کامپوننت و نه <div class="card"> خام؟
//   • اسم معنایی: در تمپلیت‌ها «کارت» دیده می‌شود، نه div پراکنده
//   • اگر فردا استایل پایه عوض شود، یک نقطه کنترل داریم
// props:
//   hover  → کلاس card-hover (بلند شدن + مرز برند) برای کارت‌های
//            کلیک‌پذیر مثل کارت پروژه
//   as     → تگ HTML دلخواه (div پیش‌فرض)؛ مثلاً as="article"
//            برای معنای سمنتیک بهتر در لیست پست‌ها
// ============================================================

const props = withDefaults(
  defineProps<{
    hover?: boolean
    as?: string
  }>(),
  { hover: false, as: 'div' },
)

const classes = computed(() => ['card', props.hover && 'card-hover'])
</script>

<template>
  <!-- کلاس‌های اضافه‌ای که والد می‌دهد خودکار merge می‌شوند
       (fallthrough attribute مکانیزم خودکار Vue) -->
  <component :is="props.as" :class="classes">
    <slot />
  </component>
</template>
