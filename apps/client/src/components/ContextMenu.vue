<script setup lang="ts">
import { NDropdown } from 'naive-ui'
import { computed } from 'vue'
import { useContextMenuStore } from '@/store'

const contextMenuStore = useContextMenuStore()

const MENU_WIDTH = 220

const placement = computed(() =>
  contextMenuStore.x + MENU_WIDTH > window.innerWidth
    ? 'bottom-end'
    : 'bottom-start',
)

const themeOverrides = {
  color: 'var(--bg-panel)',
  borderRadius: 'var(--radius-lg)',
  padding: '6px',
  fontSizeMedium: '13px',
  optionHeightMedium: '30px',
  optionIconSizeMedium: '16px',
  optionTextColor: 'var(--ink-1)',
  optionTextColorHover: 'var(--ink-1)',
  optionTextColorActive: 'var(--accent)',
  optionColorHover: 'var(--bg-hover)',
  optionColorActive: 'var(--accent-soft)',
  dividerColor: 'var(--border)',
  prefixColor: 'var(--ink-2)',
  suffixColor: 'var(--ink-2)',
}

function close() {
  contextMenuStore.hide()
}

function handleShowChange(value: boolean) {
  if (!value)
    close()
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed h-0 w-0"
      :style="{ left: `${contextMenuStore.x}px`, top: `${contextMenuStore.y}px` }"
    >
      <NDropdown
        to="body"
        trigger="click"
        :show="contextMenuStore.open"
        :options="contextMenuStore.options"
        :placement="placement"
        :theme-overrides="themeOverrides"
        @select="close"
        @update:show="handleShowChange"
      >
        <span />
      </NDropdown>
    </div>
  </Teleport>
</template>
