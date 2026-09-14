<template>
<section class="container-sobre-mim pa-sm gutter-y-md" id="sobre-mim">

  <div class="container-sobre-mim-img flex flex-center">
    <img src="@/assets/img/developer-2.svg" alt="Animação desenvolvedora" />
  </div>

  <div class="container-sobre-mim-info">

    <h1 class="text-sobre-mim title underline-wavy text-center">Sobre mim</h1>

    <div class="trajetoria pb-xl">
      <h2>
        <span>🧭</span>
        Minha Trajetória
      </h2>

      <p>Experiência profissional no desenvolvimento Front-end, participando da construção e evolução de aplicações web em diferentes projetos e contextos.</p>
    </div>

    <div class="trabalho pb-xl">
      <h2>
        <span>💡</span>
        Como trabalho
      </h2>
      <p>Gosto de transformar requisitos em interfaces organizadas, responsivas e fáceis de manter. Valorizo componentização, reutilização de código e uma boa experiência para o usuário.</p>
    </div>

    <div class="atualmente pb-xl">
      <h2>
        <span>📚</span>
        Atualmente
      </h2>
      <p>Estou aprofundando meus conhecimentos em TypeScript, JavaScript, arquitetura de aplicações e boas práticas de desenvolvimento Front-end.</p>
    </div>

  </div>

</section>
</template>

<script setup lang="ts">

defineOptions({
  name: 'SobreMim'
})

</script>

<style lang="sass" scoped>
.container-sobre-mim
  min-height: 100vh
  background: var(--color-section)

  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

  @media (min-width: 1024px)
    display: flex
    justify-content: space-between
    flex-direction: row

  img
    width: 100%
    height: auto
    max-width: 450px

    @media (min-width: 1024px)
      max-width: 100%

  h2
    font-size: 2rem
    padding-bottom: 8px
  p
    font-size: 1.5rem
    margin: 0
    padding: 0 45px 20px 45px

  .text-sobre-mim
    padding-bottom: 60px

  &-info
    order: 1
    width: 100%
    padding-left: 40px

    @media (min-width: 1024px)
      order: 2

  &-img
    width: 100%
    order: 2

    @media (min-width: 1024px)
      order: 1
      max-width: 600px
      color: white

</style>
