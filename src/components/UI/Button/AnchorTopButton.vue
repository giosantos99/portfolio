<template>
<div class="container-anchor-button">
  <Transition name="fade">
    <IconButton
      v-show="isVisible"
      class="button-go-top bg-secondary text-light"
      icon="arrow-up"
      size="lg"
      :style="{ bottom: `${bottomOffset}px` }"
      @click="scrollToTop"
    />
  </Transition>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import { useNavigation } from '@/composables/useNavigation.ts'

import IconButton from './IconButton.vue'

defineOptions({
  name: 'AnchorTopButton'
})

const { scrollToTop } = useNavigation()

const isVisible = ref(false)
const bottomOffset = ref(20)

const BASE_BOTTOM = 20

const handleScroll = () => {
  const scrollY = window.scrollY
  isVisible.value = scrollY > 100

  const footer = document.getElementById('footer')

  if (footer) {
    const footerRect = footer.getBoundingClientRect()
    const windowHeight = window.innerHeight

    if (footerRect.top < windowHeight) {
      const overlap = windowHeight - footerRect.top
      bottomOffset.value = BASE_BOTTOM + overlap
    } else {
      bottomOffset.value = BASE_BOTTOM
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="sass" scoped>
.container-anchor-button
  .button-go-top
    position: fixed
    right: 20px
    z-index: 100
    transition: bottom 0.1s ease-out, opacity 0.3s ease

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
