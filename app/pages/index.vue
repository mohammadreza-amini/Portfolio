<script setup lang="ts">
// ============================================================
// pages/index.vue — صفحه نمایش کامپوننت‌های Base (مرحله ۳)
// هدف: تست زنده هر ۶ کامپوننت Base در یک نگاه؛ هر بخش = یک
// کامپوننت و حالت‌هایش. از مرحله ۵ با «صفحه خانه» واقعی
// جایگزین می‌شود.
// ------------------------------------------------------------
// نکته: کامپوننت‌های Base بدون import استفاده شده‌اند —
// auto-import خودکار Nuxt از پوشه app/components (با
// pathPrefix:false در nuxt.config نام = نام فایل است)
// ============================================================
import { siteConfig, socialLinks } from '#shared/data/site'

useSeoMeta({
  title: `${siteConfig.name} — کامپوننت‌های پایه`,
  description: 'نمایش زنده کامپوننت‌های UI پایه پروژه',
})

/* ── وضعیت زنده فرم (دموی v-model) ── */
const name = ref('')
const email = ref('')
const message = ref('')

// خطای اعتبارسنجی شبیه‌سازی‌شده — تا حالت error به‌صورت زنده دیده شود
const nameError = computed(() =>
  name.value.trim().length > 0 && name.value.trim().length < 3
    ? 'نام باید حداقل ۳ حرف باشد'
    : '',
)

const sent = ref(false)
function fakeSubmit() {
  sent.value = true
  setTimeout(() => (sent.value = false), 2000)
}

function clearForm() {
  name.value = ''
  email.value = ''
  message.value = ''
}

/* ── وضعیت مودال ── */
const showModal = ref(false)

// برای دموی «لینک خارجی» — اولین شبکه اجتماعی از shared/data
const firstSocial = socialLinks[0]
</script>

<template>
  <div class="container-app section space-y-16">
    <!-- ── سربرگ ── -->
    <header class="space-y-4 text-center">
      <BaseBadge variant="primary">مرحله ۳ — کامپوننت‌های پایه</BaseBadge>
      <h1 class="heading-1">
        کامپوننت‌های <span class="text-gradient">Base</span>
      </h1>
      <p class="text-lead mx-auto max-w-xl">
        شش بلوک سازنده پایه: Button، Modal، Card، Input، Textarea و Badge.
        همه تم‌پذیر و دسترسی‌پذیر — استایل از دیزاین‌سیستم مرحله ۲ می‌آید.
      </p>
    </header>

    <!-- ── BaseButton ── -->
    <section class="card space-y-6">
      <div class="space-y-2">
        <h2 class="heading-2">BaseButton</h2>
        <p class="text-sm text-muted">
          هوشمند: بدون to دکمه است / to داخلی → NuxtLink / to خارجی → a با target=_blank
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <BaseButton>اصلی</BaseButton>
        <BaseButton variant="secondary">ثانویه</BaseButton>
        <BaseButton variant="outline">خطی</BaseButton>
        <BaseButton variant="ghost">شفاف</BaseButton>
        <BaseButton disabled>غیرفعال</BaseButton>
      </div>
      <div class="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <BaseButton size="sm">کوچک</BaseButton>
        <BaseButton>متوسط</BaseButton>
        <BaseButton size="lg">بزرگ</BaseButton>
      </div>
      <div class="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <BaseButton to="/" variant="outline">لینک داخلی (NuxtLink)</BaseButton>
        <BaseButton :to="firstSocial?.href" variant="secondary">
          لینک خارجی ({{ firstSocial?.label }})
        </BaseButton>
      </div>
    </section>

    <!-- ── BaseBadge ── -->
    <section class="card space-y-5">
      <h2 class="heading-2">BaseBadge</h2>
      <div class="flex flex-wrap gap-2">
        <BaseBadge>پیش‌فرض</BaseBadge>
        <BaseBadge variant="primary">اصلی</BaseBadge>
        <BaseBadge variant="success">موفق</BaseBadge>
        <BaseBadge variant="warning">هشدار</BaseBadge>
        <BaseBadge variant="danger">خطا</BaseBadge>
      </div>
    </section>

    <!-- ── BaseCard ── -->
    <section class="space-y-6">
      <h2 class="heading-2">BaseCard</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <BaseCard hover class="space-y-3">
          <BaseBadge variant="primary">تعاملی</BaseBadge>
          <h3 class="heading-3">کارت هاور‌دار</h3>
          <p class="text-sm leading-7 text-muted">
            با prop یعنی hover هنگام هاور کمی بالا می‌آید و مرزش رنگ برند می‌گیرد —
            مناسب کارت پروژه‌ها و پست‌ها.
          </p>
          <BaseButton size="sm" variant="outline">بیشتر بدانید</BaseButton>
        </BaseCard>
        <BaseCard class="space-y-3">
          <h3 class="heading-3">کارت ساده</h3>
          <p class="text-sm leading-7 text-muted">
            بدون حالت تعاملی — مناسب محتوای استاتیک مثل درباره من.
            کلاس‌های اضافه والد خودکار merge می‌شوند.
          </p>
        </BaseCard>
      </div>
    </section>

    <!-- ── BaseInput / BaseTextarea ── -->
    <section class="card space-y-6">
      <div class="space-y-2">
        <h2 class="heading-2">BaseInput / BaseTextarea</h2>
        <p class="text-sm text-muted">
          v-model کامل + اتصال label↔input + حالت خطای زنده — در «نام» تایپ کن تا خطای اعتبارسنجی را ببینی
        </p>
      </div>
      <form class="grid gap-5 md:grid-cols-2" @submit.prevent="fakeSubmit">
        <BaseInput
          v-model="name"
          label="نام"
          placeholder="مثلاً علی رضایی"
          hint="این فیلد خطای زیر ۳ حرف را زنده نشان می‌دهد"
          :error="nameError"
        />
        <BaseInput
          v-model="email"
          type="email"
          ltr
          label="ایمیل"
          placeholder="you@example.com"
        />
        <BaseTextarea
          v-model="message"
          label="پیام"
          class="md:col-span-2"
          placeholder="متن پیام تو..."
        />
        <div class="flex flex-wrap items-center gap-3 md:col-span-2">
          <BaseButton type="submit">{{ sent ? 'پیام دریافت شد' : 'ارسال' }}</BaseButton>
          <BaseButton type="button" variant="secondary" @click="clearForm">پاک کردن</BaseButton>
          <span v-if="name || email || message" class="text-xs text-muted">
            وضعیت زنده → نام: «{{ name }}» · ایمیل: «{{ email }}»
          </span>
        </div>
      </form>
    </section>

    <!-- ── BaseModal ── -->
    <section class="card space-y-6">
      <div class="space-y-2">
        <h2 class="heading-2">BaseModal</h2>
        <p class="text-sm text-muted">
          Teleport به body + بستن با Escape/کلیک بیرون + تله فوکوس + قفل اسکرول پشت مودال
        </p>
      </div>
      <BaseButton variant="outline" @click="showModal = true">باز کردن مودال</BaseButton>

      <BaseModal v-model="showModal" title="مودال نمونه" size="md">
        <p>
          محتوای این بخش به انتهای body تلپورت می‌شود؛ پس از هر overflow یا
          z-index والدین فرار می‌کند و همیشه شناور است.
        </p>
        <p class="mt-3">
          با Escape یا کلیک روی پس‌زمینه بسته می‌شود و با Tab، فوکوس داخل
          مودال حلقه می‌زند — هرگز به زیر مودال نمی‌رسد.
        </p>
        <template #footer>
          <BaseButton size="sm" @click="showModal = false">تایید</BaseButton>
          <BaseButton size="sm" variant="ghost" @click="showModal = false">انصراف</BaseButton>
        </template>
      </BaseModal>
    </section>
  </div>
</template>
