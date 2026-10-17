<script setup lang="ts">
// ============================================================
// BaseModal — مودال پایه، دسترسی‌پذیر و بدون وابستگی خارجی
// ------------------------------------------------------------
// کارهایی که زیر کاپوت انجام می‌دهد:
//   1) Teleport به <body> → از overflow/z-index والدین فرار می‌کند
//      و همیشه روی همه‌چیز شناور است
//   2) باز/بسته با v-model (defineModel — ماکروی رسمی Vue 3.4+)
//   3) بستن با Escape و کلیک روی پس‌زمینه (backdrop)
//   4) Focus trap: با Tab حلقه فوکوس داخل مودال می‌ماند — کاربر
//      کیبوردی نباید به عناصر زیر مودال برسد
//   5) Scroll lock: هنگام باز بودن، اسکرول صفحه پشت مودال قفل است
//   6) a11y: role=dialog + aria-modal + برچسب‌گذاری با aria-labelledby
//   7) وقتی بسته می‌شود، فوکوس به عنصری که مودال را باز کرده برمی‌گردد
// ------------------------------------------------------------
// نکته SSR: چون v-if روی باز بودن است، مودال بسته هیچ HTMLای
// سمت سرور تولید نمی‌کند — نگرانی هیدریشن هم صفر است.
// ============================================================

type ModalSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** متن تیتر — هم تگ h2 پر می‌کند هم aria-labelledby */
    title?: string
    size?: ModalSize
  }>(),
  { title: '', size: 'md' },
)

// v-model مستقیم — والد فقط می‌نویسد: v-model="show"
const open = defineModel<boolean>({ default: false })

const panelRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)

// شناسه پایدار در سرور و کلاینت برای اتصال aria به تیتر
const titleId = useId()

const sizeClass = computed(
  () => ({ sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' })[props.size],
)

function close() {
  open.value = false
}

/* ── رویدادهای کیبورد: Escape + تله‌ی Tab ── */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    close()
    return
  }
  if (e.key !== 'Tab' || !panelRef.value) return

  // همه عناصر فوکوس‌پذیر داخل پنل — به ترتیب DOM
  const focusables = panelRef.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  if (!focusables.length) return

  const first = focusables[0]!
  const last = focusables[focusables.length - 1]!
  const active = document.activeElement

  // Shift+Tab از عنصر اول (یا از بیرون پنل) → پرش به آخرین
  if (e.shiftKey && (active === first || !panelRef.value.contains(active))) {
    e.preventDefault()
    last.focus()
  }
  // Tab از عنصر آخر → برگشت به اولین (حلقه بسته می‌شود)
  else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

/* ── افکت‌های باز/بسته شدن + پاک‌سازی ── */
let lastFocused: HTMLElement | null = null

watch(open, (isOpen) => {
  if (!import.meta.client) return

  if (isOpen) {
    // جایی که فوکوس الان هست را یادداشت کن تا بعد از بستن برگردانیم
    lastFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden' // قفل اسکرول پشت مودال
    window.addEventListener('keydown', onKeydown, true) // capture = زودتر از همه
    // بعد از رندر، فوکوس داخل مودال می‌رود (دکمه بستن — امن و کیبوردپسند)
    nextTick(() => closeBtnRef.value?.focus())
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown, true)
    lastFocused?.focus?.()
    lastFocused = null
  }
})

// اگر کامپوننت حین باز بودن unmount شد، بدنه صفحه قفل نماند
onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown, true)
  }
})
</script>

<template>
  <!-- Teleport + Transition + v-if: بسته = هیچ؛ باز = fade + slide نرم -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
      >
        <!-- پس‌زمینه تار — کلیک روی آن یعنی «بیرون» → بستن -->
        <div
          class="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
          aria-hidden="true"
          @click="close"
        />

        <!-- پنل اصلی مودال -->
        <div
          ref="panelRef"
          class="modal-panel relative w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          :class="sizeClass"
        >
          <header class="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
            <h2 :id="titleId" class="heading-3">{{ title }}</h2>
            <button
              ref="closeBtnRef"
              type="button"
              class="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-muted transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="بستن"
              @click="close"
            >
              <!-- glyph بزرگ‌تر (درخواست کاربر): text-xl + leading-none برای وسط‌چینی دقیق در grid -->
              <span class="text-xl leading-none">×</span>
            </button>
          </header>

          <!-- بدنه: اگر محتوا بلند شد، خودش اسکرول داخلی می‌گیرد -->
          <div class="max-h-[70vh] overflow-y-auto px-6 py-5 leading-7">
            <slot />
          </div>

          <!-- فوتر اختیاری: فقط اگر والد چیزی در اسلات footer گذاشت -->
          <footer
            v-if="$slots.footer"
            class="flex flex-wrap justify-start gap-3 border-t border-border px-6 py-4"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* انیمیشن: کل لایه fade می‌شود و پنل از پایین کمی بالا می‌آید —
   اسکوپ‌شده بودن مشکلی ندارد؛ اتریبیوت data-v روی همان تگ‌ها می‌نشیند */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.25s ease;
}
.modal-enter-from .modal-panel {
  transform: translateY(16px) scale(0.97);
}
.modal-leave-to .modal-panel {
  transform: translateY(8px) scale(0.98);
}
</style>
