<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NEmpty, NInput } from 'naive-ui'
import CommandSearchCommands from './CommandSearchCommands.vue'
import CommandSearchTasks from './CommandSearchTasks.vue'
import { useSearch } from './search'

const { isSearchCommand, search, loading, searching } = useSearch()
</script>

<template>
  <div class="h-120 w-200 rounded base-color p-sm">
    <div class="flex">
      <Icon :icon="loading ? 'eos-icons:loading' : 'material-symbols:search'" width="30" />
      <NInput
        v-model:value="search"
        class="flex-1"
        placeholder="通过关键字搜索，或添加 '>' 前缀开启命令模式"
        clearable
      />
    </div>
    <div class="mt-6">
      <NEmpty v-if="!searching" description="搜索任务，标签或查看命令。">
        <template #icon />
      </NEmpty>
      <div v-else>
        <component :is="isSearchCommand ? CommandSearchCommands : CommandSearchTasks" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
