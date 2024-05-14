import Task from '../view/Task.vue'
import Login from "../view/Login.vue";
import type { App } from "vue";
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";
import { getDiscreteApi } from "@/composables/useNaiveDiscreteApi.ts";
import { SettingsRoute } from './settings'
import { RouteNames } from "./const.ts";
import { messageRedirectToSignIn } from "@/composables/message.ts";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/task",
        name: RouteNames.HOME,
    },
    {
        path: "/task",
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
];

const setupRouterGuard = (router: Router) => {
    router.beforeEach(() => {
        getDiscreteApi().loadingBar.start()
    })
    router.afterEach(() => {
        getDiscreteApi().loadingBar.finish()
    })

    router.beforeEach((to, from, next) => {
        // 判断该路由是否需要登录权限
        if (to.matched.some(record => record.meta.requiresAuth)) {
            // 判断当前的 token 是否存在
            if (localStorage.getItem('token')) {
                next()
            }
            else {
                messageRedirectToSignIn(() => {
                    next({
                        name: RouteNames.LOGIN,
                        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    })
                })
            }
        }
        else {
            next()
        }
    })
}

export let router: Router
export const setupRouter = async (app: App) => {
    router = createRouter({
        history: createWebHashHistory(),
        routes,
    })

    app.use(router)
    setupRouterGuard(router)
    await router.isReady()
}
