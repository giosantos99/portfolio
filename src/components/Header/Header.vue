<template>
<header class="header">
  <Logo />

  <div class="container">
    <nav v-if="!screen.lt.md">
      <ul class="menu">
        <li
          v-for="item in menu"
          :key="item.id"
          :class="[
            menuAtivo === item.id ? 'menu-ativo' : '',
            'cursor-pointer'
          ]"
          @click="onNavPage(item)"
        >
          <a>
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <button
      class="theme-toggle"
      type="button"
      :aria-label="darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'"
      :aria-pressed="darkMode"
      @click="toggleTheme"
    >
      <span class="toggle"></span>
    </button>

    <QBtnIcon
      v-if="screen.lt.md"
      size="md"
      icon="bars"
      @click="openMenuMobile"
    />
  </div>
</header>

<Transition name="drawer">
  <MenuDrawer
    v-if="openDrawer"
    :menu="menu"
    @close="openDrawer = false"
    @nav="item => onNavPage(item)"
  />
</Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useScreen } from '../../utils/useScreen'
import { useNavigation } from '@/composables/useNavigation'

import MenuDrawer from '../Drawer/MenuDrawer.vue'

defineOptions({
  name: 'Header'
})

const screen = useScreen()
// Consome a variável reativa global e a função de navegação
const { menuAtivo, navigateToSection } = useNavigation()

const menu = [
  { label: 'Início', id: 'inicio' },
  { label: 'Sobre mim', id: 'sobre-mim' },
  { label: 'Experiências', id: 'experiencias' },
  { label: 'Projetos', id: 'projetos' },
  { label: 'Estudos', id: 'estudos' },
  { label: 'Contato', id: 'contato' }
]

const darkMode = ref(false)
const openDrawer = ref(false)
let observer: IntersectionObserver | null = null

const applyTheme = (isDark: boolean): void => {
  document.documentElement.classList.toggle('dark', isDark)
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

const toggleTheme = (): void => {
  darkMode.value = !darkMode.value
  applyTheme(darkMode.value)
}

const openMenuMobile = (): void => {
  openDrawer.value = true
}

interface ItemMenu {
  label: string
  id: string
}

const onNavPage = (link: ItemMenu) => {
  // Executa o scroll e atualiza a tab ativa instantaneamente
  navigateToSection(link.id)
}

const setupIntersectionObserver = () => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-80px 0px -40% 0px',
    threshold: 0.1
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Atualiza a variável global do composable durante a rolagem manual
      if (entry.isIntersecting) {
        menuAtivo.value = entry.target.id
      }
    })
  }, options)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      menu.forEach((item) => {
        const el = document.getElementById(item.id)
        el && observer?.observe(el)
      })
    })
  })
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  darkMode.value = savedTheme === 'dark'
  applyTheme(darkMode.value)

  setupIntersectionObserver()
})

onUnmounted(() => {
  observer && observer.disconnect()
})
</script>

<style lang="sass" scoped>

.header
  position: sticky
  top: 0
  z-index: 100

  width: 100%
  padding: 8px 20px

  display: flex
  justify-content: space-between
  align-items: center

  background: var(--header-bg)
  border-bottom: 1px solid var(--header-border)

  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)

  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)

  transition: background 0.4s ease, border-color 0.4s ease

.menu-ativo
  color: #fff
  background: #55198B
  border-radius: 6px

.container
  display: flex
  align-items: center
  gap: 10px

.menu
  display: flex
  align-items: center

  li
    display: inline-block

    a
      display: block
      padding: 15px 20px
      font-weight: 600
      margin: 0 4px

      text-align: center
      text-decoration: none

      transition: background 200ms ease

      &:hover
        color: #fff
        background: #55198B
        border-radius: 6px

.theme-toggle
  --size: 2rem

  width: var(--size)
  height: var(--size)

  padding: 0
  border: 0
  outline: none

  display: flex
  align-items: center
  justify-content: center

  background: transparent
  cursor: pointer

.toggle
  display: block

  width: var(--size)
  height: var(--size)

  border-radius: 999px

  color: #CCCCCC

  box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0

  transition: all 500ms

.theme-toggle[aria-pressed='true'] .toggle
  --ray-size: calc(var(--size) * -0.4)
  --offset-orthogonal: calc(var(--size) * 0.65)
  --offset-diagonal: calc(var(--size) * 0.45)

  transform: scale(0.75)

  color: #fa0

  box-shadow: inset 0 0 0 var(--size), calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size), var(--offset-orthogonal) 0 0 var(--ray-size), 0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size), 0 var(--offset-orthogonal) 0 var(--ray-size), calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size), var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size), calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size), var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size)

.drawer-enter-active,
.drawer-leave-active
  transition: opacity 0.3s ease, transform 0.3s ease

.drawer-enter-from,
.drawer-leave-to
  opacity: 0
  transform: translateX(100%)

</style>