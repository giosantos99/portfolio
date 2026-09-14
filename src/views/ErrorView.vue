<template>
  <div class="not-found-container">
    <h1 class="error-code">&lt;404 /&gt;</h1>
    <h2>Página não encontrada</h2>

    <img src="@/assets/img/error404.svg" alt="Imagem de erro" />

    <p class="text-center py-md">
      Ops! A página que você está procurando não existe ou foi movida.
    </p>

    <QBtn
      label="Voltar para o Início"
      icon="fa fa-home"
      bg-color="bg-secondary"
      color="text-light"
      @click="$router.push('/')"
    />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'ErrorView'
})

</script>

<style lang="sass" scoped>
.not-found-container
  min-height: 80vh
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  .error-code
    font-size: 5rem
    font-weight: 700
    color: var(--color-accent, #06b6d4)
    margin: 0

  h2
    font-size: 2rem
    margin-top: 10px

  p
    font-size: 1.1rem
    max-width: 450px
    opacity: 0.8

  img
    display: block
    max-width: 350px
    padding: 40px 0 20px 0
</style>
