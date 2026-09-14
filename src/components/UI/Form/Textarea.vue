<template>
  <div class="custom-textarea-container">
    <textarea
      id="custom-textarea"
      :name="name"
      :value="modelValue"
      :required="required"
      placeholder=" "
      autocomplete="off"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    
    <label for="custom-textarea">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  name: String,
  modelValue: [String, Number],
  required: Boolean
})

defineEmits(['update:modelValue'])

defineOptions({
  name: 'QTextarea'
})
</script>

<style lang="sass" scoped>
.custom-textarea-container
  position: relative
  display: flex
  flex-direction: column
  width: 100%

  textarea
    font-size: 16px
    font-family: inherit
    color: var(--input-text)
    background: var(--input-bg)
    border: none
    border-bottom: 1px solid var(--input-border)
    border-radius: 4px 4px 0 0
    padding: 28px 12px 8px 12px
    min-height: 110px
    outline: none
    box-sizing: border-box
    resize: vertical
    transition: background 0.36s ease, border-color 0.36s ease

    &:hover
      background: var(--input-bg-hover)

    &:focus
      border-bottom: 2px solid var(--color-accent)

  label
    position: absolute
    left: 12px
    top: 20px
    font-size: 16px
    color: var(--input-label)
    pointer-events: none
    z-index: 2

    background: var(--input-bg)
    padding: 0 4px

    border-radius: 4px

    transform-origin: left top
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease, background 0.36s ease

  textarea:hover ~ label
    background: var(--input-bg-hover)

  textarea:focus ~ label,
  textarea:not(:placeholder-shown) ~ label
    transform: translateY(-14px) scale(0.75)

  textarea:focus ~ label
    background: var(--color-secondary)
    color: var(--color-light)
</style>