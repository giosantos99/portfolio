<template>
<div class="container-contatos gutter-x-md row no-wrap">
  <div
    v-for="contato in contatos"
    :key="contato.icon"
  >
    <a :href="contato.action" target="_blank">
      <IconButton
        :icon="contato.icon"
        size="lg"
        class="row text-light"
        :style="{ background: contato.color }"
      />
    </a>
  </div>
</div>
</template>

<script setup lang="ts">

import IconButton from '../UI/Button/IconButton.vue'

defineOptions({
  name: 'ButtonContatos'
})

const contatos = [
  {
    icon: 'fab fa-github',
    action: 'https://github.com/giosantos99',
    color: '#333'
  },
  {
    icon: 'fab fa-linkedin',
    action: 'https://www.linkedin.com/in/giovanna-santos-souza/',
    color: '#0e76a8'
  },
  {
    icon: 'envelope',
    action: 'mailto:giovanna.santos99@yahoo.com',
    color: '#EA4335'
  }
]

</script>

<style lang="sass" scoped>
.container-contatos
  padding-top: 25px
  display: flex
  justify-content: center

  @media (min-width: 1024px)
    display: flex
    justify-content: flex-start
</style>
