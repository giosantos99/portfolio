<template>
<section class="section-projetos pa-lg" id="projetos">

  <h1 class="title underline-wavy">Projetos</h1>
  <p class="text-center pb-xl">
    Conheça projetos desenvolvidos ao longo da minha trajetória profissional e acadêmica, além de projetos pessoais criados para explorar novas tecnologias e aprimorar minhas habilidades em desenvolvimento Front-end.
  </p>

  <div class="container-projetos py-xl">
    <div
      v-for="projeto in projetosExibidos"
      :key="projeto.id"
      class="project-card"
    >
      <div class="card-banner">
        <img
          :src="`img/${projeto.imagem}`"
          :alt="projeto.titulo"
          loading="lazy"
        />
        <span class="status-badge">{{ projeto.status }}</span>
      </div>

      <div class="card-content">
        <h3 class="project-title">{{ projeto.titulo }}</h3>

        <p class="project-description">
          {{ projeto.descricao }}
        </p>

        <div class="tech-stack">
          <span
            v-for="tech in projeto.tecnologias"
            :key="tech"
            class="tech-badge"
          >
            {{ tech }}
          </span>
        </div>

        <div class="card-actions">
          <a
            :href="projeto.linkRepo"
            target="_blank"
            class="action-link"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
            <span>Repository</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <QBtn
    size="lg"
    color="text-light"
    bg-color="bg-secondary"
    @click="exibirTodos = !exibirTodos"
  >
    {{ exibirTodos ? 'Ver Menos' : 'Ver Mais' }}
  </QBtn>

</section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({
  name: 'Projetos'
})

const exibirTodos = ref(false)

const projetos = [
  {
    id: 'encurtador-de-links',
    imagem: 'encurtador-links.png',
    titulo: 'Encurtador de links',
    status: 'Public',
    descricao: 'Aplicação web desenvolvida com Node.js, Express, Pug, Sass e Bootstrap para encurtar URLs utilizando a API do TinyURL.',
    linkRepo: 'https://github.com/giosantos99/encurtador-de-links',
    tecnologias: ['Node.js', 'Express', 'Pug', 'Bootstrap 5', 'Sass']
  },
  {
    id: 'mykanban',
    imagem: 'mykanban.png',
    titulo: 'MyKanban',
    status: 'Public',
    descricao: 'Aplicação de gerenciamento de tarefas baseada no modelo Kanban.',
    linkRepo: 'https://github.com/giosantos99/MyKanban',
    tecnologias: ['Vue.js 3', 'Vue Draggable', 'Quasar Framework', 'Sass', 'JavaScript', 'Axios', 'JSON Server']
  },
  {
    id: 'flowagenda',
    imagem: 'flowagenda.png',
    titulo: 'FlowAgenda',
    status: 'Public',
    descricao: 'Aplicação de agenda para gerenciamento de eventos.',
    linkRepo: 'https://github.com/giosantos99/FlowAgenda',
    tecnologias: ['Vue.js 3', 'Quasar Framework', 'Quasar QCalendar', 'Sass', 'JavaScript', 'Axios', 'JSON Server']
  },
  {
    id: 'analise-dados-financeiro',
    imagem: 'analise-dados.png',
    titulo: 'Análise de Dados Financeiros',
    status: 'Public',
    descricao: 'Aplicação para análise e visualização de dados financeiros.',
    linkRepo: 'https://github.com/giosantos99/analise-de-dados-financeiros',
    tecnologias: ['HTML 5', 'CSS 3', 'TypeScript', 'ES Modules', 'API REST', 'Fetch API']
  },
  {
    id: 'slidestories',
    imagem: 'slidestories.png',
    titulo: 'SlideStories',
    status: 'Public',
    descricao: 'Página de Stories inspirado na experiência do Instagram.',
    linkRepo: 'https://github.com/giosantos99/SlideStories',
    tecnologias: ['HTML 5', 'CSS 3', 'TypeScript', 'Vite', 'LocalStorage']
  },
  {
    id: 'dok-despachante',
    imagem: 'dok-despachante.png',
    titulo: 'Dok Despachante',
    status: 'Public',
    descricao: 'Landing page da empresa Dok Despachante',
    linkRepo: 'https://github.com/giosantos99/DokDespachante',
    tecnologias: ['HTML 5', 'CSS 3', 'Bootstrap', 'JavaScript', 'Axios']
  }
]

const projetosExibidos = computed(() => {
  return exibirTodos.value ? projetos : projetos.slice(0, 3)
})
</script>

<style lang="sass" scoped>

.section-projetos
  background: var(--color-section)
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  min-height: 100vh

  .title
    padding: 40px 0

  p
    font-size: 1.8rem

  .container-projetos
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
    gap: 24px
    width: 100%
    max-width: 1200px

  .project-card
    background: var(--color-card-bg, rgba(255, 255, 255, 0.03))
    border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08))
    border-radius: 12px
    overflow: hidden
    display: flex
    flex-direction: column
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease

    &:hover
      transform: translateY(-5px)
      border-color: var(--color-accent, #06b6d4)
      box-shadow: 0 8px 24px rgba(6, 182, 212, 0.12)

    .card-banner
      position: relative
      width: 100%
      height: 180px
      overflow: hidden
      background: rgba(0, 0, 0, 0.2)

      img
        width: 100%
        height: 100%
        object-fit: cover
        transition: transform 0.5s ease

      .status-badge
        position: absolute
        top: 12px
        right: 12px
        font-size: 0.7rem
        font-weight: 600
        padding: 3px 8px
        border-radius: 20px
        background: rgba(10, 25, 47, 0.7)
        color: #fff
        border: 1px solid var(--color-card-border)
        backdrop-filter: blur(4px)

    &:hover .card-banner img
      transform: scale(1.05)

    .card-content
      padding: 20px
      display: flex
      flex-direction: column
      flex-grow: 1

    .project-title
      font-size: 1.15rem
      font-weight: 700
      color: var(--color-text, #fff)
      margin-bottom: 8px

    .project-description
      font-size: 0.875rem
      color: var(--color-text)
      line-height: 1.5
      margin-bottom: 16px
      display: -webkit-box
      -webkit-line-clamp: 3
      -webkit-box-orient: vertical
      overflow: hidden

    .tech-stack
      display: flex
      flex-wrap: wrap
      gap: 6px
      margin-top: auto
      padding-bottom: 16px

      .tech-badge
        font-size: 0.7rem
        padding: 3px 8px
        border-radius: 4px
        background: #f3e8ff
        color: #6b21a8
        border: 1px solid #d8b4fe
        font-weight: 500

    .card-actions
      display: flex
      justify-content: space-between
      align-items: center
      padding-top: 12px
      border-top: 1px solid var(--color-card-border, rgba(255, 255, 255, 0.08))

      .action-link
        display: flex
        align-items: center
        gap: 6px
        font-size: 0.85rem
        font-weight: 600
        color: #7e22ce
        text-decoration: none
        transition: opacity 0.2s ease

        &:hover
          color: var(--link-projetos-hover)
          opacity: 0.8
          text-decoration: underline

</style>
