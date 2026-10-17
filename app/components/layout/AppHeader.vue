<script setup lang="ts">
// ============================================================
// AppHeader — هدر چسبان سایت
// ------------------------------------------------------------
// ساختار (در RTL از راست): لوگو → nav دسکتاپ → اکشن‌ها
//   • sticky top-0: هنگام اسکرول بالای صفحه می‌چسبد
//   • bg-background/80 + backdrop-blur-md: نیمه‌شفاف با تار —
//     محتوای در حال عبور زیرش محو دیده می‌شود (سبک Linear/Vercel)
//   • nav دسکتاپ از navItems (shared/data) می‌آید — افزودن
//     صفحه جدید به منو = فقط یک خط در فایل داده
//   • حالت فعال لینک: مسیر فعلی = دقیق برای «/»، پیشوندی برای
//     بقیه تا /projects/xyz هم «پروژه‌ها» را روشن کند
//   • دکمه CTA «تماس با من» فقط sm به بالا (موبایل: فضای کم)
// ============================================================
import { navItems } from '#shared/data/site'

const route = useRoute()

function isActive(to: string) {
  return route.path === to || (to !== '/' && route.path.startsWith(to))
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
    <div class="container-app flex h-16 items-center justify-between gap-4">
      <AppLogo />

      <!-- nav دسکتاپ -->
      <nav class="hidden items-center gap-1 md:flex" aria-label="ناوبری اصلی">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-primary/5 hover:text-foreground"
          :class="isActive(item.to) && 'bg-primary/10 text-primary'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- اکشن‌ها: CTA + تم + منوی موبایل -->
      <div class="flex items-center gap-2">
        <BaseButton to="/contact" size="sm" class="hidden sm:inline-flex">تماس با من</BaseButton>
        <AppThemeToggle />
        <AppMobileMenu />
      </div>
    </div>
  </header>
</template>
