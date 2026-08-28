<script setup lang="ts">
import { NEmpty, NScrollbar } from 'naive-ui'
import { useSearchTasksStore } from '@/store'
import SearchItem from './CommandSearchTasksItem.vue'

const searchTasksStore = useSearchTasksStore()
</script>

<template>
  <div>
    <NScrollbar style="max-height: 380px" trigger="none">
      <div class="flex flex-col gap-4px">
        <SearchItem
          v-for="item in searchTasksStore.filteredTasks"
          :key="item.item.id"
          v-bind="item.item"
        />
      </div>
    </NScrollbar>
    <NEmpty
      v-if="!searchTasksStore.filteredTasks.length"
      description="没有找到哦"
      class="py-24px"
    />
  </div>
</template>
