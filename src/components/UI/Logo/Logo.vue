<template>
  <a class="logo cursor-pointer" @click="scrollToTop">
    <span class="text-grey">&lt;</span>
    <span>Giovanna Santos</span>
    <span class="text-grey"> /&gt;</span>
  </a>
</template>

<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation'

defineOptions({
  name: 'Logo',
})

const { scrollToTop } = useNavigation()
</script>

<style lang="sass" scoped>
.logo
  font-family: 'Agustina', cursive
  font-size: 25px
  font-weight: 600
</style>
