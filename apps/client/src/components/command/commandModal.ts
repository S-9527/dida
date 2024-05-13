import { onMounted, onUnmounted, ref } from 'vue'
import { useIsMac } from "@/composables/misc.ts";
const showCommandModal = ref<boolean>(false)

export function useCommandModal() {
    function openCommandModal() {
        showCommandModal.value = true
    }

    function closeCommandModal() {
        showCommandModal.value = false
    }

    function registerKeyboardShortcut() {
        // Command + K Or Command + / will show command in macOS
        // Ctrl + K Or Ctrl + / in Windows
        const isMac = useIsMac()
        const keydownHandler = (e: KeyboardEvent) => {
            if ((e.key === 'k') && (isMac.value ? e.metaKey : e.ctrlKey)) {
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

    return {
        showCommandModal,
        openCommandModal,
        closeCommandModal,
        registerKeyboardShortcut
    }
}

