<template>
  <transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <div class="pt-md">
        <Logo style="cursor: default" />
      </div>
    </div>
  </transition>

  <div v-show="!isLoading">
    <Header />
    <RouterView />
    <AnchorTopButton />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import AnchorTopButton from './components/UI/Button/AnchorTopButton.vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => isLoading.value = false, 1000)
})
</script>

<style lang="sass" scoped>
.loading-overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: var(--color-background, #051129)
  color: var(--color-text, #333)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  z-index: 99999
  font-family: inherit

.spinner
  width: 60px
  height: 60px
  border: 4px solid rgba(0, 0, 0, 0.1)
  border-left-color: #6b21a8
  border-radius: 50%
  animation: spin 1s linear infinite
  margin-bottom: 16px

@keyframes spin
  to
    transform: rotate(360deg)

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.4s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
