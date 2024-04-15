import Task from '../view/Task.vue'
import { createRouter, createWebHashHistory } from "vue-router";


export const routes = [
    { path: "/", redirect: "/task" },
    { path: "/task", component: Task, name: "Task" },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});