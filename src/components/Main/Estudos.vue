<template>
<section class="section-estudos pa-lg" id="estudos">
  <h1 class="title underline-wavy text-center">Estudos</h1>

  <p class="text-center pb-xl">
    Estou sempre buscando aprimorar meus conhecimentos e ampliar minha atuação como desenvolvedora Front-end.
  </p>

  <div
    class="section-estudos-container"
    :style="!screen.lt.md ? 'gap: 0 40px' : ''"
    >

    <div class="section-estudos-container-img flex flex-center">
      <img
        src="@/assets/img/web_development.svg"
        loading="lazy"
        alt="Animação de computação"
      />
    </div>

    <div class="section-estudos-container-info">

      <div class="formacao-container pb-xl">
        <h3 class="text-start pb-sm">
          <span class="pr-xs">🎓</span>
          Formação Acadêmica
        </h3>

        <div class="academic-timeline">
          <div
            v-for="item in formacao"
            :key="item.curso"
            class="timeline-card"
          >
            <div class="card-header">
              <span class="degree-type">{{ item.tipo }}</span>
              <span class="period-badge">{{ item.periodo }}</span>
            </div>
            <h4 class="course-title">{{ item.curso }}</h4>
            <p class="institution-name">
              <font-awesome-icon :icon="['fas', 'building-columns']" class="mr-xs" />
              {{ item.instituicao }}
            </p>
          </div>
        </div>
      </div>

      <div class="pt-xl">
        <h3 class="text-start pb-sm">
          <span class="pr-xs">📜</span>
          Cursos e Certificações
        </h3>

        <div class="container-cursos-certificacoes">

          <div
            v-for="curso in cursos"
            :key="curso.label"
            class="card-curso"
          >
            <font-awesome-icon
              v-if="!isImagem(curso.label)"
              :icon="curso.icon"
              :style="{ color: curso.color }"
              class="icon"
            />
            <img
              v-else
              :src="`icons/${curso.icon}`"
              :alt="`Ícone ${curso.label}`"
              style="width: 2.25rem;"
            >
            <span class="text-center">{{ curso.label }}</span>
          </div>

        </div>
      </div>

    </div>

  </div>
</section>
</template>

<script setup lang="ts">

import { useScreen } from '@/utils/useScreen'
import { computed } from 'vue'

defineOptions({
  name: 'Estudos'
})

const screen = useScreen()

const formacao = [
  {
    instituicao: 'Universidade Santa Cecília',
    periodo: '02/2017 - 12/2020',
    curso: 'Sistemas de Informação',
    tipo: 'Bacharelado'
  },
  {
    instituicao: 'Faculdade Descomplica',
    periodo: '12/2022 - 06/2023',
    curso: 'Projetos de Aplicativos Móveis Multiplataforma',
    tipo: 'Pós-graduação'
  }
]

const cursos = [
  { label: 'Vue.js', icon: 'fab fa-vuejs', color: 'rgb(99, 230, 190)' },
  { label: 'Quasar Framework', icon: 'quasar.svg', color: '' },
  { label: 'Bootstrap', icon: 'fab fa-bootstrap', color: 'rgb(177, 151, 252)' },
  { label: 'JavaScript', icon: 'fab fa-square-js', color: 'rgb(255, 212, 59)' },
  { label: 'TypeScript', icon: 'fab fa-typescript', color: 'rgb(14, 137, 236)' },
  { label: 'Pug.js', icon: 'pug.svg', color: '' },
  { label: 'HTML 5', icon: 'fab fa-html5', color: 'rgba(255, 99, 71)' },
  { label: 'CSS 3', icon: 'fab fa-css3', color: 'rgb(21, 90, 211)' },
  { label: 'SASS / SCSS', icon: 'fab fa-sass', color: 'rgb(230, 99, 217)' },
  { label: 'Node.js', icon: 'fab fa-node', color: 'rgb(22, 163, 74)' },
  { label: 'Express.js', icon: 'fab fa-node-js', color: 'rgb(22, 163, 74)' },
  { label: 'Git', icon: 'fab fa-git-alt', color: 'rgb(234, 88, 12)' }
]

const isImagem = computed(() => {
  return (icon: string) => ['Pug.js', 'Quasar Framework'].includes(icon)
})

</script>

<style lang="sass" scoped>
.section-estudos

  .title
    padding: 40px 0

  p
    font-size: 1.8rem

  img
    width: 100%
    height: auto
    max-width: 100%

  &-container
    display: flex
    flex-direction: column

    @media (min-width: 1024px)
      flex-direction: row
      justify-content: space-between

    .formacao-container
      .section-subtitle
        display: flex
        align-items: center
        gap: 10px
        font-size: 1.5rem
        font-weight: 700
        color: var(--color-text, #fff)

        .subtitle-icon
          color: var(--color-accent, #06b6d4)

      .academic-timeline
        display: flex
        flex-direction: column
        gap: 16px
        padding-left: 8px

      .timeline-card
        position: relative
        background: var(--card-estudos-bg)
        border: 1px solid var(--card-estudos-border)
        border-left: 4px solid var(--color-accent, #06b6d4)
        border-radius: 8px 12px 12px 8px
        padding: 16px 20px
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease
        backdrop-filter: blur(8px)

        &:hover
          transform: translateX(6px)
          background: var(--card-estudos-bg-hover)
          border-color: var(--card-estudos-border)
          border-left-color: #d946ef
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.15)

        .card-header
          display: flex
          justify-content: space-between
          align-items: center
          margin-bottom: 6px

          .degree-type
            font-size: 0.75rem
            font-weight: 700
            text-transform: uppercase
            letter-spacing: 0.5px
            color: #8b5cf6

          .period-badge
            font-size: 0.75rem
            padding: 2px 8px
            border-radius: 12px
            background: var(--badge-estudos-bg)
            color: var(--badge-estudos-text)

        .course-title
          font-size: 1.1rem
          font-weight: 600
          color: var(--text-estudos-primary)
          margin-bottom: 4px
          text-align: start

        .institution-name
          font-size: 0.875rem
          color: var(--text-estudos-secondary)
          display: flex
          align-items: center
          gap: 6px

    &-info
      width: 100%
      order: 1
      text-align: center
      margin: 40px 0

      h3
        font-size: 1.8rem

      .container-cursos-certificacoes
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))
        gap: 24px
        width: 100%
        padding: 10px 0

        .card-curso
          background: var(--card-estudos-bg)
          color: var(--text-estudos-primary)
          border-radius: 1rem
          padding: 1rem
          display: flex
          flex-direction: column
          align-items: center
          justify-content: space-between

          .icon
            font-size: 2.25rem
            line-height: 2.5rem
            margin-bottom: 0.5rem

          span
            font-size: 0.875rem
            line-height: 1.25rem
            font-weight: 500

          &:hover
            transition: all 0.3s ease
            animation: fadeIn 0.6s ease-out
            transition-property: all
            transform: translateY(-8px)
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
            transition-duration: 150ms
            color: var(--color-light)
            background: linear-gradient(135deg, #d946ef 0%, #06b6d4 100%)

      @media (min-width: 1024px)
        order: 2
        text-align: start
        padding: 0 40px

    &-img
      width: 100%
      max-width: 450px
      margin: 0 auto
      order: 2

      @media (min-width: 1024px)
        max-width: 100%
        order: 1
</style>
