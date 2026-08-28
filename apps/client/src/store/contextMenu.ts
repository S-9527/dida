import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'

export const useContextMenuStore = defineStore('contextMenu', () => {
  const open = ref(false)
  const x = ref(0)
  const y = ref(0)
  const options = ref<DropdownMixedOption[]>([])

  async function show(menuOptions: DropdownMixedOption[], event: MouseEvent) {
    options.value = menuOptions
    x.value = event.clientX
    y.value = event.clientY

    await nextTick()
    open.value = true
  }

  function hide() {
    open.value = false
  }

  return {
    open,
    x,
    y,
    options,
    show,
    hide,
  }
})
