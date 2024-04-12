import About from '../view/About.vue'
import Task from '../view/Task.vue'
import { createRouter, createWebHashHistory } from "vue-router";


export const routes = [
    { path: "/", redirect: "/task" },
    { path: "/about", component: About, name: "About" },
    { path: "/task", component: Task, name: "Task" },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});