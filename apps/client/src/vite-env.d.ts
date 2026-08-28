/// <reference types="vite/client" />

declare module 'vue3-emoji-picker';
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
