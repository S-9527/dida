import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { Theme, Themes } from "@/service/settings/theme.ts";

export const useThemeStore = defineStore('theme', () => {
        const isDark = useDark()
        const toggleDark = useToggle(isDark)
        const naiveTheme = computed(() => (isDark.value ? darkTheme : null))

        const currentThemeName = isDark.value ? Theme.Dark : Theme.Light
        const currentTheme = ref(Themes.find(item => item.name === currentThemeName))

        function changeTheme(theme: Theme) {
            const themeItem = Themes.find(item => item.name === theme)
            if (themeItem) {
                themeItem.handler()
                currentTheme.value = themeItem
            }
        }

        useLocalStorage('isDark', isDark)

        return {
            currentTheme,
            changeTheme,
            isDark,
            toggleDark,
            naiveTheme,
        }
    },
)

let globalThemeStore: ReturnType<typeof useThemeStore>

export const getGlobalThemeStore = () => {
    if (!globalThemeStore) {
        globalThemeStore = useThemeStore()
    }

    return globalThemeStore
}
