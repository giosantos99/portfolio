<template>
  <div class="container-anchor-button">
    <IconButton
      v-show="isVisible"
      class="button-go-top bg-secondary text-light"
      icon="arrow-up"
      size="lg"
      @click="scrollToTop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import IconButton from './IconButton.vue'
import { useNavigation } from '@/composables/useNavigation.ts'

const { scrollToTop } = useNavigation()

defineOptions({
  name: 'AnchorTopButton',
})

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 100
}

const goTop = () => {
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="sass" scoped>
.container-anchor-button
  padding-top: 60px

  .button-go-top
    position: fixed
    bottom: 20px
    right: 20px
    z-index: 100
</style>
