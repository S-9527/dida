import { createApp } from 'vue'
import { createPinia } from "pinia";
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import App from './App.vue'
import { setupRouter } from "./router";
import ContextMenu from '@imengyu/vue3-context-menu'
import "@unocss/reset/tailwind.css"
import "uno.css"

async function setupApp() {
    const app = createApp(App)
    const pinia = createPinia()
    app.use(pinia)
    await setupRouter(app)
    app.use(ContextMenu)
    app.mount('#app')
}

setupApp()
