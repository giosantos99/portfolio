<template>
<div>
  <Inicio />

  <SobreMim />

  <Experiencias />

  <Projetos />

  <Estudos />

  <Contato />

</div>
</template>

<script setup lang="ts">

import {
  Inicio,
  SobreMim,
  Experiencias,
  Projetos,
  Estudos,
  Contato
} from '@/components/Main/index'

defineOptions({
  name: 'HomeView'
})

</script>

<style lang="sass" scoped>

</style>

