<template>
  <a class="logo cursor-pointer" @click="scrollToTop">
    <span class="text-grey">&lt;</span>
    <span :style="!screen.lt.md ? 'font-size: 25px' : 'font-size: 18px'">
      Giovanna Santos
    </span>
    <span class="text-grey"> /&gt;</span>
  </a>
</template>

<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation'
import { useScreen } from '@/utils/useScreen'

defineOptions({
  name: 'Logo',
})

const screen = useScreen()

const { scrollToTop } = useNavigation()
</script>

<style lang="sass" scoped>
.logo
  font-family: 'Agustina', cursive
  font-weight: 600
</style>
