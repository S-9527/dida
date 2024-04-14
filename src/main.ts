import { createApp } from 'vue'
import { createPinia } from "pinia";
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import App from './App.vue'
import { router } from "./router";
import ContextMenu from '@imengyu/vue3-context-menu'
import "@unocss/reset/tailwind.css"
import "uno.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ContextMenu)

app.mount('#app')
