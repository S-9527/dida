import { onMounted, onUnmounted } from 'vue'
import { useIsMac } from '@/composables'
import { useCommandModalStore } from '@/store'

// Command + K shows the command panel on MacOS, Ctrl + K on Windows.
export function registerKeyboardShortcut() {
  const isMac = useIsMac()
  const { openCommandModal } = useCommandModalStore()

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'k' && (isMac.value ? e.metaKey : e.ctrlKey)) {
      e.preventDefault()
      openCommandModal()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', keydownHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', keydownHandler)
  })
}
