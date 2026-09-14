<template>

  <Header />

  <RouterView  />

  <AnchorTopButton />

  <Footer />

</template>

<script setup lang="ts">

import { RouterView } from 'vue-router'

import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import AnchorTopButton from './components/UI/Button/AnchorTopButton.vue'

</script>

<style lang="sass" scoped>

</style>
