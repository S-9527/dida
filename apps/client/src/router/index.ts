import Task from '../view/Task.vue'
import type { App } from "vue";
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";
import { getDiscreteApi } from "@/composables/useNaiveDiscreteApi.ts";
import { SettingsRoute } from './settings'
import { RouteNames } from "./const.ts";

export const routes: RouteRecordRaw[] = [
    { path: "/", redirect: "/task", name: RouteNames.HOME },
    { path: "/task", component: Task, name: RouteNames.TASK },
    SettingsRoute,
];

const setupRouterGuard = (router: Router) => {
    router.beforeEach(() => {
        getDiscreteApi().loadingBar.start()
    })
    router.afterEach(() => {
        getDiscreteApi().loadingBar.finish()
    })
}

export const setupRouter = async (app: App) => {
    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    })
    app.use(router)
    setupRouterGuard(router)
    await router.isReady()
}
