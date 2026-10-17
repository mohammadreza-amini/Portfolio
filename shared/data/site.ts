// ============================================================
// shared/data/site.ts — تنظیمات و محتوای کلی سایت
// ------------------------------------------------------------
// ⭐ این همان فایلی است که برای تغییر نام، منو و شبکه‌های
//    اجتماعی ویرایش می‌کنی — بدون دست زدن به هیچ کامپوننتی.
// به‌صورت type-safe از shared/types استفاده می‌کند.
// ============================================================
import type { NavItem, SocialLink } from '../types'

export const siteConfig = {
  // نام واقعی کاربر (به‌روزرسانی مرحله ۴) — در لوگو، تیترها، SEO و فوتر استفاده می‌شود
  name: 'محمدرضا امینی',
  jobTitle: 'توسعه‌دهنده وب',
  description: 'پورتفولیو، نمونه‌کارها و مقالات محمدرضا امینی',
  email: 'hello@example.com',

  /**
   * لوگوی سایت — جایگاه رزروشده برای لوگوی شخصی تو:
   *   ۱) فایل لوگو را در مسیر public/logo.svg بگذار
   *   ۲) مقدار src را '/logo.svg' کن
   * تا آن زمان، AppLogo به‌جایش «مونوگرام متنی» (حرف م روی کاشی
   * گرادیانی آبی) را نشان می‌دهد — این طرح موقتی در هر دو تم کار می‌کند.
   * (اگر فرمت لوگو png یا jpg بود، همان مسیر/پسوند را بنویس)
   */
  logo: {
    src: '',
    alt: 'لوگوی محمدرضا امینی',
  },
} as const

/** منوی اصلی هدر — به‌ترتیب نمایش */
export const navItems: NavItem[] = [
  { label: 'خانه', to: '/' },
  { label: 'درباره من', to: '/about' },
  { label: 'پروژه‌ها', to: '/projects' },
  { label: 'بلاگ', to: '/blog' },
  { label: 'تماس', to: '/contact' },
]

/** شبکه‌های اجتماعی فوتر و صفحه تماس */
export const socialLinks: SocialLink[] = [
  { label: 'گیت‌هاب', href: 'https://github.com/username', icon: 'mdi:github' },
  { label: 'لینکدین', href: 'https://linkedin.com/in/username', icon: 'mdi:linkedin' },
  { label: 'تلگرام', href: 'https://t.me/username', icon: 'mdi:telegram' },
  { label: 'ایمیل', href: 'mailto:hello@example.com', icon: 'mdi:email' },
]
