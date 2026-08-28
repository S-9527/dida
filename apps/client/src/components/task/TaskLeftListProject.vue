<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useTaskLeftListStore } from '@/store'
import ProjectCreatedView from './ProjectCreatedView.vue'

const taskLeftListStore = useTaskLeftListStore()
const showProjectCreatedView = ref(false)
const isExpanded = ref(true)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function selectProject(name: string) {
  taskLeftListStore.selectedKey = name
}
</script>

<template>
  <div class="px-10px">
    <div class="mb-6px flex items-center justify-between px-6px">
      <span class="section-label">清单</span>
      <span class="text-11px text-ink-3">
        {{ taskLeftListStore.listProjectChildrenNodes.length }}
      </span>
    </div>

    <div class="row w-full">
      <button
        class="min-w-0 flex flex-1 items-center gap-4px text-left text-ink-2"
        @click="toggleExpanded"
      >
        <Icon
          :icon="isExpanded ? 'carbon-chevron-down' : 'carbon-chevron-right'"
          width="12"
          class="flex-shrink-0 text-ink-3"
        />
        <span>{{ taskLeftListStore.listProjectRootNode.name }}</span>
      </button>
      <button
        class="h-20px icon-btn w-20px flex-shrink-0"
        aria-label="新建清单"
        @click="showProjectCreatedView = true"
      >
        <Icon icon="carbon-add" width="16" />
      </button>
    </div>

    <div v-show="isExpanded" class="mt-2px flex flex-col gap-1px">
      <div
        v-if="!taskLeftListStore.listProjectChildrenNodes.length"
        class="px-12px py-8px text-12px text-ink-3"
      >
        暂无清单，点击 + 创建
      </div>
      <div
        v-for="project in taskLeftListStore.listProjectChildrenNodes"
        :key="project.name"
        class="row row-hover pl-20px"
        :class="{
          'row-active':
            taskLeftListStore.selectedKey === project.name,
        }"
        @click="selectProject(project.name)"
      >
        <span class="min-w-0 flex-1 truncate">{{ project.name }}</span>
      </div>
    </div>
  </div>

  <ProjectCreatedView v-model:show="showProjectCreatedView" />
</template>
