import { ref, onMounted, onUnmounted } from 'vue'

const menuAtivo = ref('inicio')

let isManualClick = false

export function useNavigation(threshold = 300) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  const handleScroll = () => isVisible.value = window.scrollY > threshold

  const scrollToTop = () => {
    isManualClick = true
    menuAtivo.value = 'inicio'

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    setTimeout(() => { isManualClick = false  }, 800)
  }

  const navigateToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId)

    if (!targetElement) return

    isManualClick = true
    menuAtivo.value = sectionId

    targetElement.scrollIntoView({
      behavior: 'smooth'
    })

    setTimeout(() => { isManualClick = false }, 800)
  }

  const initIntersectionObserver = () => {
    const sections = document.querySelectorAll('main[id], section[id]')

    if (!sections.length) return

    observer = new IntersectionObserver(
      (entries) => {
        if (isManualClick) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) menuAtivo.value = entry.target.id
        })
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
      }
    )

    sections.forEach((section) => observer?.observe(section))
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    initIntersectionObserver()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)

    observer && observer.disconnect()
  })

  return {
    isVisible,
    scrollToTop,
    menuAtivo,
    navigateToSection
  }
}
