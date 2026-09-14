<template>
<section class="section-contato pa-lg" id="contato">
  <h1 class="title underline-wavy text-center">Contato</h1>

  <div
    :class="[
      'section-contato-container',
      !screen.lt.md ? 'gutter-x-md' : 'gutter-y-md'
    ]"
  >
    <div class="section-contato-container-info">
      <div class="pb-md">
        <h3>Vamos conversar?</h3>
        <p>Estou aberta a novas oportunidades e projetos. Entre em contato e vamos trocar uma ideia!</p>
      </div>

      <div class="pb-md">
        <h3>Vamos nos conectar</h3>
        <ButtonContatos />
      </div>
    </div>

    <div class="section-contato-container-form">
      <h3>Envie uma mensagem</h3>

      <form
        ref="formRef"
        class="form gutter-y-md"
        @submit.prevent="handleSendEmail"
      >
        <QInput
          v-model="formData.nome"
          label="Nome"
          type="text"
          name="nome"
          :required="true"
        />

        <QInput
          v-model="formData.email"
          label="E-mail"
          type="email"
          name="email"
          :required="true"
        />

        <QTextarea
          v-model="formData.mensagem"
          label="Escreve sua mensagem aqui"
          type="text"
          name="mensagem"
          :required="true"
        />

        <QBtn
          label="Enviar"
          icon="fa fa-paper-plane"
          class="btn-enviar"
          type="submit"
          :disabled="isSending"
        >
          <span>{{ isSending ? 'Enviando...' : 'Enviar' }}</span>
        </QBtn>
      </form>
    </div>
  </div>

  <Notify
    v-model="notification.show"
    :message="notification.message"
    :type="notification.type"
  />
</section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

import { useScreen } from '@/utils/useScreen.ts'
import ButtonContatos from './ButtonContatos.vue'

defineOptions({
  name: 'Contato'
})

const screen = useScreen()

const formRef = ref<HTMLFormElement | null>(null)
const isSending = ref(false)

const formData = reactive({
  nome: '',
  email: '',
  mensagem: ''
})

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

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const handleSendEmail = async () => {
  if (!formRef.value) return

  isSending.value = true

  try {
    await emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      formRef.value,
      PUBLIC_KEY
    )

    showNotify('Mensagem enviada com sucesso!', 'success')

    formData.nome = ''
    formData.email = ''
    formData.mensagem = ''
  } catch (error) {
    console.error('Erro ao enviar mensagem via EmailJS:', error)
    
    showNotify('Erro ao enviar a mensagem. Tente novamente.', 'error')
  } finally {
    isSending.value = false
  }
}
</script>

<style lang="sass" scoped>
.section-contato
  position: relative
  overflow: hidden

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-image: url('@/assets/img/bg-circuit.png')
    background-repeat: repeat
    background-size: 350px
    pointer-events: none
    z-index: 0
    opacity: var(--bg-circuit-opacity)
    filter: var(--bg-circuit-filter)
    transition: opacity 0.3s ease, filter 0.3s ease

  .title
    padding: 40px 0

  &-container
    position: relative
    z-index: 1
    display: flex
    flex-direction: column
    justify-content: space-between

    @media (min-width: 900px)
      flex-direction: row

    &-info
      width: 100%

      @media (min-width: 1024px)
        flex: 1 1 400px

    &-form
      width: 100%
      background: var(--bg-form)
      transition: all .3s
      border: 2px solid var(--color-accent)
      padding: 60px 40px
      border-radius: .5rem

      &:hover
        transform: translateY(-2px)
        box-shadow: 0 0 20px #06b6d480,0 0 40px #06b6d44d

      @media (min-width: 1024px)
        flex: 1 1 600px

      h3
        font-size: 1.5rem
        line-height: calc( 2 / 1.5 )
        margin-bottom: calc( .25rem * 6 )

      .btn-enviar
        background-color: var(--color-accent)
        color: #ffffff
        width: 100%
        font-weight: 600
        border-radius: 4px
        transition: filter 0.2s ease, transform 0.1s ease

        &:hover
          filter: brightness(1.1)

        &:active
          transform: translateY(0)
</style>
