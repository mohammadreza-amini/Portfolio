// ============================================================
// shared/data/site.ts — تنظیمات و محتوای کلی سایت
// ------------------------------------------------------------
// ⭐ این همان فایلی است که برای تغییر نام، منو و شبکه‌های
//    اجتماعی ویرایش می‌کنی — بدون دست زدن به هیچ کامپوننتی.
// به‌صورت type-safe از shared/types استفاده می‌کند.
// ============================================================
import type { NavItem, SocialLink } from '../types'

/** مشخصات کلی سایت */
export const siteConfig = {
  name: 'پورتفولیوی من', // نام برند شخصی تو — اینجا را عوض کن
  jobTitle: 'توسعه‌دهنده وب',
  description: 'وب‌سایت شخصی، نمونه‌کارها و مقالات من',
  email: 'hello@example.com',
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
