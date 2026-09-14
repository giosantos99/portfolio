import { ref, onMounted, onUnmounted } from 'vue'

const menuAtivo = ref('inicio')

export function useNavigation(threshold = 300) {
  const isVisible = ref(false)

  const handleScroll = () => {
    isVisible.value = window.scrollY > threshold
  }

  const scrollToTop = () => {
    menuAtivo.value = 'inicio'

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const navigateToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId)
    if (!targetElement) return

    menuAtivo.value = sectionId

    targetElement.scrollIntoView({
      behavior: 'smooth'
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isVisible,
    scrollToTop,
    menuAtivo,
    navigateToSection
  }
}
