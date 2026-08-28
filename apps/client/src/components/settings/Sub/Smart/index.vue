<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NSelect } from 'naive-ui'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()
</script>

<template>
  <div>
    <h2 class="text-16px font-medium">
      视图
    </h2>
    <p class="mt-2px text-13px text-ink-3">
      控制左侧栏中显示哪些视图
    </p>
    <ul class="mt-20px flex flex-col gap-10px">
      <li
        v-for="item in settingsStore.settingsSmartProjects"
        :key="item.title"
        class="flex items-center justify-between border border-line rounded-lg p-14px"
      >
        <div class="flex items-center gap-10px">
          <Icon :icon="item.icon" width="18" class="text-ink-2" />
          <span class="text-14px">{{ item.title }}</span>
        </div>
        <div class="w-160px">
          <NSelect v-model:value="item.option" :options="item.options" />
        </div>
      </li>
    </ul>
  </div>
</template>
