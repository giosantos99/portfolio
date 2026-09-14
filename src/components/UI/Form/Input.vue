<template>
  <div class="custom-input-container">
    <input
      id="custom-input"
      :type="type"
      :name="name"
      :value="modelValue"
      :required="required"
      placeholder=" "
      autocomplete="off"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label for="custom-input">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  name: String,
  modelValue: [String, Number],
  required: Boolean
})

defineEmits(['update:modelValue'])

defineOptions({
  name: 'QInput'
})
</script>

<style lang="sass" scoped>
.custom-input-container
  position: relative
  display: flex
  flex-direction: column
  width: 100%

  input
    font-size: 16px
    color: var(--input-text)
    background: var(--input-bg)
    border: none
    border-bottom: 1px solid var(--input-border)
    border-radius: 4px 4px 0 0
    padding: 20px 12px 6px 12px
    height: 56px
    outline: none
    box-sizing: border-box
    transition: background 0.36s ease, border-color 0.36s ease

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active
      -webkit-box-shadow: 0 0 0 30px var(--input-bg) inset !important
      -webkit-text-fill-color: var(--input-text) !important
      transition: background-color 5000s ease-in-out 0s

    &:hover
      background: var(--input-bg-hover)

    &:focus
      border-bottom: 2px solid var(--color-accent)
      background: rgba(255, 255, 255, 0.1)

  label
    position: absolute
    left: 12px
    top: 18px
    font-size: 16px
    color: var(--input-label)
    pointer-events: none
    transform-origin: left top
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label
    transform: translateY(-10px) scale(0.75)

  input:focus ~ label
    color: var(--color-accent)
</style>
