<script setup lang="ts">
// ============================================================
// BaseTextarea — همین پای BaseInput برای متن چندخطی
// ------------------------------------------------------------
// منطق عیناً یکی است (label/خطا/hint/a11y) تا تجربه و کد فرم‌ها
// همیشه یکدست بماند؛ تفاوت‌ها: rows پیش‌فرض ۴ و بدون type/ltr
// (متن فارسی چندخطی خنثی است؛ در صورت نیاز dir را والد می‌دهد)
// ============================================================

const props = withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
    /** تعداد سطرهای اولیه — رشد عمودی با resize-y کلاس textarea آزاد است */
    rows?: number
  }>(),
  {
    label: '',
    placeholder: '',
    hint: '',
    error: '',
    disabled: false,
    required: false,
    rows: 4,
  },
)

const model = defineModel<string>({ default: '' })

const inputId = useId()
const hintId = `${inputId}-hint`
const errorId = `${inputId}-error`

const describedBy = computed(() =>
  props.error ? errorId : props.hint ? hintId : undefined,
)
</script>

<template>
  <div>
    <label v-if="label" :for="inputId" class="label">
      {{ label }}
      <span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>

    <textarea
      :id="inputId"
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="textarea aria-invalid:border-danger aria-invalid:focus:border-danger aria-invalid:focus:ring-danger/25"
    />

    <p v-if="error" :id="errorId" role="alert" class="mt-1.5 text-xs text-danger">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="hintId" class="mt-1.5 text-xs text-muted">
      {{ hint }}
    </p>
  </div>
</template>
