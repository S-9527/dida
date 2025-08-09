import type { RouteRecordRaw } from "vue-router";
import type { Component } from "vue";
import Settings from "@/view/Settings.vue";
import { sidebars } from "@/composables/settings/sidebar";
import { RouteNames } from "./const.ts";

const SETTINGS_PATH = "settings";

const subComponents = import.meta.glob([
  "/src/components/settings/Sub/**/**.vue",
]);

const subRoutes: RouteRecordRaw[] = sidebars.map((sidebar) => ({
  path: `/settings${sidebar.path}`,
  name: `Settings${sidebar.name}`,
  component: subComponents[
    `/src/components/settings/Sub/${sidebar.name}/index.vue`
  ] as () => Promise<Component>,
  meta: {
    title: sidebar.title,
  },
}));

export const SettingsRoute = {
  path: `/${SETTINGS_PATH}`,
  component: Settings,
  name: RouteNames.SETTINGS,
  meta: { title: "设置" },
  children: subRoutes,
  redirect: subRoutes[0].path,
} as RouteRecordRaw;
