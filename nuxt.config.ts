import tailwindcss from '@tailwindcss/vite'

// ============================================
// nuxt.config.ts — قلب تنظیمات پروژه
// مرحله ۱ب: Tailwind v4 + تم تیره/روشن + فونت وزیرمتن + RTL
// ============================================
export default defineNuxtConfig({
  // رفتارهای رسمی فریم‌ورک از این تاریخ به بعد اعمال شوند
  compatibilityDate: '2026-10-12',

  // پنل ابزار توسعه در مرورگر
  devtools: { enabled: true },

  // ── ماژول‌های Nuxt ──
  // color-mode: مدیریت تم تیره/روشن با گذاشتن کلاس روی <html>
  modules: ['@nuxtjs/color-mode'],

  // ── پیکربندی color-mode ──
  colorMode: {
    // تم پیش‌فرض: تیره (انتخاب کاربر) — حتی اگر سیستم کاربر روشن باشد
    preference: 'dark',
    fallback: 'dark',
    // کلاس‌ها بدون پسوند: "dark" و "light" (نه "dark-mode")
    // تا با variant تیره‌ی Tailwind v4 که انتظار کلاس .dark را دارد هماهنگ باشد
    classSuffix: '',
  },

  // ── نام‌گذاری کامپوننت‌ها ──
  // رفتار پیش‌فرض Nuxt مسیر پوشه را هم در اسم می‌گذارد:
  //   components/ui/BaseButton.vue → <UiBaseButton/>
  // با pathPrefix:false نام فایل، نام کامپوننت است → <BaseButton/>
  // قانون نام‌گذاری پروژه: Base* برای UI پایه، App* برای layout (مرحله ۴)
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // ── CSSهای سراسری (ترتیب مهم است) ──
  css: [
    // ۱) وزیرمتن متغیر، self-host از npm:
    //    چرا این‌جا و نه CDN گوگل؟ گوگل‌فونت برای کاربران ایرانی معمولاً
    //    فیلتر/تحریم است؛ فونت داخل پروژه = همیشه در دسترس + سرعت بهتر + آفلاین
    '@fontsource-variable/vazirmatn/index.css',
    // ۲) سیستم طراحی ما (Tailwind + توکن‌های رنگ)
    '~/assets/css/main.css',
  ],

  // ── پلاگین رسمی Tailwind v4 روی Vite ──
  // در نسخه ۴ دیگر tailwind.config.js نداریم؛ همه‌چیز در main.css
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      // زبان فارسی + چیدمان راست‌به‌چپ برای کل سایت
      // (Tailwind v4 با ویژگی‌های منطقی مثل ms-/me-/ps-/pe- خودش با RTL کنار می‌آید)
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      title: 'پورتفولیوی من',
      meta: [
        { name: 'description', content: 'وب‌سایت شخصی و نمونه‌کارها' },
      ],
    },
  },
})
