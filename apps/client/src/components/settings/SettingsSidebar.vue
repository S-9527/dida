<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sidebars } from '@/composables/settings'

const options: MenuOption[] = sidebars.map(sidebar => ({
  label: () =>
    h(
      RouterLink,
      { to: `/settings${sidebar.path}` },
      { default: () => sidebar.title },
    ),
  key: sidebar.path.slice(1),
}))

const route = useRoute()

const menuThemeOverrides = {
  itemHeight: '34px',
  itemBorderRadius: '8px',
  paddingInline: '8px',
  itemTextColor: 'var(--ink-2)',
  itemTextColorHover: 'var(--ink-1)',
  itemTextColorActive: 'var(--accent)',
  itemColorHover: 'var(--bg-hover)',
  itemColorActive: 'var(--accent-soft)',
  itemFontWeightActive: '500',
  fontSize: '13px',
}

function getCurrentMenu() {
  const path = route.path
  const pathArr = path.split('/')
  return pathArr[pathArr.length - 1]
}
</script>

<template>
  <NMenu :options="options" :default-value="getCurrentMenu()" :theme-overrides="menuThemeOverrides" />
</template>
