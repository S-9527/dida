import Home from '../view/Home.vue'
import About from '../view/About.vue'
import { createRouter, createWebHashHistory } from "vue-router";


export const routes = [
    { path: "/", component: Home, name: "Home" },
    { path: "/about", component: About, name: "About" },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});