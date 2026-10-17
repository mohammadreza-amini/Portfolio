<script setup lang="ts">
// ============================================================
// BaseBadge — برچسب کوچک وضعیت/دسته‌بندی
// ------------------------------------------------------------
// واریانت‌ها به کلاس‌های دیزاین‌سیستم (badge + badge-*) وصل‌اند؛
// رنگ‌های وضعیت از توکن‌های main.css می‌آیند → در هر دو تم
// خودکار هماهنگ. کاربرد: تگ پروژه‌ها، وضعیت پست بلاگ، مرحله‌ها.
// ============================================================

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant
  }>(),
  { variant: 'default' },
)

// واریانت default یعنی همان کلاس پایه badge — بدون کلاس اضافه
const classes = computed(() => [
  'badge',
  props.variant !== 'default' && `badge-${props.variant}`,
])
</script>

<template>
  <span :class="classes"><slot /></span>
</template>
