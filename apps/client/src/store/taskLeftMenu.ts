import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskLeftMenuStore = defineStore('taskLeftMenu', () => {
  const taskLeftMenuVisible = ref(true)

  function toggleTaskLeftMenu() {
    taskLeftMenuVisible.value = !taskLeftMenuVisible.value
  }

  return { taskLeftMenuVisible, toggleTaskLeftMenu }
})
