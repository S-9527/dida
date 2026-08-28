import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommandModalStore = defineStore('commandModal', () => {
  const showCommandModal = ref(false)

  function openCommandModal() {
    showCommandModal.value = true
  }

  function closeCommandModal() {
    showCommandModal.value = false
  }

  return { showCommandModal, openCommandModal, closeCommandModal }
})
