import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { computed } from 'vue'

const discreteConfigure = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
}))

export const { loadingBar, message } = createDiscreteApi(['loadingBar', 'message'], {
  configProviderProps: discreteConfigure,
})
