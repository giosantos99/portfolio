import { reactive, onMounted, onUnmounted } from 'vue'

// Breakpoints padrão em pixels
const BREAKPOINTS = {
  xs: 600,
  sm: 1024,
  md: 1440,
  lg: 1920
}

interface ScreenState {
  width: number
  height: number
  /** Less Than (menor que o breakpoint) */
  lt: {
    sm: boolean // < 600px
    md: boolean // < 1024px
    lg: boolean // < 1440px
    xl: boolean // < 1920px
  }
  /** Greater Than (maior que o breakpoint) */
  gt: {
    xs: boolean // >= 600px
    sm: boolean // >= 1024px
    md: boolean // >= 1440px
    lg: boolean // >= 1920px
  }
}

const screen = reactive<ScreenState>({
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
  lt: {
    sm: false,
    md: false,
    lg: false,
    xl: false
  },
  gt: {
    xs: false,
    sm: false,
    md: false,
    lg: false
  }
})

function updateScreen(): void {
  const w = window.innerWidth
  const h = window.innerHeight

  screen.width = w
  screen.height = h

  // Atalhos Less Than (lt)
  screen.lt.sm = w < BREAKPOINTS.xs
  screen.lt.md = w < BREAKPOINTS.sm
  screen.lt.lg = w < BREAKPOINTS.md
  screen.lt.xl = w < BREAKPOINTS.lg

  // Atalhos Greater Than (gt)
  screen.gt.xs = w >= BREAKPOINTS.xs
  screen.gt.sm = w >= BREAKPOINTS.sm
  screen.gt.md = w >= BREAKPOINTS.md
  screen.gt.lg = w >= BREAKPOINTS.lg
}

let listenerCount = 0

export function useScreen() {
  onMounted(() => {
    if (listenerCount === 0) {
      updateScreen()
      window.addEventListener('resize', updateScreen)
    }
    listenerCount++
  })

  onUnmounted(() => {
    listenerCount--
    if (listenerCount === 0) {
      window.removeEventListener('resize', updateScreen)
    }
  })

  return screen
}
