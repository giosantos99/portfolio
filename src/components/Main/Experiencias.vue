<template>
<section class="section-experiencias pa-lg" id="experiencias">
  <h1 class="title underline-wavy text-center">Experiências</h1>

  <div class="experience-card">
    <div class="card-header">
      <div class="role-group">
        <h3 class="role-title">Desenvolvedora Front-end JR</h3>
        <span class="company-name">Yboh Desenvolvimento de Softwares EIRELI</span>
      </div>
      <span class="period-badge">07/2021 — 07/2026</span>
    </div>

    <p class="summary-text">
      Atuação no desenvolvimento e evolução de aplicações web, trabalhando principalmente com Vue.js, Quasar e JavaScript.
    </p>

    <ul class="task-list">
      <li
        v-for="contribuicao in contruibuicoes"
        :key="contribuicao"
      >
        <font-awesome-icon icon="circle-check" class="list-icon" />
        <span>{{ contribuicao }}</span>
      </li>
    </ul>

    <div class="tech-tags">
      <span
        v-for="tecnologia in tecnologias"
        :key="tecnologia"
        class="tech-tag"
      >
        {{ tecnologia }}
      </span>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">

defineOptions({
  name: 'Experiencias'
})

const contruibuicoes = [
  'Desenvolvimento de interfaces',
  'Criação e manutenção de componentes',
  'Integração com APIs REST',
  'Correção e evolução de funcionalidades',
  'Colaboração com a equipe de desenvolvimento',
  'Suporte em demandas de back-end'
]

const tecnologias = [
  'Vue.js',
  'Quasar Framework',
  'JavaScript',
  'Node.js',
  'Express'
]
</script>

<style lang="sass" scoped>
.section-experiencias
  display: flex
  flex-direction: column
  justify-content: center
  padding-bottom: 80px
  min-height: 80vh

  .title
    padding: 40px 0

  .experience-card
    align-self: center
    background: var(--color-card-bg, #ffffff)
    border: 1px solid var(--color-card-border, rgba(0, 0, 0, 0.08))
    border-radius: 12px
    padding: 24px
    max-width: 720px
    width: 100%
    backdrop-filter: blur(8px)
    transition: transform 0.3s ease, border-color 0.3s ease

    &:hover
      transform: translateY(-4px)
      border-color: rgba(6, 182, 212, 0.4)

    @media (min-width: 1024px)
      align-self: flex-start

    .card-header
      display: flex
      justify-content: space-between
      align-items: flex-start
      gap: 16px
      margin-bottom: 12px
      flex-wrap: wrap

      .role-title
        font-size: 1.25rem
        font-weight: 700
        margin: 0

      .company-name
        display: block
        font-size: 0.9rem
        color: var(--color-accent, #06b6d4)
        margin-top: 2px

      .period-badge
        font-size: 0.75rem
        font-weight: 600
        padding: 4px 10px
        border-radius: 20px
        background: rgba(6, 182, 212, 0.15)
        color: #06b6d4
        border: 1px solid rgba(6, 182, 212, 0.3)
        white-space: nowrap

    .summary-text
      font-size: 0.95rem
      margin-bottom: 16px
      line-height: 1.5

    .task-list
      list-style: none
      padding: 0
      margin: 0 0 20px 0
      display: flex
      flex-direction: column
      gap: 10px

      li
        display: flex
        align-items: center
        gap: 10px
        font-size: 0.9rem

      .list-icon
        color: #10b981
        font-size: 0.85rem
        flex-shrink: 0

    .tech-tags
      display: flex
      flex-wrap: wrap
      gap: 8px
      padding-top: 16px
      border-top: 1px solid rgba(255, 255, 255, 0.06)

      .tech-tag
        font-size: 0.75rem
        padding: 4px 12px
        border-radius: 6px
        background: rgba(139, 92, 246, 0.15)
        color: #c084fc
        border: 1px solid rgba(139, 92, 246, 0.3)
        font-weight: 500
</style>
