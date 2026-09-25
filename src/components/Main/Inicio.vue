<template>
<main class="main pa-md" id="inicio">

  <div></div>

  <div class="circuit-background">
    <canvas ref="matrixCanvas" class="matrix-canvas"></canvas>
  </div>

  <div class="home">

    <div class="container-info">
      <div class="header-title">
        <h1>
          Olá, Eu sou Giovanna Santos
          <span class="wave-hand">👋</span>
        </h1>
      </div>

      <h2>Desenvolvedora Front-end Júnior</h2>

      <p>
        Desenvolvedora Front-end com 5 anos de experiência profissional, atuando na criação e evolução de aplicações web com Vue.js, Quasar e JavaScript.
      </p>

      <p>
        Também tenho experiência com integração de APIs REST e suporte a demandas de back-end utilizando Node.js e Express.
      </p>

      <ButtonContatos />

      <div
        :class="[
          !screen.lt.md ? 'row gutter-x-md' : 'gutter-y-md',
          'pt-xl'
        ]"
      >
        <QBtn
          :noCaps="false"
          size="lg"
          color="text-light"
          bg-color="bg-secondary"
          @click="goContato"
        >
          <span>Entre em contato</span>
        </QBtn>
        <QBtn
          :noCaps="false"
          size="lg"
          icon="fa fa-download"
          color="text-light"
          bg-color="bg-secondary"
          @click="baixarCurriculo"
        >
          <span>Baixar currículo</span>
        </QBtn>
      </div>
    </div>

    <div class="container-img">
      <img src="@/assets/img/developer.svg" alt="animação de desenvolvedora" />
    </div>

  </div>

  <div
    v-if="!screen.lt.md"
    class="mouse-scroll-container flex flex-center"
  >
    <div class="mouse cursor-pointer" @click="navProximaSecao">
      <div class="wheel"></div>
    </div>
  </div>

  <Notify
    v-model="notification.show"
    :message="notification.message"
    :type="notification.type"
  />

</main>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useScreen } from '@/utils/useScreen.ts'
import { useNavigation } from '@/composables/useNavigation.ts'

import ButtonContatos from './ButtonContatos.vue'

defineOptions({
  name: 'Home'
})

const screen = useScreen()
const { navigateToSection } = useNavigation()

const matrixCanvas = ref<HTMLCanvasElement | null>(null)

const notification = reactive({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const showNotify = (message: string, type: 'success' | 'error' = 'success') => {
  notification.message = message
  notification.type = type
  notification.show = true
}

let animationId: number
let themeObserver: MutationObserver | null = null
let handleResize: (() => void) | null = null

const navProximaSecao = () => {
  const containerEl = document.getElementById('sobre-mim')

  containerEl?.scrollIntoView({ behavior: 'smooth' })
}

const goContato = () => navigateToSection('contato')

const baixarCurriculo = async () => {
  try {
    const response = await fetch('pdf/Giovanna Santos de Souza - Desenvolvedora Front-end.pdf')

    if (!response.ok) throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)

    const blob = await response.blob()
    const fileURL = window.URL.createObjectURL(blob)

    const fileLink = document.createElement('a')

    fileLink.href = fileURL
    fileLink.setAttribute('download', 'Giovanna Santos - Frontend.pdf')
    document.body.appendChild(fileLink)

    fileLink.click()

    document.body.removeChild(fileLink)
    window.URL.revokeObjectURL(fileURL)

    showNotify('Currículo baixado com sucesso!', 'success')
  } catch {
    showNotify('Erro ao baixar o currículo. Tente novamente.', 'error')
  }
}

onUnmounted(() => {
  animationId && cancelAnimationFrame(animationId)
  themeObserver && themeObserver.disconnect()
  handleResize && window.removeEventListener('resize', handleResize)
})

onMounted(async () => {
  await nextTick()

  const canvas = matrixCanvas.value

  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const chars = '01'
  const maxActiveNodes = 20
  let isDarkMode = document.documentElement.classList.contains('dark')

  themeObserver = new MutationObserver(() => {
    isDarkMode = document.documentElement.classList.contains('dark')
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  let nodes: Array<{
    x: number
    y: number
    char: string
    opacity: number
    state: 'fade-in' | 'hold' | 'fade-out' | 'idle'
    holdTimer: number
  }> = []

  const resize = () => {
    const parent = canvas.parentElement
    canvas.width = parent?.offsetWidth || window.innerWidth
    canvas.height = parent?.offsetHeight || window.innerHeight

    const spacingX = 85
    const spacingY = 85
    const cols = Math.floor(canvas.width / spacingX)
    const rows = Math.floor(canvas.height / spacingY)

    nodes = []

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacingX + (r % 2 === 0 ? 40 : 20)
        const y = r * spacingY + (c % 2 === 0 ? 30 : 50)

        nodes.push({
          x,
          y,
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: 0,
          state: 'idle',
          holdTimer: 0
        })
      }
    }
  }

  handleResize = resize

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 22px "Consolas", "Courier New", monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const activeNodes = nodes.filter(n => n.state !== 'idle')

    if (activeNodes.length < maxActiveNodes) {
      const idleNodes = nodes.filter(n => n.state === 'idle')
      if (idleNodes.length > 0) {
        const randomNode = idleNodes[Math.floor(Math.random() * idleNodes.length)]
        randomNode.state = 'fade-in'
        randomNode.char = chars[Math.floor(Math.random() * chars.length)]
        randomNode.opacity = 0
        randomNode.holdTimer = 180 + Math.random() * 120
      }
    }

    const charColor = isDarkMode ? '0, 240, 255' : '107, 33, 168'

    nodes.forEach(node => {
      if (node.state === 'fade-in') {
        node.opacity += 0.015
        if (node.opacity >= 1) {
          node.opacity = 1
          node.state = 'hold'
        }
      } else if (node.state === 'hold') {
        node.holdTimer -= 1
        if (node.holdTimer <= 0) {
          node.state = 'fade-out'
        }
      } else if (node.state === 'fade-out') {
        node.opacity -= 0.008
        if (node.opacity <= 0) {
          node.opacity = 0
          node.state = 'idle'
        }
      }

      if (node.opacity > 0) {
        ctx.fillStyle = `rgba(${charColor}, ${node.opacity.toFixed(2)})`
        ctx.fillText(node.char, node.x, node.y)
      }
    })

    animationId = requestAnimationFrame(render)
  }

  resize()
  render()

  window.addEventListener('resize', handleResize)
})
</script>

<style lang="sass" scoped>
.main
  position: relative
  min-height: calc(100vh - 70px)
  display: flex
  flex-direction: column
  justify-content: space-between
  overflow: hidden

  .circuit-background
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    z-index: 0
    background-color: transparent
    background-image: url('@/assets/img/bg-circuit.png')
    background-repeat: repeat
    background-size: 350px
    transition: filter 0.3s ease

    filter: invert(0.8) opacity(0.35)

    .matrix-canvas
      display: block
      width: 100%
      height: 100%
      pointer-events: none

  .home,
  .mouse-scroll-container
    position: relative
    z-index: 1

  .home
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 40px
    padding: 20px 40px

    @media (min-width: 1024px)
      flex-direction: row
      justify-content: center
      align-items: center
      gap: 0

    .container-info
      text-align: center
      width: 100%
      padding-top: 40px

      @media (min-width: 1024px)
        flex: 1
        max-width: none
        text-align: left

      .header-title
        display: flex
        align-items: center
        justify-content: center
        flex-wrap: wrap
        gap: 12px
        margin-bottom: 12px

        @media (min-width: 1024px)
          justify-content: flex-start

        h1
          font-size: 2.8rem
          font-weight: 700
          line-height: 1.2
          margin: 0

          @media (min-width: 1024px)
            font-size: 3.5rem

      h2
        font-size: 2rem
        margin: 0 0 10px 0
        opacity: 0.9
        padding-bottom: 8px

      p
        font-size: 1.5rem
        line-height: 1.75rem
        margin: 10px 0

        @media (min-width: 1024px)
          font-size: 1.25rem
          line-height: 2rem

      @keyframes wave-hand
        0%
          transform: rotate(0deg)
        10%
          transform: rotate(14deg)
        20%
          transform: rotate(-8deg)
        30%
          transform: rotate(14deg)
        40%
          transform: rotate(-4deg)
        50%
          transform: rotate(10deg)
        60%
          transform: rotate(0deg)
        100%
          transform: rotate(0deg)

      .wave-hand
        font-size: 2.5rem
        display: inline-block
        transform-origin: 70% 70%
        animation: wave-hand 2.5s infinite ease-in-out

        &:hover
          animation: wave-hand 2s infinite ease-in-out

    .container-img
      width: 100%
      display: flex
      justify-content: center
      align-items: center

      @media (min-width: 1024px)
        flex: 1
        max-width: 550px

      img
        width: 100%
        height: auto
        max-width: 450px

        @media (min-width: 1024px)
          max-width: 100%

  .mouse-scroll-container
    padding: 10px

    .mouse
      width: 26px
      height: 42px
      border: 2px solid var(--color-text, #ffffff)
      border-radius: 14px
      display: flex
      justify-content: center
      padding-top: 6px

      .wheel
        width: 4px
        height: 8px
        background-color: var(--color-text, #ffffff)
        border-radius: 2px
        animation: scroll 1.8s infinite cubic-bezier(0.65, 0, 0.35, 1)

    @keyframes scroll
      0%
        opacity: 0
        transform: translateY(0)

      20%
        opacity: 1

      80%
        opacity: 0.8

      100%
        opacity: 0
        transform: translateY(14px)

:global(html.dark)
  .circuit-background
    filter: invert(0) brightness(1.2)
</style>
