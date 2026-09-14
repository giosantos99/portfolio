<template>
  <button
    class="ui-icon-btn"
    type="button"
    :class="[
      `is-${size}`,
      { 'is-round': round, 'is-flat': flat }
    ]"
    @click="$emit('click')"
  >
    <!-- O componente precisa estar registrado ou ser chamado via name -->
    <font-awesome-icon v-if="icon" :icon="icon" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface Props {
  icon?: string | string[] | object
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  round?: boolean
  flat?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'sm',
  round: true,
  flat: true
})

defineEmits(['click'])

</script>

<style lang="sass" scoped>
.ui-icon-btn
  display: inline-flex
  align-items: center
  justify-content: center

  padding: 0
  border: none
  outline: none
  background: transparent

  color: inherit
  cursor: pointer
  user-select: none
  transition: background-color 0.2s ease, transform 0.1s ease

  &.is-xs
    width: 24px
    height: 24px
    font-size: 12px

  &.is-sm
    width: 32px
    height: 32px
    font-size: 16px

  &.is-md
    width: 40px
    height: 40px
    font-size: 20px

  &.is-lg
    width: 48px
    height: 48px
    font-size: 24px

  &.is-xl
    width: 56px
    height: 56px
    font-size: 28px

  &.is-round
    border-radius: 50%

  &.is-flat:hover
    background-color: rgba(255, 255, 255, 0.15)

  &:active
    transform: scale(0.95)
</style>
