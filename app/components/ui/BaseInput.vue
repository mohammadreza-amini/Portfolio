<script setup lang="ts">
// ============================================================
// BaseInput — اینپوت پایه با v-model و دسترسی‌پذیری کامل
// ------------------------------------------------------------
// چه چیزی را خودکار هندل می‌کند:
//   • v-model با ماکروی defineModel — والد: v-model="name"
//   • اتصال label↔input با useId (شناسه پایدار سرور/کلاینت —
//     بدون آن، click روی label فوکوس را نمی‌آورد و a11y می‌شکند)
//   • خطا: aria-invalid + role=alert (اسکرین‌ریدر فوری اعلام
//     می‌کند) + قرمز شدن مرز با variant های aria-invalid در CSS
//   • hint: aria-describedby تا برچسب اضافه هم خوانده شود
//   • ltr: برای محتوای لاتین (ایمیل/URL) — dir و تراز چپ
// ============================================================

const props = withDefaults(
  defineProps<{
    label?: string
    type?: string
    placeholder?: string
    /** متن راهنمای خنثی زیر فیلد */
    hint?: string
    /** متن خطای اعتبارسنجی — بودنش یعنی فیلد قرمز است */
    error?: string
    disabled?: boolean
    required?: boolean
    /** محتوای لاتین (ایمیل، لینک، یوزرنیم) → dir=ltr */
    ltr?: boolean
  }>(),
  {
    label: '',
    type: 'text',
    placeholder: '',
    hint: '',
    error: '',
    disabled: false,
    required: false,
    ltr: false,
  },
)

// v-model دوسویه — بدون emit دستی
const model = defineModel<string>({ default: '' })

const inputId = useId()
const hintId = `${inputId}-hint`
const errorId = `${inputId}-error`

// فقط یکی از خطا/راهنما به input وصلی می‌شود (اولویت با خطا)
const describedBy = computed(() =>
  props.error ? errorId : props.hint ? hintId : undefined,
)
</script>

<template>
  <div>
    <label v-if="label" :for="inputId" class="label">
      {{ label }}
      <!-- ستاره الزام: دکوراتیو است؛ معنایش را required خود input می‌دهد -->
      <span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>

    <input
      :id="inputId"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :dir="ltr ? 'ltr' : undefined"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="input aria-invalid:border-danger aria-invalid:focus:border-danger aria-invalid:focus:ring-danger/25"
      :class="{ 'text-left': ltr }"
    />

    <!-- خطا اولویت دارد و role=alert دارد تا فوری اعلام شود -->
    <p v-if="error" :id="errorId" role="alert" class="mt-1.5 text-xs text-danger">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="hintId" class="mt-1.5 text-xs text-muted">
      {{ hint }}
    </p>
  </div>
</template>
