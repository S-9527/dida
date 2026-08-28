<script setup lang="ts">
import { NModal } from 'naive-ui'
import { watch } from 'vue'
import { useCommandModalStore, useSearchStore } from '@/store'
import { registerKeyboardShortcut } from './commandModal'
import CommandBody from './CommandModalBody.vue'

const searchStore = useSearchStore()
const commandModalStore = useCommandModalStore()

registerKeyboardShortcut()

watch(() => commandModalStore.showCommandModal, (v) => {
  if (!v)
    searchStore.resetSearch()
})
</script>

<template>
  <NModal
    v-model:show="commandModalStore.showCommandModal"
    display-directive="show"
    to="body"
    style="margin-top: 10vh"
  >
    <CommandBody class="w-[min(680px,calc(100vw-32px))]" />
  </NModal>
</template>
