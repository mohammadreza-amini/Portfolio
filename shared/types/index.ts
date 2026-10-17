// ============================================================
// shared/types/index.ts — تایپ‌های مرکزی پروژه
// ------------------------------------------------------------
// چرا تایپ؟ اگر اسم یک فیلد را اشتباه بنویسیم یا فیلدی را
// جا بیندازیم، ادیتور همان لحظه خطا می‌دهد — قبل از اجرا.
// همه داده‌های سایت (پروژه‌ها، مهارت‌ها، منو…) از این قالب‌ها
// پیروی می‌کنند و محتوا فقط در shared/data/ ویرایش می‌شود.
// ============================================================

/** یک آیتم منوی ناوبری */
export interface NavItem {
  label: string
  to: string
}

/** لینک شبکه اجتماعی — icon: نام آیکون در Iconify (برای @nuxt/icon در مرحله ۴) */
export interface SocialLink {
  label: string
  href: string
  icon: string
}

/** یک مهارت — level: درصد تسلط ۰ تا ۱۰۰ */
export interface Skill {
  name: string
  level: number
  category: string
}

/** پروژه نمونه‌کار */
export interface Project {
  slug: string // شناسه یکتا برای URL: /projects/[slug]
  title: string
  description: string
  tags: string[] // تکنولوژی‌های استفاده‌شده
  image?: string // مسیر تصویر کاور (اختیاری)
  link?: string // لینک دمو (اختیاری)
  repo?: string // لینک ریپو (اختیاری)
  year?: number
  featured?: boolean // فقط پروژه‌های featured در صفحه خانه نمایش داده می‌شوند
}

/** مقاله بلاگ — محتوای کامل در مرحله ۹ اضافه می‌شود */
export interface BlogPost {
  slug: string
  title: string
  excerpt: string // خلاصه‌ای که در لیست بلاگ دیده می‌شود
  date: string // تاریخ ISO مانند 2026-10-15
  tags: string[]
  readingTime?: number // زمان مطالعه به دقیقه
}
