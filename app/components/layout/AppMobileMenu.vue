<script setup lang="ts">
// ============================================================
// AppMobileMenu — منوی همبرگری موبایل (خودکفا: دکمه + پنل)
// ------------------------------------------------------------
// منطق:
//   • فقط زیر عرض md دیده می‌شود (md:hidden) — در دسکتاپ nav
//     افقی هدر کار را انجام می‌دهد.
//   • دکمه همبرگری سه خط که با CSS transform به ضربدر تبدیل
//     می‌شود (بدون سواپ آیکون = انیمیشن نرم و بدون mismatch).
//   • پنل fixed زیر هدر است (top-16 = ارتفاع h-16 هدر) — fixed
//     یعنی از محدودیت عرض container-app خارج و تمام‌عرض می‌شود.
//   • بسته‌شدن خودکار: تغییر مسیر (کاربر روی لینک زد یا back
//     گرفت) + کلید Escape + کلیک روی هر لینک.
//   • a11y: aria-expanded + aria-controls.
// ============================================================
import { navItems } from '#shared/data/site'

const open = ref(false)
const route = useRoute()

// هر بار مسیر عوض شود → منو ببند
watch(
  () => route.path,
  () => (open.value = false),
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

// لیسنر کیبورد فقط وقتی منو باز است وصل/قطع شود
watch(open, (v) => {
  if (!import.meta.client) return
  if (v) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKeydown)
})

// مسیر فعال: دقیق برای خانه، پیشوندی برای بقیه (/projects و /projects/[slug])
function isActive(to: string) {
  return route.path === to || (to !== '/' && route.path.startsWith(to))
}
</script>

<template>
  <div class="md:hidden">
    <!-- دکمه همبرگری -->
    <button
      type="button"
      class="grid size-9 cursor-pointer place-items-center rounded-lg text-muted transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      aria-label="باز و بسته کردن منو"
      @click="open = !open"
    >
      <span class="relative block h-5 w-6" aria-hidden="true">
        <!-- خط بالا: با باز شدن به مرکز می‌آید و ۴۵+ می‌چرخد -->
        <span
          class="absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-all duration-300"
          :class="open && 'translate-y-2 rotate-45'"
        />
        <!-- خط وسط: محو می‌شود -->
        <span
          class="absolute inset-x-0 top-2 h-0.5 rounded-full bg-current transition-all duration-300"
          :class="open && 'opacity-0'"
        />
        <!-- خط پایین: به مرکز می‌آید و ۴۵- می‌چرخد → ضربدر -->
        <span
          class="absolute inset-x-0 top-4 h-0.5 rounded-full bg-current transition-all duration-300"
          :class="open && '-translate-y-2 -rotate-45'"
        />
      </span>
    </button>

    <!-- پنل کشویی تمام‌عرض زیر هدر -->
    <Transition name="menu">
      <nav
        v-if="open"
        id="mobile-menu"
        class="fixed inset-x-0 top-16 z-40 border-b border-border bg-surface shadow-xl shadow-black/10"
        aria-label="منوی موبایل"
      >
        <ul class="container-app divide-y divide-border py-2">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="block py-3 text-sm font-medium transition-colors"
              :class="isActive(item.to) ? 'text-primary' : 'text-muted hover:text-foreground'"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              @click="open = false"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
/* اسلاید کوتاه از بالا + fade */
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
