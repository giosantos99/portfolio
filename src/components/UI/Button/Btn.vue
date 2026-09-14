<template>
<button
  class="q-btn"
  type="button"
  :class="[
    buttonClasses,
    `size-${size}`,
    {
      'is-round': round,
      'is-flat': flat,
      'is-disabled': disabled,
      'no-caps': noCaps,
      'is-icon-only': icon && !$slots.default
    }
  ]"
  :style="buttonStyles"
  :disabled="disabled"
  @click="handleClick"
>
  <span class="q-btn__content">
    <font-awesome-icon v-if="icon" :icon="icon" class="q-icon" />
    <span v-if="$slots.default" class="q-btn__label">
      <slot />
    </span>
  </span>
</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'Btn'
})

interface Props {
  icon?: string | string[] | object
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  round?: boolean
  flat?: boolean
  disabled?: boolean
  noCaps?: boolean
  color?: string
  bgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  round: false,
  flat: false,
  disabled: false,
  noCaps: true
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isCssClass = (val?: string) => !!val && (val.startsWith('bg-') || val.startsWith('text-'))

const buttonClasses = computed(() => {
  const classes: string[] = []

  if (isCssClass(props.bgColor)) classes.push(props.bgColor!)
  if (isCssClass(props.color)) classes.push(props.color!)

  return classes
})

const buttonStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (props.bgColor && !isCssClass(props.bgColor)) styles.backgroundColor = props.bgColor
  if (props.color && !isCssClass(props.color)) styles.color = props.color

  return styles
})

const handleClick = (event: MouseEvent) => {
  !props.disabled && emit('click', event)
}
</script>

<style lang="sass" scoped>
.q-btn
  display: inline-flex
  align-items: center
  justify-content: center
  position: relative

  border: none
  outline: none
  border-radius: 3px

  font-weight: 500
  letter-spacing: 0.5px
  text-decoration: none
  text-transform: uppercase
  min-height: 2.572em
  padding: 4px 16px
  font-size: 14px
  line-height: 1.715em

  cursor: pointer
  user-select: none
  vertical-align: middle

  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), box-shadow 0.2s ease, filter 0.2s ease

  .q-btn__content
    display: flex
    align-items: center
    justify-content: center
    line-height: 1.715
    white-space: nowrap
    gap: 8px

  .q-btn__label
    display: inline-block

  &.size-xs
    min-height: 20px
    padding: 2px 8px
    font-size: 10px
    &.is-icon-only
      width: 20px
      padding: 0

  &.size-sm
    min-height: 26px
    padding: 4px 10px
    font-size: 12px
    &.is-icon-only
      width: 26px
      padding: 0

  &.size-md
    min-height: 36px
    padding: 4px 16px
    font-size: 14px
    &.is-icon-only
      width: 36px
      padding: 0

  &.size-lg
    min-height: 44px
    padding: 6px 22px
    font-size: 16px
    &.is-icon-only
      width: 44px
      padding: 0

  &.size-xl
    min-height: 52px
    padding: 8px 28px
    font-size: 18px
    &.is-icon-only
      width: 52px
      padding: 0

  &.is-flat
    box-shadow: none
    background: transparent

  &.no-caps
    text-transform: none

  &.is-round
    border-radius: 50%

  &:hover:not(.is-disabled)
    filter: brightness(1.08)

  &:active:not(.is-disabled)
    filter: brightness(0.92)

  &.is-disabled
    opacity: 0.6 !important
    cursor: not-allowed !important
    box-shadow: none !important
</style>
