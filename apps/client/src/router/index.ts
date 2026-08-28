import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { finishLoading, startLoading } from '@/composables/loadingBar'
import { messageRedirectToSignIn } from '@/composables/message'
import Login from '@/pages/Login.vue'
import Task from '@/pages/Task.vue'
import { checkHaveToken } from '@/utils/token'
import { RouteNames } from './const'
import { SettingsRoute } from './settings'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/task',
    name: RouteNames.HOME,
  },
  {
    path: '/task',
    component: Task,
    name: RouteNames.TASK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: Login,
    name: RouteNames.LOGIN,
    meta: {
      layout: false,
    },
  },
  SettingsRoute,
]

export function setupRouterGuard(router: Router) {
  router.beforeEach(() => {
    startLoading()
  })
  router.afterEach(() => {
    finishLoading()
  })

  router.beforeEach((to, _from) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {
      if (checkHaveToken()) {
        return true
      }

      messageRedirectToSignIn(() => {
        router.push({ name: RouteNames.LOGIN })
      })
    }
  })
}

let router: Router
export async function setupRouter(app: App) {
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}

export function setRouterInstance(routerInstance: Router) {
  router = routerInstance
}

export function getRouterInstance() {
  return router
}
