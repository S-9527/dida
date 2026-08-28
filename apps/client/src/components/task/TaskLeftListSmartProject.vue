<script setup lang="ts">
import type { SmartProjectName } from '@/store'
import { Icon } from '@iconify/vue'
import { NPopover } from 'naive-ui'
import { ref } from 'vue'
import {
  useSettingsStore,
  useSmartProjectsStore,
  useTaskLeftListStore,
} from '@/store'

const taskLeftListStore = useTaskLeftListStore()
const settingsStore = useSettingsStore()
const smartProjectsStore = useSmartProjectsStore()

const hoverIndex = ref(-1)
const popoverIndex = ref(-1)

function openPopover(key: number) {
  popoverIndex.value = key
}

function closePopover() {
  popoverIndex.value = -1
}

function handleItemClick(projectName: SmartProjectName) {
  smartProjectsStore.selectProject(projectName)
  taskLeftListStore.selectedKey = projectName
}
</script>

<template>
  <div class="px-10px">
    <div class="mb-6px px-6px section-label">
      视图
    </div>

    <div class="flex flex-col gap-1px">
      <div
        v-for="(item, key) in settingsStore.visibleSmartProjects"
        :key="item.title"
        class="row row-hover"
        :class="{ 'row-active': taskLeftListStore.selectedKey === item.title }"
        @click="handleItemClick(item.title)"
        @mouseenter="hoverIndex = key"
        @mouseleave="hoverIndex = -1"
      >
        <Icon
          :icon="item.icon"
          width="17"
          class="flex-shrink-0 text-ink-3"
        />
        <span class="min-w-0 flex-1 truncate">{{ item.title }}</span>

        <NPopover
          trigger="click"
          :show="popoverIndex === key"
          :show-arrow="false"
          placement="bottom-start"
          @clickoutside="closePopover"
        >
          <template #trigger>
            <button
              v-show="hoverIndex === key"
              class="h-20px icon-btn w-20px flex-shrink-0"
              aria-label="更多操作"
              @click.stop="openPopover(key)"
            >
              <Icon icon="material-symbols:more-horiz" width="16" />
            </button>
          </template>
          <div class="w-140px">
            <button
              class="row w-full row-hover"
              @click="settingsStore.setHideSmartProject(item)"
            >
              <span>隐藏</span>
            </button>
          </div>
        </NPopover>
      </div>
    </div>
  </div>
</template>
