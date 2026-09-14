<template>
<Transition name="toast">
  <div
    v-if="modelValue"
    :class="['toast-notification', `toast-${type}`]"
  >
    <span>{{ message }}</span>
    <button
      class="toast-close"
      type="button"
      @click="close"
    >
      &times;
    </button>
  </div>
</Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue'

defineOptions({
  name: 'Notify'
})

interface Props {
  modelValue: boolean
  message: string
  type?: 'success' | 'error'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  duration: 3500
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

let timerId: ReturnType<typeof setTimeout> | null = null

const close = () => {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (newVal) => {
    timerId && clearTimeout(timerId)

    if (newVal && props.duration > 0) {
      timerId = setTimeout(() => close(), props.duration)
    }
  }
)
</script>

<style lang="sass" scoped>
.toast-notification
  position: fixed
  top: 24px
  right: 24px
  z-index: 9999
  display: flex
  align-items: center
  justify-content: space-between
  gap: 12px
  min-width: 280px
  max-width: 400px
  padding: 14px 18px
  border-radius: 8px
  font-size: 0.95rem
  font-weight: 500
  color: #ffffff
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25)

  &.toast-success
    background-color: #10b981
    border-left: 5px solid #047857

  &.toast-error
    background-color: #ef4444
    border-left: 5px solid #b91c1c

  .toast-close
    background: transparent
    border: none
    color: #ffffff
    font-size: 1.25rem
    cursor: pointer
    line-height: 1
    opacity: 0.8
    transition: opacity 0.2s

    &:hover
      opacity: 1

.toast-enter-active,
.toast-leave-active
  transition: all 0.3s ease

.toast-enter-from
  opacity: 0
  transform: translateY(-20px) scale(0.95)

.toast-leave-to
  opacity: 0
  transform: translateX(30px)
</style>