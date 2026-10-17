<script setup lang="ts">
// ============================================================
// AppThemeToggle — سوییچ تم تیره/روشن
// ------------------------------------------------------------
// منطق:
//   • useColorMode از @nuxtjs/color-mode — با ست کردن
//     colorMode.preference، انتخاب کاربر در localStorage ذخیره
//     می‌شود و کلاس dark/light روی <html> عوض می‌شود؛ همه رنگ‌ها
//     (که از توکن‌های CSS می‌خوانند) بدون رفرش عوض می‌شوند.
//   • ترفند ضد-hydration-mismatch: به‌جای اینکه با JS تصمیم
//     بگیریم کدام آیکون رندر شود (که ممکن بود با تم ذخیره‌شده
//     کاربر و نسخه SSR فرق کند و هشدار hydration بدهیم)، هر دو
//     آیکون همیشه در DOM هستند و «CSS» انتخاب می‌کند:
//       خورشید = فقط داخل .dark دیده می‌شود / ماه = بیرون آن
//     نتیجه: صفر mismatch، صفر فلش.
// ============================================================

const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="grid size-9 cursor-pointer place-items-center rounded-lg text-muted transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    aria-label="تغییر تم روشن/تیره"
    @click="toggle()"
  >
    <!-- خورشید: در تم تیره نمایان (یعنی می‌شود روشن) -->
    <svg
      class="hidden size-5 dark:block"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>

    <!-- ماه: در تم روشن نمایان (یعنی می‌شود تیره) -->
    <svg
      class="size-5 dark:hidden"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>
