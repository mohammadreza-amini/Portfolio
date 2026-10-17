<script setup lang="ts">
// ============================================================
// AppFooter — فوتر سایت
// ------------------------------------------------------------
// سه بخش:
//   ۱) برند: AppLogo فشرده + تگ‌لاین شغل + توضیح کوتاه
//   ۲) شبکه‌های اجتماعی: از socialLinks (shared/data) —
//      آیکون‌ها SVG داخلی‌اند (بدون نصب کتابخانه آیکون!) و با
//      فیلد icon هر لینک مپ شده‌اند؛ اگر آیکون ناشناخته بود،
//      fallback متن برچسب است — یعنی افزودن شبکه جدید در فایل
//      داده هیچ‌وقت سایت را نمی‌شکند.
//   ۳) نوار پایین: کپی‌رایت با سال جاری (داینامیک) + اعتبار ابزار
// لینک‌های http در تب جدید باز می‌شوند؛ mailto همان‌جا.
// ============================================================
import { siteConfig, socialLinks } from '#shared/data/site'

const year = new Date().getFullYear()

/* مسیرهای SVG آیکون‌ها (fill-based، viewBox 24) —
   کلیدها همان مقادیر icon در shared/data/site.ts هستند */
const iconPaths: Record<string, string> = {
  'mdi:github':
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  'mdi:linkedin':
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  'mdi:telegram':
    'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  'mdi:email':
    'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
}

// فقط لینک‌های خارجی در تب جدید؛ mailto در همان‌جا
const isExternal = (href: string) => href.startsWith('http')
</script>

<template>
  <footer class="border-t border-border">
    <div class="container-app space-y-8 py-10">
      <!-- برند + شبکه‌های اجتماعی -->
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div class="space-y-2">
          <AppLogo compact tagline />
          <p class="max-w-md text-sm leading-6 text-muted">
            {{ siteConfig.description }}
          </p>
        </div>

        <ul class="flex items-center gap-2" aria-label="شبکه‌های اجتماعی">
          <li v-for="social in socialLinks" :key="social.href">
            <a
              :href="social.href"
              :aria-label="social.label"
              :title="social.label"
              :target="isExternal(social.href) ? '_blank' : undefined"
              :rel="isExternal(social.href) ? 'noopener noreferrer' : undefined"
              class="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg
                v-if="iconPaths[social.icon]"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5"
                aria-hidden="true"
              >
                <path :d="iconPaths[social.icon]" />
              </svg>
              <!-- fallback: اگر آیکونی در مپ نبود، برچسب متنی نشان بده -->
              <span v-else class="text-xs font-medium">{{ social.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- نوار پایین -->
      <div
        class="flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center"
      >
        <p>© {{ year }} {{ siteConfig.name }} — همه حقوق محفوظ است.</p>
        <p>
          ساخته‌شده با
          <span class="font-medium text-foreground">Nuxt</span>
          و
          <span class="font-medium text-foreground">Tailwind CSS</span>
        </p>
      </div>
    </div>
  </footer>
</template>
