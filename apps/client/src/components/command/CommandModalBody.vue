<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NEmpty, NInput } from 'naive-ui'
import { useSearchStore } from '@/store'
import CommandSearchCommands from './CommandSearchCommands.vue'
import CommandSearchTasks from './CommandSearchTasks.vue'

const searchStore = useSearchStore()
</script>

<template>
  <div
    class="overflow-hidden border border-line rounded-xl bg-panel shadow-elev-3"
  >
    <div class="flex items-center gap-10px p-10px">
      <Icon
        :icon="searchStore.loading ? 'eos-icons:loading' : 'material-symbols:search'"
        width="18"
        class="flex-shrink-0 text-ink-3"
      />
      <NInput
        v-model:value="searchStore.search"
        class="flex-1"
        placeholder="通过关键字搜索，或添加 '>' 前缀开启命令模式"
        clearable
      />
      <span class="kbd flex-shrink-0">Esc</span>
    </div>

    <div class="max-h-420px overflow-y-auto border-t border-line p-6px">
      <NEmpty
        v-if="!searchStore.searching"
        description="搜索任务，或添加 '>' 前缀查看命令"
        class="py-28px"
      >
        <template #icon>
          <Icon icon="material-symbols:search" width="28" class="text-ink-3" />
        </template>
      </NEmpty>
      <div v-else>
        <component
          :is="searchStore.isSearchCommand ? CommandSearchCommands : CommandSearchTasks"
        />
      </div>
    </div>
  </div>
</template>
