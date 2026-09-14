<template>
  <footer class="py-md">
    <Logo class="flex flex-center pb-md" />

    <div class="flex flex-center flex-col items-center gap-sm">

      <p class="text-center" aria-label="Feito com amor por Giovanna Santos">
        Feito com
        <font-awesome-icon
          icon="fa fa-heart"
          class="heart"
          aria-hidden="true"
        />
        por Giovanna Santos
      </p>

      <div class="text-center text-caption pl-xs">
        &#169; {{ ano }} Giovanna Santos. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

import { computed } from 'vue'


defineOptions({
  name: 'Footer'
})

const ano = computed(() => new Date().getFullYear())

</script>

<style lang="sass" scoped>
footer
  display: flex
  flex-direction: column

  .footer-logo
    height: 32px
    width: auto
    opacity: 0.8
    transition: opacity 0.2s ease

    &:hover
      opacity: 1

  .heart
    color: #d71d3c
    display: inline-block
    margin: 0 4px
    animation: pulsar 1s infinite ease-in-out

  @keyframes pulsar
    0%, 100%
      transform: scale(1)
    50%
      transform: scale(1.25)
</style>