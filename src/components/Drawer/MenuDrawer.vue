<template>
<aside class="aside" :style="{ width: larguraWindows }">

  <button
    class="close-btn"
    :class="{ 'is-active': isAnimated }"
    type="button"
    aria-label="Fechar menu"
    @click="handleClose()"
  >
    <span class="icon-bar top"></span>
    <span class="icon-bar middle"></span>
    <span class="icon-bar bottom"></span>
  </button>

  <nav class="drawer-nav">
    <ul class="drawer-menu">
      <li
        v-for="(item, index) in menu"
        :key="item.id"
        class="menu-item"
        :class="{ 'is-visible': isAnimated }"
        :style="{ transitionDelay: calculateDelay(index) }"
      >
        <a @click="handleClose(item)">
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</aside>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'

defineOptions({
  name: 'MenuDrawer'
})

interface MenuItem {
  label: string
  id: string
}

const props = defineProps<{
  menu: MenuItem[]
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'nav', link: MenuItem): void
}>()

const isAnimated = ref(false)
const larguraWindows = computed(() => `${window.innerWidth}px`)

const calculateDelay = (index: number): string => {
  const step = 60

  if (isAnimated.value) return `${100 + index * step}ms`

  const totalItems = props.menu.length
  const reverseIndex = totalItems - 1 - index

  return `${reverseIndex * step}ms`
}

const handleClose = (link?: MenuItem): void => {
  link && emit('nav', link)

  isAnimated.value = false

  const totalAnimationTime = props.menu.length * 60 + 200

  setTimeout(() => emit('close'), totalAnimationTime)
}

onMounted(() => {
  setTimeout(() => isAnimated.value = true, 50)
})
</script>

<style lang="sass" scoped>
aside
  position: fixed
  flex-direction: column
  display: flex
  top: 0
  right: 0
  z-index: 1000
  height: 100dvh
  padding: 16px
  background: var(--color-background)
  transition: background-color 0.4s ease

  .close-btn
    align-self: flex-end
    width: 40px
    height: 40px
    background: transparent
    border: none
    cursor: pointer
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 6px
    padding: 0
    position: relative
    color: var(--color-text)

    .icon-bar
      width: 24px
      height: 2px
      background-color: currentColor
      border-radius: 2px
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease-in-out
      transform-origin: center

    &.is-active
      .top
        transform: translateY(8px) rotate(45deg)

      .middle
        opacity: 0
        transform: scaleX(0)

      .bottom
        transform: translateY(-8px) rotate(-45deg)

    &:hover
      opacity: 0.8

    &:active
      transform: scale(0.92)

  .drawer-nav
    margin-top: 40px

  .drawer-menu
    text-align: center
    width: 100%
    list-style: none
    padding: 0
    margin: 0
    display: flex
    flex-direction: column
    gap: 16px

    .menu-item
      opacity: 0
      transform: translateY(20px)
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)

      &.is-visible
        opacity: 1
        transform: translateY(0)

    a
      color: var(--color-text)
      text-decoration: none
      font-size: 2rem
      font-weight: 500
      display: block
      transition: opacity 0.2s ease

      &:hover
        opacity: 0.8
</style>